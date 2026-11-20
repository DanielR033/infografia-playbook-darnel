import React from "react";

/*
 * Piezas visuales compartidas por los tableros de control (WMS, ERP):
 * estilos base, gauge semicircular con bandas de semáforo y semáforo de tres luces.
 *
 * Criterio de semáforo único para todos los indicadores de avance:
 *   verde  ≥ 90 %   ·   ámbar 70 % – 89,9 %   ·   rojo < 70 %
 */
export const UMBRAL = { verde: 90, ambar: 70 };

export const toneOf = (p) =>
  p === null || p === undefined || !isFinite(p) ? "na" : p >= UMBRAL.verde ? "ok" : p >= UMBRAL.ambar ? "warn" : "crit";

export const CTL_CSS = `
.wmsc{--fg:#1f2b3a;--muted:#5b6b7a;--line:#d7dee7;--line2:#edf1f5;--soft:#f5f8fb;
 --blue:#0058a8;--navy:#003b70;--ok:#2e7d55;--ok-soft:#dcefe3;--warn:#9a6a12;--warn-soft:#f7eccf;
 --crit:#a33a34;--crit-soft:#f6ddd9;--gray:#8a96a3;--mono:"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace;
 display:grid;gap:1.2rem;color:var(--fg)}
.wmsc *{box-sizing:border-box}
.wmsc .blk{background:#fff;border:1px solid var(--line);border-radius:16px;padding:20px 22px;min-width:0}
.wmsc .eyebrow{font-family:var(--mono);font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:var(--blue);font-weight:600;margin:0}
.wmsc h2{font-size:1.25rem;margin:4px 0 0;color:var(--navy);letter-spacing:-.01em}
.wmsc .lead{color:var(--muted);font-size:.9rem;margin:6px 0 0;max-width:80ch;line-height:1.5}
.wmsc .n{font-family:var(--mono);font-variant-numeric:tabular-nums}
.wmsc .meta{display:flex;flex-wrap:wrap;gap:.3rem 2rem;margin-top:12px;padding-top:10px;border-top:1px solid var(--line2);font-size:.8rem;color:var(--muted)}
.wmsc .meta b{color:var(--fg)}
/* KPIs */
.wmsc .kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-top:16px}
.wmsc .kpi{border:1px solid var(--line);border-radius:12px;padding:14px;position:relative;overflow:hidden;background:#fff}
.wmsc .kpi::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--blue)}
.wmsc .kpi.ok::before{background:var(--ok)}.wmsc .kpi.warn::before{background:var(--warn)}.wmsc .kpi.crit::before{background:var(--crit)}
.wmsc .kpi .v{font-family:var(--mono);font-size:1.65rem;font-weight:600;line-height:1;color:var(--navy);letter-spacing:-.02em}
.wmsc .kpi .v small{font-size:.9rem;color:var(--muted);font-weight:500}
.wmsc .kpi .l{font-size:.8rem;font-weight:600;margin-top:8px;line-height:1.3}
.wmsc .kpi .f{font-size:.72rem;color:var(--muted);margin-top:5px;line-height:1.35}
.wmsc .meter{height:6px;background:var(--line2);border-radius:3px;margin-top:9px;overflow:hidden}
.wmsc .meter i{display:block;height:100%;background:var(--blue)}
.wmsc .kpi.ok .meter i{background:var(--ok)}.wmsc .kpi.warn .meter i{background:var(--warn)}.wmsc .kpi.crit .meter i{background:var(--crit)}
/* tablas */
.wmsc .tw{overflow-x:auto;border:1px solid var(--line);border-radius:12px;margin-top:14px}
.wmsc table{border-collapse:collapse;width:100%;font-size:.85rem}
.wmsc thead th{background:var(--soft);text-align:left;font-family:var(--mono);font-size:.66rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);font-weight:600;padding:10px 9px;border-bottom:2px solid var(--line);white-space:nowrap;vertical-align:bottom}
.wmsc tbody td{padding:9px 9px;border-bottom:1px solid var(--line2);vertical-align:top}
.wmsc tbody tr:last-child td{border-bottom:0}
.wmsc tfoot td{padding:9px 9px;border-top:2px solid var(--line);font-weight:700;background:var(--soft)}
.wmsc .r{text-align:right;white-space:nowrap}
.wmsc .c{text-align:center}
.wmsc .sub{display:block;font-size:.72rem;color:var(--muted);font-weight:400}
.wmsc .grp{border-left:2px solid var(--line)}
.wmsc .pos{color:var(--ok);font-weight:600}.wmsc .neg{color:var(--crit);font-weight:600}.wmsc .dim{color:var(--gray)}
/* estados */
.wmsc .st{display:inline-block;font-size:.7rem;font-weight:700;letter-spacing:.03em;padding:2px 8px;border-radius:999px;white-space:nowrap}
.wmsc .st.ok{background:var(--ok-soft);color:var(--ok)}.wmsc .st.warn{background:var(--warn-soft);color:var(--warn)}
.wmsc .st.crit{background:var(--crit-soft);color:var(--crit)}.wmsc .st.gray{background:var(--line2);color:var(--muted)}
.wmsc .dot{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:6px;vertical-align:0}
.wmsc .dot.ok{background:var(--ok)}.wmsc .dot.warn{background:var(--warn)}.wmsc .dot.crit{background:var(--crit)}
/* embudo */
.wmsc .funnels{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:14px;margin-top:16px}
.wmsc .fn{border:1px solid var(--line);border-radius:12px;padding:14px}
.wmsc .fn h3{margin:0 0 10px;font-size:.95rem;color:var(--navy)}
.wmsc .fr{display:grid;grid-template-columns:76px 1fr 64px;gap:8px;align-items:center;margin:6px 0;font-size:.76rem}
.wmsc .fr .cap{color:var(--muted);line-height:1.2}
.wmsc .bar{background:var(--line2);border-radius:4px;height:16px;position:relative}
.wmsc .bar i{position:absolute;left:0;top:0;bottom:0;border-radius:4px;background:var(--blue)}
.wmsc .bar i.src{background:#9aa9ba}.wmsc .bar i.uat{background:var(--navy)}.wmsc .bar i.ld{background:var(--ok)}
.wmsc .fr .val{font-family:var(--mono);font-size:.74rem;font-weight:600;text-align:right;white-space:nowrap}
.wmsc .fr .val.wrap{white-space:normal;text-align:left;grid-column:span 2;font-weight:500}
.wmsc .fr .val.dim{color:var(--gray);font-weight:500}
.wmsc .fn .ft{font-size:.72rem;color:var(--muted);margin-top:8px;border-top:1px solid var(--line2);padding-top:7px}
/* reglas */
.wmsc .rstack{display:flex;height:16px;border-radius:4px;overflow:hidden;min-width:120px;background:var(--line2)}
.wmsc .rstack .a{background:var(--blue)}.wmsc .rstack .b{background:#9fc3e6}
.wmsc .key{display:flex;flex-wrap:wrap;gap:.3rem 1.2rem;font-size:.76rem;color:var(--muted);margin-top:10px}
.wmsc .sw{display:inline-block;width:10px;height:10px;border-radius:2px;margin-right:5px;vertical-align:-1px}
.wmsc details{border:1px solid var(--line);border-radius:10px;margin-top:10px;background:#fff}
.wmsc summary{cursor:pointer;padding:10px 14px;font-weight:600;font-size:.86rem;color:var(--navy)}
.wmsc details[open] summary{border-bottom:1px solid var(--line2)}
.wmsc details .tw{margin:10px;border-radius:8px}
.wmsc .id{font-family:var(--mono);font-size:.74rem;color:var(--muted);white-space:nowrap}
.wmsc .note{background:var(--soft);border-left:3px solid var(--blue);border-radius:0 8px 8px 0;padding:10px 13px;margin-top:14px;font-size:.8rem;color:var(--muted);line-height:1.5}
.wmsc .note b{color:var(--fg)}
.wmsc .note.warn{background:var(--warn-soft);border-left-color:var(--warn);color:#4e3f1d}
.wmsc .defs{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:8px 22px;margin-top:12px;font-size:.8rem;color:var(--muted);line-height:1.45}
.wmsc .defs b{color:var(--fg)}
@media (max-width:640px){.wmsc .blk{padding:16px 14px}.wmsc .kpi .v{font-size:1.35rem}}

/* ---- gauges y semáforos ---- */
.wmsc .gauges{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-top:16px}
.wmsc .gauge{border:1px solid var(--line);border-radius:12px;padding:10px 8px 12px;text-align:center;background:#fff;min-width:0}
.wmsc .gauge svg{width:100%;max-width:190px;height:auto;display:block;margin:0 auto}
.wmsc .gauge .gv{font-family:var(--mono);font-size:1.3rem;font-weight:700;margin-top:6px;line-height:1}
.wmsc .gauge .gv.ok{color:var(--ok)}.wmsc .gauge .gv.warn{color:var(--warn)}.wmsc .gauge .gv.crit{color:var(--crit)}.wmsc .gauge .gv.na{color:var(--gray);font-size:1rem}
.wmsc .gauge .gl{font-size:.8rem;font-weight:600;margin-top:6px;line-height:1.3}
.wmsc .gauge .gf{font-size:.72rem;color:var(--muted);margin-top:4px;line-height:1.35}
.wmsc .light{display:inline-flex;gap:3px;padding:3px 5px;background:#26323f;border-radius:999px;vertical-align:middle}
.wmsc .light i{width:9px;height:9px;border-radius:50%;background:#4a5664;display:block}
.wmsc .light i.on.crit{background:#ff5b4f;box-shadow:0 0 6px #ff5b4f}
.wmsc .light i.on.warn{background:#ffc23d;box-shadow:0 0 6px #ffc23d}
.wmsc .light i.on.ok{background:#3ddc84;box-shadow:0 0 6px #3ddc84}
.wmsc .light.na i{background:#4a5664}
.wmsc .light.lg{gap:5px;padding:5px 8px}.wmsc .light.lg i{width:14px;height:14px}
.wmsc .legend{display:flex;flex-wrap:wrap;gap:.4rem 1.4rem;font-size:.75rem;color:var(--muted);margin-top:12px;align-items:center}
.wmsc .legend b{color:var(--fg)}
.wmsc .board{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:10px;margin-top:16px}
.wmsc .bi{display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:center;border:1px solid var(--line);border-radius:12px;padding:11px 13px;background:#fff}
.wmsc .bi.crit{border-left:4px solid var(--crit)}.wmsc .bi.warn{border-left:4px solid var(--warn)}.wmsc .bi.ok{border-left:4px solid var(--ok)}.wmsc .bi.na{border-left:4px solid var(--gray)}
.wmsc .bi .t{font-weight:700;font-size:.86rem;color:var(--navy)}
.wmsc .bi .d{font-size:.74rem;color:var(--muted);margin-top:2px;line-height:1.35}
.wmsc .pend{display:inline-block;font-size:.72rem;font-weight:600;color:var(--warn);background:var(--warn-soft);border:1px dashed #d9bf7f;border-radius:6px;padding:1px 7px;white-space:nowrap}
.wmsc .anchor{scroll-margin-top:16px}
.wmsc a.qlink{color:var(--blue);font-weight:600;text-decoration:none}
.wmsc a.qlink:hover{text-decoration:underline}
`;

