# Genera src/pb1Columnas.json desde las plantillas de PB1 (Clientes CO/PA y Artículos).
# destino = hoja de la plantilla ERP (FBDI) a la que corresponde la columna de negocio.
# Es un cruce por significado de la columna (propuesto, a validar por el consultor).
import openpyxl, json, re, sys, os, warnings, unicodedata
warnings.filterwarnings("ignore")
cli, ite, out = sys.argv[1:4]
prov = sys.argv[4] if len(sys.argv) > 4 else None
norm = lambda s: unicodedata.normalize("NFKD", s).encode("ascii","ignore").decode().lower().strip()
REGLAS_CLI = [
  (r"^(nombre|primer nombre|segundo nombre|primer apellido|segundo apellido|naturaleza|actividad economica|tipo de contribuyente|tipo de documento)$", "HZ_IMP_PARTIES_T"),
  (r"^(regimen|tipo de registro fiscal|estado de registro fiscal|tipos de identificacion|numero de identificacion.*|responsabilidades|no responsable impuesto.*|obligaciones.*|tipo de establecimiento|numero de registro comercial)$", "Configuración fiscal (perfil tributario)"),
  (r"^(pais|linea direccion ?\d|barrio|localidad|departamento|ciudad|centro poblado|codigo postal|provincia|distrito)$", "HZ_IMP_LOCATIONS_T"),
  (r"^direccion primaria$", "HZ_IMP_PARTYSITES_T"),
  (r"^(unidad de negocio|canal|campos descriptivos.*|condiciones de entrega|manera entrega.*)$", "HZ_IMP_ACCTSITES_T"),
  (r"^cuenta$", "HZ_IMP_ACCOUNTS_T"),
  (r"^(metodo pago|tipo pago)$", "RA_CUST_PAY_METHOD_INT_ALL"),
  (r"^banco$", "RA_CUSTOMER_BANKS_INT_ALL"),
  (r"^(tipo perfil|cobrador)$", "RA_CUSTOMER_PROFILES_INT_ALL"),
]
def destino(reglas, h, default=None):
    n = norm(h)
    for rx, d in reglas:
        if re.match(rx, n): return d
    return default
def leer(path, hoja, fila_ok, fila_hdr, maxc):
    ws = openpyxl.load_workbook(path, read_only=True, data_only=True)[hoja]
    rows = [list(r[:maxc]) for r in ws.iter_rows(values_only=True)]
    hdr = rows[fila_hdr]; ok = rows[fila_ok] if fila_ok is not None else [None]*len(hdr)
    data = [r for r in rows[fila_hdr+1:] if any(c not in (None, "") for c in r[1:])]
    return hdr, ok, data, rows
res = {"fuente": {}, "hojas": []}
seen_cli = {}
for hoja, pais in (("Clientes Colombia ", "CO"), ("Clientes Panamá", "PA")):
    hdr, ok, data, _ = leer(cli, hoja, 0, 1, 60)
    cols = []
    for i, h in enumerate(hdr):
        if not h: continue
        h = re.sub(r"\s+", " ", str(h)).strip()
        con = sum(1 for r in data if i < len(r) and r[i] not in (None, ""))
        d = "RA_CUSTOMER_BANKS_INT_ALL" if h == "Cuenta" else destino(REGLAS_CLI, h)  # "Cuenta" junto a Banco = cuenta bancaria; "CUENTA" = cuenta de cliente
        cols.append({"col": h, "ok": bool(ok[i] and str(ok[i]).strip().lower() == "ok"), "conDatos": con, "destino": d})
    reg = max(c["conDatos"] for c in cols if norm(c["col"]) == "nombre")  # registros = filas con NOMBRE
    res["hojas"].append({"maestro": "Clientes", "hoja": f"Clientes {pais}", "registros": reg, "cols": cols})
hdr, _, data, rows = leer(ite, "Artículos", None, 2, 80)
grp = None; cols = []
for i, h in enumerate(hdr):
    if rows[1][i]: grp = str(rows[1][i]).strip()
    if not h or norm(str(h)).startswith("observ"): continue
    h = re.sub(r"\s+", " ", str(h)).strip()
    con = sum(1 for r in data if i < len(r) and r[i] not in (None, ""))
    d = "EGP_ITEM_CATEGORIES_INTERFACE" if re.match(r"^(categoria|clase de articulo)", norm(h)) else "EGP_SYSTEM_ITEMS_INTERFACE"
    cols.append({"col": h, "grupo": grp, "conDatos": con, "destino": d})
