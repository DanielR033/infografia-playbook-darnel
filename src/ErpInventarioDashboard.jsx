import React, { useMemo, useState, useEffect } from "react";
import DATA from "./erpDashData.json";
import COLS from "./erpDashCols.json";

/* ====== estilos del dashboard (navy/teal), aislados bajo .erpdash ====== */
const DASH_CSS = `
.erpdash{--bg:#eef1f5;--surface:#fff;--surface2:#f6f8fb;--fg:#15202b;--muted:#5b6b7a;--border:#d7dee7;
 --navy:#1f3a5f;--teal:#2e7d7a;--accent:#2e7d7a;--accent-soft:#d9ebe9;--ok:#2e7d55;--ok-soft:#dcefe3;
 --warn:#9a6a12;--warn-soft:#f7eccf;--crit:#a33a34;--crit-soft:#f6ddd9;--info:#2d5b8e;--info-soft:#dbe6f2;--grid:#e5eaf0;
 --mfont:"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--fg)}
.erpdash *{box-sizing:border-box}
.erpdash .eyebrow{font-family:var(--mfont);font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--teal);font-weight:600;margin:0}
.erpdash .h2{font-size:1.4rem;font-weight:700;margin:6px 0 0;letter-spacing:-.01em;color:var(--navy)}
.erpdash .lead{color:var(--muted);max-width:66ch;margin:8px 0 0;font-size:.95rem;line-height:1.5}
.erpdash .num{font-family:var(--mfont);font-variant-numeric:tabular-nums}
.erpdash section{padding-block:26px;border:0}
.erpdash .kpis{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-top:20px}
.erpdash .kpi{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:16px;position:relative;overflow:hidden}
.erpdash .kpi::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--accent)}
.erpdash .kpi.alt::before{background:var(--navy)}
.erpdash .kpi.warnbar::before{background:var(--warn)}
.erpdash .kpi .v{font-family:var(--mfont);font-weight:600;font-size:1.9rem;letter-spacing:-.02em;line-height:1;color:var(--navy)}
.erpdash .kpi .l{font-size:.78rem;color:var(--muted);margin-top:8px;line-height:1.3}
.erpdash .kpi .foot{font-size:.72rem;color:var(--teal);margin-top:6px;font-weight:500}
.erpdash .note{background:var(--surface2);border-left:3px solid var(--accent);border-radius:0 8px 8px 0;padding:11px 14px;margin-top:14px;font-size:.84rem;color:var(--muted)}
.erpdash .dgrid{display:grid;grid-template-columns:repeat(12,1fr);gap:16px;margin-top:18px}
.erpdash .dcard{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:18px;min-width:0}
.erpdash .dcard h3{font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);font-family:var(--mfont);font-weight:600;margin:0}
.erpdash .c4{grid-column:span 4}.erpdash .c6{grid-column:span 6}.erpdash .c12{grid-column:span 12}
.erpdash .bars{display:flex;flex-direction:column;gap:10px;margin-top:14px}
.erpdash .bar{display:grid;grid-template-columns:1fr auto;gap:4px 10px;align-items:center}
.erpdash .bar .bl{font-size:.86rem}
.erpdash .bar .bv{font-family:var(--mfont);font-size:.84rem;font-weight:600}
.erpdash .bar .track{grid-column:1/-1;height:8px;border-radius:5px;background:var(--surface2);overflow:hidden}
.erpdash .bar .fill{height:100%;border-radius:5px;background:var(--accent)}
.erpdash .fill.navy{background:var(--navy)}.erpdash .fill.ok{background:var(--ok)}.erpdash .fill.warn{background:var(--warn)}.erpdash .fill.crit{background:var(--crit)}.erpdash .fill.info{background:var(--info)}.erpdash .fill.teal{background:var(--teal)}
.erpdash .rows{display:flex;flex-direction:column;gap:2px;margin-top:10px}
.erpdash .srow{display:flex;justify-content:space-between;gap:12px;padding:7px 2px;border-bottom:1px solid var(--grid);font-size:.88rem}
.erpdash .srow:last-child{border-bottom:0}
.erpdash .srow .sv{font-family:var(--mfont);font-weight:600}
.erpdash .srow.indent .sl{padding-left:14px;color:var(--muted);font-size:.82rem}
.erpdash .pill{display:inline-block;font-size:.72rem;font-weight:600;padding:2px 9px;border-radius:999px;white-space:nowrap}
.erpdash .p-ok{background:var(--ok-soft);color:var(--ok)}.erpdash .p-warn{background:var(--warn-soft);color:var(--warn)}.erpdash .p-crit{background:var(--crit-soft);color:var(--crit)}
.erpdash .p-info{background:var(--info-soft);color:var(--info)}.erpdash .p-neu{background:var(--surface2);color:var(--muted)}.erpdash .p-teal{background:var(--accent-soft);color:var(--teal)}
.erpdash .tablewrap{overflow-x:auto;border:1px solid var(--border);border-radius:14px;background:var(--surface);margin-top:14px}
.erpdash table.dt{border-collapse:collapse;width:100%;font-size:.84rem;min-width:640px}
.erpdash table.dt thead th{position:sticky;top:0;background:var(--surface2);text-align:left;font-family:var(--mfont);font-weight:600;font-size:.7rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);padding:11px 12px;border-bottom:2px solid var(--border);white-space:nowrap;cursor:pointer;user-select:none}
.erpdash table.dt th.right,.erpdash table.dt td.right{text-align:right}
.erpdash table.dt tbody td{padding:9px 12px;border-bottom:1px solid var(--grid);vertical-align:top}
.erpdash table.dt tbody tr:last-child td{border-bottom:0}
.erpdash table.dt tbody tr:hover{background:var(--surface2)}
.erpdash td.mono,.erpdash .mono{font-family:var(--mfont);font-size:.8rem}
.erpdash td.n,.erpdash .n{font-family:var(--mfont);font-variant-numeric:tabular-nums}
.erpdash tr.totalrow td{font-weight:700;background:var(--surface2);border-top:2px solid var(--border);font-family:var(--mfont)}
.erpdash .obj-id{font-family:var(--mfont);font-weight:600;color:var(--teal);font-size:.8rem}
.erpdash .toolbar{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:14px}
.erpdash .search{flex:1;min-width:180px;background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:9px 12px;color:var(--fg);font:inherit;font-size:.86rem}
.erpdash .search:focus{outline:2px solid var(--accent);outline-offset:1px}
.erpdash .segbtns{display:inline-flex;background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:3px;gap:3px}
.erpdash .segbtns button{appearance:none;border:0;background:transparent;color:var(--muted);font:inherit;font-size:.84rem;font-weight:600;padding:7px 15px;border-radius:7px;cursor:pointer}
.erpdash .segbtns button.on{background:var(--accent);color:#fff}
.erpdash .count{font-size:.78rem;color:var(--muted);font-family:var(--mfont)}
.erpdash .lnk{appearance:none;border:0;background:transparent;font-family:var(--mfont);font-variant-numeric:tabular-nums;font-weight:600;font-size:.84rem;color:var(--teal);cursor:pointer;padding:2px 6px;border-radius:6px;display:inline-flex;align-items:center;gap:5px;text-decoration:underline;text-decoration-style:dotted;text-underline-offset:3px}
.erpdash .lnk:hover{background:var(--accent-soft)}
.erpdash .lnk .ico{font-size:.78em;opacity:.7}
.erpdash .disc{margin-top:16px;border:1px solid var(--border);border-radius:14px;background:var(--surface);overflow:hidden}
.erpdash .disc>summary{list-style:none;cursor:pointer;padding:16px 18px;display:flex;align-items:center;gap:12px;font-weight:600;color:var(--navy)}
.erpdash .disc>summary::-webkit-details-marker{display:none}
.erpdash .disc .chev{width:22px;height:22px;flex:none;border-radius:6px;background:var(--surface2);display:grid;place-items:center;transition:transform .2s;color:var(--teal);font-size:.8rem}
.erpdash .disc[open] .chev{transform:rotate(90deg)}
.erpdash .disc .dmeta{margin-left:auto;font-size:.78rem;color:var(--muted);font-family:var(--mfont);font-weight:400}
.erpdash .disc .dbody{padding:0 18px 18px}
.erpdash .dashfoot{color:var(--muted);font-size:.8rem;padding-block:22px;border-top:1px solid var(--border);margin-top:22px}
.erpdash .dashfoot b{color:var(--fg);font-weight:600}
/* overlay */
.erp-drill{position:fixed;inset:0;z-index:4000;background:var(--bg);display:flex;flex-direction:column;font-family:inherit}
.erp-drill .dhead{background:var(--navy);color:#fff}
.erp-drill .dhead .inner{max-width:1180px;margin:0 auto;padding:14px max(16px,env(safe-area-inset-left,0px));display:flex;flex-wrap:wrap;gap:12px 16px;align-items:center}
.erp-drill .back{appearance:none;border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.1);color:#fff;font:inherit;font-weight:600;font-size:.85rem;border-radius:999px;padding:8px 16px;cursor:pointer;flex:none}
.erp-drill .back:hover{background:rgba(255,255,255,.2)}
.erp-drill .dtitle{font-weight:700;font-size:1.1rem;line-height:1.15}
.erp-drill .dtsub{font-size:.76rem;color:#b9c9dc;font-family:var(--mfont);margin-top:2px}
.erp-drill .dsearch{flex:1;min-width:160px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);border-radius:10px;padding:8px 12px;color:#fff;font:inherit;font-size:.85rem}
.erp-drill .dsearch::placeholder{color:#c5d3e4}
.erp-drill .dbody{overflow-y:auto;flex:1}
.erp-drill .dbody .inner{max-width:1180px;margin:0 auto;padding:0 max(16px,env(safe-area-inset-left,0px)) 40px}
.erp-drill .objblock{margin-top:26px}
.erp-drill .objhdr{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;padding-bottom:6px;border-bottom:2px solid var(--border)}
.erp-drill .objhdr .on{font-weight:700;font-size:1.02rem;color:var(--navy)}
.erp-drill .objhdr .om{font-size:.78rem;color:var(--muted);font-family:var(--mfont)}
.erp-drill .sheetblock{margin-top:16px;border:1px solid var(--border);border-radius:12px;overflow:hidden;background:var(--surface)}
.erp-drill .sheetbar{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:10px 14px;background:var(--surface2);border-bottom:1px solid var(--border)}
.erp-drill .sheetbar .sn{font-family:var(--mfont);font-weight:600;font-size:.85rem}
.erp-drill .sheetbar .scount{margin-left:auto;font-size:.72rem;color:var(--muted);font-family:var(--mfont)}
.erp-drill table.coltbl{width:100%;border-collapse:collapse;font-size:.82rem;min-width:620px}
.erp-drill table.coltbl th{text-align:left;font-family:var(--mfont);font-size:.66rem;letter-spacing:.05em;text-transform:uppercase;color:var(--muted);padding:8px 12px;border-bottom:1px solid var(--border);white-space:nowrap}
.erp-drill table.coltbl td{padding:7px 12px;border-bottom:1px solid var(--grid);vertical-align:top}
.erp-drill table.coltbl tr:last-child td{border-bottom:0}
.erp-drill .cflex td{opacity:.6}
.erp-drill .cdesc{color:var(--muted);font-size:.8rem;max-width:40ch}
@media(max-width:900px){.erpdash .kpis{grid-template-columns:repeat(2,1fr)}.erpdash .c4,.erpdash .c6{grid-column:span 12}}
`;

