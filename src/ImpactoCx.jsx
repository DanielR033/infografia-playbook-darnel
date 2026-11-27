import React from "react";
import { CX_CIFRAS, cruceCx } from "./cxCruce.js";
import { toneOf, UMBRAL } from "./controlUi.jsx";

/* ===== estilos aislados, mismo lenguaje navy/teal del dashboard ERP ===== */
const CX_CSS = `
.impactocx{--surface:#fff;--surface2:#f6f8fb;--fg:#15202b;--muted:#5b6b7a;--border:#d7dee7;
 --navy:#1f3a5f;--teal:#2e7d7a;--accent:#2e7d7a;--accent-soft:#d9ebe9;--ok:#2e7d55;--ok-soft:#dcefe3;
 --warn:#9a6a12;--warn-soft:#f7eccf;--crit:#a33a34;--crit-soft:#f6ddd9;--info:#2d5b8e;--info-soft:#dbe6f2;--grid:#e5eaf0;
 --mfont:"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--fg)}
.impactocx *{box-sizing:border-box}
.impactocx .eyebrow{font-family:var(--mfont);font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--teal);font-weight:600;margin:0}
.impactocx .h2{font-size:1.4rem;font-weight:700;margin:6px 0 0;letter-spacing:-.01em;color:var(--navy)}
.impactocx .lead{color:var(--muted);max-width:74ch;margin:8px 0 0;font-size:.95rem;line-height:1.5}
.impactocx .num{font-family:var(--mfont);font-variant-numeric:tabular-nums}
.impactocx section{padding-block:26px;border:0}
.impactocx .kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:20px}
.impactocx .kpi{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:16px;position:relative;overflow:hidden}
.impactocx .kpi::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--accent)}
.impactocx .kpi.alt::before{background:var(--navy)}
.impactocx .kpi.critbar::before{background:var(--crit)}
.impactocx .kpi.warnbar::before{background:var(--warn)}
.impactocx .kpi .v{font-family:var(--mfont);font-weight:600;font-size:1.8rem;letter-spacing:-.02em;line-height:1;color:var(--navy)}
.impactocx .kpi .v.crit{color:var(--crit)}
.impactocx .kpi .l{font-size:.78rem;color:var(--fg);margin-top:8px;line-height:1.3;font-weight:600}
.impactocx .kpi .foot{font-size:.72rem;color:var(--muted);margin-top:6px}
.impactocx .note{background:var(--surface2);border-left:3px solid var(--accent);border-radius:0 8px 8px 0;padding:11px 14px;margin-top:14px;font-size:.84rem;color:var(--muted)}
.impactocx .note b{color:var(--fg)}
.impactocx .crit-note{background:var(--crit-soft);border-left:3px solid var(--crit);border-radius:0 8px 8px 0;padding:11px 14px;margin-top:16px;font-size:.86rem;color:#4a3330}
.impactocx .crit-note b{color:var(--crit)}
.impactocx .warn-note{background:var(--warn-soft);border-left:3px solid var(--warn);border-radius:0 8px 8px 0;padding:11px 14px;margin-top:16px;font-size:.86rem;color:#4e3f1d}
.impactocx .warn-note b{color:var(--warn)}
.impactocx code{font-family:var(--mfont);font-size:.84em;background:#eef1f5;border:1px solid var(--border);border-radius:3px;padding:.03em .35em;color:#30404f}
.impactocx .dgrid{display:grid;grid-template-columns:repeat(12,1fr);gap:16px;margin-top:18px}
.impactocx .dcard{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:18px;min-width:0}
.impactocx .dcard h3{font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);font-family:var(--mfont);font-weight:600;margin:0 0 4px}
.impactocx .c4{grid-column:span 4}.impactocx .c6{grid-column:span 6}.impactocx .c12{grid-column:span 12}
.impactocx .dcard p{margin:.35rem 0 0;font-size:.9rem;color:var(--muted);line-height:1.5}
.impactocx .dcard p b{color:var(--fg);font-weight:600}
/* tabla */
.impactocx .tablewrap{overflow-x:auto;border:1px solid var(--border);border-radius:14px;background:var(--surface);margin-top:14px}
.impactocx table.dt{border-collapse:collapse;width:100%;font-size:.86rem}
.impactocx table.dt thead th{background:var(--surface2);text-align:left;font-family:var(--mfont);font-weight:600;font-size:.7rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);padding:11px 12px;border-bottom:2px solid var(--border);white-space:nowrap}
.impactocx table.dt th.right,.impactocx table.dt td.right{text-align:right}
.impactocx table.dt tbody td{padding:10px 12px;border-bottom:1px solid var(--grid);vertical-align:top}
.impactocx table.dt tbody tr:last-child td{border-bottom:0}
.impactocx td.n,.impactocx .n{font-family:var(--mfont);font-variant-numeric:tabular-nums}
.impactocx .up{color:var(--crit);font-weight:600}.impactocx .ok{color:var(--ok);font-weight:600}
/* barras de composición */
.impactocx .stack{display:flex;height:20px;border:1px solid var(--border);border-radius:6px;overflow:hidden;margin:12px 0 8px}
.impactocx .stack i{font-style:normal}
.impactocx .keyline{display:flex;flex-wrap:wrap;gap:.4rem 1.4rem;font-size:.82rem;color:var(--muted)}
.impactocx .keyline b{color:var(--fg);font-weight:600}
.impactocx .sw{display:inline-block;width:11px;height:11px;border-radius:2px;margin-right:.4rem;vertical-align:-1px}
/* flujo */
.impactocx .flow{display:grid;grid-template-columns:1fr 26px 1fr 26px 1fr;align-items:stretch;margin:18px 0 0}
.impactocx .fnode{border:1px solid var(--border);border-radius:12px;padding:14px 16px;background:var(--surface)}
.impactocx .fnode .k{font-family:var(--mfont);font-size:.66rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);font-weight:600}
.impactocx .fnode .nm{font-weight:700;margin-top:.25rem;color:var(--navy)}
.impactocx .fnode .ds{font-size:.8rem;color:var(--muted);margin-top:.2rem}
.impactocx .fnode.erp{border-color:#d9b4b0;background:var(--crit-soft)}
.impactocx .farrow{display:flex;align-items:center;justify-content:center;color:var(--muted);font-size:1rem}
/* join */
.impactocx .join{border:1px solid var(--border);border-radius:14px;padding:16px 18px;background:var(--surface2);margin-top:16px}
.impactocx .joinrow{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:8px}
.impactocx .token{border:1px solid var(--border);background:var(--surface);border-radius:8px;padding:.45rem .7rem;font-family:var(--mfont);font-size:.82rem}
.impactocx .token b{color:var(--teal)}
.impactocx .eq{color:var(--muted);font-weight:700}
/* resultado cruce */
.impactocx .res{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:16px}
.impactocx .rescard{border:1px solid var(--border);border-radius:14px;padding:16px;background:var(--surface)}
.impactocx .rescard .t{font-size:.7rem;text-transform:uppercase;letter-spacing:.06em;font-weight:700;font-family:var(--mfont)}
.impactocx .rescard .t.g{color:var(--ok)}.impactocx .rescard .t.r{color:var(--crit)}.impactocx .rescard .t.b{color:var(--info)}
.impactocx .rescard .h{font-weight:600;font-size:.9rem;margin-top:.3rem}
.impactocx .rescard .v{font-size:.82rem;color:var(--muted);margin-top:.35rem}
.impactocx .pill{display:inline-block;font-size:.68rem;font-weight:600;padding:2px 9px;border-radius:999px;font-family:var(--mfont);margin-top:.5rem}
.impactocx .p-pend{background:var(--warn-soft);color:var(--warn)}
/* riesgos / decisiones */
.impactocx .risk{display:flex;flex-direction:column;gap:2px}
.impactocx .risk .ri{padding:11px 0;border-bottom:1px solid var(--grid)}
.impactocx .risk .ri:last-child{border-bottom:0}
.impactocx .risk .ri b{font-size:.9rem}
.impactocx .risk .ri p{margin:.2rem 0 0;font-size:.84rem;color:var(--muted);line-height:1.45}
.impactocx ol.dec{list-style:none;counter-reset:d;padding:0;margin:0}
.impactocx ol.dec li{counter-increment:d;position:relative;padding:11px 0 11px 2.4rem;border-bottom:1px solid var(--grid);font-size:.9rem;line-height:1.45}
.impactocx ol.dec li:last-child{border-bottom:0}
.impactocx ol.dec li::before{content:counter(d,decimal-leading-zero);position:absolute;left:0;top:11px;font-family:var(--mfont);font-size:.74rem;font-weight:700;color:var(--navy);border:1px solid var(--border);border-radius:6px;padding:.05rem .35rem;background:var(--surface)}
.impactocx ol.dec li b{font-weight:650}.impactocx ol.dec li span{color:var(--muted)}
.impactocx .cxfoot{color:var(--muted);font-size:.8rem;padding-block:22px;border-top:1px solid var(--border);margin-top:22px}
.impactocx .cxfoot b{color:var(--fg);font-weight:600}
.impactocx .status{display:inline-block;font-family:var(--mfont);font-size:.68rem;letter-spacing:.06em;text-transform:uppercase;color:var(--warn);border:1px solid #e3d2a6;background:var(--warn-soft);border-radius:4px;padding:.15rem .5rem;font-weight:600;margin-left:.6rem;vertical-align:middle}
.impactocx .sem{display:inline-block;font-family:var(--mfont);font-size:.72rem;font-weight:700;padding:2px 9px;border-radius:999px}
.impactocx .sem.ok{background:var(--ok-soft);color:var(--ok)}.impactocx .sem.warn{background:var(--warn-soft);color:var(--warn)}.impactocx .sem.crit{background:var(--crit-soft);color:var(--crit)}
.impactocx .bar{height:8px;background:var(--grid);border-radius:4px;overflow:hidden;min-width:120px}.impactocx .bar i{display:block;height:100%;background:var(--navy)}
.impactocx .hal{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-top:16px}
.impactocx .hal .dcard b.t{display:block;color:var(--navy);font-size:.95rem;line-height:1.35}
.impactocx .hitos{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}
.impactocx .hito{border:1px solid var(--border);border-radius:10px;padding:8px 12px;background:var(--surface);font-size:.8rem}
.impactocx .hito b{display:block;font-family:var(--mfont);color:var(--navy);font-size:.82rem}
.impactocx .hito.lim{border-color:#d9b4b0;background:var(--crit-soft)}
.impactocx table.dt td.q{font-weight:600;color:var(--navy);width:30%}
@media(max-width:900px){.impactocx .hal{grid-template-columns:1fr}}
@media(max-width:900px){
 .impactocx .kpis,.impactocx .res{grid-template-columns:1fr 1fr}
 .impactocx .c4,.impactocx .c6{grid-column:span 12}
 .impactocx .flow{grid-template-columns:1fr}.impactocx .farrow{height:22px}
}
`;


