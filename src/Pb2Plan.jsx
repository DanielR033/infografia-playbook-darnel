import React, { useState } from "react";
import DATA from "./pb2Plan.json";

const CSS = `
.pb2p{--bg:#eef1f5;--surface:#fff;--surface2:#f6f8fb;--fg:#15202b;--muted:#5b6b7a;--border:#d7dee7;
 --navy:#1f3a5f;--teal:#2e7d7a;--accent:#2e7d7a;--ok:#2e7d55;--ok-soft:#dcefe3;--warn:#9a6a12;--warn-soft:#f7eccf;
 --crit:#a33a34;--crit-soft:#f6ddd9;--info:#2d5b8e;--info-soft:#dbe6f2;--blue:#2d5b8e;
 --mfont:"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--fg)}
.pb2p *{box-sizing:border-box}
.pb2p .eyebrow{font-family:var(--mfont);font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--teal);font-weight:600;margin:0}
.pb2p .h2{font-size:1.4rem;font-weight:700;margin:6px 0 0;letter-spacing:-.01em;color:var(--navy)}
.pb2p .lead{color:var(--muted);max-width:76ch;margin:8px 0 0;font-size:.95rem;line-height:1.5}
.pb2p .num{font-family:var(--mfont);font-variant-numeric:tabular-nums}
.pb2p .kpis{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-top:20px}
.pb2p .kpi{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:16px;position:relative;overflow:hidden}
.pb2p .kpi::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--accent)}
.pb2p .kpi.alt::before{background:var(--navy)}
.pb2p .kpi .v{font-family:var(--mfont);font-weight:600;font-size:1.9rem;letter-spacing:-.02em;line-height:1;color:var(--navy)}
.pb2p .kpi .l{font-size:.78rem;color:var(--muted);margin-top:8px;line-height:1.3}
.pb2p .note{background:var(--surface2);border-left:3px solid var(--accent);border-radius:0 8px 8px 0;padding:11px 14px;margin-top:16px;font-size:.84rem;color:var(--muted)}
.pb2p h3.sec{font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);font-family:var(--mfont);font-weight:600;margin:28px 0 2px}
.pb2p .secd{font-size:.86rem;color:var(--muted);margin:0 0 14px;max-width:76ch;line-height:1.5}
.pb2p .twrap{overflow-x:auto;border:1px solid var(--border);border-radius:14px;background:var(--surface)}
.pb2p table{border-collapse:collapse;width:100%;font-size:.86rem;min-width:860px}
.pb2p thead th{position:sticky;top:0;background:var(--surface2);text-align:left;font-family:var(--mfont);font-size:.64rem;letter-spacing:.05em;text-transform:uppercase;color:var(--muted);font-weight:600;padding:11px 12px;border-bottom:2px solid var(--border);white-space:nowrap}
.pb2p th.r,.pb2p td.r{text-align:right}
.pb2p tbody td{padding:11px 12px;border-bottom:1px solid #eef3f8;vertical-align:middle}
.pb2p tbody tr.main{cursor:pointer}
.pb2p tbody tr.main:hover{background:var(--surface2)}
.pb2p .cx{display:inline-block;width:13px;color:var(--teal);font-size:.7rem;transition:transform .15s;margin-right:5px}
.pb2p tr.main.open .cx{transform:rotate(90deg)}
.pb2p .ob{font-weight:600;color:var(--fg)}
.pb2p .chip{font-family:var(--mfont);font-size:.68rem;font-weight:600;padding:2px 8px;border-radius:999px;white-space:nowrap;display:inline-block}
.pb2p .chip.mod{background:#e4eaf2;color:var(--navy)}
.pb2p .chip.pri{background:var(--crit-soft);color:var(--crit)}
.pb2p .st{font-family:var(--mfont);font-size:.66rem;font-weight:600;padding:2px 8px;border-radius:999px;white-space:nowrap;display:inline-block;margin:2px 4px 2px 0}
.pb2p .st.ok{background:var(--ok-soft);color:var(--ok)}
.pb2p .st.info{background:var(--info-soft);color:var(--info)}
.pb2p .st.warn{background:var(--warn-soft);color:var(--warn)}
.pb2p .st.gray{background:#e9edf2;color:var(--muted)}
.pb2p .big{font-family:var(--mfont);font-weight:600;color:var(--navy)}
.pb2p tr.det td{background:var(--surface2);padding:0}
.pb2p .detbox{padding:4px 16px 16px 30px}
.pb2p .detbox .nota{font-size:.84rem;color:var(--muted);line-height:1.5;margin:10px 0 12px;max-width:90ch}
.pb2p .ptab{width:100%;min-width:0;border-collapse:collapse;font-size:.82rem;background:var(--surface);border:1px solid var(--border);border-radius:10px;overflow:hidden}
.pb2p .ptab th{background:transparent;border-bottom:1px solid var(--border);font-size:.6rem}
.pb2p .ptab td{padding:7px 11px;border-bottom:1px solid #eef3f8}
.pb2p .mono{font-family:var(--mfont)}
.pb2p tfoot td{padding:11px 12px;border-top:2px solid var(--border);font-weight:700;background:var(--surface2);color:var(--navy)}
/* ---- cronograma / gantt ---- */
.pb2p .gantt{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:16px 18px 20px}
.pb2p .gaxis{display:flex;justify-content:space-between;font-family:var(--mfont);font-size:.66rem;color:var(--muted);border-bottom:1px dashed var(--border);padding-bottom:6px;margin:4px 0 2px 190px}
.pb2p .grow{display:grid;grid-template-columns:190px 1fr;gap:12px;align-items:center;padding:7px 0;border-bottom:1px solid #f0f3f7}
.pb2p .grow:last-child{border-bottom:0}
.pb2p .glbl{font-size:.8rem;color:var(--fg);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pb2p .glbl small{color:var(--muted);font-family:var(--mfont)}
.pb2p .gtrack{position:relative;height:22px}
.pb2p .gbar{position:absolute;top:9px;height:4px;border-radius:3px}
.pb2p .gbar.ses{background:var(--blue)}
.pb2p .gbar.car{background:var(--teal)}
.pb2p .gdot{position:absolute;top:4px;width:14px;height:14px;border-radius:50%;transform:translateX(-7px);border:2px solid #fff;box-shadow:0 0 0 1px var(--border)}
.pb2p .gdot.ses{background:var(--blue)}
.pb2p .gdot.car{background:var(--teal)}
.pb2p .gleg{display:flex;gap:18px;margin:12px 0 0 190px;font-size:.78rem;color:var(--muted);flex-wrap:wrap}
.pb2p .gleg .li{display:inline-flex;align-items:center;gap:7px}
.pb2p .gleg .d{width:11px;height:11px;border-radius:50%;display:inline-block}
@media(max-width:820px){.pb2p .kpis{grid-template-columns:1fr 1fr}.pb2p .gaxis,.pb2p .gleg{margin-left:0}.pb2p .grow{grid-template-columns:1fr;gap:4px}}
`;

