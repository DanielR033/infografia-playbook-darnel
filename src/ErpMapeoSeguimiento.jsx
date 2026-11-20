import React, { useState, useMemo, useEffect } from "react";
import DATA from "./erpDashData.json";
import COLS from "./erpDashCols.json";

/* ---- datos planos (una vez) ---- */
const PO = DATA.por_objeto; // 0id 1obj 2maestro 3mod ...
const META = {};
PO.forEach((r) => { META[r[0]] = { obj: r[1], maestro: r[2], mod: r[3] }; });

const FLAT = [];
for (const maestro of Object.keys(COLS)) {
  for (const r of COLS[maestro]) {
    FLAT.push({ maestro, id: r[1], obj: r[0], hoja: r[2], col: r[3], name: r[4], tech: r[5], dtype: r[6], req: r[7], flex: r[8] === "Sí", desc: r[9], base: r[10] ? 1 : 0 });
  }
}
const key = (f) => `${f.id}|${f.hoja}|${f.col}|${f.tech}`;
const TOTAL = FLAT.length;

// totales estáticos por nivel
const TOT = { obj: {}, mae: {}, mod: {} };
FLAT.forEach((f) => {
  const mod = (META[f.id] && META[f.id].mod) || "—";
  TOT.obj[f.id] = (TOT.obj[f.id] || 0) + 1;
  TOT.mae[f.maestro] = (TOT.mae[f.maestro] || 0) + 1;
  TOT.mod[mod] = (TOT.mod[mod] || 0) + 1;
});
const OBJ_IDS = Object.keys(TOT.obj);
const LS = "erpMapeoMapeadas_v1";