export { CX_CIFRAS };
const nf = (n) => n.toLocaleString("es-CO");
const pf = (a, b) => (b ? (a / b) * 100 : null);
const pt = (p) => (p === null ? "—" : `${p.toLocaleString("es-CO", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`);

/* Cifras del análisis «Impacto del sistema comercial (Oracle CX) en la migración de clientes y artículos»
   (corte 27-nov-2026). Fuentes: extracciones del ERP (ambiente de desarrollo) y PeopleSoft / WMS en
   Microsoft Fabric (20-nov-2026). Solo valores agregados: el sitio es público. */
const A = {
  corte: "27-nov-2026",
  // presencia en el ERP por universo
  universos: [
    { u: "Artículos activos de PeopleSoft", total: 86658, enErp: 21991 },
    { u: "Artículos preparados para Oracle WMS Cloud", total: 46815, enErp: 12266 },
    { u: "Artículos de la primera prueba (Playback 1)", total: 1185, enErp: 163 },
  ],
  // unidad principal igual entre pares de sistemas (artículos comparables)
  unidad: [
    { par: "WMS actual · Oracle WMS Cloud", p: 98.0 },
    { par: "PeopleSoft · ERP", p: 85.7 },
    { par: "PeopleSoft · WMS actual", p: 82.9 },
    { par: "ERP · Oracle WMS Cloud", p: 58.5 },
  ],
  // personas y empresas del ERP según su cruce con PeopleSoft
  clientes: [
    { k: "Clientes del plan de migración", n: 72315, c: "#1f3a5f" },
    { k: "Clientes de otras compañías del grupo o fuera del plan", n: 78798, c: "#5f88b0" },
    { k: "Proveedores", n: 1204, c: "#9aa7b6" },
    { k: "Sin registro en PeopleSoft (prospectos, consumidores o contactos, por confirmar)", n: 172643, c: "#c9a14a" },
  ],
};

