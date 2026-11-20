# Conteo de filas por tabla Delta leyendo _delta_log en OneLake (solo lectura).
# Reproduce add/remove de los commits JSON y suma stats.numRecords de los archivos activos.
import json, sys, urllib.request, concurrent.futures as cf, datetime
TOKEN = open(sys.argv[1]).read().strip()
import os
W = os.environ["FABRIC_WORKSPACE_ID"]
# {"bronze": "<id lakehouse>", "silver": "...", "gold": "..."}
LH = json.loads(os.environ["FABRIC_LAKEHOUSES"])
H = {"Authorization": "Bearer " + TOKEN, "x-ms-version": "2023-11-03"}
def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=H), timeout=60).read()
def ls(path):
    out, cont = [], None
    while True:
        u = f"https://onelake.dfs.fabric.microsoft.com/{W}?resource=filesystem&directory={path}&recursive=false" + (f"&continuation={cont}" if cont else "")
        req = urllib.request.Request(u, headers=H); r = urllib.request.urlopen(req, timeout=60)
        out += json.loads(r.read()).get("paths", []); cont = r.headers.get("x-ms-continuation")
        if not cont: return out
def contar(capa, tabla):
    base = f"{LH[capa]}/Tables/dbo/{tabla}/_delta_log"
    files = sorted(p["name"].split("/")[-1] for p in ls(base))
    if any("checkpoint" in f for f in files):
        return {"capa": capa, "tabla": tabla, "filas": None, "nota": "checkpoint (requiere notebook)"}
    activos, ts, sin_stats = {}, None, 0
    for f in [x for x in files if x.endswith(".json")]:
        for line in get(f"https://onelake.dfs.fabric.microsoft.com/{W}/{base}/{f}").decode().splitlines():
            a = json.loads(line)
            if "add" in a:
                st = a["add"].get("stats")
                n = json.loads(st).get("numRecords") if st else None
                activos[a["add"]["path"]] = n
            elif "remove" in a:
                activos.pop(a["remove"]["path"], None)
            elif "commitInfo" in a:
                ts = a["commitInfo"].get("timestamp", ts)
    sin_stats = sum(1 for v in activos.values() if v is None)
    filas = None if sin_stats else sum(activos.values())
    return {"capa": capa, "tabla": tabla, "filas": filas, "archivos": len(activos),
            "ultima": datetime.datetime.fromtimestamp(ts / 1000, datetime.timezone.utc).strftime("%Y-%m-%d") if ts else None,
            "nota": f"{sin_stats} archivos sin stats" if sin_stats else ""}
tareas = []
for capa in LH:
    for p in ls(f"{LH[capa]}/Tables/dbo"):
        tareas.append((capa, p["name"].split("/")[-1]))
res = []
with cf.ThreadPoolExecutor(8) as ex:
    for r in ex.map(lambda t: (lambda: contar(*t))() if True else None, tareas):
        res.append(r)
json.dump(res, open("conteos.json", "w"), ensure_ascii=False, indent=1)
# formato que consume el tablero (src/fabricConteos.json)
tab = {"corte": os.environ.get("CORTE", datetime.date.today().isoformat()),
       "fuente": "OneLake · conteo por _delta_log (stats.numRecords de archivos activos); null = tabla con checkpoint, no contada por esta vía",
       "capas": {}}
for x in res:
    tab["capas"].setdefault(x["capa"], {})[x["tabla"]] = {"filas": x["filas"], "ultima": x.get("ultima")}
tab["capas"] = {c: dict(sorted(v.items())) for c, v in tab["capas"].items()}
json.dump(tab, open("../../src/fabricConteos.json", "w"), ensure_ascii=False, indent=1)
for r in sorted(res, key=lambda r: (r["capa"], r["tabla"])):
    print(r["capa"].ljust(7), r["tabla"].ljust(36), str(r["filas"]).rjust(12), r.get("ultima") or "", r["nota"])
