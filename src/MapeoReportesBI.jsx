import React, { useState, useEffect, useMemo } from "react";
import DATA from "./mapeoReportesBI.json";

const CSS = `
.mapbi{--c-blue:#0058a8;--c-blue-d:#003b70;--c-cyan:#00a7e1;--c-ink:#1f2b3a;--c-mut:#5b6b7a;
 --c-bd:#d9e3ef;--c-soft:#f3f8fd;--ok:#0f8f6c;--ok-s:#e6f7ef;--teal:#2e7d7a;--warn:#c67c12;--warn-s:#fdf2dc;
 --crit:#b5323b;--crit-s:#fbe3e4;--mono:"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace;
 position:fixed;inset:0;z-index:5000;background:#eef1f5;display:flex;flex-direction:column;color:var(--c-ink);
 font-family:inherit}
.mapbi .mb-head{background:linear-gradient(120deg,var(--c-blue-d),var(--c-blue) 70%,var(--c-cyan));color:#fff}
.mapbi .mb-head .inner{max-width:1180px;margin:0 auto;padding:16px max(16px,env(safe-area-inset-left,0));display:flex;flex-wrap:wrap;gap:12px 16px;align-items:center}
.mapbi .back{appearance:none;border:1px solid rgba(255,255,255,.3);background:rgba(255,255,255,.12);color:#fff;font:inherit;font-weight:600;font-size:.86rem;border-radius:999px;padding:9px 17px;cursor:pointer;flex:none}
.mapbi .back:hover{background:rgba(255,255,255,.22)}
.mapbi .mb-title{font-weight:700;font-size:1.12rem;line-height:1.15}
.mapbi .mb-sub{font-size:.76rem;color:#cfe0f2;margin-top:2px}
.mapbi .mb-body{overflow-y:auto;flex:1}
.mapbi .mb-inner{max-width:1180px;margin:0 auto;padding:22px max(16px,env(safe-area-inset-left,0)) 48px}
.mapbi .lead{color:var(--c-mut);font-size:.9rem;line-height:1.55;max-width:80ch;margin:0 0 18px}
.mapbi .kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:18px}
.mapbi .kpi{background:#fff;border:1px solid var(--c-bd);border-radius:12px;padding:15px;position:relative;overflow:hidden}
.mapbi .kpi::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--c-blue)}
.mapbi .kpi.ok::before{background:var(--ok)}.mapbi .kpi.warn::before{background:var(--warn)}.mapbi .kpi.crit::before{background:var(--crit)}
.mapbi .kpi .v{font-family:var(--mono);font-weight:600;font-size:1.6rem;line-height:1;color:var(--c-blue-d)}
.mapbi .kpi.ok .v{color:var(--ok)}.mapbi .kpi.warn .v{color:var(--warn)}.mapbi .kpi.crit .v{color:var(--crit)}
.mapbi .kpi .l{font-size:.74rem;color:var(--c-mut);margin-top:7px;line-height:1.3}
.mapbi .stbox{background:#fff;border:1px solid var(--c-bd);border-radius:12px;padding:16px 18px;margin-bottom:24px}
.mapbi .stbox h4{margin:0 0 12px;font-family:var(--mono);font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;color:var(--c-mut);font-weight:600}
.mapbi .stbar{height:18px;border-radius:9px;overflow:hidden;display:flex;border:1px solid var(--c-bd)}
.mapbi .stbar span{height:100%}
.mapbi .leg{display:flex;flex-wrap:wrap;gap:16px;margin-top:12px;font-size:.82rem}
.mapbi .leg .li{display:inline-flex;align-items:center;gap:7px}
.mapbi .leg .dot{width:11px;height:11px;border-radius:3px;display:inline-block}
.mapbi .leg .num{font-family:var(--mono);font-weight:600}
.mapbi .acc{border:1px solid var(--c-bd);border-radius:12px;background:#fff;margin-bottom:12px;overflow:hidden}
.mapbi .acc>summary{list-style:none;cursor:pointer;padding:15px 18px;display:flex;align-items:center;gap:12px;font-weight:700;color:var(--c-blue-d)}
.mapbi .acc>summary::-webkit-details-marker{display:none}
.mapbi .acc .chev{width:22px;height:22px;flex:none;border-radius:6px;background:var(--c-soft);display:grid;place-items:center;transition:transform .2s;color:var(--c-blue);font-size:.8rem}
.mapbi .acc[open] .chev{transform:rotate(90deg)}
.mapbi .acc .ameta{margin-left:auto;font-size:.76rem;color:var(--c-mut);font-family:var(--mono);font-weight:400}
.mapbi .acc .abody{padding:0 18px 18px}
.mapbi .tbar-list{display:flex;flex-direction:column;gap:9px}
.mapbi .trow{display:grid;grid-template-columns:230px 1fr 54px;gap:12px;align-items:center;font-size:.84rem}
.mapbi .trow .tn{font-family:var(--mono);font-size:.8rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mapbi .trow .tn small{color:var(--c-mut)}
.mapbi .trow .tt{height:9px;border-radius:5px;background:var(--c-soft);overflow:hidden;display:flex;border:1px solid var(--c-bd)}
.mapbi .trow .tt span{height:100%}
.mapbi .trow .tp{font-family:var(--mono);font-weight:600;text-align:right;font-size:.82rem}
.mapbi .search{width:100%;background:#fff;border:1px solid var(--c-bd);border-radius:10px;padding:9px 12px;font:inherit;font-size:.86rem;margin-bottom:10px}
.mapbi .search:focus{outline:2px solid var(--c-blue);outline-offset:1px}
.mapbi .twrap{overflow-x:auto;border:1px solid var(--c-bd);border-radius:10px}
.mapbi table{border-collapse:collapse;width:100%;font-size:.82rem;min-width:720px}
.mapbi table th{position:sticky;top:0;background:var(--c-soft);text-align:left;font-family:var(--mono);font-size:.64rem;letter-spacing:.05em;text-transform:uppercase;color:var(--c-mut);font-weight:600;padding:9px 11px;border-bottom:2px solid var(--c-bd);white-space:nowrap}
.mapbi table td{padding:8px 11px;border-bottom:1px solid #eef3f8;vertical-align:top}
.mapbi .mono{font-family:var(--mono);font-size:.78rem}
.mapbi .desc{color:var(--c-mut);max-width:42ch}
.mapbi .st{font-family:var(--mono);font-size:.7rem;font-weight:600;padding:2px 8px;border-radius:999px;white-space:nowrap}
.mapbi .st.rev{background:var(--ok-s);color:var(--ok)}
.mapbi .st.anot{background:#dcebe9;color:var(--teal)}
.mapbi .st.blanco{background:var(--warn-s);color:var(--warn)}
.mapbi .st.noex{background:var(--crit-s);color:var(--crit)}
.mapbi .count{font-size:.78rem;color:var(--c-mut);font-family:var(--mono);margin-bottom:8px;display:block}
@media(max-width:820px){.mapbi .kpis{grid-template-columns:1fr 1fr}.mapbi .trow{grid-template-columns:150px 1fr 48px}}
`;