const HALLAZGOS = [
  { t: "Un mismo artículo se identifica con códigos distintos según el sistema",
    d: "El sistema comercial y Oracle WMS Cloud usan el código de producto; PeopleSoft y el WMS actual registran los movimientos con el código de artículo. Difieren en 2.235 artículos del ERP y 3.304 de Oracle WMS Cloud; 163 artículos existen dos veces en el ERP." },
  { t: "La configuración de los artículos sincronizados no corresponde a su uso",
    d: "Los 28.932 artículos quedaron con una sola configuración, sin clase ni tipo. El diseño de la primera prueba define 14 clases y 12 tipos con comportamiento propio en planeación, costos, lotes y ventas." },
  { t: "La unidad de medida difiere entre sistemas",
    d: "235 artículos del ERP están en unidades no aprobadas por el catálogo y 433 artículos activos de PeopleSoft tienen factores de conversión inconsistentes. ML corresponde a millar (1 millar = 1.000 unidades)." },
  { t: "El ERP contiene una parte de los artículos de la operación",
    d: "La sincronización solo llevó el catálogo de venta. Materias primas, empaques y repuestos deben crearse con la carga de migración y convivir con los artículos ya sincronizados." },
  { t: "Los registros del sistema comercial no equivalen al universo de clientes del plan",
    d: "El 92,5 % de los clientes del plan ya existe en el sistema comercial, con 1,6 registros por cliente en promedio. La carga debe definir el registro principal de cada empresa." },
  { t: "Las decisiones condicionan 19 objetos de carga",
    d: "14 dependen del código del artículo, 3 del cliente y 2 de ambos, con 8.404 columnas en 10 áreas del ERP." },
];

