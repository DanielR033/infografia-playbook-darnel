import React, { useState } from "react";
import { CTL_CSS } from "./controlUi.jsx";
import DATA from "./pb1FusionData.json";

const EXTRA = `
.pb1f .toprow{cursor:pointer}
.pb1f .toprow:hover{background:var(--soft)}
.pb1f .toprow td{vertical-align:middle}
.pb1f .cx{display:inline-block;width:14px;color:var(--blue);font-size:.7rem;transition:transform .15s;margin-right:4px}
.pb1f tr.open .cx{transform:rotate(90deg)}
.pb1f .detrow td{background:var(--soft);padding:0}
.pb1f .detbox{padding:12px 16px 14px 30px;font-size:.84rem;line-height:1.5;color:var(--fg);max-width:95ch}
.pb1f .mchip{font-family:var(--mono);font-size:.68rem;font-weight:600;padding:2px 8px;border-radius:999px;white-space:nowrap;background:#e3eef9;color:var(--navy)}
.pb1f .mchip.art{background:#efeafb;color:#5b3ea8}
.pb1f .mchip.cli{background:#e2f2ec;color:var(--ok)}
.pb1f .mchip.prov{background:#fdf0dc;color:var(--warn)}
.pb1f .acc{border:1px solid var(--line);border-radius:12px;background:#fff;margin-top:12px;overflow:hidden}
.pb1f .acc>summary{list-style:none;cursor:pointer;padding:14px 18px;display:flex;align-items:center;gap:12px;font-weight:700;color:var(--navy)}
.pb1f .acc>summary::-webkit-details-marker{display:none}
.pb1f .acc .chev{width:22px;height:22px;flex:none;border-radius:6px;background:var(--soft);display:grid;place-items:center;transition:transform .2s;color:var(--blue);font-size:.8rem}
.pb1f .acc[open] .chev{transform:rotate(90deg)}
.pb1f .acc .ameta{margin-left:auto;font-size:.75rem;color:var(--muted);font-family:var(--mono);font-weight:400}
.pb1f .acc .abody{padding:4px 18px 18px}
.pb1f .tv-item{padding:11px 0;border-top:1px solid var(--line2)}
.pb1f .tv-item:first-child{border-top:0}
.pb1f .tv-item .tt{font-weight:600;color:var(--fg);font-size:.9rem}
.pb1f .tv-item .ti{font-size:.85rem;color:var(--fg);margin-top:4px;line-height:1.45}
.pb1f .tv-item .ta{font-size:.82rem;color:var(--warn);margin-top:5px;line-height:1.4}
.pb1f .tv-item .ta b{font-family:var(--mono);font-size:.7rem;letter-spacing:.04em;background:var(--warn-soft);color:var(--warn);border-radius:5px;padding:1px 6px;margin-right:6px}
.pb1f .mcol{display:grid;grid-template-columns:1.3fr 1fr;gap:18px;margin-top:6px}
@media(max-width:820px){.pb1f .mcol{grid-template-columns:1fr}}
.pb1f .mcol h4{font-family:var(--mono);font-size:.7rem;letter-spacing:.05em;text-transform:uppercase;color:var(--muted);font-weight:600;margin:0 0 8px}
.pb1f .ul{margin:0;padding:0;list-style:none}
.pb1f .ul li{position:relative;padding:5px 0 5px 16px;font-size:.84rem;line-height:1.45;border-top:1px solid var(--line2)}
.pb1f .ul li:first-child{border-top:0}
.pb1f .ul li::before{content:"";position:absolute;left:2px;top:12px;width:6px;height:6px;border-radius:50%;background:var(--blue)}
.pb1f .ul.ab li::before{background:var(--warn)}
.pb1f .ssrc{font-size:.74rem;color:var(--muted);font-style:italic;margin:0 0 10px}
`;

const mchipCls = (m) => /Artículos/.test(m) ? "art" : /Clientes/.test(m) && /Proveedores/.test(m) ? "" : /Clientes/.test(m) ? "cli" : /Proveedores/.test(m) ? "prov" : "";
const impTone = (i) => i === "Alto" ? "crit" : i === "Medio" ? "warn" : "gray";

