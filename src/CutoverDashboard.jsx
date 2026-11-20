import React, { useMemo, useState } from "react";
import PLAN from "./cutoverPlan.json";

/* ---- Contenido técnico y funcional (editorial) ---- */
export const PLANTILLAS = [
  { n: "Items", gen: 5 },
  { n: "Items facility code", gen: 3 },
  { n: "Items kits", gen: 3 },
  { n: "Ubicaciones", gen: 5 },
  { n: "Barcodes", gen: 4 },
  { n: "Inventarios", gen: 6, bs: true },
  { n: "Ubicaciones de inventarios", gen: 3, bs: true },
];
const GEN_TOTAL = PLANTILLAS.reduce((s, p) => s + p.gen, 0);
// Tiempo de extracción de tablas origen medido en la BS (Azurian), en minutos.
export const EXTRACCION_MIN = 75;

const FUNCIONAL = [
  { tema: "Fecha de Freeze", detalle: "Pendiente de definición y de responsable.", resp: "Por definir", fecha: "", estado: "Pendiente" },
  { tema: "Fecha máxima para creación de artículos", detalle: "Pendiente de definición.", resp: "Alexandra Duarte", fecha: "Estimada: 26 nov 2026", estado: "Pendiente" },
  { tema: "Fecha máxima para creación o modificación de códigos de barra", detalle: "Pendiente de definición.", resp: "Alexandra Duarte", fecha: "Estimada: 26 nov 2026", estado: "Pendiente" },
  { tema: "Fecha máxima para creación o modificación de ubicaciones", detalle: "Pendiente de definición.", resp: "Alexandra Duarte", fecha: "Estimada: 26 nov 2026", estado: "Pendiente" },
  { tema: "Fecha máxima y hora de captura del snapshot de inventario", detalle: "Pendiente de definición.", resp: "Alexandra Duarte", fecha: "Estimada: 26 nov 2026", estado: "Pendiente" },
  { tema: "Estrategia de freeze de inventario", detalle: "Opera distinto a los demás maestros: el inventario fluctúa mucho en el tiempo, por lo que su transacción-migración no debe durar demasiado.", resp: "", fecha: "", estado: "Definición" },
];