const PREGUNTAS = [
  { q: "¿Los datos del ERP no alineados con PeopleSoft se eliminan o se modifican?",
    r: "Depende de cada registro; no se recomienda eliminar ni modificar de forma masiva. Se elimina lo que no tiene uso ni restricciones, se corrigen los atributos, se inactiva lo que no puede eliminarse y se crea con la carga lo que falta. Microsoft Fabric mantiene la tabla de equivalencias entre sistemas y concilia en cada carga." },
  { q: "¿El sistema comercial se originó en Estados Unidos?",
    r: "Los datos no lo muestran. El 78,8 % de los artículos se creó desde octubre de 2023 con unidades en código español. Las unidades en inglés (EA, CS, BG) provienen de una carga de febrero y marzo de 2025 de una compañía de PeopleSoft con convenciones estadounidenses. Se solicitará a Oracle la fecha, el usuario y el sistema de origen de cada registro." },
  { q: "¿Lo creado ya no se puede borrar?",
    r: "Es parcialmente cierto. Un artículo sin transacciones ni referencias puede eliminarse; con transacciones abiertas, no. El número de artículo solo cambia con un parámetro de sitio que Oracle entrega desactivado. Las personas y empresas no se eliminan: se inactivan y, según su uso, se depuran o se fusionan." },
  { q: "¿Qué cambios permite Oracle?",
    r: "Permite inactivar artículos, asignarlos a organizaciones y agregar conversiones. Permite con condiciones eliminar artículos y cambiar el número, la unidad principal (desde la versión 24C y sin referencias) y los atributos operativos. No permite eliminar de forma directa una persona o empresa." },
];