export default function Pb1Fusion() {
  const [open, setOpen] = useState({});
  const A = DATA.abiertos;
  const nAlto = A.filter((x) => x.impacto === "Alto").length;
  const toggle = (n) => setOpen((p) => ({ ...p, [n]: !p[n] }));

  return (
    <section className="wmsc pb1f">
      <style>{CTL_CSS}{EXTRA}</style>

      <div className="blk">
        <p className="eyebrow">Playback 1 · Oracle Fusion</p>
        <h2>Insights y puntos abiertos a nivel de datos</h2>
        <p className="lead">
          Hallazgos con impacto en datos de las sesiones del Playback 1 (entendimiento de proceso campo
          por campo). Arriba, los puntos abiertos priorizados —toca una fila para ver el detalle—; abajo,
          el contexto transversal y por maestro. Derivado de transcripciones; validar con el funcional
          antes de convertir en requerimiento de carga.
        </p>
        <div className="kpis">
          <div className="kpi crit"><div className="v">{A.length}</div><div className="l">Puntos abiertos a nivel de datos</div></div>
          <div className="kpi crit"><div className="v">{nAlto}</div><div className="l">De impacto alto</div></div>
          <div className="kpi"><div className="v">3</div><div className="l">Maestros enviados (Artículos, Clientes, Proveedores)</div></div>
          <div className="kpi"><div className="v">47</div><div className="l">Sesiones del Playback 1 revisadas</div></div>
        </div>
      </div>

      <div className="blk">
        <p className="eyebrow">Resumen</p>
        <h2>Puntos abiertos / falta de definición</h2>
        <p className="lead">Toca una fila para desplegar el detalle. Impacto = severidad si el punto no se cierra.</p>
        <div className="tw">
          <table>
            <thead><tr>
              <th style={{ width: 34 }}>#</th><th>Tema</th><th>Maestro</th><th>Responsable sugerido</th><th className="c">Impacto</th>
            </tr></thead>
            <tbody>
              {A.map((x) => (
                <React.Fragment key={x.n}>
                  <tr className={`toprow ${open[x.n] ? "open" : ""}`} onClick={() => toggle(x.n)}>
                    <td className="n"><span className="cx">▶</span>{x.n}</td>
                    <td><b>{x.tema}</b></td>
                    <td><span className={`mchip ${mchipCls(x.maestro)}`}>{x.maestro}</span></td>
                    <td>{x.resp}</td>
                    <td className="c"><span className={`st ${impTone(x.impacto)}`}>{x.impacto}</span></td>
                  </tr>
                  {open[x.n] && (
                    <tr className="detrow"><td colSpan={5}><div className="detbox">{x.detalle}</div></td></tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="blk">
        <p className="eyebrow">Contexto</p>
        <h2>Insights transversales y por maestro</h2>

        <details className="acc" open>
          <summary><span className="chev">▶</span> Insights transversales (toda la migración) <span className="ameta">{DATA.transversal.length} temas</span></summary>
          <div className="abody">
            {DATA.transversal.map((t, i) => (
              <div className="tv-item" key={i}>
                <div className="tt">{t.t}</div>
                <div className="ti">{t.insight}</div>
                {t.abierto && <div className="ta"><b>ABIERTO</b>{t.abierto}</div>}
              </div>
            ))}
          </div>
        </details>

        {DATA.maestros.map((m, i) => (
          <details className="acc" key={i}>
            <summary><span className="chev">▶</span> {m.nombre} <span className="ameta">{m.insights.length} insights · {m.abiertos.length} abiertos</span></summary>
            <div className="abody">
              <p className="ssrc">{m.sesiones}</p>
              <div className="mcol">
                <div>
                  <h4>Insights a nivel de datos</h4>
                  <ul className="ul">{m.insights.map((x, k) => <li key={k}>{x}</li>)}</ul>
                </div>
                <div>
                  <h4>Puntos abiertos / falta de definición</h4>
                  <ul className="ul ab">{m.abiertos.map((x, k) => <li key={k}>{x}</li>)}</ul>
                </div>
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