const CSS = `
.erpmap{--c-blue:#0058a8;--c-blue-d:#003b70;--c-cyan:#00a7e1;--c-ink:#1f2b3a;--c-mut:#5b6b7a;
 --c-bd:#d9e3ef;--c-soft:#f3f8fd;--ok:#0f8f6c;--ok-s:#e6f7ef;--warn:#c67c12;--warn-s:#fdf2dc;
 --crit:#b5323b;--crit-s:#fbe3e4;--mono:"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace}
.erpmap .eyebrow{font-family:var(--mono);font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--c-blue);font-weight:600;margin:0}
.erpmap h2{margin:6px 0 0}
.erpmap .lead{color:var(--c-mut);font-size:.9rem;line-height:1.55;max-width:82ch;margin:8px 0 0}
.erpmap .tools{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin:14px 0 18px}
.erpmap .btn{appearance:none;border:1px solid var(--c-bd);background:#fff;color:var(--c-blue-d);font:inherit;font-size:.82rem;font-weight:600;border-radius:9px;padding:8px 14px;cursor:pointer}
.erpmap .btn:hover{border-color:var(--c-blue);background:var(--c-soft)}
.erpmap .btn.primary{background:var(--c-blue);color:#fff;border-color:var(--c-blue)}
.erpmap .btn.ghost{color:var(--c-mut)}
.erpmap .kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:18px}
.erpmap .kpi{background:linear-gradient(180deg,#fcfeff,#f2f8ff);border:1px solid var(--c-bd);border-radius:12px;padding:15px;position:relative;overflow:hidden}
.erpmap .kpi::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:linear-gradient(180deg,var(--c-blue),var(--c-cyan))}
.erpmap .kpi.ok::before{background:var(--ok)}
.erpmap .kpi .v{font-family:var(--mono);font-weight:600;font-size:1.6rem;line-height:1;color:var(--c-blue-d)}
.erpmap .kpi.ok .v{color:var(--ok)}
.erpmap .kpi .l{font-size:.74rem;color:var(--c-mut);margin-top:7px;line-height:1.3}
.erpmap .two{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:8px}
@media(max-width:860px){.erpmap .kpis{grid-template-columns:1fr 1fr}.erpmap .two{grid-template-columns:1fr}}
.erpmap .box{border:1px solid var(--c-bd);border-radius:12px;background:#fff;padding:16px 18px}
.erpmap .box h4{margin:0 0 12px;font-family:var(--mono);font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;color:var(--c-mut);font-weight:600}
.erpmap .pbars{display:flex;flex-direction:column;gap:9px}
.erpmap .pb{display:grid;grid-template-columns:132px 1fr 92px;gap:10px;align-items:center;font-size:.84rem}
.erpmap .pb .pl{font-family:var(--mono);font-size:.8rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.erpmap .pb .pt{height:9px;border-radius:5px;background:var(--c-soft);overflow:hidden;border:1px solid var(--c-bd)}
.erpmap .pb .pf{display:block;height:100%;border-radius:5px;background:linear-gradient(90deg,var(--ok),#2ebd8e)}
.erpmap .pb .pv{font-family:var(--mono);font-size:.78rem;text-align:right;color:var(--c-mut)}
.erpmap .pb .pv b{color:var(--c-blue-d)}
.erpmap .tblwrap{overflow-x:auto;border:1px solid var(--c-bd);border-radius:12px;margin-top:14px}
.erpmap table{border-collapse:collapse;width:100%;font-size:.84rem;min-width:720px}
.erpmap th{position:sticky;top:0;background:var(--c-soft);text-align:left;font-family:var(--mono);font-size:.66rem;letter-spacing:.05em;text-transform:uppercase;color:var(--c-mut);font-weight:600;padding:10px 12px;border-bottom:2px solid var(--c-bd);white-space:nowrap;cursor:pointer}
.erpmap th.r,.erpmap td.r{text-align:right}
.erpmap td{padding:9px 12px;border-bottom:1px solid #eef3f8;vertical-align:middle}
.erpmap tbody tr.click{cursor:pointer}
.erpmap tbody tr.click:hover{background:var(--c-soft)}
.erpmap .n{font-family:var(--mono);font-variant-numeric:tabular-nums}
.erpmap .minibar{display:flex;align-items:center;gap:8px;justify-content:flex-end}
.erpmap .minibar .mt{width:80px;height:7px;border-radius:5px;background:var(--c-soft);overflow:hidden;border:1px solid var(--c-bd)}
.erpmap .minibar .mf{display:block;height:100%;background:linear-gradient(90deg,var(--ok),#2ebd8e)}
.erpmap .minibar .mp{font-family:var(--mono);font-size:.8rem;font-weight:600;width:46px;text-align:right}
.erpmap .lnk{appearance:none;border:0;background:transparent;font-family:var(--mono);font-weight:600;font-size:.82rem;color:var(--c-blue);cursor:pointer;text-decoration:underline;text-decoration-style:dotted;text-underline-offset:3px}
.erpmap .draft{font-size:.78rem;color:var(--warn);background:var(--warn-s);border-radius:8px;padding:4px 10px;font-weight:600}
.erpmap .hint{font-size:.8rem;color:var(--c-mut);background:var(--c-soft);border-left:3px solid var(--c-blue);border-radius:0 8px 8px 0;padding:10px 14px;margin-top:14px}
/* overlay */
.erpmap-drill{position:fixed;inset:0;z-index:5200;background:#eef1f5;display:flex;flex-direction:column;font-family:inherit;color:var(--c-ink)}
.erpmap-drill .dh{background:linear-gradient(120deg,#003b70,#0058a8 70%,#00a7e1);color:#fff}
.erpmap-drill .dh .in{max-width:1180px;margin:0 auto;padding:14px max(16px,env(safe-area-inset-left,0));display:flex;flex-wrap:wrap;gap:12px 14px;align-items:center}
.erpmap-drill .back{appearance:none;border:1px solid rgba(255,255,255,.3);background:rgba(255,255,255,.12);color:#fff;font:inherit;font-weight:600;font-size:.85rem;border-radius:999px;padding:8px 16px;cursor:pointer;flex:none}
.erpmap-drill .back:hover{background:rgba(255,255,255,.22)}
.erpmap-drill .dt{font-weight:700;font-size:1.08rem;line-height:1.15}
.erpmap-drill .ds{font-size:.76rem;color:#cfe0f2;margin-top:2px}
.erpmap-drill .dsearch{flex:1;min-width:150px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);border-radius:10px;padding:8px 12px;color:#fff;font:inherit;font-size:.85rem}
.erpmap-drill .dsearch::placeholder{color:#c5d3e4}
.erpmap-drill .seg{display:inline-flex;background:rgba(255,255,255,.14);border-radius:9px;padding:3px;gap:3px}
.erpmap-drill .seg button{border:0;background:transparent;color:#eaf2fb;font:inherit;font-size:.8rem;font-weight:600;padding:6px 12px;border-radius:7px;cursor:pointer}
.erpmap-drill .seg button.on{background:#fff;color:var(--c-blue-d)}
.erpmap-drill .db{overflow-y:auto;flex:1}
.erpmap-drill .db .in{max-width:1180px;margin:0 auto;padding:18px max(16px,env(safe-area-inset-left,0)) 48px}
.erpmap-drill .objb{margin-top:18px;border:1px solid var(--c-bd);border-radius:12px;background:#fff;overflow:hidden}
.erpmap-drill .objh{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:12px 15px;background:var(--c-soft);border-bottom:1px solid var(--c-bd);cursor:pointer}
.erpmap-drill .objh .on{font-weight:700;color:var(--c-blue-d)}
.erpmap-drill .objh .om{font-size:.76rem;color:var(--c-mut);font-family:var(--mono)}
.erpmap-drill .objh .omp{margin-left:auto;display:flex;align-items:center;gap:8px}
.erpmap-drill .chev{width:20px;height:20px;border-radius:6px;background:#fff;border:1px solid var(--c-bd);display:grid;place-items:center;color:var(--c-blue);font-size:.72rem;transition:transform .15s}
.erpmap-drill .objb.open .chev{transform:rotate(90deg)}
.erpmap-drill .sheetbar{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:9px 15px;border-top:1px solid #eef3f8;background:#fbfdff}
.erpmap-drill .sheetbar .sn{font-family:var(--mono);font-weight:600;font-size:.82rem}
.erpmap-drill .sheetbar .sc{font-size:.72rem;color:var(--c-mut);font-family:var(--mono)}
.erpmap-drill .markbtn{margin-left:auto;appearance:none;border:1px solid var(--c-bd);background:#fff;color:var(--c-blue-d);font:inherit;font-size:.72rem;font-weight:600;border-radius:7px;padding:4px 10px;cursor:pointer}
.erpmap-drill .markbtn:hover{border-color:var(--c-blue)}
.erpmap-drill table.ct{width:100%;border-collapse:collapse;font-size:.81rem;min-width:620px}
.erpmap-drill table.ct th{position:static;background:#fff;text-align:left;font-family:var(--mono);font-size:.63rem;text-transform:uppercase;color:var(--c-mut);padding:7px 12px;border-bottom:1px solid var(--c-bd);cursor:default}
.erpmap-drill table.ct td{padding:6px 12px;border-bottom:1px solid #eef3f8;vertical-align:top}
.erpmap-drill .ck{appearance:none;width:18px;height:18px;border:2px solid var(--c-bd);border-radius:5px;cursor:pointer;position:relative;flex:none;background:#fff}
.erpmap-drill .ck.on{background:var(--ok);border-color:var(--ok)}
.erpmap-drill .ck.on::after{content:"✓";position:absolute;inset:0;color:#fff;font-size:.72rem;display:grid;place-items:center}
.erpmap-drill tr.col-row{cursor:pointer}
.erpmap-drill tr.col-row:hover{background:var(--c-soft)}
.erpmap-drill .badge{font-family:var(--mono);font-size:.68rem;font-weight:600;padding:1px 7px;border-radius:999px}
.erpmap-drill .badge.ok{background:var(--ok-s);color:var(--ok)}
.erpmap-drill .badge.pend{background:var(--warn-s);color:var(--warn)}
.erpmap-drill .mono{font-family:var(--mono);font-size:.78rem}
.erpmap-drill .cdesc{color:var(--c-mut);max-width:38ch}
`;

