import json, datetime as dt, collections, statistics as stt
e = json.load(open("estado.json")); acts = json.load(open("actividades.json")); cnt = json.load(open("../../src/fabricConteos.json"))
P = lambda s: dt.datetime.fromisoformat(s[:19]) if s else None
mins = lambda a, b: round((P(b) - P(a)).total_seconds() / 60, 1) if a and b else None
import os
out = {"corte": os.environ.get("CORTE", dt.date.today().isoformat()), "fuente": "API REST de Fabric y OneLake, cuenta con rol de workspace (sin rol de capacidad)",
       "workspace": {"nombre": e["workspace"]["displayName"], "region": e["workspace"]["capacityRegion"], "licencia": e["workspace"]["licensingInfo"]["licensingMode"]},
       "capacidad": {"visible": False, "sku": None, "skuReferencia": "F64 (comité 06-nov)", "consumoCU": None, "throttling": None}}
out["items"] = dict(collections.Counter(i["type"] for i in e["items"] if i["type"] != "SQLEndpoint"))
out["almacenamiento"] = [{"lakehouse": k, "gb": round(v["bytes"] / 1e9, 2), "archivos": v["archivos"]} for k, v in e["almacenamiento"].items()]
out["capas"] = {c: {"tablas": len(v), "filas": sum(x["filas"] or 0 for x in v.values()), "sinConteo": sum(1 for x in v.values() if x["filas"] is None)} for c, v in cnt["capas"].items()}
# pipeline
runs = []
for r in sorted(acts, key=lambda x: x["inicio"]):
    c = [a for a in r["actividades"] if a["tipo"] == "Copy"]
    fall = [a for a in r["actividades"] if a["estado"] == "Failed" and a["tipo"] == "Copy"]
    runs.append({"inicio": r["inicio"][:16].replace("T", " "), "estado": r["estado"], "min": mins(r["inicio"], r["fin"]),
                 "copias": len(c), "copiasOk": sum(1 for a in c if a["estado"] == "Succeeded"),
                 "filas": sum(a["filas"] or 0 for a in c), "gb": round(sum(a["bytes"] or 0 for a in c) / 1e9, 2),
                 "falla": (fall[0]["tabla"] + ": error de origen (SqlOperationFailed)") if fall else None})
pl = next(j for j in e["jobs"].values() if j["nombre"] == "PL_EXT_ORACLE_SQLSERVER_WMS")
out["pipelines"] = [{"nombre": j["nombre"], "ejecuciones": len(j["runs"]) if isinstance(j["runs"], list) else 0,
                     "programaciones": len(j.get("schedules") or [])} for j in e["jobs"].values() if j["tipo"] == "DataPipeline"]
out["pipelineRuns"] = runs
# copias por tabla
por = collections.defaultdict(list)
for r in sorted(acts, key=lambda x: x["inicio"]):
    for a in r["actividades"]:
        if a["tipo"] == "Copy" and a["tabla"]: por[a["tabla"]].append((r["inicio"], a))
tablas = []
for t, l in por.items():
    ok = [a for _, a in l if a["estado"] == "Succeeded"]
    last = ok[-1] if ok else None
    tablas.append({"tabla": t, "origen": "PeopleSoft" if t.upper().startswith("PS") else "WMS (SQL Server)",
                   "ejecuciones": len(l), "ok": len(ok), "fallidas": len(l) - len(ok),
                   "minProm": round(stt.mean((a["ms"] or 0) / 60000 for a in ok), 1) if ok else None,
                   "filas": last["filas"] if last else None, "gb": round((last["bytes"] or 0) / 1e9, 2) if last else None,
                   "ultima": l[-1][0][:10]})
out["copiasPorTabla"] = sorted(tablas, key=lambda x: -(x["minProm"] or 0))
# notebooks
nbs = []
for j in e["jobs"].values():
    if j["tipo"] != "Notebook": continue
    r = j["runs"] if isinstance(j["runs"], list) else []
    d = [mins(x["startTimeUtc"], x["endTimeUtc"]) for x in r if x["endTimeUtc"]]
    nbs.append({"nombre": j["nombre"], "ejecuciones": len(r), "ok": sum(1 for x in r if x["status"] == "Completed"),
                "minProm": round(stt.mean(d), 1) if d else None, "minMax": max(d) if d else None,
                "ultima": max((x["startTimeUtc"] for x in r), default=None), "programaciones": len(j.get("schedules") or [])})