const nf = (n) => Number(n).toLocaleString("es-CO");
const MES = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
const parse = (s) => { const [d, m, y] = s.split("-"); return new Date(+y, MES[m], +d); };
const fmt = (s) => { const [d, m] = s.split("-"); const ES = { Jan: "ene", Feb: "feb", Mar: "mar", Apr: "abr", May: "may", Jun: "jun", Jul: "jul", Aug: "ago", Sep: "sep", Oct: "oct", Nov: "nov", Dec: "dic" }; return `${d} ${ES[m]}`; };

const toneEstado = (e) => e === "Validado" ? "ok" : e.startsWith("Validado") ? "info" : (e === "Cambiar mecanismo" || e === "Requiere definición") ? "warn" : "gray";

export default function Pb2Plan() {
  const [open, setOpen] = useState({});
  const L = DATA.lineas, T = DATA.tot;
  const toggle = (i) => setOpen((p) => ({ ...p, [i]: !p[i] }));

  // rango del cronograma
  const all = L.flatMap((x) => [x.s1, x.s2, x.c1, x.c2]).map(parse);
  const min = new Date(Math.min(...all)), max = new Date(Math.max(...all));
  const span = (max - min) || 1;
  const pos = (s) => (parse(s) - min) / span * 100;

  return (
    <section className="card pb2p">
      <style>{CSS}</style>
      <p className="eyebrow">Playback 2 · Frente de datos</p>
      <h2 className="h2">Planeación PB2: alcance, plantillas y fechas</h2>

      <div className="kpis">
        <div className="kpi"><div className="v">{T.lineas}</div><div className="l">Líneas de alcance PB2</div></div>
        <div className="kpi alt"><div className="v">{T.objetosPB2}</div><div className="l">Objetos de datos (plan PB2)</div></div>
        <div className="kpi"><div className="v">{T.plantillas}</div><div className="l">Plantillas Oracle a trabajar</div></div>
        <div className="kpi"><div className="v">{T.hojas}</div><div className="l">Hojas (tabs) en las plantillas</div></div>
        <div className="kpi"><div className="v">{nf(T.cols)}</div><div className="l">Columnas a mapear/poblar</div></div>
      </div>

      <h3 className="sec">Cruce de alcance PB2 × levantamiento de plantillas</h3>
      <p className="secd">Toca una fila para ver las plantillas que la componen (archivo, hojas y columnas medidas) y las observaciones del cruce. «Objetos» es lo que declara el plan PB2; «Plantillas / Hojas / Columnas» es lo que ya tenemos levantado.</p>
      <div className="twrap">
        <table>
          <thead><tr>
            <th>Objeto de datos / alcance</th><th>Módulo</th><th className="r">Objetos</th>
            <th className="r">Plantillas</th><th className="r">Hojas</th><th className="r">Columnas</th>
          </tr></thead>
          <tbody>
            {L.map((x, i) => (
              <React.Fragment key={i}>
                <tr className={`main ${open[i] ? "open" : ""}`} onClick={() => toggle(i)}>
                  <td><span className="cx">▶</span><span className="ob">{x.objeto}</span></td>
                  <td><span className="chip mod">{x.modulo}</span></td>
                  <td className="r big">{x.objetosPB2}</td>
                  <td className="r big">{x.nPlant}</td>
                  <td className="r big">{x.nHojas}</td>
                  <td className="r big">{nf(x.nCols)}</td>
                </tr>
                {open[i] && (
                  <tr className="det"><td colSpan={6}><div className="detbox">
                    <p className="nota">{x.nota}</p>
                    <table className="ptab">
                      <thead><tr><th>Plantilla</th><th>Archivo</th><th>Lectura</th><th className="r">Hojas</th><th className="r">Columnas</th></tr></thead>
                      <tbody>
                        {x.plantillas.map((p, k) => (
                          <tr key={k}>
                            <td className="mono">{p.id}</td>
                            <td className="mono">{p.archivo || "—"}</td>
                            <td>{p.lectura}</td>
                            <td className="r mono">{p.hojas}</td>
                            <td className="r mono">{nf(p.cols)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div></td></tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total PB2</td><td></td>
              <td className="r">{T.objetosPB2}</td><td className="r">{T.plantillas}</td>
              <td className="r">{T.hojas}</td><td className="r">{nf(T.cols)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <h3 className="sec">Cronograma PB2</h3>
      <p className="secd">Dos sesiones de plantilla por objeto (preparación) y dos ventanas de carga (migración real), entre el {fmt(L[0].s1)} de 2026 y el {fmt(L[0].c2)} de 2027.</p>
      <div className="gantt">
        <div className="gaxis"><span>{fmt(L.reduce((a, x) => parse(x.s1) < parse(a) ? x.s1 : a, L[0].s1))} 2026</span><span>ene 2027</span><span>{fmt(L.reduce((a, x) => parse(x.c2) > parse(a) ? x.c2 : a, L[0].c2))} 2027</span></div>
        {L.map((x, i) => (
          <div className="grow" key={i}>
            <div className="glbl">{x.objeto.length > 26 ? x.objeto.slice(0, 25) + "…" : x.objeto} <small>· {x.modulo}</small></div>
            <div className="gtrack">
              <div className="gbar ses" style={{ left: pos(x.s1) + "%", width: (pos(x.s2) - pos(x.s1)) + "%" }} />
              <div className="gbar car" style={{ left: pos(x.c1) + "%", width: (pos(x.c2) - pos(x.c1)) + "%" }} />
              <div className="gdot ses" style={{ left: pos(x.s1) + "%" }} title={`Sesión plantilla 1: ${x.s1}`} />
              <div className="gdot ses" style={{ left: pos(x.s2) + "%" }} title={`Sesión plantilla 2: ${x.s2}`} />
              <div className="gdot car" style={{ left: pos(x.c1) + "%" }} title={`Carga 1: ${x.c1}`} />
              <div className="gdot car" style={{ left: pos(x.c2) + "%" }} title={`Carga 2: ${x.c2}`} />
            </div>
          </div>
        ))}
        <div className="gleg">
          <span className="li"><span className="d" style={{ background: "var(--blue)" }} /> Sesión de plantilla (preparación)</span>
          <span className="li"><span className="d" style={{ background: "var(--teal)" }} /> Ventana de carga (migración)</span>
        </div>
      </div>

      <h3 className="sec">Detalle del plan (responsables y fechas)</h3>
      <div className="twrap">
        <table>
          <thead><tr>
            <th>Prioridad</th><th>Objeto de datos / alcance</th><th>Módulo</th><th className="r">Objetos</th>
            <th>Responsable</th><th>Sesión plantilla 1</th><th>Sesión plantilla 2</th><th>Carga 1</th><th>Carga 2</th>
          </tr></thead>
          <tbody>
            {L.map((x, i) => (
              <tr key={i}>
                <td><span className="chip pri">{x.pri}</span></td>
                <td className="ob">{x.objeto}</td>
                <td><span className="chip mod">{x.modulo}</span></td>
                <td className="r big">{x.objetosPB2}</td>
                <td>{x.resp}</td>
                <td className="mono">{fmt(x.s1)}</td>
                <td className="mono">{fmt(x.s2)}</td>
                <td className="mono">{fmt(x.c1)}</td>
                <td className="mono">{fmt(x.c2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="note">
        Cruce propuesto por el frente de datos a partir del inventario de plantillas 26C; las cifras de hojas y
        columnas provienen de las plantillas ya leídas. Objetos vía API/spec (Ítems WMS, OTM) se miden a nivel de
        especificación, no de plantilla FBDI. Debe validarse con cada responsable funcional antes de ejecutar PB2.
      </div>
    </section>
  );
}
