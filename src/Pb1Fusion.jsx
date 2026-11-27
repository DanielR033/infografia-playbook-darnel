import React, { useState } from "react";
import { CTL_CSS } from "./controlUi.jsx";
import DATA from "./pb1FusionData.json";
import PB1 from "./pb1Data.json";

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
.pb1f .warnbox{background:var(--warn-soft);border-left:3px solid var(--warn);border-radius:0 8px 8px 0;padding:10px 14px;font-size:.82rem;color:#7a5410;margin:4px 0 16px}
.pb1f .pbcards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:6px 0 20px}
@media(max-width:860px){.pb1f .pbcards{grid-template-columns:1fr}}
.pb1f .mc{border:1px solid var(--line);border-radius:14px;background:#fff;padding:18px;border-top:3px solid var(--blue)}
.pb1f .mc.articulos{border-top-color:#6b46c1}
.pb1f .mc.proveedores{border-top-color:var(--warn)}
.pb1f .mc .mn{font-weight:700;font-size:1.05rem;color:var(--fg)}
.pb1f .mc .big{font-family:var(--mono);font-weight:600;font-size:2rem;color:var(--navy);line-height:1;margin:10px 0 2px}
.pb1f .mc.articulos .big{color:#6b46c1}
.pb1f .mc .biglbl{font-size:.76rem;color:var(--muted)}
.pb1f .mc .vs{margin-top:14px;font-size:.84rem;color:var(--muted)}
.pb1f .mc .vs b{font-family:var(--mono);color:var(--fg)}
.pb1f .mc .covt{height:9px;border-radius:5px;background:var(--soft);overflow:hidden;border:1px solid var(--line);margin-top:8px}
.pb1f .mc .covf{display:block;height:100%;border-radius:5px;background:linear-gradient(90deg,var(--blue),#00a7e1)}
.pb1f .mc.articulos .covf{background:linear-gradient(90deg,#6b46c1,#8b63e0)}
.pb1f .mc .covl{font-size:.74rem;color:var(--muted);margin-top:6px;font-family:var(--mono)}
.pb1f .mc .cols{margin-top:12px;font-size:.78rem;color:var(--muted)}
.pb1f .mc .chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.pb1f .mc .chip{font-family:var(--mono);font-size:.72rem;background:var(--soft);border:1px solid var(--line);border-radius:999px;padding:3px 9px;color:var(--navy)}
.pb1f td.r,.pb1f th.r{text-align:right}
.pb1f .distgrid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
@media(max-width:720px){.pb1f .distgrid{grid-template-columns:1fr}}
.pb1f .dblock h5{margin:4px 0 10px;font-family:var(--mono);font-size:.7rem;letter-spacing:.05em;text-transform:uppercase;color:var(--muted);font-weight:600}
.pb1f .bars{display:flex;flex-direction:column;gap:7px}
.pb1f .bar{display:grid;grid-template-columns:118px 1fr 48px;gap:10px;align-items:center;font-size:.82rem}
.pb1f .bar .bl{font-family:var(--mono);font-size:.78rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pb1f .bar .bt{height:8px;border-radius:5px;background:var(--soft);overflow:hidden;border:1px solid var(--line)}
.pb1f .bar .bf{display:block;height:100%;border-radius:5px;background:linear-gradient(90deg,var(--blue),#00a7e1)}
.pb1f .bar.v .bf{background:linear-gradient(90deg,#6b46c1,#8b63e0)}
.pb1f .bar .bv{font-family:var(--mono);font-size:.78rem;text-align:right;color:var(--muted)}
`;

const nf = (n) => n == null ? "—" : Number(n).toLocaleString("es-CO");
const pctCov = (a, b) => b ? (a / b * 100) : 0;

function Bars({ items, viol }) {
  const max = Math.max(...items.map((i) => i[1]), 1);
  return (
    <div className="bars">
      {items.map((i, k) => (
        <div className={`bar ${viol ? "v" : ""}`} key={k}>
          <span className="bl" title={i[0]}>{i[0]}</span>
          <span className="bt"><span className="bf" style={{ width: Math.max(2, i[1] / max * 100) + "%" }} /></span>
          <span className="bv">{nf(i[1])}</span>
        </div>
      ))}
    </div>
  );
}

const mchipCls = (m) => /Artículos/.test(m) ? "art" : /Clientes/.test(m) && /Proveedores/.test(m) ? "" : /Clientes/.test(m) ? "cli" : /Proveedores/.test(m) ? "prov" : "";
const impTone = (i) => i === "Alto" ? "crit" : i === "Medio" ? "warn" : "gray";

export default function Pb1Fusion() {
  const [open, setOpen] = useState({});
  const A = DATA.abiertos;
  const nAlto = A.filter((x) => x.impacto === "Alto").length;
  const toggle = (n) => setOpen((p) => ({ ...p, [n]: !p[n] }));

  const M = PB1.maestros;
  const conDato = M.filter((m) => !m.pendiente);
  const totPb1 = conDato.reduce((s, m) => s + (m.en_pb1 || 0), 0);
  const totVol = conDato.reduce((s, m) => s + (m.volumen || 0), 0);

  return (
    <section className="wmsc pb1f">
      <style>{CTL_CSS}{EXTRA}</style>

      <div className="blk">
        <p className="eyebrow">Playback 1 · Oracle Fusion</p>
        <h2>Insights y puntos abiertos a nivel de datos</h2>
        <p className="lead">
          Hallazgos con impacto en datos de las sesiones del Playback 1 (entendimiento de proceso campo
          por campo). Arriba, los puntos abiertos priorizados —toca una fila para ver el detalle—;
          enseguida, el contexto transversal y por maestro; al final, el conteo de datos cargados en PB1
          frente al volumen inicial del ERP. Derivado de transcripciones; validar con el funcional antes
          de convertir en requerimiento de carga.
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

      <div className="blk">
        <p className="eyebrow">Datos cargados en PB1</p>
        <h2>Registros cargados vs. volumen inicial del ERP</h2>
        <p className="lead">
          Conteo de los registros de las plantillas usadas en la primera prueba (PB1) por maestro
          —Clientes, Artículos y Proveedores—, contrastado con el volumen inicial estimado del ERP.
          Permite dimensionar qué porción del universo cubre PB1.
        </p>
        <div className="warnbox">
          Estos archivos son muestras de datos de PB1, no las plantillas oficiales de carga; aun así se
          cuentan las cantidades para el contraste.
        </div>

        <div className="pbcards">
          {M.map((m) => (
            <div className={`mc ${m.key}`} key={m.key}>
              <div className="mn">{m.nombre}</div>
              {m.pendiente ? (
                <>
                  <div className="big">—</div>
                  <div className="biglbl">Registros en PB1</div>
                  <div className="vs">Volumen inicial (ERP): <b>{nf(m.volumen)}</b></div>
                </>
              ) : (
                <>
                  <div className="big">{nf(m.en_pb1)}</div>
                  <div className="biglbl">Registros en PB1 · {m.columnas} columnas</div>
                  <div className="vs">vs. volumen inicial (ERP): <b>{nf(m.volumen)}</b></div>
                  <div className="covt"><span className="covf" style={{ width: Math.max(1.5, pctCov(m.en_pb1, m.volumen)) + "%" }} /></div>
                  <div className="covl">{pctCov(m.en_pb1, m.volumen).toFixed(1)}% del volumen inicial</div>
                  {m.chips && <div className="chips">{m.chips.map((c, i) => <span className="chip" key={i}>{c[0]}: {nf(c[1])}</span>)}</div>}
                </>
              )}
              <div className="cols">{m.nota}</div>
            </div>
          ))}
        </div>

        <div className="tw">
          <table>
            <thead><tr>
              <th>Maestro</th><th className="r">Registros en PB1</th><th className="r">Volumen inicial (ERP)</th><th className="r">% cobertura</th>
            </tr></thead>
            <tbody>
              {M.map((m) => (
                <tr key={m.key}>
                  <td><b>{m.nombre}</b></td>
                  <td className="r n">{m.pendiente ? "—" : nf(m.en_pb1)}</td>
                  <td className="r n">{nf(m.volumen)}</td>
                  <td className="r n">{m.pendiente ? "—" : pctCov(m.en_pb1, m.volumen).toFixed(1) + "%"}</td>
                </tr>
              ))}
              <tr style={{ fontWeight: 700, background: "var(--soft)" }}>
                <td>Total ({conDato.length} maestros)</td>
                <td className="r n">{nf(totPb1)}</td>
                <td className="r n">{nf(totVol)}</td>
                <td className="r n">{pctCov(totPb1, totVol).toFixed(1)}%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {M.filter((m) => m.dist).map((m) => (
          <details className="acc" key={m.key} open={m.key === "articulos"}>
            <summary><span className="chev">▶</span> {m.nombre} · distribución de la muestra PB1 <span className="ameta">{nf(m.en_pb1)} registros</span></summary>
            <div className="abody">
              <div className="distgrid">
                {m.dist.map((d, i) => (
                  <div className="dblock" key={i}>
                    <h5>{d.t}</h5>
                    <Bars items={d.items} viol={m.key === "articulos"} />
                  </div>
                ))}
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
