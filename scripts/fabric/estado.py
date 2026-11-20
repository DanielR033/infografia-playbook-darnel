# Estado del workspace Fabric (solo lectura): ítems, ejecuciones de pipelines/notebooks, programaciones, almacenamiento OneLake.
import json, sys, urllib.request, urllib.error, concurrent.futures as cf
TF, TS = open(sys.argv[1]).read().strip(), open(sys.argv[2]).read().strip()
import os
W = os.environ["FABRIC_WORKSPACE_ID"]; A = "https://api.fabric.microsoft.com/v1"
def get(url, tok, extra=None):
    h = {"Authorization": "Bearer " + tok}; h.update(extra or {})
    try:
        r = urllib.request.urlopen(urllib.request.Request(url, headers=h), timeout=120)
        return json.loads(r.read() or b"{}"), r.headers
    except urllib.error.HTTPError as e:
        return {"_error": e.code, "_body": e.read().decode()[:300]}, {}
def paged(url, tok):
    out = []
    while url:
        d, _ = get(url, tok)
        if "_error" in d: return d
        out += d.get("value", []); url = d.get("continuationUri")
    return out
ws, _ = get(f"{A}/workspaces/{W}", TF)
items = paged(f"{A}/workspaces/{W}/items", TF)
jobs = {}
for it in items:
    if it["type"] in ("DataPipeline", "Notebook", "SemanticModel"):
        jobs[it["id"]] = {"nombre": it["displayName"], "tipo": it["type"], "runs": paged(f"{A}/workspaces/{W}/items/{it['id']}/jobs/instances", TF)}
        jt = {"DataPipeline": "Pipeline", "Notebook": "RunNotebook"}.get(it["type"])
        if jt:
            sc = paged(f"{A}/workspaces/{W}/items/{it['id']}/jobs/{jt}/schedules", TF)
            jobs[it["id"]]["schedules"] = sc
# almacenamiento OneLake por lakehouse (suma de contentLength, recursivo)
def size(lh):
    tot, n, cont = 0, 0, None
    while True:
        u = f"https://onelake.dfs.fabric.microsoft.com/{W}?resource=filesystem&directory={lh}&recursive=true" + (f"&continuation={cont}" if cont else "")
        d, h = get(u, TS, {"x-ms-version": "2023-11-03"})
        if "_error" in d: return {"error": d["_error"]}
        for p in d.get("paths", []):
            if p.get("isDirectory") != "true": tot += int(p.get("contentLength", 0)); n += 1
        cont = h.get("x-ms-continuation")
        if not cont: return {"bytes": tot, "archivos": n}
lhs = [i for i in items if i["type"] == "Lakehouse"]
with cf.ThreadPoolExecutor(5) as ex:
    sizes = dict(zip([l["displayName"] for l in lhs], ex.map(lambda l: size(l["id"]), lhs)))
json.dump({"workspace": ws, "items": items, "jobs": jobs, "almacenamiento": sizes}, open("estado.json", "w"), ensure_ascii=False, indent=1)
print("items", len(items)); print("almacenamiento", sizes)
for j in jobs.values():
    r = j["runs"]; print(j["tipo"], j["nombre"], "runs:", len(r) if isinstance(r, list) else r, "sched:", len(j.get("schedules", [])) if isinstance(j.get("schedules"), list) else j.get("schedules"))