const DECISIONES = [
  { d: "Código único del artículo y regla de equivalencia", f: "09-dic-2026", s: "Gobierno del maestro" },
  { d: "Sistema dueño del maestro", f: "09-dic-2026", s: "Gobierno del maestro" },
  { d: "Consolidación del maestro entre compañías", f: "09-dic-2026", s: "Gobierno del maestro" },
  { d: "Unidad principal por tipo de artículo", f: "14-dic-2026", s: "Unidades de medida" },
  { d: "Configuración por tipo de artículo", f: "14-dic-2026", s: "Configuración" },
  { d: "Plantas y bodegas por artículo", f: "14-dic-2026", s: "Configuración" },
  { d: "Categorías y familias", f: "14-dic-2026", s: "Configuración" },
  { d: "Rol de las personas y empresas", f: "14-dic-2026", s: "Clientes" },
  { d: "Unidades de venta, precio y dual por tipo de artículo", f: "21-dic-2026", s: "Unidades de medida" },
];

const HITOS = [
  { f: "10-dic", t: "Aceptación de Playback 1" },
  { f: "15 a 17-dic", t: "Sesiones de plantilla 1" },
  { f: "22 a 29-dic", t: "Sesiones de plantilla 2" },
  { f: "06-ene", t: "Carga 1 de Playback 2" },
  { f: "27-ene", t: "Inicio de Playback 2" },
  { f: "Por definir", t: "Inicio de UAT · límite para cerrar ajustes", lim: true },
];