const CSS = `
.cutover{--c-blue:#0058a8;--c-blue-d:#003b70;--c-cyan:#00a7e1;--c-ink:#1f2b3a;--c-mut:#5b6b7a;
 --c-bd:#d9e3ef;--c-soft:#f3f8fd;--ok:#0f8f6c;--ok-s:#e6f7ef;--warn:#c67c12;--warn-s:#fdf2dc;
 --crit:#b5323b;--crit-s:#fbe3e4;--viol:#6b46c1;--viol-s:#efeafb;--mono:"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace}
.cutover .co-kpis{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin:4px 0 22px}
.cutover .co-kpi{background:linear-gradient(180deg,#fcfeff,#f2f8ff);border:1px solid var(--c-bd);border-radius:12px;padding:14px;position:relative;overflow:hidden}
.cutover .co-kpi::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:linear-gradient(180deg,var(--c-blue),var(--c-cyan))}
.cutover .co-kpi.tech::before{background:var(--c-blue)}.cutover .co-kpi.time::before{background:var(--warn)}.cutover .co-kpi.pipe::before{background:var(--ok)}
.cutover .co-kpi .v{font-family:var(--mono);font-weight:600;font-size:1.4rem;line-height:1.05;color:var(--c-blue-d)}
.cutover .co-kpi .l{font-size:.72rem;color:var(--c-mut);margin-top:7px;line-height:1.25}
.cutover .co-kpi.time .v{color:var(--warn)}.cutover .co-kpi.pipe .v{color:var(--ok)}
.cutover .sec-t{font-size:1.15rem;font-weight:700;color:var(--c-blue-d);margin:26px 0 2px;display:flex;align-items:center;gap:10px}
.cutover .sec-t .tag{font-family:var(--mono);font-size:.64rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:3px 9px;border-radius:999px}
.cutover .tag.tec{background:#e3eefb;color:var(--c-blue-d)}
.cutover .tag.neg{background:var(--viol-s);color:var(--viol)}
.cutover .sec-d{font-size:.88rem;color:var(--c-mut);margin:0 0 14px;max-width:76ch;line-height:1.5}
.cutover .subt{font-size:.78rem;letter-spacing:.05em;text-transform:uppercase;color:var(--c-mut);font-family:var(--mono);font-weight:600;margin:18px 0 8px}
.cutover .tblwrap{overflow-x:auto;border:1px solid var(--c-bd);border-radius:12px}
.cutover table.pt{border-collapse:collapse;width:100%;font-size:.86rem;min-width:520px}
.cutover table.pt th{background:var(--c-soft);text-align:left;font-family:var(--mono);font-size:.66rem;letter-spacing:.05em;text-transform:uppercase;color:var(--c-mut);font-weight:600;padding:10px 14px;border-bottom:2px solid var(--c-bd)}
.cutover table.pt th.r,.cutover table.pt td.r{text-align:right}
.cutover table.pt td{padding:10px 14px;border-bottom:1px solid #eef3f8;vertical-align:middle}
.cutover table.pt tbody tr:last-child td{border-bottom:0}
.cutover .pname{font-weight:600;color:var(--c-ink)}
.cutover .mins{font-family:var(--mono);font-weight:600;color:var(--c-blue-d)}
.cutover .porconf{font-family:var(--mono);font-size:.78rem;color:var(--warn);background:var(--warn-s);padding:2px 9px;border-radius:999px;white-space:nowrap}
.cutover .bsnote{font-size:.78rem;color:var(--ok);background:var(--ok-s);padding:3px 9px;border-radius:8px;display:inline-block;line-height:1.35}
.cutover tr.totrow td{border-top:2px solid var(--c-bd);font-weight:700;background:var(--c-soft)}
.cutover .band{border:1px solid var(--c-bd);border-left:4px solid var(--warn);border-radius:12px;background:linear-gradient(180deg,#fffdf8,#fef8ec);padding:16px 18px;margin-top:6px}
.cutover .band p{margin:0 0 10px;font-size:.9rem;line-height:1.55;color:var(--c-ink)}
.cutover .band p:last-child{margin-bottom:0}
.cutover .band .hl{font-family:var(--mono);font-weight:600;color:var(--warn)}
.cutover .band code{font-family:var(--mono);font-size:.84em;background:#fff;border:1px solid #efe0c2;border-radius:5px;padding:1px 6px}
.cutover .band .concl{background:var(--ok-s);border-radius:8px;padding:10px 12px;color:var(--c-ink);font-size:.88rem;border-left:3px solid var(--ok)}
.cutover .fun{display:flex;flex-direction:column;gap:10px}
.cutover .fun-item{display:grid;grid-template-columns:22px 1fr auto;gap:12px;align-items:start;border:1px solid var(--c-bd);border-radius:12px;background:#fff;padding:13px 16px}
.cutover .fun-item .chk{width:18px;height:18px;border-radius:5px;border:2px solid var(--warn);margin-top:2px}
.cutover .fun-item.def .chk{border-color:var(--viol);border-radius:50%}
.cutover .fun-item>span:nth-child(2){display:flex;flex-direction:column}
.cutover .fun-item .ft{display:block;font-weight:600;color:var(--c-ink);font-size:.92rem}
.cutover .fun-item .fd{display:block;font-size:.82rem;color:var(--c-mut);margin-top:3px;line-height:1.4}
.cutover .fun-item .fr{display:block;font-size:.76rem;color:var(--c-blue-d);font-family:var(--mono);margin-top:5px}
.cutover .fun-item .fchip{font-family:var(--mono);font-size:.68rem;font-weight:700;letter-spacing:.05em;text-transform:uppercase;padding:3px 9px;border-radius:999px;white-space:nowrap;align-self:start}
.cutover .fchip.pend{background:var(--warn-s);color:var(--warn)}
.cutover .fchip.defi{background:var(--viol-s);color:var(--viol)}
.cutover .fecha-badge{font-family:var(--mono);font-size:.72rem;color:var(--warn);margin-top:5px;display:inline-block}
.cutover .toolbar{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin:4px 0 10px}
.cutover .search{flex:1;min-width:200px;background:#fff;border:1px solid var(--c-bd);border-radius:10px;padding:9px 12px;font:inherit;font-size:.86rem}
.cutover .search:focus{outline:2px solid var(--c-blue);outline-offset:1px}
.cutover .segbtns{display:inline-flex;background:var(--c-soft);border:1px solid var(--c-bd);border-radius:10px;padding:3px;gap:3px;flex-wrap:wrap}
.cutover .segbtns button{border:0;background:transparent;color:var(--c-mut);font:inherit;font-size:.8rem;font-weight:600;padding:7px 13px;border-radius:7px;cursor:pointer}
.cutover .segbtns button.on{background:var(--c-blue);color:#fff}
.cutover .count{font-size:.78rem;color:var(--c-mut);font-family:var(--mono)}
.cutover table.plan{border-collapse:collapse;width:100%;font-size:.83rem;min-width:680px}
.cutover table.plan th{position:sticky;top:0;background:var(--c-soft);text-align:left;font-family:var(--mono);font-size:.66rem;letter-spacing:.05em;text-transform:uppercase;color:var(--c-mut);font-weight:600;padding:9px 14px;border-bottom:2px solid var(--c-bd)}
.cutover table.plan td{padding:8px 14px;border-bottom:1px solid #eef3f8;vertical-align:top}
.cutover table.plan tr.hdr td{background:#eef4fb;font-weight:700;color:var(--c-blue-d);font-size:.85rem}
.cutover .est{font-family:var(--mono);font-size:.72rem;font-weight:600;padding:2px 9px;border-radius:999px;white-space:nowrap}
.cutover .est.fin{background:var(--ok-s);color:var(--ok)}
.cutover .est.proc{background:#e3eefb;color:var(--c-blue-d)}
.cutover .est.none{color:var(--c-mut)}
.cutover .pred{font-family:var(--mono);font-size:.78rem;color:var(--c-mut)}
@media(max-width:860px){.cutover .co-kpis{grid-template-columns:repeat(2,1fr)}.cutover .fun-item{grid-template-columns:22px 1fr}.cutover .fun-item .fchip{grid-column:2;justify-self:start}}
`;