for n in nbs:
    if n["ultima"]: n["ultima"] = n["ultima"][:10]
out["notebooks"] = sorted(nbs, key=lambda x: -x["ejecuciones"])
todas = [x for j in e["jobs"].values() if isinstance(j["runs"], list) for x in j["runs"]]
out["historialDesde"] = min(x["startTimeUtc"] for x in todas)[:10]
out["ejecuciones"] = {"total": len(todas), "manuales": sum(1 for x in todas if x["invokeType"] == "Manual"),
                      "ok": sum(1 for x in todas if x["status"] == "Completed"),
                      "horasComputo": round(sum(mins(x["startTimeUtc"], x["endTimeUtc"]) or 0 for x in todas) / 60, 1)}
json.dump(out, open("../../src/fabricEstado.json", "w"), ensure_ascii=False, indent=1)
print(json.dumps({k: out[k] for k in ("items", "almacenamiento", "capas", "ejecuciones", "historialDesde", "pipelines")}, ensure_ascii=False))
print(len(tablas), "tablas copiadas"); [print(" ", t) for t in out["copiasPorTabla"][:6]]; [print(" ", n) for n in out["notebooks"]]

# ---- Consumo estimado de CU (tarifas publicadas por Microsoft) ----
TAR = {"copiaCUhPorITOh": 1.5, "orquestacionCUhPorActividad": 0.0056, "sparkCUporVCore": 0.5, "sparkVCoresSesion": 16, "capacidadCU": 64}
# sesión base del starter pool: 2 nodos Medium (driver + 1 executor) x 8 vCores = 16 vCores = 8 CU
cuNb = TAR["sparkVCoresSesion"] * TAR["sparkCUporVCore"]
procesos = []
for r in acts:
    c = [a for a in r["actividades"] if a["tipo"] == "Copy"]; nc = [a for a in r["actividades"] if a["tipo"] != "Copy"]
    ito = sum(a.get("ituHoras") or 0 for a in c)
    cuh = ito * TAR["copiaCUhPorITOh"] + len(nc) * TAR["orquestacionCUhPorActividad"]
    procesos.append({"proceso": "PL_EXT_ORACLE_SQLSERVER_WMS", "tipo": "Pipeline", "dia": r["inicio"][:10], "cuh": cuh, "itoh": ito})
for j in e["jobs"].values():
    if j["tipo"] != "Notebook" or not isinstance(j["runs"], list): continue
    for x in j["runs"]:
        m = mins(x["startTimeUtc"], x["endTimeUtc"]) or 0
        procesos.append({"proceso": j["nombre"], "tipo": "Notebook", "dia": x["startTimeUtc"][:10], "cuh": cuNb * m / 60})
diaCap = TAR["capacidadCU"] * 24
porDia = collections.defaultdict(lambda: {"Pipeline": 0, "Notebook": 0})
for p in procesos: porDia[p["dia"]][p["tipo"]] += p["cuh"]
out["consumo"] = {
  "tarifas": TAR, "capacidadReferencia": "F64", "cuhDia": diaCap,
  "porDia": [{"dia": d, "pipeline": round(v["Pipeline"], 2), "notebooks": round(v["Notebook"], 2), "total": round(v["Pipeline"] + v["Notebook"], 2),
              "pct": round((v["Pipeline"] + v["Notebook"]) / diaCap * 100, 2)} for d, v in sorted(porDia.items())],
  "porProceso": sorted([{"proceso": k, "tipo": next(p["tipo"] for p in procesos if p["proceso"] == k),
                         "ejecuciones": sum(1 for p in procesos if p["proceso"] == k),
                         "cuh": round(sum(p["cuh"] for p in procesos if p["proceso"] == k), 2)} for k in {p["proceso"] for p in procesos}], key=lambda x: -x["cuh"]),
  "fuentes": ["https://learn.microsoft.com/fabric/data-factory/pricing-pipelines", "https://learn.microsoft.com/fabric/data-engineering/spark-compute"]
}
for p in out["consumo"]["porProceso"]: p["cuhProm"] = round(p["cuh"] / p["ejecuciones"], 2)
json.dump(out, open("../../src/fabricEstado.json", "w"), ensure_ascii=False, indent=1)
print("CU-h total", round(sum(p["cuh"] for p in procesos), 1))
for d in out["consumo"]["porDia"]: print(d)
for p in out["consumo"]["porProceso"]: print(p)
