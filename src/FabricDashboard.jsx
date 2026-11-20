import React from "react";
import { CTL_CSS, Gauge, Legend } from "./controlUi.jsx";
import F from "./fabricEstado.json";

// ---------------------------------------------------------------------------
// Microsoft Fabric · estado del workspace de migración.
// Fuente: src/fabricEstado.json (API REST de Fabric + OneLake, solo lectura).
// Nada se escribe a mano: todo se calcula de ese archivo.
// ---------------------------------------------------------------------------

const nf = (n, d = 0) => n.toLocaleString("es-CO", { minimumFractionDigits: d, maximumFractionDigits: d });
const pct = (a, b) => (b ? (a / b) * 100 : null);
const dia = (iso) => new Date(iso.slice(0, 10) + "T00:00:00").toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" });
const TOP = 10; // tablas visibles en "Tiempos de copia por tabla"
const Pend = ({ t = "Requiere rol de capacidad" }) => <span className="pend">{t}</span>;
const St = ({ ok, t }) => <span className={`st ${ok ? "ok" : "crit"}`}>{t}</span>;

export default function FabricDashboard() {
  const runs = F.pipelineRuns;
  const runsOk = runs.filter((r) => r.estado === "Completed").length;
  const copias = runs.reduce((s, r) => s + r.copias, 0);
  const copiasOk = runs.reduce((s, r) => s + r.copiasOk, 0);
  const nbAct = F.notebooks.filter((n) => n.ejecuciones > 0);
  const nbSin = F.notebooks.filter((n) => n.ejecuciones === 0);
  const nbRuns = nbAct.reduce((s, n) => s + n.ejecuciones, 0);
  const nbOk = nbAct.reduce((s, n) => s + n.ok, 0);
  const C = F.consumo;
  const pico = C.porDia.reduce((m, d) => (d.pct > m.pct ? d : m), C.porDia[0]);
  const cuhTot = C.porProceso.reduce((s, p) => s + p.cuh, 0);
  const promDia = C.porDia.reduce((s, d) => s + d.pct, 0) / C.porDia.length;
  const maxPct = Math.max(...C.porDia.map((d) => d.pct));
  const ex = F.ejecuciones;
  const gbLeidos = runs.reduce((s, r) => s + r.gb, 0);
  const gbAlm = F.almacenamiento.reduce((s, l) => s + l.gb, 0);
  const capas = F.capas;
  const tablasTot = Object.values(capas).reduce((s, c) => s + c.tablas, 0);
  const itemsTot = Object.values(F.items).reduce((s, n) => s + n, 0);
  const durOk = runs.filter((r) => r.estado === "Completed" && r.copias > 0).map((r) => r.min);
  const fallas = runs.filter((r) => r.estado !== "Completed");
  const lhCapa = { lhz_mig_bronze: "bronze", lhz_mig_silver: "silver", lhz_mig_gold: "gold" };

  return (
    <section className="card wmsc fab">
      <style>{CTL_CSS + FAB_CSS}</style>

      <div className="fab-head">
        <div>
          <div className="eyebrow">Microsoft Fabric</div>
          <h2 className="fab-h">{F.workspace.nombre}</h2>
        </div>
        <div className="fab-meta">
          <span>Región <b>{F.workspace.region}</b></span>
          <span>Licencia <b>{F.workspace.licencia}</b></span>
          <span>Historial <b>desde {dia(F.historialDesde)}</b></span>
          <span>Corte <b>{dia(F.corte)}</b></span>
        </div>
      </div>

      <div className="gauges">
        <Gauge value={pct(runsOk, runs.length)} decimals={1} label="Éxito de ejecuciones del pipeline" foot={`${runsOk} de ${runs.length}`} />
        <Gauge value={pct(copiasOk, copias)} decimals={1} label="Éxito de copias de tablas" foot={`${copiasOk} de ${copias}`} />
        <Gauge value={pct(nbOk, nbRuns)} decimals={1} label="Éxito de ejecuciones de notebooks" foot={`${nbOk} de ${nbRuns}`} />
      </div>
      <Legend />

      <div className="kpis fab-kpis">
        <div className="kpi"><div className="v">{nf(ex.total)}</div><div className="l">Ejecuciones</div><div className="s">pipeline + notebooks</div></div>
        <div className="kpi"><div className="v">{nf(ex.horasComputo, 1)} h</div><div className="l">Tiempo de ejecución</div><div className="s">suma de duraciones</div></div>
        <div className="kpi"><div className="v">{nf(gbLeidos, 1)} GB</div><div className="l">Datos leídos de origen</div><div className="s">copias del pipeline</div></div>
        <div className="kpi"><div className="v">{nf(gbAlm, 1)} GB</div><div className="l">Almacenamiento OneLake</div><div className="s">{F.almacenamiento.filter((l) => l.gb > 0).length} lakehouses con datos</div></div>
        <div className="kpi"><div className="v">{nf(tablasTot)}</div><div className="l">Tablas</div><div className="s">{capas.bronze.tablas} bronze · {capas.silver.tablas} silver · {capas.gold.tablas} gold</div></div>
        <div className="kpi"><div className="v">{nf(pico.pct, 1)} %</div><div className="l">Consumo estimado día pico</div><div className="s">{dia(pico.dia)} · de {C.capacidadReferencia}</div></div>
      </div>

      <div className="blk">
        <div className="fab-t"><span className="nx">1</span>Capacidad</div>
        <div className="tw"><table>
          <thead><tr><th>Concepto</th><th>Valor</th><th>Fuente</th></tr></thead>
          <tbody>
            <tr><td>SKU asignado</td><td>{F.capacidad.sku || <Pend t="Por confirmar" />} <span className="sub">· referencia: {F.capacidad.skuReferencia}</span></td><td>Capacidad</td></tr>
            <tr><td>Región</td><td className="n">{F.workspace.region}</td><td>API Fabric</td></tr>
            <tr><td>Consumo de CU (%)</td><td><Pend /> <span className="sub">· estimado día pico: {nf(pico.pct, 2)} % (sección 2)</span></td><td>Capacity Metrics app</td></tr>
            <tr><td>Throttling / rechazos</td><td><Pend /></td><td>Capacity Metrics app</td></tr>
            <tr><td>Costo mensual</td><td><Pend t="Por confirmar" /></td><td>Facturación Azure</td></tr>
          </tbody>
        </table></div>
      </div>

      <div className="blk">
        <div className="fab-t"><span className="nx">2</span>Consumo estimado de capacidad · referencia {C.capacidadReferencia}</div>
        <div className="fab-sum">
          <span>CU-hora estimadas <b>{nf(cuhTot, 1)}</b></span>
          <span>Capacidad diaria {C.capacidadReferencia} <b>{nf(C.cuhDia)} CU-h</b></span>
          <span>Promedio por día con ejecuciones <b>{nf(promDia, 2)} %</b></span>
          <span>Día pico <b>{nf(pico.pct, 2)} %</b></span>
        </div>
        <div className="fab-grid">
          <div className="tw"><table>
            <thead><tr><th>Día (UTC)</th><th className="r">Pipeline</th><th className="r">Notebooks</th><th className="r">CU-h</th><th style={{ width: "34%" }}>% de la capacidad diaria</th></tr></thead>
            <tbody>
              {C.porDia.map((d) => (
                <tr key={d.dia}>
                  <td className="n">{d.dia}</td>
                  <td className="r n">{nf(d.pipeline, 1)}</td><td className="r n">{nf(d.notebooks, 1)}</td><td className="r n"><b>{nf(d.total, 1)}</b></td>
                  <td><div className="fab-bar"><i style={{ width: `${(d.pct / maxPct) * 100}%` }} /><span className="n">{nf(d.pct, 2)} %</span></div></td>
                </tr>
              ))}
            </tbody>
          </table></div>
          <div className="tw"><table>
            <thead><tr><th>Proceso</th><th>Tipo</th><th className="r">Ejecuciones</th><th className="r">CU-h</th><th className="r">CU-h / ejecución</th><th className="r">% del total</th></tr></thead>
            <tbody>
              {C.porProceso.map((p) => (
                <tr key={p.proceso}>
                  <td>{p.proceso}</td><td className="sub">{p.tipo}</td><td className="r n">{p.ejecuciones}</td>
                  <td className="r n">{nf(p.cuh, 1)}</td><td className="r n">{nf(p.cuhProm, 2)}</td><td className="r n">{nf(pct(p.cuh, cuhTot), 1)} %</td>
                </tr>
              ))}
            </tbody>
          </table></div>
        </div>
        <div className="tw" style={{ marginTop: 10 }}><table>
          <thead><tr><th>Motor</th><th>Tarifa Microsoft</th><th>Base de cálculo</th></tr></thead>
          <tbody>
            <tr><td>Copia de datos (pipeline)</td><td className="n">{nf(C.tarifas.copiaCUhPorITOh, 1)} CU-h por hora de throughput</td><td>Horas facturables reportadas por cada copia (billingReference)</td></tr>
            <tr><td>Orquestación (pipeline)</td><td className="n">{nf(C.tarifas.orquestacionCUhPorActividad, 4)} CU-h por actividad</td><td>Actividades no-copia de cada ejecución</td></tr>
            <tr><td>Spark (notebooks)</td><td className="n">1 CU = 2 vCores</td><td>Sesión base starter pool: {C.tarifas.sparkVCoresSesion} vCores ({nf(C.tarifas.sparkVCoresSesion * C.tarifas.sparkCUporVCore)} CU) × duración</td></tr>
          </tbody>
        </table></div>
      </div>

      <div className="blk">
        <div className="fab-t"><span className="nx">3</span>Pipeline de extracción · {F.pipelines.find((p) => p.ejecuciones > 0)?.nombre}</div>
        <div className="fab-sum">
          <span>Ejecuciones <b>{runs.length}</b></span>
          <span>Exitosas <b>{runsOk}</b></span>
          <span>Fallidas <b className="c">{runs.length - runsOk}</b></span>
          <span>Duración promedio con copias <b>{nf(durOk.reduce((s, x) => s + x, 0) / (durOk.length || 1), 1)} min</b></span>
          <span>Máxima <b>{nf(Math.max(...durOk), 1)} min</b></span>
        </div>
        <div className="tw"><table>
          <thead><tr><th>Inicio (UTC)</th><th>Estado</th><th className="r">Duración</th><th className="r">Tablas</th><th className="r">Filas copiadas</th><th className="r">GB leídos</th><th>Falla</th></tr></thead>
          <tbody>
            {runs.slice().reverse().map((r, i) => (
              <tr key={i}>
                <td className="n">{r.inicio}</td>
                <td><St ok={r.estado === "Completed"} t={r.estado === "Completed" ? "Exitosa" : "Fallida"} /></td>
                <td className="r n">{nf(r.min, 1)} min</td>
                <td className="r n">{r.copiasOk}/{r.copias}</td>
                <td className="r n">{nf(r.filas)}</td>
                <td className="r n">{nf(r.gb, 2)}</td>
                <td className="sub">{r.falla || ""}</td>
              </tr>
            ))}
          </tbody>
        </table></div>
      </div>

      <div className="blk">
        <div className="fab-t"><span className="nx">4</span>Tiempos de copia por tabla · {TOP} más lentas de {F.copiasPorTabla.length}</div>
        <div className="tw"><table>
          <thead><tr><th>Tabla</th><th>Origen</th><th className="r">Ejecuciones</th><th className="r">Fallidas</th><th className="r">Duración prom.</th><th className="r">Filas (última)</th><th className="r">GB (última)</th><th>Última</th></tr></thead>
          <tbody>
            {F.copiasPorTabla.slice(0, TOP).map((t) => (
              <tr key={t.tabla}>
                <td className="n">{t.tabla}</td><td className="sub">{t.origen}</td>
                <td className="r n">{t.ejecuciones}</td>
                <td className={`r n ${t.fallidas ? "c" : ""}`}>{t.fallidas}</td>
                <td className="r n">{t.minProm !== null ? `${nf(t.minProm, 1)} min` : "—"}</td>
                <td className="r n">{t.filas !== null ? nf(t.filas) : "—"}</td>
                <td className="r n">{t.gb !== null ? nf(t.gb, 2) : "—"}</td>
                <td className="n">{t.ultima}</td>
              </tr>
            ))}
          </tbody>
        </table></div>
        {F.copiasPorTabla.length > TOP && (
          <details className="fab-det">
            <summary>Ver las {F.copiasPorTabla.length - TOP} tablas restantes (todas &lt; {nf(F.copiasPorTabla[TOP - 1].minProm, 1)} min)</summary>
            <div className="tw"><table>
              <tbody>
                {F.copiasPorTabla.slice(TOP).map((t) => (
                  <tr key={t.tabla}><td className="n">{t.tabla}</td><td className="sub">{t.origen}</td><td className="r n">{t.ejecuciones}</td>
                    <td className={`r n ${t.fallidas ? "c" : ""}`}>{t.fallidas}</td><td className="r n">{t.minProm !== null ? `${nf(t.minProm, 1)} min` : "—"}</td>
                    <td className="r n">{t.filas !== null ? nf(t.filas) : "—"}</td><td className="n">{t.ultima}</td></tr>
                ))}
              </tbody>
            </table></div>
          </details>
        )}
      </div>

      <div className="blk">
        <div className="fab-t"><span className="nx">5</span>Notebooks</div>
        <div className="tw"><table>
          <thead><tr><th>Notebook</th><th className="r">Ejecuciones</th><th className="r">Exitosas</th><th className="r">Duración prom.</th><th className="r">Máxima</th><th>Última</th></tr></thead>
          <tbody>
            {nbAct.map((n) => (
              <tr key={n.nombre}>
                <td>{n.nombre}</td><td className="r n">{n.ejecuciones}</td><td className="r n">{n.ok}</td>
                <td className="r n">{nf(n.minProm, 1)} min</td><td className="r n">{nf(n.minMax, 1)} min</td><td className="n">{n.ultima}</td>
              </tr>
            ))}
            <tr className="grp"><td colSpan="6">Sin ejecuciones en el periodo ({nbSin.length}): <span className="sub">{nbSin.map((n) => n.nombre).join(" · ")}</span></td></tr>
          </tbody>
        </table></div>
      </div>

      <div className="blk">
        <div className="fab-t"><span className="nx">6</span>Almacenamiento y capas</div>
        <div className="tw"><table>
          <thead><tr><th>Lakehouse</th><th>Capa</th><th className="r">GB</th><th className="r">Archivos</th><th className="r">Tablas</th><th className="r">Filas</th></tr></thead>
          <tbody>
            {F.almacenamiento.slice().sort((a, b) => b.gb - a.gb).map((l) => {
              const c = capas[lhCapa[l.lakehouse]];
              return (
                <tr key={l.lakehouse}>
                  <td className="n">{l.lakehouse}</td><td>{lhCapa[l.lakehouse] || "staging"}</td>
                  <td className="r n">{nf(l.gb, 2)}</td><td className="r n">{nf(l.archivos)}</td>
                  <td className="r n">{c ? c.tablas : "—"}</td>
                  <td className="r n">{c ? nf(c.filas) : "—"}{c && c.sinConteo ? <span className="sub"> (+{c.sinConteo} sin conteo)</span> : ""}</td>
                </tr>
              );
            })}
          </tbody>
        </table></div>
      </div>

      <details className="fab-det">
        <summary>Detalle del cálculo de los indicadores</summary>
        <div className="tw"><table>
          <thead><tr><th>Indicador</th><th>Cálculo</th></tr></thead>
          <tbody>
            <tr><td>Éxito de ejecuciones del pipeline</td><td>Ejecuciones con estado Completed ÷ ejecuciones del pipeline en el historial.</td></tr>
            <tr><td>Éxito de copias de tablas</td><td>Actividades de copia exitosas ÷ actividades de copia, en todas las ejecuciones.</td></tr>
            <tr><td>Éxito de ejecuciones de notebooks</td><td>Ejecuciones Completed ÷ ejecuciones de notebooks.</td></tr>
            <tr><td>Consumo estimado de capacidad</td><td>CU-h por proceso con las tarifas publicadas por Microsoft (sección 2) ÷ capacidad diaria de {C.capacidadReferencia} ({C.tarifas.capacidadCU} CU × 24 h). Notebooks con sesión base del starter pool; sesiones con más executors consumen más. El consumo real se confirma en la Capacity Metrics app (requiere rol de capacidad).</td></tr>
            <tr><td>Tiempo de ejecución</td><td>Suma de duraciones (fin − inicio) de todas las ejecuciones. No equivale a CU consumidas.</td></tr>
            <tr><td>Datos leídos de origen</td><td>Bytes leídos por las actividades de copia (sin compresión). Almacenamiento OneLake: tamaño de archivos en cada lakehouse (comprimido).</td></tr>
            <tr><td>Filas por capa</td><td>Conteo por log Delta (archivos activos). Tablas con checkpoint quedan sin conteo.</td></tr>
            <tr><td>Fuente</td><td>{F.fuente}. Historial de ejecuciones disponible desde {dia(F.historialDesde)}.</td></tr>
          </tbody>
        </table></div>
      </details>
    </section>
  );
}

