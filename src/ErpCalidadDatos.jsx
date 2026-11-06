import React, { useMemo, useState } from "react";
import DATA from "./erpCalidadDatos.json";

const CSS = `
.erpcal{--c-blue:#0058a8;--c-blue-d:#003b70;--c-cyan:#00a7e1;--c-ink:#1f2b3a;--c-mut:#5b6b7a;
 --c-bd:#d9e3ef;--c-soft:#f3f8fd;--ok:#0f8f6c;--ok-s:#e6f7ef;--warn:#c67c12;--warn-s:#fdf2dc;
 --crit:#b5323b;--crit-s:#fbe3e4;--mono:"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace}
.erpcal .cal-kpis{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin:4px 0 20px}
.erpcal .cal-kpi{background:linear-gradient(180deg,#fcfeff,#f2f8ff);border:1px solid var(--c-bd);border-radius:12px;padding:14px}
.erpcal .cal-kpi .v{font-family:var(--mono);font-weight:600;font-size:1.55rem;line-height:1;color:var(--c-blue-d)}
.erpcal .cal-kpi .l{font-size:.74rem;color:var(--c-mut);margin-top:7px;line-height:1.25}
.erpcal .cal-kpi.crit .v{color:var(--crit)}.erpcal .cal-kpi.warn .v{color:var(--warn)}
.erpcal .cal-sub{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:18px}
@media(max-width:820px){.erpcal .cal-kpis{grid-template-columns:repeat(2,1fr)}.erpcal .cal-sub{grid-template-columns:1fr}}
.erpcal .cal-box{border:1px solid var(--c-bd);border-radius:12px;background:#fff;padding:16px}
.erpcal .cal-box h4{margin:0 0 12px;font-size:.78rem;letter-spacing:.06em;text-transform:uppercase;color:var(--c-mut);font-family:var(--mono)}
.erpcal .dbar{margin-bottom:12px}
.erpcal .dbar:last-child{margin-bottom:0}
.erpcal .dbar .dbl{display:flex;justify-content:space-between;font-size:.85rem;margin-bottom:5px}
.erpcal .dbar .dbl b{font-family:var(--mono)}
.erpcal .dbar .track{height:9px;border-radius:6px;background:#e9f0f8;overflow:hidden}
.erpcal .dbar .fill{height:100%;border-radius:6px;background:linear-gradient(90deg,var(--c-blue),var(--c-cyan))}
.erpcal .dmeta{font-size:.76rem;color:var(--c-mut);margin-top:4px}
.erpcal .alert{border:1px solid #efc9b0;background:linear-gradient(180deg,#fff7ef,#fdeede);border-radius:12px;padding:16px}
.erpcal .alert h4{color:#b5541f}
.erpcal .alert .chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px}
.erpcal .alert .chip{font-family:var(--mono);font-size:.74rem;background:#fff;border:1px solid #f0d2bb;border-radius:999px;padding:3px 9px;color:#8a461b}
.erpcal .tblwrap{overflow-x:auto;border:1px solid var(--c-bd);border-radius:12px;margin-top:6px}
.erpcal table.ct{border-collapse:collapse;width:100%;font-size:.84rem;min-width:680px}
.erpcal table.ct th{position:sticky;top:0;background:var(--c-soft);text-align:left;font-family:var(--mono);font-size:.68rem;letter-spacing:.05em;text-transform:uppercase;color:var(--c-mut);font-weight:600;padding:10px 12px;border-bottom:2px solid var(--c-bd);white-space:nowrap;cursor:pointer;user-select:none}
.erpcal table.ct th.r,.erpcal table.ct td.r{text-align:right}
.erpcal table.ct td{padding:9px 12px;border-bottom:1px solid #eef3f8;vertical-align:middle}
.erpcal table.ct tbody tr.main{cursor:pointer}
.erpcal table.ct tbody tr.main:hover{background:var(--c-soft)}
.erpcal td.mono,.erpcal .mono2{font-family:var(--mono);font-size:.8rem}
.erpcal td.n{font-family:var(--mono);font-variant-numeric:tabular-nums}
.erpcal .dom-badge{font-size:.7rem;font-weight:600;padding:2px 8px;border-radius:999px}
.erpcal .dom-Proveedor{background:#e3eefb;color:var(--c-blue-d)}
.erpcal .dom-Cliente{background:#e2f5ef;color:var(--ok)}
.erpcal .cbar{display:flex;align-items:center;gap:8px;min-width:120px}
.erpcal .cbar .t{flex:1;height:7px;border-radius:5px;background:#e9f0f8;overflow:hidden}
.erpcal .cbar .f{height:100%;border-radius:5px}
.erpcal .cbar .p{font-family:var(--mono);font-size:.78rem;width:46px;text-align:right}
.erpcal .f.ok{background:var(--ok)}.erpcal .f.warn{background:var(--warn)}.erpcal .f.crit{background:var(--crit)}
.erpcal .caret{display:inline-block;width:14px;color:var(--c-blue);font-size:.7rem;transition:transform .15s}
.erpcal tr.open .caret{transform:rotate(90deg)}
.erpcal .subrow td{background:#f8fbfe;padding:0}
.erpcal .colgrid{overflow-x:auto;padding:4px 12px 12px}
.erpcal table.cg{border-collapse:collapse;width:100%;font-size:.78rem;min-width:620px}
.erpcal table.cg th{text-align:left;font-family:var(--mono);font-size:.64rem;text-transform:uppercase;color:var(--c-mut);padding:7px 10px;border-bottom:1px solid var(--c-bd);white-space:nowrap}
.erpcal table.cg th.r,.erpcal table.cg td.r{text-align:right}
.erpcal table.cg td{padding:6px 10px;border-bottom:1px solid #eef3f8}
.erpcal .pillmini{font-family:var(--mono);font-size:.72rem;padding:1px 7px;border-radius:999px}
.erpcal .pillmini.ok{background:var(--ok-s);color:var(--ok)}.erpcal .pillmini.warn{background:var(--warn-s);color:var(--warn)}.erpcal .pillmini.crit{background:var(--crit-s);color:var(--crit)}
.erpcal .legacy-tag{font-family:var(--mono);font-size:.68rem;color:#b5541f;background:#fdeede;border-radius:5px;padding:1px 6px;margin-left:6px}
.erpcal .cal-note{font-size:.8rem;color:var(--c-mut);margin-top:12px}
`;