const estClass = (e) => e === "Finalizado" ? "fin" : e === "En proceso" ? "proc" : "none";

export default function CutoverDashboard() {
  const estados = useMemo(() => {
    const c = {};
    for (const t of PLAN) { const e = t.estado || ""; c[e] = (c[e] || 0) + 1; }
    return c;
  }, []);
  const [q, setQ] = useState("");
  const [filtro, setFiltro] = useState("Todos");

  const planView = useMemo(() => {
    const Q = q.trim().toLowerCase();
    return PLAN.filter((t) => {
      if (filtro === "En proceso" && t.estado !== "En proceso") return false;
      if (filtro === "Finalizado" && t.estado !== "Finalizado") return false;
      if (filtro === "Sin estado" && t.estado) return false;
      if (Q && !(`${t.tarea} ${t.pred} ${t.estado}`.toLowerCase().includes(Q))) return false;
      return true;
    });
  }, [q, filtro]);

  const kpis = [
    { v: "7", l: "Plantillas de migración WMS", cls: "tech" },
    { v: "~" + GEN_TOTAL + " min", l: "Generación de las 7 plantillas (Azurian)", cls: "tech" },
    { v: "~1 h 15 min", l: "Extracción de tablas origen (Azurian)", cls: "time" },
    { v: "~1 h 30 min", l: "Pipeline de migración WMS (con freeze)", cls: "pipe" },
    { v: nf(PLAN.length), l: "Tareas del plan de cutover" },
    { v: nf(estados["Finalizado"] || 0) + " / " + nf(estados["En proceso"] || 0), l: "Finalizadas / en proceso" },
  ];

  return (
    <section className="card cutover">
      <style>{CSS}</style>
      <h2>Plan de Cutover · WMS</h2>
      <p className="entity-summary">
        Checklist de los temas puntuales del cutover de WMS —técnicos y de negocio— y el detalle del
        plan construido. Los tiempos técnicos corresponden a la generación y extracción que ejecuta
        Azurian; los tiempos de ingesta por plantilla quedan por confirmar con Oracle.
      </p>

      <div className="co-kpis">
        {kpis.map((k, i) => (
          <div className={`co-kpi ${k.cls || ""}`} key={i}><div className="v">{k.v}</div><div className="l">{k.l}</div></div>
        ))}
      </div>

      {/* ---------- TÉCNICO ---------- */}
      <div className="sec-t"><span className="tag tec">Técnico</span> Checklist técnico del cutover</div>
      <p className="sec-d">
        Las 7 plantillas de migración, con el tiempo de generación que toma Azurian y el tiempo de
        ingesta en Oracle (pendiente de confirmar por plantilla).
      </p>
      <div className="tblwrap">
        <table className="pt">
          <thead><tr>
            <th>Plantilla</th><th className="r">Generación (Azurian)</th><th>Ingesta en Oracle</th>
          </tr></thead>
          <tbody>
            {PLANTILLAS.map((p, i) => (
              <tr key={i}>
                <td className="pname">{p.n}</td>
                <td className="r"><span className="mins">{p.gen} min</span></td>
                <td>{p.bs
                  ? <span className="bsnote">BS piso: 28.000 reg. en ~5 h (inventarios + ubicaciones, combinado)</span>
                  : <span className="porconf">Oracle debe confirmar</span>}</td>
              </tr>
            ))}
            <tr className="totrow">
              <td>Total generación</td><td className="r">~{GEN_TOTAL} min</td>
              <td><span className="porconf">Por confirmar (Oracle)</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="subt">Extracción de tablas origen · tiempos Azurian</div>
      <div className="band">
        <p>
          La extracción de todas las tablas que consumen las plantillas tarda aproximadamente
          <span className="hl"> 1 hora y 15 minutos</span>. La que más tarda es la tabla
          <code>PS_TRANSACTION_INV</code>, la tabla transaccional que es el punto de partida de la
          validación: define qué artículos se migran según la regla de negocio
          (<span className="hl">artículos con al menos una transacción desde 2024-01-01</span>). El
          resto de tablas tarda en promedio entre 3 y 10 minutos.
        </p>
        <p className="concl">
          <b>En conclusión:</b> el pipeline de migración WMS tarda en promedio
          <b> ~1 hora y 30 minutos</b>, siempre que las bases origen estén en <b>freeze</b> (para que
          las transacciones entrantes no bloqueen la consulta).
        </p>
      </div>

      {/* ---------- FUNCIONAL / NEGOCIO ---------- */}
      <div className="sec-t"><span className="tag neg">Negocio</span> Checklist funcional del cutover</div>
      <p className="sec-d">Definiciones de freeze y fechas límite de los maestros, previas a la captura del inventario.</p>
      <div className="fun">
        {FUNCIONAL.map((f, i) => (
          <div className={`fun-item ${f.estado === "Definición" ? "def" : ""}`} key={i}>
            <span className="chk" />
            <span>
              <span className="ft">{f.tema}</span>
              <span className="fd">{f.detalle}</span>
              {f.resp && <span className="fr">Responsable: {f.resp}</span>}
              {f.fecha && <span className="fecha-badge">{f.fecha}</span>}
            </span>
            <span className={`fchip ${f.estado === "Definición" ? "defi" : "pend"}`}>{f.estado}</span>
          </div>
        ))}
      </div>

      {/* ---------- DETALLE DEL PLAN ---------- */}
      <div className="sec-t">Detalle del plan de cutover</div>
      <p className="sec-d">Tareas del plan con su predecesora y estado ({nf(PLAN.length)} registros).</p>
      <div className="toolbar">
        <input className="search" placeholder="Filtrar tarea, predecesora o estado…" value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="segbtns">
          {["Todos", "En proceso", "Finalizado", "Sin estado"].map((f) => (
            <button key={f} className={filtro === f ? "on" : ""} onClick={() => setFiltro(f)}>{f}</button>
          ))}
        </div>
        <span className="count">{planView.length} / {PLAN.length}</span>
      </div>
      <div className="tblwrap">
        <table className="plan">
          <thead><tr><th style={{ width: "54%" }}>Tarea</th><th>Predecesora</th><th>Estado</th></tr></thead>
          <tbody>
            {planView.map((t, i) => {
              const isHdr = !t.estado && !t.pred;
              if (isHdr) return <tr className="hdr" key={i}><td colSpan={3}>{t.tarea}</td></tr>;
              return (
                <tr key={i}>
                  <td>{t.tarea}</td>
                  <td className="pred">{t.pred || "—"}</td>
                  <td><span className={`est ${estClass(t.estado)}`}>{t.estado || "Sin estado"}</span></td>
                </tr>
              );
            })}
            {planView.length === 0 && <tr><td colSpan={3} style={{ padding: "16px", color: "var(--c-mut)" }}>Sin coincidencias.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function nf(n) { return Number(n).toLocaleString("es-CO"); }
