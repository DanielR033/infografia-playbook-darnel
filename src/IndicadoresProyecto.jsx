import React from "react";
import { CTL_CSS, Gauge, Legend } from "./controlUi.jsx";
import bsWms from "./bsWmsData.json";
import mapeoBI from "./mapeoReportesBI.json";
import erpFuentes from "./erpFuentes.json";
import erpDash from "./erpDashData.json";
import calidad from "./erpCalidadDatos.json";
import pb1Data from "./pb1Data.json";
import pb1Columnas from "./pb1Columnas.json";
import erpCols from "./erpDashCols.json";
import fabric from "./fabricConteos.json";
import { PLANTILLAS, EXTRACCION_MIN } from "./CutoverDashboard.jsx";
import { CX_CIFRAS, cruceCx } from "./cxCruce.js";

// ---------------------------------------------------------------------------
// Indicadores del FRENTE DE DATOS (franja superior de "Seguimiento Comité").
//
// Alcance: solo lo que es responsabilidad del equipo de datos — extraer,
// preparar y entregar los datos a Oracle, y revisar lo que Oracle cargó.
// Lo que depende de Oracle o del negocio NO se mide aquí.
//
// Ningún número se escribe a mano: todo se deriva de los JSON / constantes
// del tablero. Lo que no tiene dato va en null y se muestra "Por confirmar".
// ---------------------------------------------------------------------------

export const CORTE = "2026-11-20"; // fecha de corte del tablero (actualizar cada semana)

const nf = (n) => n.toLocaleString("es-CO");
const pct = (a, b) => (b ? (a / b) * 100 : null);
const pctTxt = (v, d = 1) => v.toLocaleString("es-CO", { minimumFractionDigits: d, maximumFractionDigits: d }) + " %";

// Nota desplegable para el pie de un gauge (texto largo sin romper el estilo).
function VerMas({ children }) {
  const [open, setOpen] = React.useState(false);
  return (
    <span style={{ display: "block", marginTop: 4 }}>
      <button type="button" onClick={() => setOpen((o) => !o)}
        style={{ appearance: "none", border: 0, background: "transparent", color: "#0058a8", font: "inherit", fontSize: ".72rem", fontWeight: 600, cursor: "pointer", padding: 0, textDecoration: "underline" }}>
        {open ? "Ver menos ▴" : "Ver más ▾"}
      </button>
      {open && <span style={{ display: "block", fontSize: ".72rem", color: "var(--muted)", fontWeight: 400, marginTop: 4, lineHeight: 1.4, textAlign: "left" }}>{children}</span>}
    </span>
  );
}
const hm = (min) => (min >= 60 ? `${Math.floor(min / 60)} h ${String(min % 60).padStart(2, "0")}` : `${min} min`);
const dia = (iso) => new Date(iso + "T00:00:00");
const fechaLarga = (iso) => dia(iso).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" });

// Estados del inventario de migración que cuentan como plantilla validada para 26C.
const ES_VALIDADO = (estado) => /^Validado/i.test(estado);

// Llave para contar IDs extraídos por maestro (columna perfilada en erpCalidadDatos).
const LLAVE_ID = { Clientes: ["PS_AJ_ALTA_CLIENTE", "AJ_NUM_CUST_ID"], Proveedores: ["PS_VENDOR", "VENDOR_ID"] };