res["hojas"].append({"maestro": "Artículos", "hoja": "Artículos", "registros": len(data), "cols": cols})
res["fuente"] = {"Clientes": "Muestra_Clientes_Grupo Ajover Darnel CO y PA_oct27.xlsx", "Artículos": "DAR_Maestro_Items_PB1_con_LOV.xlsx"}
# ---- Proveedores (CO y PA): destino por grupo de la plantilla de negocio + reglas por columna ----
FISCAL_PROV = r"^(regimen|codigo de regimen fiscal|tipo de registro fiscal|estado de registro fiscal|codigo de declaracion.*|codigo de tipo de declaracion.*)$"
TRABAJO = r"^(clasificacion sugerida.*|justificacion y validacion.*|tipo de contribuyente nueva)$"
def destino_prov(grupo, h):
    n = norm(h); g = norm(grupo or "")
    if re.match(TRABAJO, n): return None  # columnas de trabajo del equipo, no van a la plantilla
    if g.startswith("perfil"):
        return "Configuración fiscal (perfil tributario)" if re.match(FISCAL_PROV, n) else "POZ_SUPPLIERS_INT"
    if g.startswith("direccion"):
        if n.startswith("contactos"): return "POZ_SUP_CONTACTS"
        if n == "unidad de negocio": return "POZ_SITE_ASSIGNMENTS_INT"
        return "POZ_SUPPLIER_ADDRESSES_INT"
    if g.startswith("pagos"):
        return "IBY_TEMP_EXT_PAYEES" if n.startswith("metodos de pago") else "IBY_TEMP_EXT_BANK_ACCTS"
    if g.startswith("sitio"):
        if n.startswith("relacion pago de terceros"): return "Third_Party_Pay_Relationships"
        if n.startswith("combinacion contable"): return "POZ_SITE_ASSIGNMENTS_INT"
        return "POZ_SUPPLIER_SITES_INT"
    if g.startswith("campos descriptivos"): return "POZ_SUPPLIER_ADDRESSES_INT"
    if g.startswith("documentacion"): return "Supplier_Profile_Attachments"
    return None
if prov:
    wbp = openpyxl.load_workbook(prov, read_only=True, data_only=True)
    for hoja, pais in (("Maestra Proveedores CO", "CO"), ("Maestra Proveedores PA", "PA")):
        rows = [list(r[:80]) for r in wbp[hoja].iter_rows(values_only=True)]
        hi = next(i for i, r in enumerate(rows) if r[1] and "nombre" in norm(str(r[1])))
        g, hdr = rows[hi - 1], rows[hi]
        data = [r for r in rows[hi + 1:] if r[1] not in (None, "") and any(c not in (None, "") for c in r[2:])]
        grp, cols = None, []
        for i, h in enumerate(hdr):
            if i < len(g) and g[i]: grp = str(g[i]).strip()
            if not h: continue
            h = re.sub(r"\s+", " ", str(h)).strip()
            con = sum(1 for r in data if i < len(r) and r[i] not in (None, ""))
            cols.append({"col": h, "grupo": grp, "conDatos": con, "destino": destino_prov(grp, h)})
        res["hojas"].append({"maestro": "Proveedores", "hoja": f"Proveedores {pais}", "registros": len(data), "cols": cols})
    res["fuente"]["Proveedores"] = os.path.basename(prov)
json.dump(res, open(out, "w"), ensure_ascii=False, indent=1)
for h in res["hojas"]:
    sin = [c["col"] for c in h["cols"] if not c["destino"]]
    print(h["hoja"], h["registros"], "cols", len(h["cols"]), "conDatos", sum(1 for c in h["cols"] if c["conDatos"]), "ok", sum(1 for c in h["cols"] if c.get("ok")), "sin destino", sin)
    from collections import Counter
    print("   ", Counter((c["destino"], c["conDatos"] > 0) for c in h["cols"]))
