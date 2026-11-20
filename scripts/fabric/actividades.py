import json, sys, re, urllib.request, datetime as dt
T = open(sys.argv[1]).read().strip(); import os
W = os.environ["FABRIC_WORKSPACE_ID"]
e = json.load(open("estado.json"))
runs = next(j for j in e["jobs"].values() if j["nombre"] == "PL_EXT_ORACLE_SQLSERVER_WMS")["runs"]
out = []
for r in runs:
    s = dt.datetime.fromisoformat(r["startTimeUtc"][:19]); f = dt.datetime.fromisoformat((r["endTimeUtc"] or r["startTimeUtc"])[:19])
    body = json.dumps({"filters": [], "orderBy": [{"orderBy": "ActivityRunStart", "order": "ASC"}],
                       "lastUpdatedAfter": (s - dt.timedelta(hours=1)).strftime("%Y-%m-%dT%H:%M:%SZ"),
                       "lastUpdatedBefore": (f + dt.timedelta(hours=2)).strftime("%Y-%m-%dT%H:%M:%SZ")}).encode()
    req = urllib.request.Request(f"https://api.fabric.microsoft.com/v1/workspaces/{W}/datapipelines/pipelineruns/{r['id']}/queryactivityruns",
                                 data=body, headers={"Authorization": "Bearer " + T, "Content-Type": "application/json"}, method="POST")
    v = json.loads(urllib.request.urlopen(req, timeout=120).read()).get("value", [])
    acts = []
    for a in v:
        q = json.dumps(a.get("input") or {})
        m = re.search(r"FROM\s+([\w\.\[\]]+)", q, re.I)
        o = a.get("output") or {}
        acts.append({"nombre": a.get("activityName"), "tipo": a.get("activityType"), "estado": a.get("status"),
                     "ms": a.get("durationInMs"), "tabla": m.group(1).split(".")[-1].strip("[]") if m and a.get("activityType") == "Copy" else None,
                     "filas": o.get("rowsCopied"), "bytes": o.get("dataRead"),
                     "ituHoras": sum(x.get("duration", 0) for x in ((o.get("billingReference") or {}).get("totalBillableDuration") or []) if x.get("unit") == "DIUHours"),
                     "shirHoras": sum(x.get("duration", 0) for x in ((o.get("billingReference") or {}).get("billableDuration") or []) if x.get("meterType") == "SelfhostedIR"), "error": (a.get("error") or {}).get("message", "")[:160]})
    out.append({"id": r["id"], "inicio": r["startTimeUtc"], "fin": r["endTimeUtc"], "estado": r["status"], "actividades": acts})
json.dump(out, open("actividades.json", "w"), ensure_ascii=False, indent=1)
for r in sorted(out, key=lambda x: x["inicio"]):
    c = [a for a in r["actividades"] if a["tipo"] == "Copy"]
    print(r["inicio"][:16], r["estado"], len(r["actividades"]), "copias:", [(a["tabla"], a["estado"], a["filas"], round((a["ms"] or 0) / 60000, 1)) for a in c],
          [a["error"][:80] for a in r["actividades"] if a["estado"] == "Failed" and a["tipo"] != "ForEach"][:2])