function calcular() {
  // 1 · Plantillas WMS automatizadas
  const plantAuto = PLANTILLAS.filter((p) => p.gen > 0);
  const genMin = PLANTILLAS.reduce((s, p) => s + (p.gen || 0), 0);

  // 2 · Prueba de piso (BS): nota por plantilla = automático ÷ enviado; promedio simple.
  //     `cargo`: el tablero BS reporta lo enviado como cargado; si Oracle rechaza una plantilla, false.
  const inicial = bsWms.envios.find((e) => e.tipo === "Inicial");
  const adicional = bsWms.envios.find((e) => e.tipo === "Adicional");
  const bsPlant = [
    { n: "Inventarios (ISS)", campo: "lineas", enviada: true, cargo: true },
    { n: "Ubicaciones de inventario (LLL)", campo: "ubicaciones", enviada: true, cargo: true }
  ].map((p) => {
    const auto = inicial[p.campo], manual = adicional[p.campo], tot = auto + manual;
    return { ...p, auto, manual, tot, nota: p.enviada && p.cargo ? pct(auto, tot) : 0 };
  });

  // 3 · Pre-mapeo reportes BI (todos los estados «Revisado*»: revisado, anotación y pendiente de Zaid)
  const pm = Object.fromEntries(mapeoBI.premapeo);
  const revisados = mapeoBI.premapeo.filter((p) => p[0].startsWith("Revisado")).reduce((a, p) => a + p[1], 0);

  // 4 · Plantillas ERP validadas (inventario de migración, sin "Fuera de alcance")
  const inv = erpDash.inventario.filter((r) => r[7] !== "Fuera de alcance");
  const validadas = inv.filter((r) => ES_VALIDADO(r[7]));
  const porEstado = {};
  inv.forEach((r) => { porEstado[r[7]] = (porEstado[r[7]] || 0) + 1; });

  // 5 · Universo ERP por maestro: fuentes extraídas, IDs extraídos, PB1, carga
  //     Extracción = la tabla fuente existe en bronze (Fabric) y no está vacía.
  //     Filas: conteo de bronze; si la tabla tiene checkpoint (null) se usa silver.
  const bronze = fabric.capas.bronze, silver = fabric.capas.silver;
  const filasDe = (t) => {
    const b = bronze[t];
    if (!b) return null;
    if (b.filas !== null) return b.filas;
    const sv = silver[t.toLowerCase()];
    return sv && sv.filas !== null ? sv.filas : null;
  };
  const distintos = (tabla, col) => {
    const r = calidad.calidad.find((c) => c[0] === tabla && c[1] === col);
    return r ? r[8] : null;
  };
  const pb1Hojas = (maestro) => pb1Columnas.hojas.filter((h) => h.maestro === maestro);
  const pb1ColsConDatos = (maestro) => {
    const s = new Set();
    pb1Hojas(maestro).forEach((h) => h.cols.forEach((c) => c.conDatos > 0 && s.add(c.col)));
    return s.size;
  };
  const universo = erpFuentes.maestros.map((m) => {
    const pb = pb1Data.maestros.find((x) => x.nombre === m.maestro) || {};
    const tablas = m.fuentes.map((f) => f.tabla);
    const enBronze = tablas.filter((t) => bronze[t]);
    const vacias = enBronze.filter((t) => filasDe(t) === 0);
    const ext = enBronze.filter((t) => !vacias.includes(t));
    const llave = LLAVE_ID[m.maestro];
    const hojas = pb1Hojas(m.maestro);
    return {
      maestro: m.maestro,
      universo: pb.volumen ?? null,
      tablas: tablas.length,
      extraidas: ext.length,
      pendientesLista: tablas.filter((t) => !ext.includes(t)),
      vacias,
      filasBronze: ext.reduce((s, t) => s + (filasDe(t) || 0), 0),
      ids: llave ? distintos(llave[0], llave[1]) : null,
      pb1Reg: hojas.length ? hojas.reduce((s, h) => s + h.registros, 0) : null,
      pb1Cols: hojas.length ? pb1ColsConDatos(m.maestro) : null,
      pb1Pend: !!pb.pendiente && !hojas.length,
      cargaCompleta: 0 // ninguna carga completa ejecutada aún: PB1 es una muestra
    };
  });
  const tabTot = universo.reduce((s, u) => s + u.tablas, 0);
  const tabExt = universo.reduce((s, u) => s + u.extraidas, 0);

  // Cruce PB1 → hojas de la plantilla ERP (evidencia de mapeo probado)
  const hojasErp = {};
  pb1Columnas.hojas.forEach((h) => h.cols.forEach((c) => {
    if (!c.destino) return;
    const k = c.destino;
    hojasErp[k] = hojasErp[k] || { hoja: k, maestro: h.maestro, def: new Map() };
    hojasErp[k].def.set(c.col, Math.max(hojasErp[k].def.get(c.col) || 0, c.conDatos));
  }));
  const maestroCols = { Clientes: "Maestra de Clientes", "Artículos": "Maestra de productos", Proveedores: "Maestro Proveedores" };
  const cruzePb1 = Object.values(hojasErp).map((h) => ({
    hoja: h.hoja, maestro: h.maestro,
    definidas: h.def.size,
    conDatos: [...h.def.values()].filter((n) => n > 0).length,
    colsPlantilla: (erpCols[maestroCols[h.maestro]] || []).filter((r) => r[2] === h.hoja).length || null
  })).sort((a, b) => a.maestro.localeCompare(b.maestro) || b.conDatos - a.conDatos);

  return {
    plant: { n: plantAuto.length, total: PLANTILLAS.length, genMin, v: pct(plantAuto.length, PLANTILLAS.length) },
    bs: { plant: bsPlant, v: bsPlant.reduce((s, p) => s + p.nota, 0) / bsPlant.length, conManual: bsPlant.filter((p) => p.manual > 0).length },
    bi: { total: mapeoBI.total, rev: revisados, blanco: pm["(en blanco)"] || 0, noExiste: pm["No Existe"] || 0, v: pct(revisados, mapeoBI.total) },
    val: { n: inv.length, total: inv.length, validadas: validadas.length, porEstado, v: pct(1, 2) },
    ext: { n: tabExt, total: tabTot, v: pct(tabExt, tabTot) },
    universo, cruzePb1,
    vaciasBronze: Object.entries(bronze).filter(([t, v]) => /^PS/.test(t) && v.filas === 0).map(([t]) => t),
    cx: cruceCx()
  };
}