export default function ImpactoCx() {
  const cx = cruceCx();
  const ps = A.universos[0];
  const totCli = A.clientes.reduce((a, c) => a + c.n, 0);
  const erpCloud = A.unidad.find((u) => u.par === "ERP · Oracle WMS Cloud").p;
  return (
    <section className="impactocx">
      <style>{CX_CSS}</style>

      <section style={{ paddingTop: 8 }}>
        <p className="eyebrow">Análisis de impacto · Oracle CX</p>
        <h2 className="h2">Impacto del sistema comercial en la migración de clientes y artículos</h2>
        <p className="lead">Durante Playback 1 el sistema comercial (Oracle CX) sincronizó hacia el ERP los clientes y artículos que ya administraba. El análisis compara esa información con PeopleSoft, el WMS actual y las plantillas de Oracle WMS Cloud, y define las decisiones que deben tomarse antes de cerrar las plantillas de carga de Playback 2. Corte {A.corte}.</p>
        <div className="kpis">
          <div className="kpi alt"><div className="v">{nf(CX_CIFRAS.articulos)}</div><div className="l">Artículos sincronizados en el ERP</div><div className="foot">{nf(ps.enErp)} de {nf(ps.total)} activos de PeopleSoft ({pt(pf(ps.enErp, ps.total))})</div></div>
          <div className="kpi warnbar"><div className="v">{nf(CX_CIFRAS.clientes)}</div><div className="l">Personas y empresas en el ERP</div><div className="foot">{nf(A.clientes[0].n)} corresponden a clientes del plan</div></div>
          <div className="kpi critbar"><div className="v crit">{pt(erpCloud)}</div><div className="l">Unidad principal igual entre ERP y Oracle WMS Cloud</div><div className="foot">Artículos presentes en ambos sistemas</div></div>
          <div className="kpi"><div className="v">{DECISIONES.length}</div><div className="l">Decisiones pendientes</div><div className="foot">Primera fecha límite: {DECISIONES[0].f}</div></div>
        </div>
      </section>

      <section>
        <p className="eyebrow">1 · Hallazgos</p>
        <h2 className="h2">Conclusiones del análisis</h2>
        <div className="hal">
          {HALLAZGOS.map((h, i) => (
            <div className="dcard" key={i}><h3>{String(i + 1).padStart(2, "0")}</h3><b className="t">{h.t}</b><p>{h.d}</p></div>
          ))}
        </div>
      </section>

      <section>
        <p className="eyebrow">2 · Unidades de medida</p>
        <h2 className="h2">Unidad principal igual entre sistemas</h2>
        <div className="tablewrap">
          <table className="dt">
            <thead><tr><th>Sistemas comparados</th><th className="right">Artículos con la misma unidad</th><th>Semáforo</th></tr></thead>
            <tbody>
              {A.unidad.map((u) => {
                const t = toneOf(u.p);
                return (
                  <tr key={u.par}><td>{u.par}</td><td className="right n">{pt(u.p)}</td>
                    <td><span className={`sem ${t}`}>{{ ok: "Verde", warn: "Ámbar", crit: "Rojo" }[t]}</span></td></tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="note"><b>Lectura:</b> el WMS actual y Oracle WMS Cloud registran la unidad física de manipulación (caja, bolsa, paquete); PeopleSoft y el ERP, la unidad de control (millar, kilogramo). La carga y la integración deben aplicar el factor de cada artículo. Semáforo: verde ≥ {UMBRAL.verde} %, ámbar {UMBRAL.ambar} % a 89,9 %, rojo &lt; {UMBRAL.ambar} %.</div>
      </section>

      <section>
        <p className="eyebrow">3 · Cobertura</p>
        <h2 className="h2">Artículos de cada universo presentes en el ERP</h2>
        <div className="tablewrap">
          <table className="dt">
            <thead><tr><th>Universo</th><th className="right">Artículos</th><th className="right">En el ERP</th><th className="right">%</th><th></th></tr></thead>
            <tbody>
              {A.universos.map((u) => {
                const p = pf(u.enErp, u.total);
                return (
                  <tr key={u.u}><td>{u.u}</td><td className="right n">{nf(u.total)}</td><td className="right n">{nf(u.enErp)}</td><td className="right n">{pt(p)}</td>
                    <td style={{ width: "22%" }}><div className="bar"><i style={{ width: `${p}%` }} /></div></td></tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <p className="eyebrow">4 · Clientes</p>
        <h2 className="h2">Composición de las personas y empresas del ERP</h2>
        <div className="dcard" style={{ marginTop: 16 }}>
          <div className="stack">{A.clientes.map((c) => <i key={c.k} style={{ width: `${pf(c.n, totCli)}%`, background: c.c }} />)}</div>
          <div className="keyline">
            {A.clientes.map((c) => <span key={c.k}><span className="sw" style={{ background: c.c }} />{c.k} <b>{nf(c.n)} ({pt(pf(c.n, totCli))})</b></span>)}
          </div>
          <p>Cruce por nombre con PeopleSoft sobre {nf(totCli)} registros. La extracción disponible no incluye la cuenta de cliente; el rol definitivo de cada registro se confirma con esa información.</p>
        </div>
      </section>

      <section>
        <p className="eyebrow">5 · Preguntas de la sesión</p>
        <h2 className="h2">Respuestas a las preguntas planteadas</h2>
        <div className="tablewrap">
          <table className="dt">
            <thead><tr><th>Pregunta</th><th>Respuesta</th></tr></thead>
            <tbody>{PREGUNTAS.map((p) => <tr key={p.q}><td className="q">{p.q}</td><td>{p.r}</td></tr>)}</tbody>
          </table>
        </div>
        <div className="note">Las condiciones de Oracle deben validarse en la versión instalada. Fuente: documentación de Oracle Fusion Cloud SCM y Customer Data Management.</div>
      </section>

      <section>
        <p className="eyebrow">6 · Decisiones y plazos</p>
        <h2 className="h2">Decisiones pendientes y ruta según el plan del proyecto</h2>
        <div className="hitos">{HITOS.map((h) => <div className={`hito ${h.lim ? "lim" : ""}`} key={h.t}><b>{h.f}</b>{h.t}</div>)}</div>
        <div className="tablewrap">
          <table className="dt">
            <thead><tr><th>Decisión</th><th>Sesión</th><th>Fecha límite</th></tr></thead>
            <tbody>{DECISIONES.map((d) => <tr key={d.d}><td><b>{d.d}</b></td><td>{d.s}</td><td className="n" style={{ whiteSpace: "nowrap" }}>{d.f}</td></tr>)}</tbody>
          </table>
        </div>
        <div className="note"><b>Criterio de las fechas:</b> cada decisión debe estar tomada antes de que las sesiones de plantilla de Playback 2 la incorporen. Corregir después exige volver a preparar, cargar y probar los datos; después del inicio de UAT aplican además las restricciones de Oracle sobre artículos con transacciones.</div>
      </section>

      {/* 7 · Profundización */}
      <section>
        <p className="eyebrow">7 · Profundización</p>
        <h2 className="h2">Más allá del party: entidades que se cruzan con las plantillas ERP</h2>
        <p className="lead">Para operar, CX no usa solo el party y el ítem: también direcciones, usos de dirección, contactos, cuentas y categorías. Las plantillas de carga del ERP cargan esas mismas entidades en las mismas tablas de Fusion. Hoy está analizado el maestro base; la profundización no se puede medir todavía porque falta la extracción desde Fusion.</p>
        <div className="kpis" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
          <div className="kpi alt"><div className="v">{cx.n1.n} de {cx.n1.total}</div><div className="l">Maestro base analizado</div><div className="foot">Party {nf(CX_CIFRAS.clientes)} · Ítem {nf(CX_CIFRAS.articulos)}</div></div>
          <div className="kpi warnbar"><div className="v">{cx.n2.n} de {cx.n2.total}</div><div className="l">Entidades de profundización con datos</div><div className="foot">Falta extracción desde Fusion</div></div>
          <div className="kpi"><div className="v">{nf(cx.n2.colsTot)}</div><div className="l">Columnas de plantilla ERP en riesgo de cruce</div><div className="foot">Hojas de profundización · base: {nf(cx.n1.colsTot)}</div></div>
        </div>
        <div className="tablewrap">
          <table className="dt">
            <thead><tr><th>Entidad</th><th>Nivel</th><th>Hojas plantilla ERP</th><th className="right">Columnas</th><th>Por qué nos cruza</th><th className="right">En PB1</th><th>Estado CX</th></tr></thead>
            <tbody>
              {cx.ent.map((e) => (
                <tr key={e.ent}>
                  <td><b>{e.ent}</b></td>
                  <td>{e.nivel === 1 ? "Base" : "Profundización"}</td>
                  <td className="n" style={{ fontSize: ".72rem" }}>{e.hojas.join(", ")}</td>
                  <td className="right n">{nf(e.cols)}</td>
                  <td style={{ fontSize: ".82rem", color: "var(--muted)", minWidth: 260 }}>{e.porque}</td>
                  <td className="right n" style={{ whiteSpace: "nowrap" }}>{e.pb1.definidas ? `${e.pb1.conDatos} de ${e.pb1.definidas}` : "—"}</td>
                  <td>{e.datos ? <span className="pill" style={{ background: "var(--ok-soft)", color: "var(--ok)", marginTop: 0 }}>Analizado{e.volumen ? ` · ${nf(e.volumen)}` : ""}</span> : <span className="pill p-pend" style={{ marginTop: 0 }}>Sin extracción</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="note"><b>Columna «En PB1»:</b> columnas de la plantilla de negocio de PB1 que corresponden a esa hoja, con datos / definidas. En PB1 las direcciones, cuentas y medios de pago quedaron <b>definidas y validadas, pero sin datos</b>: es el mismo vacío de profundización que aparece en CX. Fuente: Muestra_Clientes (CO y PA) y DAR_Maestro_Items_PB1. La lista de entidades se valida con el funcional de CX.</div>
      </section>

      <div className="cxfoot">
        <b>Resumen del análisis presentado al comité.</b> El documento completo incluye la evidencia por artículo y por sistema, ejemplos y el listado en Excel.<br />
        Fuentes: extracciones del ERP en el ambiente de desarrollo (artículos de la organización maestra: {nf(CX_CIFRAS.articulos)}; personas y empresas: {nf(CX_CIFRAS.clientes)}); PeopleSoft y WMS actual en Microsoft Fabric (20-nov-2026); reglas de carga de Oracle WMS Cloud en Fabric; catálogo de unidades aprobado por el equipo de Product Hub; plan del proyecto (Playback 1 y 2). Valores agregados, sin datos personales.
      </div>
    </section>
  );
}