const nf = (n) => Number(n).toLocaleString("es-CO");
const pctStr = (m, t) => t ? (m / t * 100).toFixed(1) + "%" : "0%";

function loadSet() {
  try {
    const raw = localStorage.getItem(LS);
    if (raw) return new Set(JSON.parse(raw));
  } catch (e) { /* noop */ }
  // línea base desde el JSON (columnas con base=1)
  return new Set(FLAT.filter((f) => f.base).map(key));
}

export default function ErpMapeoSeguimiento() {
  const [ov, setOv] = useState(loadSet);
  const [drill, setDrill] = useState(null); // {id} | {all:true}
  const [openObj, setOpenObj] = useState({});
  const [q, setQ] = useState("");
  const [filtro, setFiltro] = useState("todas"); // todas | mapeadas | pendientes
  const [sortObj, setSortObj] = useState("pct");

  useEffect(() => {
    try { localStorage.setItem(LS, JSON.stringify(Array.from(ov))); } catch (e) { /* noop */ }
  }, [ov]);
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setDrill(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    document.body.style.overflow = drill ? "hidden" : "";
    if (drill) { setQ(""); setFiltro("todas"); setOpenObj(drill.id ? { [drill.id]: true } : {}); }
    return () => { document.body.style.overflow = ""; };
  }, [drill]);

  const isMap = (f) => ov.has(key(f));

  // agregados
  const agg = useMemo(() => {
    const obj = {}, mae = {}, mod = {}; let total = 0;
    for (const f of FLAT) {
      if (!ov.has(key(f))) continue;
      total++;
      const m = (META[f.id] && META[f.id].mod) || "—";
      obj[f.id] = (obj[f.id] || 0) + 1;
      mae[f.maestro] = (mae[f.maestro] || 0) + 1;
      mod[m] = (mod[m] || 0) + 1;
    }
    return { obj, mae, mod, total };
  }, [ov]);

  const toggle = (f) => setOv((prev) => { const s = new Set(prev); const k = key(f); s.has(k) ? s.delete(k) : s.add(k); return s; });
  const setMany = (fs, val) => setOv((prev) => { const s = new Set(prev); fs.forEach((f) => { const k = key(f); val ? s.add(k) : s.delete(k); }); return s; });
  const resetBase = () => { try { localStorage.removeItem(LS); } catch (e) {} setOv(new Set(FLAT.filter((f) => f.base).map(key))); };
  const exportar = () => {
    const payload = { generado: new Date().toISOString(), total: TOTAL, mapeadas: Array.from(ov) };
    const blob = new Blob([JSON.stringify(payload, null, 1)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "erp_mapeo_avance.json"; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  };

  const hayDraft = ov.size !== FLAT.filter((f) => f.base).length;

  // por módulo (ordenado)
  const mods = Object.keys(TOT.mod).sort((a, b) => TOT.mod[b] - TOT.mod[a]);
  // por maestro
  const maes = Object.keys(TOT.mae).sort((a, b) => TOT.mae[b] - TOT.mae[a]);
  // por objeto
  const objRows = OBJ_IDS.map((id) => {
    const t = TOT.obj[id], m = agg.obj[id] || 0;
    const meta = META[id] || {};
    return { id, obj: meta.obj || id, maestro: meta.maestro || "", mod: meta.mod || "—", total: t, map: m, pct: t ? m / t * 100 : 0 };
  }).sort((a, b) => sortObj === "pct" ? b.pct - a.pct : sortObj === "total" ? b.total - a.total : a.obj.localeCompare(b.obj, "es"));

  return (
    <section className="card erpmap">
      <style>{CSS}</style>
      <p className="eyebrow">Seguimiento de comité</p>
      <h2>Avance de mapeo de columnas</h2>
      <p className="lead">
        Estado del mapeo de las {nf(TOTAL)} columnas de las plantillas de Oracle Fusion, con un
        indicador <b>mapeado / pendiente</b> por columna. Las estadísticas de % se consolidan por
        módulo, por maestro y por objeto para el seguimiento en comité. Abre el detalle para ver y
        marcar qué columnas están mapeadas.
      </p>

      <div className="tools">
        <button className="btn primary" onClick={() => setDrill({ all: true })}>Ver y marcar todas las columnas</button>
        <button className="btn" onClick={exportar}>Exportar avance (.json)</button>
        {hayDraft && <button className="btn ghost" onClick={resetBase}>Restablecer</button>}
        {hayDraft && <span className="draft">Borrador local · {nf(ov.size)} marcadas en este navegador</span>}
      </div>

      <div className="kpis">
        <div className="kpi ok"><div className="v">{pctStr(agg.total, TOTAL)}</div><div className="l">Avance global de mapeo</div></div>
        <div className="kpi"><div className="v">{nf(agg.total)} / {nf(TOTAL)}</div><div className="l">Columnas mapeadas</div></div>
        <div className="kpi"><div className="v">{OBJ_IDS.length}</div><div className="l">Objetos con columnas</div></div>
        <div className="kpi"><div className="v">{maes.length}</div><div className="l">Maestros · {mods.length} módulos</div></div>
      </div>

      <div className="two">
        <div className="box">
          <h4>% mapeo por módulo</h4>
          <div className="pbars">
            {mods.map((m) => {
              const t = TOT.mod[m], mp = agg.mod[m] || 0;
              return (
                <div className="pb" key={m}>
                  <span className="pl">{m}</span>
                  <span className="pt"><span className="pf" style={{ width: (t ? mp / t * 100 : 0) + "%" }} /></span>
                  <span className="pv"><b>{pctStr(mp, t)}</b> · {nf(mp)}/{nf(t)}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="box">
          <h4>% mapeo por maestro</h4>
          <div className="pbars">
            {maes.map((m) => {
              const t = TOT.mae[m], mp = agg.mae[m] || 0;
              return (
                <div className="pb" key={m}>
                  <span className="pl" title={m}>{m}</span>
                  <span className="pt"><span className="pf" style={{ width: (t ? mp / t * 100 : 0) + "%" }} /></span>
                  <span className="pv"><b>{pctStr(mp, t)}</b> · {nf(mp)}/{nf(t)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="tblwrap">
        <table>
          <thead><tr>
            <th onClick={() => setSortObj("obj")}>Objeto</th>
            <th>Maestro</th><th>Módulo</th>
            <th className="r" onClick={() => setSortObj("total")}>Columnas</th>
            <th className="r">Mapeadas</th>
            <th className="r" onClick={() => setSortObj("pct")}>% avance</th>
            <th></th>
          </tr></thead>
          <tbody>
            {objRows.map((r) => (
              <tr className="click" key={r.id} onClick={() => setDrill({ id: r.id })}>
                <td>{r.obj}</td>
                <td style={{ color: "var(--c-mut)" }}>{r.maestro}</td>
                <td className="mono" style={{ fontFamily: "var(--mono)", fontSize: ".8rem" }}>{r.mod}</td>
                <td className="r n">{nf(r.total)}</td>
                <td className="r n">{nf(r.map)}</td>
                <td className="r">
                  <span className="minibar"><span className="mt"><span className="mf" style={{ width: r.pct + "%" }} /></span><span className="mp">{r.pct.toFixed(0)}%</span></span>
                </td>
                <td><button className="lnk" onClick={(e) => { e.stopPropagation(); setDrill({ id: r.id }); }}>detalle →</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="hint">
        El avance se guarda en este navegador. Marca columnas en el detalle y usa <b>Exportar avance</b>
        {" "}para consolidar el estado y compartirlo (yo lo puedo fijar como línea base del tablero para
        que todos vean el mismo %).
      </p>

      {drill && <Drill drill={drill} ov={ov} isMap={isMap} toggle={toggle} setMany={setMany}
        q={q} setQ={setQ} filtro={filtro} setFiltro={setFiltro} openObj={openObj} setOpenObj={setOpenObj} agg={agg} onClose={() => setDrill(null)} />}
    </section>
  );
}

function Drill({ drill, ov, isMap, toggle, setMany, q, setQ, filtro, setFiltro, openObj, setOpenObj, agg, onClose }) {
  const ids = drill.id ? [drill.id] : OBJ_IDS;
  const Q = q.trim().toLowerCase();
  // columnas por objeto -> hoja
  const grupos = ids.map((id) => {
    const meta = META[id] || {};
    let cols = FLAT.filter((f) => f.id === id);
    if (Q) cols = cols.filter((f) => `${f.name} ${f.tech} ${f.hoja} ${f.col}`.toLowerCase().includes(Q));
    if (filtro === "mapeadas") cols = cols.filter(isMap);
    else if (filtro === "pendientes") cols = cols.filter((f) => !isMap(f));
    const sheets = {}; const order = [];
    for (const f of cols) { if (!sheets[f.hoja]) { sheets[f.hoja] = []; order.push(f.hoja); } sheets[f.hoja].push(f); }
    return { id, meta, order, sheets, nvis: cols.length, total: TOT.obj[id] || 0, map: agg.obj[id] || 0 };
  });
  const titulo = drill.id ? (META[drill.id] && META[drill.id].obj) || drill.id : "Todas las columnas";
  const totCols = drill.id ? (TOT.obj[drill.id] || 0) : FLAT.length;
  const totMap = drill.id ? (agg.obj[drill.id] || 0) : agg.total;

  return (
    <div className="erpmap-drill">
      <div className="dh"><div className="in">
        <button className="back" onClick={onClose}>← Volver</button>
        <div style={{ minWidth: 0 }}>
          <div className="dt">{titulo}</div>
          <div className="ds">{nf(totMap)} / {nf(totCols)} columnas mapeadas ({pctStr(totMap, totCols)}){drill.id ? " · " + (META[drill.id] && META[drill.id].maestro) : ""}</div>
        </div>
        <div className="seg">
          {["todas", "mapeadas", "pendientes"].map((f) => (
            <button key={f} className={filtro === f ? "on" : ""} onClick={() => setFiltro(f)}>{f[0].toUpperCase() + f.slice(1)}</button>
          ))}
        </div>
        <input className="dsearch" placeholder="Filtrar columna, nombre técnico, hoja…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div></div>
      <div className="db"><div className="in">
        {grupos.every((g) => g.nvis === 0) && <p style={{ marginTop: 26, color: "var(--c-mut)" }}>Sin coincidencias.</p>}
        {grupos.map((g) => {
          if (g.nvis === 0) return null;
          const abierto = drill.id ? true : !!openObj[g.id];
          return (
            <div className={`objb ${abierto ? "open" : ""}`} key={g.id}>
              <div className="objh" onClick={() => !drill.id && setOpenObj((p) => ({ ...p, [g.id]: !p[g.id] }))}>
                {!drill.id && <span className="chev">▶</span>}
                <span className="on">{g.meta.obj || g.id}</span>
                <span className="om">{g.id} · {g.meta.maestro} · {g.meta.mod}</span>
                <span className="omp">
                  <span className="badge ok">{nf(g.map)} mapeadas</span>
                  <span className="badge pend">{nf(g.total - g.map)} pend.</span>
                  <span className="mono" style={{ color: "var(--c-blue-d)", fontWeight: 600 }}>{pctStr(g.map, g.total)}</span>
                </span>
              </div>
              {abierto && g.order.map((hoja) => {
                const fs = g.sheets[hoja];
                const allMap = fs.every(isMap);
                return (
                  <div key={hoja}>
                    <div className="sheetbar">
                      <span className="sn">{hoja}</span>
                      <span className="sc">{fs.length} columnas</span>
                      <button className="markbtn" onClick={() => setMany(fs, !allMap)}>{allMap ? "Desmarcar hoja" : "Marcar hoja"}</button>
                    </div>
                    <div style={{ overflowX: "auto" }}>
                      <table className="ct"><thead><tr>
                        <th style={{ width: 30 }}></th><th>Col</th><th>Nombre</th><th>Nombre técnico</th><th>Oblig.</th><th>Estado</th>
                      </tr></thead><tbody>
                        {fs.map((f, i) => {
                          const on = isMap(f);
                          return (
                            <tr className="col-row" key={i} onClick={() => toggle(f)}>
                              <td><span className={`ck ${on ? "on" : ""}`} /></td>
                              <td className="n">{f.col}</td>
                              <td>{f.name}{f.flex && <span className="badge pend" style={{ marginLeft: 6 }}>DFF</span>}</td>
                              <td className="mono">{f.tech}</td>
                              <td style={{ color: "var(--c-mut)", fontSize: ".78rem" }}>{f.req}</td>
                              <td><span className={`badge ${on ? "ok" : "pend"}`}>{on ? "Mapeado" : "Pendiente"}</span></td>
                            </tr>
                          );
                        })}
                      </tbody></table>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div></div>
    </div>
  );
}