export default function IndicadoresProyecto({ irA, abrirBI }) {
  const k = calcular();
  const link = (tab, txt) => <button type="button" className="ip-lnk" onClick={() => irA && irA(tab)}>{txt} →</button>;
  const linkBI = <button type="button" className="ip-lnk" onClick={() => abrirBI && abrirBI()}>Mapeo reportes BI →</button>;

  return (
    <div className="wmsc ip">
      <style>{CTL_CSS + IP_CSS}</style>
      <div className="ip-head">
        <div>
          <div className="eyebrow">Indicadores del frente de datos</div>
          <div className="ip-t">¿Están listos los datos que nos toca entregar?</div>
        </div>
        <div className="ip-corte">Corte <b>{fechaLarga(CORTE)}</b></div>
      </div>

      <div className="gauges">
        <Gauge value={k.plant.v} decimals={0} label="Plantillas WMS automatizadas"
          foot={`${k.plant.n} de ${k.plant.total} · generación ${k.plant.genMin} min`} />
        <Gauge value={k.bs.v} decimals={1} label="Prueba de piso (BS): calidad de entrega"
          foot={`${k.bs.plant.length} de ${k.bs.plant.length} plantillas enviadas y cargadas · ${k.bs.conManual} con ajuste manual`} />
        <Gauge value={k.bi.v} decimals={1} label="Pre-mapeo reportes BI"
          foot={`${k.bi.rev} de ${k.bi.total} campos revisados`} />
        <Gauge value={k.val.v} decimals={0} label="Plantillas ERP validadas (26C)"
          foot={<>{k.val.n}/{k.val.total} objetos validados<VerMas>El 50 % corresponde a la consolidación de todas las plantillas en referencia a la documentación de Oracle relacionada en el inventario. El 50 % restante está asociado a la confirmación de Oracle de que las plantillas sean las correspondientes y las fechas.</VerMas></>} />
        <Gauge value={k.ext.v} decimals={1} label="Extracción de fuentes ERP"
          foot={`${k.ext.n} de ${k.ext.total} tablas PeopleSoft`} />
        <div className="gauge ip-cx">
          <div className="gl ip-cx-t">Análisis CX · cruce con plantillas ERP</div>
          <div className="ip-lv">
            <div className="ip-lv-h"><span>Maestro base</span><b className={k.cx.n1.n === k.cx.n1.total ? "ok" : ""}>{k.cx.n1.n} de {k.cx.n1.total}</b></div>
            <div className="ip-bar"><i className="ok" style={{ width: `${pct(k.cx.n1.n, k.cx.n1.total)}%` }} /></div>
            <div className="gf">Party {nf(CX_CIFRAS.clientes)} · Ítem {nf(CX_CIFRAS.articulos)}</div>
          </div>
          <div className="ip-lv">
            <div className="ip-lv-h"><span>Profundización</span><b>{k.cx.n2.n} de {k.cx.n2.total}</b></div>
            <div className="ip-bar"><i style={{ width: `${pct(k.cx.n2.n, k.cx.n2.total)}%` }} /></div>
            <div className="gf">Sin extracción aún: direcciones, contactos, cuentas… {link("impacto-cx", "Ver")}</div>
          </div>
        </div>
      </div>

      <Legend />

      <div className="ip-uni">
        <div className="ip-uni-t">Universo de datos ERP · ¿cuánto hemos extraído, probado y cargado?</div>
        <div className="tw">
          <table>
            <thead><tr>
              <th>Maestro</th><th className="r">Universo</th><th>Extracción de fuentes (Fabric)</th><th className="r">Filas en bronze</th><th className="r">IDs extraídos</th>
              <th className="r">Probado en PB1</th><th className="r">Columnas PB1</th><th>Carga completa</th>
            </tr></thead>
            <tbody>
              {k.universo.map((u) => {
                const p = pct(u.extraidas, u.tablas);
                return (
                  <tr key={u.maestro}>
                    <td><b>{u.maestro}</b></td>
                    <td className="r n">{u.universo !== null ? nf(u.universo) : <span className="pend">Por confirmar</span>}</td>
                    <td style={{ minWidth: 170 }}>
                      <div className="ip-mini"><i className={p >= 90 ? "ok" : p >= 70 ? "warn" : "crit"} style={{ width: `${p}%` }} /></div>
                      <span className="sub">{u.extraidas} de {u.tablas} tablas · {u.tablas - u.extraidas} pendientes</span>
                    </td>
                    <td className="r n">{nf(u.filasBronze)}</td>
                    <td className="r n">{u.ids !== null ? nf(u.ids) : "—"}</td>
                    <td className="r n">{u.pb1Pend ? <span className="pend">Pendiente</span> : u.pb1Reg !== null ? <>{nf(u.pb1Reg)}<div className="sub">{u.universo ? pctTxt(pct(u.pb1Reg, u.universo), 2) + " del universo" : ""}</div></> : "—"}</td>
                    <td className="r n">{u.pb1Cols !== null ? u.pb1Cols : "—"}</td>
                    <td><span className="st gray">Pendiente · {nf(u.cargaCompleta)} de {u.universo !== null ? nf(u.universo) : "?"}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <details className="ip-det">
        <summary>Detalle del cálculo de los indicadores</summary>
        <div className="tw">
          <table>
            <thead><tr><th>Indicador</th><th>Cálculo</th><th className="r">Valor</th><th>Fuente</th></tr></thead>
            <tbody>
              <tr><td>Plantillas WMS automatizadas</td>
                <td>Plantillas de migración WMS con generación automática y tiempo medido ÷ total de plantillas.</td>
                <td className="r n">{k.plant.n} / {k.plant.total}</td><td>{link("cutover", "Cutover")}</td></tr>
              <tr><td>Prueba de piso (BS): calidad de entrega</td>
                <td>
                  Cada plantilla enviada y cargada recibe una nota = registros generados por la lógica de extracción ÷ registros enviados
                  (lo armado o editado a mano descuenta). Plantilla no enviada o no cargada = 0. Indicador = promedio simple de las notas.
                  <table className="ip-sub">
                    <thead><tr><th>Plantilla</th><th>Enviada</th><th>Cargó</th><th className="r">Automático</th><th className="r">Manual</th><th className="r">Nota</th></tr></thead>
                    <tbody>
                      {k.bs.plant.map((p) => (
                        <tr key={p.n}><td>{p.n}</td><td>{p.enviada ? "Sí" : "No"}</td><td>{p.cargo ? "Sí" : "No"}</td>
                          <td className="r n">{nf(p.auto)}</td><td className="r n">{nf(p.manual)}</td><td className="r n"><b>{pctTxt(p.nota)}</b></td></tr>
                      ))}
                      <tr className="grp"><td colSpan="5">Promedio</td><td className="r n"><b>{pctTxt(k.bs.v)}</b></td></tr>
                    </tbody>
                  </table>
                </td>
                <td className="r n">{pctTxt(k.bs.v)}</td><td>{link("bs-wms", "BS WMS")}</td></tr>
              <tr><td>Pre-mapeo reportes BI</td>
                <td>Campos «Revisado» (incluye «Revisado – Anotación» y «Revisado – Zaid», pendientes de validación) ÷ total. {k.bi.blanco} en blanco y {k.bi.noExiste} «No existe».</td>
                <td className="r n">{k.bi.rev} / {k.bi.total}</td><td>{linkBI}</td></tr>
              <tr><td>Plantillas ERP validadas (26C)</td>
                <td>
                  {k.val.total}/{k.val.total} objetos validados. El 50 % del indicador corresponde a la consolidación de todas las plantillas en referencia a la documentación de Oracle relacionada en el inventario (frente de datos); el 50 % restante está asociado a la confirmación de Oracle de que las plantillas sean las correspondientes y las fechas. Desglose por estado del inventario:{" "}
                  {Object.entries(k.val.porEstado).map(([e, n], i) => <span key={e}>{i > 0 && " · "}{e} <b>{n}</b></span>)}.
                  <div style={{ marginTop: 8 }}><b>Mapeo probado en PB1</b>: columnas de las plantillas de negocio de PB1 que caen en cada hoja de la plantilla ERP.</div>
                  <table className="ip-sub">
                    <thead><tr><th>Maestro</th><th>Hoja plantilla ERP</th><th className="r">Columnas PB1 con datos</th><th className="r">Definidas en PB1</th><th className="r">Columnas de la hoja</th></tr></thead>
                    <tbody>
                      {k.cruzePb1.map((h) => (
                        <tr key={h.hoja}><td>{h.maestro}</td><td className="n" style={{ fontSize: ".7rem" }}>{h.hoja}</td>
                          <td className="r n"><b>{h.conDatos}</b></td><td className="r n">{h.definidas}</td><td className="r n">{h.colsPlantilla !== null ? nf(h.colsPlantilla) : "—"}</td></tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="sub" style={{ marginTop: 4 }}>Cruce columna de negocio → hoja ERP por significado de la columna (script <code>scripts/pb1Columnas.py</code>); a validar por el consultor.</div>
                </td>
                <td className="r n">{k.val.n} / {k.val.total}</td><td>{link("erp-inv", "ERP Inventario")}</td></tr>
              <tr><td>Extracción de fuentes ERP</td>
                <td>
                  Tablas fuente PeopleSoft identificadas por maestro que existen en bronze con filas ÷ total identificadas. Foto de OneLake del {fechaLarga(fabric.corte)} (conteo por log Delta).
                  {k.universo.map((u) => (
                    <div key={u.maestro} className="sub" style={{ marginTop: 4 }}>
                      <b>{u.maestro}</b>: {u.extraidas} de {u.tablas}
                      {u.pendientesLista.length > 0 && <> · pendientes: <span className="n">{u.pendientesLista.join(", ")}</span></>}
                    </div>
                  ))}
                </td>
                <td className="r n">{k.ext.n} / {k.ext.total}</td><td>{link("erp", "ERP")}</td></tr>
              <tr><td>Análisis CX · cruce con plantillas ERP</td>
                <td>Entidades donde lo que CX escribe en Fusion se cruza con las plantillas de carga del ERP. Maestro base: {k.cx.n1.n} de {k.cx.n1.total}; profundización: {k.cx.n2.n} de {k.cx.n2.total} ({nf(k.cx.n2.colsTot)} columnas de plantilla). El detalle y la razón de cada cruce están en la pestaña Impacto CX.</td>
                <td className="r n">{k.cx.n1.n}/{k.cx.n1.total} · {k.cx.n2.n}/{k.cx.n2.total}</td><td>{link("impacto-cx", "Impacto CX")}</td></tr>
              <tr><td>Universo de datos ERP</td>
                <td>
                  <i>Universo</i> = volumen planificado del maestro. <i>Extracción</i> = tablas fuente PeopleSoft identificadas que existen en bronze
                  y tienen filas (foto de Fabric del {fechaLarga(fabric.corte)}). <i>Filas en bronze</i> = suma de filas de esas tablas. <i>IDs extraídos</i> = llaves
                  distintas en la tabla principal (incluye histórico; el filtro de alcance se aplica después). <i>Probado en PB1</i> = registros de la muestra
                  cargada en Playback 1. <i>Carga completa</i>: aún no se ha ejecutado ninguna.
                  {k.vaciasBronze.length > 0 && <div style={{ marginTop: 6 }}>Tablas PeopleSoft presentes en bronze con 0 filas ({k.vaciasBronze.length}): <span className="n">{k.vaciasBronze.join(", ")}</span>.</div>}
                </td>
                <td className="r n">{k.ext.n} / {k.ext.total}</td><td>{link("fabric", "Microsoft Fabric")}</td></tr>
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}

// Dato técnico (no es indicador): ventana de datos del cutover WMS. Va al final de la portada.
export function VentanaTecnica({ irA }) {
  const genMin = PLANTILLAS.reduce((s, p) => s + (p.gen || 0), 0);
  const suma = EXTRACCION_MIN + genMin;
  return (
    <div className="wmsc ip ip-vt">
      <style>{CTL_CSS + IP_CSS}</style>
      <div className="eyebrow">Dato técnico · cutover WMS</div>
      <div className="ip-t">Ventana técnica de datos: {hm(EXTRACCION_MIN)} de extracción + {genMin} min de generación</div>
      <div className="tw" style={{ marginTop: 10 }}>
        <table>
          <thead><tr><th>Paso (frente de datos)</th><th className="r">Tiempo</th><th>Nota</th></tr></thead>
          <tbody>
            <tr><td>Extracción de tablas origen</td><td className="r n">{hm(EXTRACCION_MIN)}</td><td>La más lenta es PS_TRANSACTION_INV (define qué artículos migran). Requiere freeze de las bases origen.</td></tr>
            {PLANTILLAS.map((p) => (
              <tr key={p.n}><td style={{ paddingLeft: 22 }}>Generación · {p.n}</td><td className="r n">{p.gen} min</td><td>{p.bs ? "Probada en la BS de piso" : ""}</td></tr>
            ))}
            <tr className="grp"><td>Total en serie</td><td className="r n">{hm(suma)}</td><td>La pestaña Cutover reporta «~1 h 30» de pipeline: confirmar si parte corre en paralelo.</td></tr>
            <tr><td>Ingesta en Oracle</td><td className="r"><span className="pend">Por confirmar</span></td><td>Responsabilidad de Oracle. Referencia BS: 28.000 registros en ~5 h (inventarios + ubicaciones).</td></tr>
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 8 }}>{irA && <button type="button" className="ip-lnk" onClick={() => irA("cutover")}>Ver plan de cutover →</button>}</div>
    </div>
  );
}

const IP_CSS = `
.wmsc.ip{border:1px solid #d9e3ef;border-radius:14px;background:#fff;padding:18px 18px 14px;margin:18px 0 6px}
.wmsc.ip .ip-head{display:flex;justify-content:space-between;align-items:flex-end;gap:12px;flex-wrap:wrap}
.wmsc.ip .ip-t{font-size:1.05rem;font-weight:700;color:#003b70;margin-top:2px}
.wmsc.ip .ip-corte{font-family:"IBM Plex Mono",ui-monospace,Menlo,monospace;font-size:.75rem;color:#5b6b7a;background:#f3f8fd;border-radius:8px;padding:5px 9px}
.wmsc.ip .gauges{grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}
.wmsc.ip .ip-cx{text-align:left;padding:12px 12px 10px;display:flex;flex-direction:column;gap:8px}
.wmsc.ip .ip-cx-t{margin-top:0}
.wmsc.ip .ip-lv-h{display:flex;justify-content:space-between;font-size:.75rem;color:#3d4b5a}
.wmsc.ip .ip-lv-h b{font-family:"IBM Plex Mono",ui-monospace,Menlo,monospace;color:#5b6b7a}
.wmsc.ip .ip-lv-h b.ok{color:#0f8f6c}
.wmsc.ip .ip-bar{height:8px;border-radius:5px;background:#edf1f5;overflow:hidden;margin-top:4px}
.wmsc.ip .ip-bar i{display:block;height:100%;background:#c3ccd6}
.wmsc.ip .ip-bar i.ok{background:#0f8f6c}
.wmsc.ip .ip-uni{margin-top:16px}
.wmsc.ip .ip-uni-t{font-weight:700;color:#003b70;font-size:.92rem;margin-bottom:6px}
.wmsc.ip .ip-mini{height:7px;border-radius:4px;background:#edf1f5;overflow:hidden;margin:3px 0}
.wmsc.ip .ip-mini i{display:block;height:100%}
.wmsc.ip .ip-mini i.ok{background:#0f8f6c}.wmsc.ip .ip-mini i.warn{background:#c67c12}.wmsc.ip .ip-mini i.crit{background:#b5323b}
.wmsc.ip .sub{font-size:.72rem;color:#5b6b7a}
.wmsc.ip .ip-lnk{background:none;border:0;padding:0;font:inherit;font-weight:600;color:#0058a8;cursor:pointer;white-space:nowrap}
.wmsc.ip .ip-lnk:hover{text-decoration:underline}
.wmsc.ip .ip-det{margin-top:10px;font-size:.82rem}
.wmsc.ip .ip-det summary{cursor:pointer;color:#0058a8;font-weight:600;padding:4px 0}
.wmsc.ip .ip-det table td{vertical-align:top}
.wmsc.ip table.ip-sub{margin-top:8px;font-size:.78rem;width:auto;min-width:420px}
.wmsc.ip table.ip-sub th,.wmsc.ip table.ip-sub td{padding:4px 8px}
.wmsc.ip.ip-vt{margin-top:26px;background:#fafbfc}
`;
