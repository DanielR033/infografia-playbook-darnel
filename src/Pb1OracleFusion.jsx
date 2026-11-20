import React, { useEffect } from "react";
import DATA from "./pb1Data.json";

const CSS = `
.pb1{--c-blue:#0058a8;--c-blue-d:#003b70;--c-cyan:#00a7e1;--c-ink:#1f2b3a;--c-mut:#5b6b7a;
 --c-bd:#d9e3ef;--c-soft:#f3f8fd;--ok:#0f8f6c;--ok-s:#e6f7ef;--warn:#c67c12;--warn-s:#fdf2dc;
 --crit:#b5323b;--viol:#6b46c1;--mono:"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace;
 position:fixed;inset:0;z-index:5200;background:#eef1f5;display:flex;flex-direction:column;color:var(--c-ink);font-family:inherit}
.pb1 .ph{background:linear-gradient(120deg,var(--c-blue-d),var(--c-blue) 70%,var(--c-cyan));color:#fff}
.pb1 .ph .in{max-width:1180px;margin:0 auto;padding:16px max(16px,env(safe-area-inset-left,0));display:flex;flex-wrap:wrap;gap:12px 16px;align-items:center}
.pb1 .back{appearance:none;border:1px solid rgba(255,255,255,.3);background:rgba(255,255,255,.12);color:#fff;font:inherit;font-weight:600;font-size:.86rem;border-radius:999px;padding:9px 17px;cursor:pointer;flex:none}
.pb1 .back:hover{background:rgba(255,255,255,.22)}
.pb1 .pt{font-weight:700;font-size:1.12rem;line-height:1.15}
.pb1 .ps{font-size:.76rem;color:#cfe0f2;margin-top:2px}
.pb1 .pbody{overflow-y:auto;flex:1}
.pb1 .pin{max-width:1180px;margin:0 auto;padding:22px max(16px,env(safe-area-inset-left,0)) 48px}
.pb1 .lead{color:var(--c-mut);font-size:.9rem;line-height:1.55;max-width:82ch;margin:0 0 18px}
.pb1 .warnbox{background:var(--warn-s);border-left:3px solid var(--warn);border-radius:0 8px 8px 0;padding:10px 14px;font-size:.82rem;color:#7a5410;margin:0 0 18px}
.pb1 .cards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:22px}
@media(max-width:860px){.pb1 .cards{grid-template-columns:1fr}}
.pb1 .mc{border:1px solid var(--c-bd);border-radius:14px;background:#fff;padding:18px;border-top:3px solid var(--c-blue)}
.pb1 .mc.articulos{border-top-color:var(--viol)}
.pb1 .mc.proveedores{border-top-color:var(--c-mut);opacity:.9}
.pb1 .mc .mn{font-weight:700;font-size:1.05rem;color:var(--c-ink)}
.pb1 .mc .big{font-family:var(--mono);font-weight:600;font-size:2rem;color:var(--c-blue-d);line-height:1;margin:10px 0 2px}
.pb1 .mc.articulos .big{color:var(--viol)}
.pb1 .mc .biglbl{font-size:.76rem;color:var(--c-mut)}
.pb1 .mc .vs{margin-top:14px;font-size:.84rem;color:var(--c-mut)}
.pb1 .mc .vs b{font-family:var(--mono);color:var(--c-ink)}
.pb1 .mc .covt{height:9px;border-radius:5px;background:var(--c-soft);overflow:hidden;border:1px solid var(--c-bd);margin-top:8px}
.pb1 .mc .covf{display:block;height:100%;border-radius:5px;background:linear-gradient(90deg,var(--c-blue),var(--c-cyan))}
.pb1 .mc.articulos .covf{background:linear-gradient(90deg,var(--viol),#8b63e0)}
.pb1 .mc .covl{font-size:.74rem;color:var(--c-mut);margin-top:6px;font-family:var(--mono)}
.pb1 .mc .cols{margin-top:12px;font-size:.78rem;color:var(--c-mut)}
.pb1 .mc .chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.pb1 .mc .chip{font-family:var(--mono);font-size:.72rem;background:var(--c-soft);border:1px solid var(--c-bd);border-radius:999px;padding:3px 9px;color:var(--c-blue-d)}
.pb1 .mc .pend{font-family:var(--mono);font-size:.74rem;color:var(--warn);background:var(--warn-s);border-radius:8px;padding:4px 10px;display:inline-block;margin-top:8px}
.pb1 .ctab-wrap{overflow-x:auto;border:1px solid var(--c-bd);border-radius:12px;margin-bottom:26px}
.pb1 table.ctab{border-collapse:collapse;width:100%;font-size:.86rem;min-width:560px}
.pb1 table.ctab th{background:var(--c-soft);text-align:left;font-family:var(--mono);font-size:.66rem;letter-spacing:.05em;text-transform:uppercase;color:var(--c-mut);font-weight:600;padding:10px 14px;border-bottom:2px solid var(--c-bd)}
.pb1 table.ctab th.r,.pb1 table.ctab td.r{text-align:right}
.pb1 table.ctab td{padding:10px 14px;border-bottom:1px solid #eef3f8}
.pb1 table.ctab tbody tr:last-child td{border-bottom:0}
.pb1 .n{font-family:var(--mono);font-variant-numeric:tabular-nums}
.pb1 .acc{border:1px solid var(--c-bd);border-radius:12px;background:#fff;margin-bottom:12px;overflow:hidden}
.pb1 .acc>summary{list-style:none;cursor:pointer;padding:15px 18px;display:flex;align-items:center;gap:12px;font-weight:700;color:var(--c-blue-d)}
.pb1 .acc>summary::-webkit-details-marker{display:none}
.pb1 .acc .chev{width:22px;height:22px;flex:none;border-radius:6px;background:var(--c-soft);display:grid;place-items:center;transition:transform .2s;color:var(--c-blue);font-size:.8rem}
.pb1 .acc[open] .chev{transform:rotate(90deg)}
.pb1 .acc .ameta{margin-left:auto;font-size:.76rem;color:var(--c-mut);font-family:var(--mono);font-weight:400}
.pb1 .acc .abody{padding:0 18px 18px}
.pb1 .distgrid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
@media(max-width:720px){.pb1 .distgrid{grid-template-columns:1fr}}
.pb1 .dblock h5{margin:4px 0 10px;font-family:var(--mono);font-size:.7rem;letter-spacing:.05em;text-transform:uppercase;color:var(--c-mut);font-weight:600}
.pb1 .bars{display:flex;flex-direction:column;gap:7px}
.pb1 .bar{display:grid;grid-template-columns:118px 1fr 48px;gap:10px;align-items:center;font-size:.82rem}
.pb1 .bar .bl{font-family:var(--mono);font-size:.78rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pb1 .bar .bt{height:8px;border-radius:5px;background:var(--c-soft);overflow:hidden;border:1px solid var(--c-bd)}
.pb1 .bar .bf{display:block;height:100%;border-radius:5px;background:linear-gradient(90deg,var(--c-blue),var(--c-cyan))}
.pb1 .bar.v .bf{background:linear-gradient(90deg,var(--viol),#8b63e0)}
.pb1 .bar .bv{font-family:var(--mono);font-size:.78rem;text-align:right;color:var(--c-mut)}
`;