const COLORS = { crit: "#a33a34", warn: "#c08a1e", ok: "#2e7d55", na: "#9aa6b2" };
const BAND = { crit: "#f6ddd9", warn: "#f7eccf", ok: "#dcefe3" };

const pt = (cx, cy, r, p) => {
  const a = Math.PI * (1 - p / 100);
  return [cx + r * Math.cos(a), cy - r * Math.sin(a)];
};
const arc = (cx, cy, r, p0, p1) => {
  const [x0, y0] = pt(cx, cy, r, p0);
  const [x1, y1] = pt(cx, cy, r, p1);
  return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
};

/** Gauge semicircular 0–100 % con bandas rojo/ámbar/verde y aguja. */
export function Gauge({ value, label, foot, display, decimals = 0 }) {
  const has = value !== null && value !== undefined && isFinite(value);
  const v = has ? Math.max(0, Math.min(100, value)) : 0;
  const tone = toneOf(has ? value : null);
  const cx = 95, cy = 92, r = 72;
  const [nx, ny] = pt(cx, cy, r - 18, v);
  const txt = display ?? (has ? `${value.toLocaleString("es-CO", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })} %` : "Por confirmar");
  return (
    <div className="gauge">
      <svg viewBox="0 0 190 104" role="img" aria-label={`${label}: ${txt}`}>
        <path d={arc(cx, cy, r, 0, UMBRAL.ambar)} stroke={BAND.crit} strokeWidth="16" fill="none" />
        <path d={arc(cx, cy, r, UMBRAL.ambar, UMBRAL.verde)} stroke={BAND.warn} strokeWidth="16" fill="none" />
        <path d={arc(cx, cy, r, UMBRAL.verde, 100)} stroke={BAND.ok} strokeWidth="16" fill="none" />
        {has && v > 0.2 && <path d={arc(cx, cy, r, 0, v)} stroke={COLORS[tone]} strokeWidth="8" fill="none" strokeLinecap="round" />}
        {[UMBRAL.ambar, UMBRAL.verde].map((t) => {
          const [a1, b1] = pt(cx, cy, r + 9, t);
          const [a2, b2] = pt(cx, cy, r - 9, t);
          return <line key={t} x1={a1} y1={b1} x2={a2} y2={b2} stroke="#fff" strokeWidth="2" />;
        })}
        {has && <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#1f2b3a" strokeWidth="3" strokeLinecap="round" />}
        <circle cx={cx} cy={cy} r="6" fill={has ? "#1f2b3a" : "#c3ccd6"} />
        <text x={cx - r} y={cy + 12} fontSize="9" textAnchor="middle" fill="#8a96a3">0</text>
        <text x={cx + r} y={cy + 12} fontSize="9" textAnchor="middle" fill="#8a96a3">100</text>
      </svg>
      <div className={`gv ${tone}`}>{txt}</div>
      <div className="gl">{label}</div>
      {foot && <div className="gf">{foot}</div>}
    </div>
  );
}

/** Semáforo de tres luces. tone: "crit" | "warn" | "ok" | "na" */
export function Light({ tone, big }) {
  return (
    <span className={`light ${big ? "lg" : ""} ${tone === "na" ? "na" : ""}`} title={{ crit: "Rojo", warn: "Ámbar", ok: "Verde", na: "Sin dato" }[tone]}>
      <i className={tone === "crit" ? "on crit" : ""} />
      <i className={tone === "warn" ? "on warn" : ""} />
      <i className={tone === "ok" ? "on ok" : ""} />
    </span>
  );
}

export function Legend({ extra }) {
  return (
    <div className="legend">
      <span><Light tone="ok" /> <b>Verde</b> ≥ {UMBRAL.verde} %</span>
      <span><Light tone="warn" /> <b>Ámbar</b> {UMBRAL.ambar} % – 89,9 %</span>
      <span><Light tone="crit" /> <b>Rojo</b> &lt; {UMBRAL.ambar} % o bloqueado</span>
      <span><Light tone="na" /> <b>Sin dato</b> por confirmar</span>
      {extra}
    </div>
  );
}