const nf = (n) => (n == null || n === "") ? "" : Number(n).toLocaleString("es-CO");

/* ---------- tabla genérica con orden y filtro ---------- */
function DataTable({ columns, rows, initialSort = -1, initialDir = 1, search = true, searchPlaceholder = "Filtrar…", showCount = false, totalRow = null, minWidth }) {
  const [q, setQ] = useState("");
  const [sortC, setSortC] = useState(initialSort);
  const [dir, setDir] = useState(initialDir);
  const filtered = useMemo(() => {
    let r = rows.map((row, i) => ({ row, i }));
    if (q) {
      const Q = q.toLowerCase();
      r = r.filter((o) => columns.some((c) => String(c.get(o.row) ?? "").toLowerCase().includes(Q)));
    }
    if (sortC >= 0) {
      const c = columns[sortC];
      r = r.slice().sort((a, b) => {
        let x = c.sortVal ? c.sortVal(a.row) : c.get(a.row);
        let y = c.sortVal ? c.sortVal(b.row) : c.get(b.row);
        const xn = typeof x === "number", yn = typeof y === "number";
        if (xn && yn) return (x - y) * dir;
        return String(x ?? "").localeCompare(String(y ?? ""), "es", { numeric: true }) * dir;
      });
    }
    return r;
  }, [q, sortC, dir, rows, columns]);
  const clickH = (i) => { if (sortC === i) setDir(-dir); else { setSortC(i); setDir(1); } };
  return (
    <>
      {(search || showCount) && (
        <div className="toolbar">
          {search && <input className="search" placeholder={searchPlaceholder} value={q} onChange={(e) => setQ(e.target.value)} />}
          {showCount && <span className="count">{filtered.length} / {rows.length}</span>}
        </div>
      )}
      <div className="tablewrap">
        <table className="dt" style={minWidth ? { minWidth } : undefined}>
          <thead><tr>{columns.map((c, i) => (
            <th key={i} className={c.right ? "right" : ""} onClick={() => clickH(i)}>
              {c.h}{sortC === i ? (dir > 0 ? " ▲" : " ▼") : ""}
            </th>
          ))}</tr></thead>
          <tbody>
            {filtered.length === 0 && <tr><td colSpan={columns.length} style={{ padding: "16px", color: "var(--muted)" }}>Sin coincidencias.</td></tr>}
            {filtered.map((o) => (
              <tr key={o.i}>{columns.map((c, i) => (
                <td key={i} className={`${c.right ? "right " : ""}${c.mono ? "n " : ""}`}>{c.cell ? c.cell(o.row) : (c.get(o.row) ?? "")}</td>
              ))}</tr>
            ))}
            {totalRow && !q && <tr className="totalrow">{totalRow.map((v, i) => <td key={i} className={i > 0 ? "right" : ""}>{v}</td>)}</tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}

function BarList({ items }) {
  const max = Math.max(...items.map((i) => i.v), 1);
  return (
    <div className="bars">
      {items.map((i, k) => (
        <div className="bar" key={k}>
          <span className="bl">{i.l}</span>
          <span className="bv">{nf(i.v)}{i.pct ? " · " + i.pct : ""}</span>
          <span className="track"><span className={`fill ${i.cls || ""}`} style={{ width: Math.max(3, i.v / max * 100).toFixed(1) + "%" }} /></span>
        </div>
      ))}
    </div>
  );
}

export default function ErpInventarioDashboard() {
  const PO = DATA.por_objeto; // 0id 1obj 2maestro 3mod 4cat 5estado 6hojas 7cols 8flex 9func 10oblig 11cond 12sinind 13opc 14avance
  const sum = (a, i) => a.reduce((s, r) => s + (Number(r[i]) || 0), 0);
  const T = { hojas: sum(PO, 6), cols: sum(PO, 7), func: sum(PO, 9), oblig: sum(PO, 10), cond: sum(PO, 11) };
  const medidos = PO.filter((r) => r[5] && (/leída/.test(r[5]) || /spec/.test(r[5]))).length;

  const [detTab, setDetTab] = useState("obj");
  const [drill, setDrill] = useState(null); // {maestro, obj?}
  const [dq, setDq] = useState("");

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setDrill(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    if (drill) { document.body.style.overflow = "hidden"; setDq(""); }
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [drill]);

  const openDrill = (maestro, obj) => { if ((COLS[maestro] || []).length) setDrill({ maestro, obj: obj || null }); };

  /* KPIs */
  const kpis = [
    { v: 49, l: "Filas del inventario contractual", foot: "hoja «Módulos en alcance»", cls: "alt" },
    { v: 42, l: "Objetos de carga en alcance", foot: medidos + " medidos de 42" },
    { v: T.hojas, l: "Hojas de carga a diligenciar", foot: "pestañas de plantilla + spec" },
    { v: T.cols, l: "Columnas / campos en total", foot: nf(T.func) + " funcionales" },
    { v: T.oblig + T.cond, l: "Núcleo obligatorio + condicional", foot: nf(T.oblig) + " oblig · " + nf(T.cond) + " cond", cls: "warnbar" },
  ];

  /* resumen */
  const valCls = { "Validado": "ok", "Validado - homologar versión": "teal", "Validado - corregir enlace": "warn", "Cambiar mecanismo": "crit", "Requiere definición": "warn", "Fuera de alcance": "navy" };

  /* detalle por maestro */
  const gm = DATA.por_maestro.slice().sort((a, b) => (Number(b[4]) || 0) - (Number(a[4]) || 0));
  const covPill = (t) => { if (t == null) return ""; const s = String(t); const cls = /Medida/.test(s) ? "p-ok" : /Parcial/.test(s) ? "p-warn" : "p-neu"; return <span className={`pill ${cls}`}>{s}</span>; };
  const lnkCol = (val, m, o) => val == null ? <span style={{ color: "var(--muted)" }}>—</span> : (
    <button className="lnk" onClick={() => openDrill(m, o)} title="Ver columnas por hoja">{nf(val)}<span className="ico">⤢</span></button>
  );
  const mCols = [
    { h: "Maestro / proceso", get: (r) => r[0] },
    { h: "Objetos", right: 1, mono: 1, get: (r) => r[1] },
    { h: "Medidos", right: 1, mono: 1, get: (r) => r[2] },
    { h: "Hojas", right: 1, mono: 1, get: (r) => r[3] },
    { h: "Columnas / campos", right: 1, mono: 1, get: (r) => r[4], cell: (r) => lnkCol(r[4], r[0], null) },
    { h: "Funcionales", right: 1, mono: 1, get: (r) => r[6], cell: (r) => nf(r[6]) },
    { h: "Obligatorias", right: 1, mono: 1, get: (r) => r[7], cell: (r) => r[7] == null ? "" : <span className="pill p-ok">{nf(r[7])}</span> },
    { h: "Condicionales", right: 1, mono: 1, get: (r) => r[8], cell: (r) => r[8] == null ? "" : <span className="pill p-warn">{nf(r[8])}</span> },
    { h: "Cobertura", get: (r) => r[10], cell: (r) => covPill(r[10]) },
  ];
  const mTotal = ["Total · " + DATA.por_maestro.length + " maestros", DATA.gm_total[1], medidos, T.hojas, nf(T.cols), nf(T.func), nf(T.oblig), nf(T.cond), ""];

  /* detalle por objeto / hoja */
  const estPill = (t) => { const s = String(t || ""); const cls = /leída/.test(s) ? "p-ok" : /spec/.test(s) ? "p-info" : /Pendiente/.test(s) ? "p-warn" : "p-neu"; return <span className={`pill ${cls}`}>{s}</span>; };
  const colsObj = [
    { h: "ID", get: (r) => r[0], cell: (r) => <span className="obj-id">{r[0]}</span> },
    { h: "Objeto de carga", get: (r) => r[1] },
    { h: "Maestro", get: (r) => r[2] },
    { h: "Módulo", get: (r) => r[3] },
    { h: "Estado", get: (r) => r[5], cell: (r) => estPill(r[5]) },
    { h: "Hojas", right: 1, mono: 1, get: (r) => r[6] },
    { h: "Columnas", right: 1, mono: 1, get: (r) => r[7], cell: (r) => lnkCol(r[7], r[2], r[0]) },
    { h: "Funcion.", right: 1, mono: 1, get: (r) => r[9], cell: (r) => nf(r[9]) },
    { h: "Oblig.", right: 1, mono: 1, get: (r) => r[10] },
    { h: "Cond.", right: 1, mono: 1, get: (r) => r[11] },
  ];
  const colsHoja = [
    { h: "ID", get: (r) => r[0], cell: (r) => <span className="obj-id">{r[0]}</span> },
    { h: "Objeto", get: (r) => r[1] },
    { h: "Plantilla / fuente", get: (r) => r[3], cell: (r) => <span className="mono">{r[3]}</span> },
    { h: "Hoja", get: (r) => r[4] },
    { h: "Tabla de interfaz", get: (r) => r[6], cell: (r) => <span className="mono">{r[6]}</span> },
    { h: "Columnas", right: 1, mono: 1, get: (r) => r[7], cell: (r) => nf(r[7]) },
    { h: "Flex", right: 1, mono: 1, get: (r) => r[8] },
    { h: "Funcion.", right: 1, mono: 1, get: (r) => r[9] },
    { h: "Oblig.", right: 1, mono: 1, get: (r) => r[10] },
    { h: "Cond.", right: 1, mono: 1, get: (r) => r[11] },
  ];

  /* inventario validado */
  const invEstPill = (t) => { const s = String(t || ""); const cls = s === "Validado" ? "p-ok" : /homologar/.test(s) ? "p-teal" : /corregir/.test(s) ? "p-warn" : /Cambiar/.test(s) ? "p-crit" : /Requiere/.test(s) ? "p-warn" : "p-neu"; return <span className={`pill ${cls}`}>{s}</span>; };
  const invCols = [
    { h: "#", right: 1, mono: 1, get: (r) => r[0] },
    { h: "Pilar", get: (r) => r[1] },
    { h: "Tipo dato", get: (r) => r[6] },
    { h: "Sigla", get: (r) => r[4], cell: (r) => <span className="mono">{r[4]}</span> },
    { h: "Tipo", get: (r) => r[5] },
    { h: "Estado", get: (r) => r[7], cell: (r) => invEstPill(r[7]) },
    { h: "Mecanismo", get: (r) => r[8] },
    { h: "Plantilla / endpoint", get: (r) => r[9], cell: (r) => <span className="mono">{r[9]}</span> },
    { h: "Hallazgo", get: (r) => r[11] },
  ];
  const catPill = (t) => { const s = String(t || ""); const cls = /FBDI/.test(s) ? "p-teal" : /API|WMS|CSV/.test(s) ? "p-info" : "p-neu"; return <span className={`pill ${cls}`}>{s}</span>; };
  const paCols = [
    { h: "ID", get: (r) => r[0], cell: (r) => <span className="obj-id">{r[0]}</span> },
    { h: "Objeto de carga", get: (r) => r[1] },
    { h: "Categoría", get: (r) => r[2], cell: (r) => catPill(r[2]) },
    { h: "Alcance", get: (r) => r[4], cell: (r) => r[4] === "Sí" ? <span className="pill p-ok">Sí</span> : <span className="pill p-neu">No</span> },
    { h: "Módulo", get: (r) => r[5] },
    { h: "Plantilla / endpoint", get: (r) => r[6], cell: (r) => <span className="mono">{r[6]}</span> },
    { h: "Hojas", right: 1, mono: 1, get: (r) => r[7] },
    { h: "Ola", get: (r) => r[9] },
  ];

  /* drill agrupado */
  const drillGroups = useMemo(() => {
    if (!drill) return null;
    let rows = COLS[drill.maestro] || [];
    if (drill.obj) rows = rows.filter((r) => r[1] === drill.obj);
    const Q = dq.toLowerCase();
    if (Q) rows = rows.filter((r) => [r[2], r[4], r[5], r[6], r[9]].some((x) => String(x || "").toLowerCase().includes(Q)));
    const objs = [], om = {};
    for (const r of rows) {
      let o = om[r[1]];
      if (!o) { o = om[r[1]] = { id: r[1], obj: r[0], sheets: [], sm: {} }; objs.push(o); }
      let sh = o.sm[r[2]];
      if (!sh) { sh = o.sm[r[2]] = { hoja: r[2], cols: [] }; o.sheets.push(sh); }
      sh.cols.push(r);
    }
    return { objs, total: rows.length };
  }, [drill, dq]);
  const oblPill = (t) => t === "Obligatorio" ? <span className="pill p-ok">Obligatorio</span> : t === "Condicional" ? <span className="pill p-warn">Condicional</span> : <span style={{ color: "var(--muted)" }}>{t || ""}</span>;
  const drillAll = drill ? (COLS[drill.maestro] || []).filter((r) => !drill.obj || r[1] === drill.obj) : [];
  const drillNSheet = new Set(drillAll.map((r) => r[1] + "|" + r[2])).size;
  const drillNObj = new Set(drillAll.map((r) => r[1])).size;

  return (
    <section className="erpdash">
      <style>{DASH_CSS}</style>

      <section style={{ paddingTop: 8 }}>
        <p className="eyebrow">Resumen ejecutivo</p>
        <h2 className="h2">Lo que hay que migrar, de la fila al campo</h2>
        <p className="lead">El contrato lista objetos de carga; al abrir las plantillas de Oracle cada objeto se despliega en varias hojas y cientos de columnas. Estas cifras dimensionan el trabajo real de mapeo.</p>
        <div className="kpis">
          {kpis.map((k, i) => (
            <div className={`kpi ${k.cls || ""}`} key={i}>
              <div className="v">{nf(k.v)}</div><div className="l">{k.l}</div><div className="foot">{k.foot}</div>
            </div>
          ))}
        </div>
        <div className="note"><b>Cómo leerlo:</b> «2 objetos» en la documentación puede significar 12 hojas y 700+ columnas. Por eso el dimensionamiento se mide por hoja y por campo, no por objeto.</div>
      </section>

      <section>
        <p className="eyebrow">1 · Alcance y validación</p>
        <h2 className="h2">Panorama del inventario</h2>
        <div className="dgrid">
          <div className="dcard c4"><h3>Alcance</h3><div className="rows">
            {DATA.alcance.map((r, i) => <div className="srow" key={i}><span className="sl">{r[0]}</span><span className="sv">{nf(r[1])}</span></div>)}
          </div></div>
          <div className="dcard c4"><h3>Archivos vs. APIs</h3>
            <BarList items={DATA.archivos.map((r) => ({ l: r[0], v: r[1], pct: r[2] != null ? Math.round(r[2] * 100) + "%" : "", cls: /API/.test(r[0]) ? "info" : /CSV|WMS|Rapid/.test(r[0]) ? "teal" : "navy" }))} />
            <div className="rows">{DATA.archivos_extra.filter((r) => /archivos|APIs/.test(r[0])).map((r, i) => <div className="srow indent" key={i}><span className="sl">{String(r[0]).trim()}</span><span className="sv">{nf(r[1])}</span></div>)}</div>
          </div>
          <div className="dcard c4"><h3>Mecanismo declarado</h3><BarList items={DATA.mecanismo.map((r) => ({ l: r[0], v: r[1], cls: "navy" }))} /></div>
          <div className="dcard c6"><h3>Resultado de la validación (por fila)</h3><BarList items={DATA.validacion.map((r) => ({ l: r[0], v: r[1], pct: r[2] != null ? Math.round(r[2] * 100) + "%" : "", cls: valCls[r[0]] || "teal" }))} /></div>
          <div className="dcard c6"><h3>Objetos por ola de carga</h3>
            <div className="tablewrap" style={{ marginTop: 12 }}><table className="dt" style={{ minWidth: 0 }}>
              <thead><tr><th>Ola</th><th className="right">Obj.</th><th className="right">Arch.</th><th className="right">APIs</th></tr></thead>
              <tbody>{DATA.ola.map((r, i) => <tr key={i}><td>{r[0]}</td><td className="right n">{nf(r[1])}</td><td className="right n">{nf(r[2])}</td><td className="right n">{nf(r[3])}</td></tr>)}</tbody>
            </table></div>
          </div>
          <div className="dcard c12"><h3>Filas del inventario por pilar</h3><BarList items={DATA.pilar.map((r) => ({ l: r[0] + "  ·  " + nf(r[2]) + " FBDI / " + nf(r[3]) + " API", v: r[1], cls: "teal" }))} /></div>
        </div>
      </section>

      <section>
        <p className="eyebrow">2 · Detalle por maestro</p>
        <h2 className="h2">Dimensionamiento por maestro / proceso</h2>
        <p className="lead">Cada maestro abre sus objetos en hojas de carga y columnas. Toca el número de columnas para ver todas las columnas agrupadas por hoja. Las funcionales excluyen los flexfields (DFF).</p>
        <DataTable columns={mCols} rows={gm} searchPlaceholder="Filtrar maestro…" totalRow={mTotal} />
      </section>

      <section>
        <p className="eyebrow">3 · Detalle</p>
        <h2 className="h2">Abrir el detalle</h2>
        <p className="lead">El mismo universo visto por objeto de carga o por hoja de plantilla.</p>
        <div className="toolbar">
          <div className="segbtns">
            <button className={detTab === "obj" ? "on" : ""} onClick={() => setDetTab("obj")}>Detalle por objeto</button>
            <button className={detTab === "hoja" ? "on" : ""} onClick={() => setDetTab("hoja")}>Detalle por hoja</button>
          </div>
        </div>
        {detTab === "obj"
          ? <DataTable key="obj" columns={colsObj} rows={PO} initialSort={6} initialDir={-1} searchPlaceholder="Filtrar objeto…" showCount />
          : <DataTable key="hoja" columns={colsHoja} rows={DATA.por_hoja} initialSort={5} initialDir={-1} searchPlaceholder="Filtrar hoja…" showCount />}
      </section>

      <section>
        <p className="eyebrow">4 · Fuentes del inventario</p>
        <h2 className="h2">Inventario validado y plantillas</h2>
        <details className="disc"><summary><span className="chev">▶</span> Inventario validado <span className="dmeta">{DATA.inventario.length} filas</span></summary>
          <div className="dbody"><DataTable columns={invCols} rows={DATA.inventario} searchPlaceholder="Filtrar inventario…" showCount /></div>
        </details>
        <details className="disc"><summary><span className="chev">▶</span> Plantillas y APIs <span className="dmeta">{DATA.plantillas.length} objetos únicos</span></summary>
          <div className="dbody"><DataTable columns={paCols} rows={DATA.plantillas} searchPlaceholder="Filtrar plantillas…" showCount /></div>
        </details>
      </section>

      <div className="dashfoot">
        <b>Fuente:</b> Inventario de migración Oracle Fusion 26C · Plantillas FBDI leídas campo por campo (34 objetos) y campos clave desde API/spec (7 objetos). Impuestos pendiente del workbook del pod.<br />
        <b>Nota:</b> los objetos sin plantilla (OTM, WMS, contratos, anticipos) muestran campos clave de la API, no el esquema completo; su conteo no es comparable con el de una plantilla FBDI.
      </div>

      {drill && drillGroups && (
        <div className="erp-drill">
          <div className="dhead"><div className="inner">
            <button className="back" onClick={() => setDrill(null)}>← Volver al resumen</button>
            <div style={{ minWidth: 0 }}>
              <div className="dtitle">{drill.obj ? (drillAll[0] ? drillAll[0][0] : drill.obj) : drill.maestro}</div>
              <div className="dtsub">{nf(drillAll.length)} columnas · {drillNSheet} hojas · {drillNObj} objeto(s){drill.obj ? " · " + drill.maestro : ""}</div>
            </div>
            <input className="dsearch" placeholder="Filtrar columna, nombre técnico, hoja…" value={dq} onChange={(e) => setDq(e.target.value)} />
          </div></div>
          <div className="dbody"><div className="inner">
            {drillGroups.objs.length === 0 && <p style={{ marginTop: 28, color: "var(--muted)" }}>Sin coincidencias.</p>}
            {drillGroups.objs.map((o) => {
              const tot = o.sheets.reduce((s, x) => s + x.cols.length, 0);
              return (
                <div className="objblock" key={o.id}>
                  <div className="objhdr"><span className="on">{o.obj}</span><span className="om">{o.id} · {o.sheets.length} hoja(s) · {tot} columnas</span></div>
                  {o.sheets.map((sh, si) => (
                    <div className="sheetblock" key={si}>
                      <div className="sheetbar"><span className="sn">{sh.hoja}</span><span className="scount">{sh.cols.length} columnas</span></div>
                      <div style={{ overflowX: "auto" }}>
                        <table className="coltbl"><thead><tr>
                          <th>Col</th><th>Nombre</th><th>Nombre técnico</th><th>Tipo de dato</th><th>Obligatoriedad</th><th>DFF</th><th>Descripción</th>
                        </tr></thead><tbody>
                          {sh.cols.map((c, ci) => (
                            <tr className={c[8] === "Sí" ? "cflex" : ""} key={ci}>
                              <td className="n">{c[3]}</td><td>{c[4]}</td><td className="mono">{c[5]}</td><td className="mono">{c[6]}</td>
                              <td>{oblPill(c[7])}</td><td>{c[8] === "Sí" ? <span className="pill p-neu">DFF</span> : ""}</td><td className="cdesc">{c[9]}</td>
                            </tr>
                          ))}
                        </tbody></table>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div></div>
        </div>
      )}
    </section>
  );
}