const nf = (n) => n == null ? "—" : Number(n).toLocaleString("es-CO");
const pct = (a, b) => b ? (a / b * 100) : 0;

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

export default function Pb1OracleFusion({ onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose && onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  const M = DATA.maestros;
  const totPb1 = M.reduce((s, m) => s + (m.en_pb1 || 0), 0);
  const totVol = M.reduce((s, m) => s + (m.volumen || 0), 0);

  return (
    <div className="pb1">
      <style>{CSS}</style>
      <div className="ph"><div className="in">
        <button className="back" onClick={() => onClose && onClose()}>← Volver al seguimiento</button>
        <div style={{ minWidth: 0 }}>
          <div className="pt">PB1 · Oracle Fusion</div>
          <div className="ps">Datos de las plantillas usadas en PB1, contrastados contra el volumen inicial del ERP</div>
        </div>
      </div></div>

      <div className="pbody"><div className="pin">
        <p className="lead">
          Conteo de los registros cargados en las plantillas de la primera prueba (PB1) de Oracle
          Fusion para cada maestro, contrastado con el volumen inicial estimado que figura en la
          pestaña ERP. Permite dimensionar qué porción del universo cubre PB1.
        </p>
        <div className="warnbox">
          Estos archivos son muestras de datos de PB1, no las plantillas oficiales de carga; aun así se
          cuentan las cantidades para el contraste. Proveedores está pendiente del archivo.
        </div>

        <div className="cards">
          {M.map((m) => (
            <div className={`mc ${m.key}`} key={m.key}>
              <div className="mn">{m.nombre}</div>
              {m.pendiente ? (
                <>
                  <div className="big">—</div>
                  <div className="biglbl">Registros en PB1</div>
                  <span className="pend">Pendiente de archivo</span>
                  <div className="vs">Volumen inicial (ERP): <b>{nf(m.volumen)}</b></div>
                </>
              ) : (
                <>
                  <div className="big">{nf(m.en_pb1)}</div>
                  <div className="biglbl">Registros en PB1 · {m.columnas} columnas</div>
                  <div className="vs">vs. volumen inicial (ERP): <b>{nf(m.volumen)}</b></div>
                  <div className="covt"><span className="covf" style={{ width: Math.max(1.5, pct(m.en_pb1, m.volumen)) + "%" }} /></div>
                  <div className="covl">{pct(m.en_pb1, m.volumen).toFixed(1)}% del volumen inicial</div>
                  {m.chips && <div className="chips">{m.chips.map((c, i) => <span className="chip" key={i}>{c[0]}: {nf(c[1])}</span>)}</div>}
                </>
              )}
              <div className="cols">{m.nota}</div>
            </div>
          ))}
        </div>

        <div className="ctab-wrap">
          <table className="ctab">
            <thead><tr><th>Maestro</th><th className="r">Registros en PB1</th><th className="r">Volumen inicial (ERP)</th><th className="r">% cobertura</th></tr></thead>
            <tbody>
              {M.map((m) => (
                <tr key={m.key}>
                  <td>{m.nombre}</td>
                  <td className="r n">{m.pendiente ? "—" : nf(m.en_pb1)}</td>
                  <td className="r n">{nf(m.volumen)}</td>
                  <td className="r n">{m.pendiente ? "—" : pct(m.en_pb1, m.volumen).toFixed(1) + "%"}</td>
                </tr>
              ))}
              <tr style={{ fontWeight: 700, background: "var(--c-soft)" }}>
                <td>Total (sin Proveedores)</td>
                <td className="r n">{nf(totPb1)}</td>
                <td className="r n">{nf(totVol)}</td>
                <td className="r n">{pct(totPb1, totVol).toFixed(1)}%</td>
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
      </div></div>
    </div>
  );
}