const nf = (n) => Number(n).toLocaleString("es-CO");
const COLORS = { Revisado: "var(--ok)", "Revisado - Anotación": "var(--teal)", "(en blanco)": "var(--warn)", "No Existe": "var(--crit)" };
const stClass = (s) => s === "Revisado" ? "rev" : s === "Revisado - Anotación" ? "anot" : s === "No Existe" ? "noex" : "blanco";

export default function MapeoReportesBI({ onClose }) {
  const [q, setQ] = useState("");
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose && onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  const T = DATA.total;
  const revis = DATA.premapeo.filter((p) => p[0].startsWith("Revisado")).reduce((a, p) => a + p[1], 0);
  const blanco = DATA.premapeo.find((p) => p[0] === "(en blanco)")?.[1] || 0;
  const noex = DATA.premapeo.find((p) => p[0] === "No Existe")?.[1] || 0;
  const pct = (n) => (n / T * 100);

  const campos = useMemo(() => {
    const Q = q.trim().toLowerCase();
    if (!Q) return DATA.campos;
    return DATA.campos.filter((c) => `${c.tabla} ${c.campo} ${c.desc} ${c.entidad} ${c.atributo} ${c.status}`.toLowerCase().includes(Q));
  }, [q]);

  return (
    <div className="mapbi">
      <style>{CSS}</style>
      <div className="mb-head"><div className="inner">
        <button className="back" onClick={() => onClose && onClose()}>← Volver al seguimiento</button>
        <div style={{ minWidth: 0 }}>
          <div className="mb-title">Seguimiento mapeo de reportes BI → WMS Cloud</div>
          <div className="mb-sub">Continuidad de los reportes de BI para el momento de la migración · pre-mapeo de campos fuente</div>
        </div>
      </div></div>

      <div className="mb-body"><div className="mb-inner">
        <p className="lead">
          Objetivo: dar continuidad a los reportes que hoy tiene BI una vez se ejecute la migración a
          WMS Cloud. Esta vista muestra el avance del pre-mapeo de los {nf(T)} campos fuente a las
          entidades y atributos de WMS Cloud. El detalle se despliega en los acordeones de abajo.
        </p>

        {/* ---- Estadísticas de % Avance Pre-Mapeo ---- */}
        <div className="kpis">
          <div className="kpi"><div className="v">{nf(T)}</div><div className="l">Campos fuente a mapear</div></div>
          <div className="kpi ok"><div className="v">{nf(revis)}</div><div className="l">Revisados ({pct(revis).toFixed(1)}%)</div></div>
          <div className="kpi warn"><div className="v">{nf(blanco)}</div><div className="l">Pendientes · en blanco ({pct(blanco).toFixed(1)}%)</div></div>
          <div className="kpi crit"><div className="v">{nf(noex)}</div><div className="l">No existen en destino ({pct(noex).toFixed(1)}%)</div></div>
        </div>

        <div className="stbox">
          <h4>% Avance pre-mapeo por estado</h4>
          <div className="stbar">
            {DATA.premapeo.map((p, i) => p[1] > 0 && (
              <span key={i} style={{ width: pct(p[1]) + "%", background: COLORS[p[0]] }} title={`${p[0]}: ${p[1]}`} />
            ))}
          </div>
          <div className="leg">
            {DATA.premapeo.map((p, i) => (
              <span className="li" key={i}>
                <i className="dot" style={{ background: COLORS[p[0]] }} />
                {p[0]} · <span className="num">{nf(p[1])}</span> <span style={{ color: "var(--c-mut)" }}>({pct(p[1]).toFixed(1)}%)</span>
              </span>
            ))}
          </div>
        </div>

        {/* ---- Acordeones de detalle ---- */}
        <details className="acc" open>
          <summary><span className="chev">▶</span> Avance por tabla fuente <span className="ameta">{DATA.portabla.length} tablas</span></summary>
          <div className="abody">
            <div className="tbar-list">
              {DATA.portabla.map((t, i) => (
                <div className="trow" key={i}>
                  <span className="tn">{t.tabla} <small>· {t.fuente} · {t.total} campos</small></span>
                  <span className="tt">
                    {t.rev > 0 && <span style={{ width: t.rev / t.total * 100 + "%", background: "var(--ok)" }} />}
                    {t.anot > 0 && <span style={{ width: t.anot / t.total * 100 + "%", background: "var(--teal)" }} />}
                    {t.blanco > 0 && <span style={{ width: t.blanco / t.total * 100 + "%", background: "var(--warn)" }} />}
                    {t.noexiste > 0 && <span style={{ width: t.noexiste / t.total * 100 + "%", background: "var(--crit)" }} />}
                  </span>
                  <span className="tp">{t.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </details>

        <details className="acc">
          <summary><span className="chev">▶</span> Detalle de campos · mapeo a WMS Cloud <span className="ameta">{DATA.campos.length} campos</span></summary>
          <div className="abody">
            <input className="search" placeholder="Filtrar por tabla, campo, entidad, atributo o estado…" value={q} onChange={(e) => setQ(e.target.value)} />
            <span className="count">{campos.length} / {DATA.campos.length}</span>
            <div className="twrap">
              <table>
                <thead><tr>
                  <th>Tabla · Campo fuente</th><th>Descripción</th><th>Entidad WMS</th><th>Atributo</th><th>Estado</th>
                </tr></thead>
                <tbody>
                  {campos.map((c, i) => (
                    <tr key={i}>
                      <td className="mono">{c.tabla}<br /><b>{c.campo}</b></td>
                      <td className="desc">{c.desc}</td>
                      <td className="mono">{c.entidad || "—"}</td>
                      <td className="mono">{c.atributo || "—"}</td>
                      <td><span className={`st ${stClass(c.status)}`}>{c.status}</span></td>
                    </tr>
                  ))}
                  {campos.length === 0 && <tr><td colSpan={5} style={{ padding: 14, color: "var(--c-mut)" }}>Sin coincidencias.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </details>

        <details className="acc">
          <summary><span className="chev">▶</span> Tablas fuente <span className="ameta">{DATA.tablas.length} tablas</span></summary>
          <div className="abody">
            <div className="twrap">
              <table>
                <thead><tr><th>Fuente</th><th>Tabla</th><th>Descripción</th></tr></thead>
                <tbody>
                  {DATA.tablas.map((t, i) => (
                    <tr key={i}><td className="mono">{t.fuente}</td><td className="mono">{t.tabla}</td><td className="desc" style={{ maxWidth: "60ch" }}>{t.desc || "—"}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </details>

        <details className="acc">
          <summary><span className="chev">▶</span> Relación bodega ↔ organización de inventario <span className="ameta">{DATA.relbod.length} relaciones</span></summary>
          <div className="abody">
            <div className="twrap">
              <table>
                <thead><tr><th>Wh_Id (bodega WMS)</th><th>BU INV PS (organización inventario)</th></tr></thead>
                <tbody>
                  {DATA.relbod.map((r, i) => (
                    <tr key={i}><td className="mono">{r[0]}</td><td className="mono">{r[1]}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </details>
      </div></div>
    </div>
  );
}