const nf = (n) => (n == null || n === "") ? "—" : Number(n).toLocaleString("es-CO");
const complCls = (p) => p == null ? "" : p >= 98 ? "ok" : p >= 90 ? "warn" : "crit";

export default function ErpCalidadDatos() {
  const R = DATA.resumen; // 0dom 1tabla 2reg 3cols 4sinprob 5conprob 6compl 7nulos
  const CAL = DATA.calidad; // 0tabla 1col 2tipo 3compl 4nulos 5pctnulos 6blancos 7pctblancos 8distintos 9fmin 10fmax
  const K = DATA.kpi;
  const legacySet = useMemo(() => new Set(DATA.legacy.map((l) => l[1] + "|" + l[2])), []);
  const colsByTable = useMemo(() => {
    const m = {};
    for (const c of CAL) (m[c[0]] = m[c[0]] || []).push(c);
    for (const k in m) m[k].sort((a, b) => (a[3] ?? 101) - (b[3] ?? 101));
    return m;
  }, [CAL]);

  const [sortC, setSortC] = useState(2);
  const [dir, setDir] = useState(-1);
  const [open, setOpen] = useState(null);

  const idx = [0, 1, 2, 3, 5, 6, 7];
  const rows = useMemo(() => {
    const r = R.slice();
    r.sort((a, b) => {
      let x = a[sortC], y = b[sortC];
      if (typeof x === "number" && typeof y === "number") return (x - y) * dir;
      return String(x ?? "").localeCompare(String(y ?? ""), "es", { numeric: true }) * dir;
    });
    return r;
  }, [R, sortC, dir]);
  const clickH = (c) => { if (sortC === c) setDir(-dir); else { setSortC(c); setDir(c === 1 || c === 0 ? 1 : -1); } };

  const kpis = [
    { v: K.tablas, l: "Tablas PS perfiladas", cls: "" },
    { v: K.columnas, l: "Columnas analizadas", cls: "" },
    { v: K.compl + "%", l: "Completitud global (pond. por columna)", cls: K.compl >= 95 ? "" : "warn" },
    { v: K.colsprob, l: "Columnas con problemas de calidad", cls: "warn" },
    { v: nf(K.nulos), l: "Celdas nulas detectadas", cls: "" },
    { v: K.legacy, l: "Columnas con fechas legacy (≤ 1900)", cls: "crit" },
  ];

  const hdr = [
    { c: 0, h: "Dominio" }, { c: 1, h: "Tabla" }, { c: 2, h: "Registros", r: 1 },
    { c: 3, h: "Columnas", r: 1 }, { c: 5, h: "Con problemas", r: 1 },
    { c: 6, h: "Completitud", r: 1 }, { c: 7, h: "Nulos", r: 1 },
  ];

  return (
    <section className="card erpcal">
      <style>{CSS}</style>
      <h2>Perfilamiento de calidad de datos (análisis exploratorio)</h2>
      <p className="entity-summary">
        Resultado del script PySpark ejecutado sobre las 22 tablas PS en Fabric (zona Bronze):
        volumen, completitud y problemas de calidad por tabla y por columna. Fuentes:
        <span className="mono2"> resumen_tablas.csv</span> y <span className="mono2">calidad_columnas.csv</span>.
      </p>

      <div className="cal-kpis">
        {kpis.map((k, i) => (
          <div className={`cal-kpi ${k.cls}`} key={i}>
            <div className="v">{typeof k.v === "number" ? nf(k.v) : k.v}</div>
            <div className="l">{k.l}</div>
          </div>
        ))}
      </div>

      <div className="cal-sub">
        <div className="cal-box">
          <h4>Completitud por dominio</h4>
          {DATA.dominios.map((d) => (
            <div className="dbar" key={d[0]}>
              <div className="dbl"><span>{d[0]} <span style={{ color: "var(--c-mut)" }}>· {d[1]} tablas · {d[2]} cols</span></span><b>{d[4]}%</b></div>
              <div className="track"><span className="fill" style={{ width: d[4] + "%" }} /></div>
              <div className="dmeta">{nf(d[3])} columnas con problemas · {nf(d[5])} nulos</div>
            </div>
          ))}
        </div>
        <div className="cal-box alert">
          <h4>Alerta · fechas legacy anteriores a 1900</h4>
          <p style={{ margin: "0 0 8px", fontSize: ".86rem" }}>
            {DATA.legacy.length} columnas de fecha arrastran el valor placeholder <span className="mono2">1/1/1900</span> desde el origen PS; deben tratarse antes de la ingesta a Oracle.
          </p>
          <div className="chips">
            {DATA.legacy.map((l, i) => <span className="chip" key={i} title={l[1]}>{l[2]}</span>)}
          </div>
        </div>
      </div>

      <div className="tblwrap">
        <table className="ct">
          <thead><tr>
            {hdr.map((h) => <th key={h.c} className={h.r ? "r" : ""} onClick={() => clickH(h.c)}>{h.h}{sortC === h.c ? (dir > 0 ? " ▲" : " ▼") : ""}</th>)}
          </tr></thead>
          <tbody>
            {rows.map((r) => {
              const isOpen = open === r[1];
              const cols = colsByTable[r[1]] || [];
              return (
                <React.Fragment key={r[1]}>
                  <tr className={`main ${isOpen ? "open" : ""}`} onClick={() => setOpen(isOpen ? null : r[1])}>
                    <td><span className={`dom-badge dom-${r[0]}`}>{r[0]}</span></td>
                    <td className="mono"><span className="caret">▶</span> {r[1]}</td>
                    <td className="r n">{nf(r[2])}</td>
                    <td className="r n">{nf(r[3])}</td>
                    <td className="r n">{r[5] > 0 ? <span className="pillmini warn">{r[5]}</span> : <span className="pillmini ok">0</span>}</td>
                    <td className="r">
                      <span className="cbar"><span className="t"><span className={`f ${complCls(r[6])}`} style={{ width: (r[6] || 0) + "%" }} /></span><span className="p">{r[6]}%</span></span>
                    </td>
                    <td className="r n">{nf(r[7])}</td>
                  </tr>
                  {isOpen && (
                    <tr className="subrow"><td colSpan={7}>
                      <div className="colgrid">
                        <table className="cg">
                          <thead><tr>
                            <th>Columna</th><th>Tipo</th><th className="r">Completitud</th><th className="r">Nulos</th><th className="r">% nulos</th><th className="r">Blancos</th><th className="r">Distintos</th><th>Rango fechas</th>
                          </tr></thead>
                          <tbody>
                            {cols.map((c, i) => (
                              <tr key={i}>
                                <td className="mono2">{c[1]}{legacySet.has(c[0] + "|" + c[1]) && <span className="legacy-tag">1900</span>}</td>
                                <td style={{ color: "var(--c-mut)" }}>{c[2]}</td>
                                <td className="r"><span className={`pillmini ${complCls(c[3])}`}>{c[3]}%</span></td>
                                <td className="r n">{nf(c[4])}</td>
                                <td className="r n">{c[5]}%</td>
                                <td className="r n">{nf(c[6])}</td>
                                <td className="r n">{nf(c[8])}</td>
                                <td className="mono2" style={{ color: "var(--c-mut)" }}>{c[9] ? `${c[9]} → ${c[10]}` : ""}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td></tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="cal-note">Toca una tabla para ver el detalle de calidad columna por columna. La completitud se colorea: verde ≥ 98%, ámbar 90–98%, rojo &lt; 90%.</p>
    </section>
  );
}