const FAB_CSS = `
.wmsc.fab .fab-head{display:flex;justify-content:space-between;align-items:flex-end;gap:14px;flex-wrap:wrap}
.wmsc.fab .fab-h{margin:4px 0 0;font-size:1.45rem;color:#003b70}
.wmsc.fab .fab-meta{display:flex;flex-wrap:wrap;gap:6px}
.wmsc.fab .fab-meta span{font-size:.75rem;color:#5b6b7a;background:#f3f8fd;border:1px solid #e1eaf4;border-radius:8px;padding:4px 9px}
.wmsc.fab .fab-meta b{color:#1f2b3a}
.wmsc.fab .gauges{grid-template-columns:repeat(auto-fit,minmax(170px,1fr))}
.wmsc.fab .fab-kpis{grid-template-columns:repeat(auto-fit,minmax(150px,1fr));margin-top:14px}
.wmsc.fab .kpi .s{font-size:.72rem;color:#5b6b7a;margin-top:3px}
.wmsc.fab .blk{margin-top:18px}
.wmsc.fab .fab-t{font-weight:700;color:#003b70;font-size:1rem;margin-bottom:8px;display:flex;align-items:center;gap:8px}
.wmsc.fab .nx{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:6px;background:#003b70;color:#fff;font-size:.75rem;font-family:"IBM Plex Mono",ui-monospace,Menlo,monospace}
.wmsc.fab .fab-sum{display:flex;flex-wrap:wrap;gap:6px 18px;font-size:.8rem;color:#5b6b7a;margin-bottom:8px}
.wmsc.fab .fab-sum b{color:#1f2b3a;font-family:"IBM Plex Mono",ui-monospace,Menlo,monospace}
.wmsc.fab .c{color:#b5323b}
.wmsc.fab .fab-grid{display:grid;grid-template-columns:1fr;gap:12px}
.wmsc.fab .fab-bar{position:relative;height:16px;background:#edf1f5;border-radius:4px;overflow:hidden}
.wmsc.fab .fab-bar i{position:absolute;left:0;top:0;bottom:0;background:#0058a8;opacity:.75}
.wmsc.fab .fab-bar span{position:relative;font-size:.72rem;padding-left:6px;color:#1f2b3a;line-height:16px}
@media(max-width:900px){.wmsc.fab .fab-grid{grid-template-columns:1fr}}
.wmsc.fab .sub{font-size:.74rem;color:#5b6b7a}
.wmsc.fab .fab-det{margin-top:18px;font-size:.82rem}
.wmsc.fab .fab-det summary{cursor:pointer;color:#0058a8;font-weight:600;padding:4px 0}
`;
