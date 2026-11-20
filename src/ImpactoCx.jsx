import React from "react";
import { CX_CIFRAS, cruceCx } from "./cxCruce.js";

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
@media(max-width:900px){
 .impactocx .kpis,.impactocx .res{grid-template-columns:1fr 1fr}
 .impactocx .c4,.impactocx .c6{grid-column:span 12}
 .impactocx .flow{grid-template-columns:1fr}.impactocx .farrow{height:22px}
}
`;

export { CX_CIFRAS };
const nf = (n) => n.toLocaleString("es-CO");

const KPIS = [
  { v: "28.932", l: "Artículos únicos en ERP", foot: "Org OMA (maestra) · Activo · origen PIMDH", cls: "alt" },
  { v: "324.960", l: "Clientes (parties) en ERP", foot: "Frente a ~55.700 planificados", cls: "critbar", crit: true },
  { v: "7.631", l: "Parties inactivos cargados", foot: "Más 3 ITEM_NUMBER duplicados", cls: "warnbar" },
  { v: "Todos", l: "Ambientes afectados", foot: "CX operativo sincroniza con los del proyecto", cls: "alt" },
];

export default function ImpactoCx() {
  const cx = cruceCx();
  return (
    <section className="impactocx">
      <style>{CX_CSS}</style>

      {/* Resumen ejecutivo */}
      <section style={{ paddingTop: 8 }}>
        <p className="eyebrow">Análisis de impacto · Oracle CX</p>
        <h2 className="h2">Oracle CX ya pobló los maestros en ERP Fusion
          <span className="status">Borrador · uso interno</span>
        </h2>
        <p className="lead">Oracle CX está operativo y sincroniza directamente con ERP Fusion. Ya pobló los maestros de Artículos y Clientes en todos los ambientes del proyecto, antes de la carga de migración de maestros base. Esto redefine la estrategia de llaves, obliga a una ruta de anonimización y eleva el Staging a pieza central. Cifras tomadas de extracciones desde Fusion DAR DEV1 (BI Publisher).</p>
        <div className="kpis">
          {KPIS.map((k, i) => (
            <div className={`kpi ${k.cls}`} key={i}>
              <div className={`v ${k.crit ? "crit" : ""}`}>{k.v}</div>
              <div className="l">{k.l}</div>
              <div className="foot">{k.foot}</div>
            </div>
          ))}
        </div>
        <div className="note"><b>Cómo leerlo:</b> los dos archivos no son insumos de carga, son extracciones <em>desde</em> Fusion: evidencia de los registros ya existentes en el ambiente.</div>
      </section>

      {/* 1 · Volúmenes */}
      <section>
        <p className="eyebrow">1 · Volúmenes</p>
        <h2 className="h2">Cargado frente a planificado</h2>
        <div className="tablewrap">
          <table className="dt">
            <thead><tr><th>Maestro</th><th className="right">Planificado</th><th className="right">Cargado por CX</th><th className="right">Diferencia</th><th>Observación</th></tr></thead>
            <tbody>
              <tr><td>Clientes (HZ_PARTIES)</td><td className="right n">55.700</td><td className="right n">324.960</td><td className="right n up">+483 %</td><td>167.221 PERSON · 157.739 ORGANIZATION</td></tr>
              <tr><td>Artículos (Product Hub)</td><td className="right n">~28.000</td><td className="right n">28.932</td><td className="right n ok">≈ completo</td><td>Catálogo de la org OMA ya presente</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dgrid">
          <div className="dcard c6">
            <h3>Composición de clientes</h3>
            <div className="stack"><i style={{ width: "51.5%", background: "#355e86" }} /><i style={{ width: "48.5%", background: "#8a98a8" }} /></div>
            <div className="keyline">
              <span><span className="sw" style={{ background: "#355e86" }} />PERSON <b>167.221 (51,5 %)</b></span>
              <span><span className="sw" style={{ background: "#8a98a8" }} />ORGANIZATION <b>157.739 (48,5 %)</b></span>
            </div>
            <p>La mitad del universo son <code>PERSON</code>, compatibles con consumidores B2C del canal commerce; su inclusión en el maestro de clientes de ERP debe confirmarse.</p>
          </div>
          <div className="dcard c6">
            <h3>Correspondencia de artículos con WMS</h3>
            <div className="stack"><i style={{ width: "21%", background: "#2e7d55" }} /><i style={{ width: "79%", background: "#c3ccd6" }} /></div>
            <div className="keyline">
              <span><span className="sw" style={{ background: "#2e7d55" }} />Prefijo taxonomía WMS <b>6.217 (21 %)</b></span>
              <span><span className="sw" style={{ background: "#c3ccd6" }} />Otros <b>22.715 (79 %)</b></span>
            </div>
            <p>El 21 % coincide con los prefijos de clasificación <em>putaway</em> de WMS, lo que indica un namespace de codificación común con PeopleSoft.</p>
          </div>
        </div>
      </section>

      {/* 2 · Secuencia */}
      <section>
        <p className="eyebrow">2 · Secuencia de integración</p>
        <h2 className="h2">CX escribe en ERP antes de la carga de migración</h2>
        <div className="flow">
          <div className="fnode"><div className="k">Origen</div><div className="nm">Oracle CX</div><div className="ds">Operativo y en uso</div></div>
          <div className="farrow">→</div>
          <div className="fnode"><div className="k">Integración</div><div className="nm">Fusion · TCA / PIMDH</div><div className="ds">Parties e ítems</div></div>
          <div className="farrow">→</div>
          <div className="fnode erp"><div className="k">Destino</div><div className="nm">ERP Fusion</div><div className="ds">Maestros ya poblados</div></div>
        </div>
        <div className="crit-note">La carga de migración de maestros base (Ola 1) estaba prevista para ejecutarse primero y definir las llaves. Al ejecutarse después de CX, encuentra Artículos y Clientes ya creados con llaves asignadas por Fusion (<code>ITEM_NUMBER</code>, <code>PARTY_NUMBER</code>). <b>Los registros ya cargados no pueden eliminarse.</b></div>
      </section>

      {/* 3 · Estrategia */}
      <section>
        <p className="eyebrow">3 · Estrategia</p>
        <h2 className="h2">Impactos en la estrategia de migración</h2>
        <div className="dgrid">
          <div className="dcard c6"><h3>Llaves</h3>
            <b style={{ color: "var(--navy)" }}>La estrategia de llaves propias queda invalidada</b>
            <p>El plan asumía que la llave la definía el dato migrado (extraer a Excel, entregar a Oracle, cargar). CX ya fijó las llaves; la migración debe <b>adoptar</b> <code>ITEM_NUMBER</code> y <code>PARTY_NUMBER</code> existentes en lugar de generarlos. El enfoque pasa de insertar a <b>reconciliar y complementar</b>.</p>
          </div>
          <div className="dcard c6"><h3>Datos</h3>
            <b style={{ color: "var(--navy)" }}>El saneamiento debe ser por anonimización, no por borrado</b>
            <p>Dado que lo cargado no se puede eliminar, los registros fuera de alcance o de prueba requieren una <b>estrategia de anonimización</b>, con regla, alcance de registros y ambientes definidos.</p>
          </div>
          <div className="dcard c6"><h3>Arquitectura</h3>
            <b style={{ color: "var(--navy)" }}>El Staging pasa a ser la pieza central</b>
            <p>Para mantener <b>PeopleSoft, ERP Fusion, CX y los módulos adicionales</b> sincronizados, el Staging deja de ser opcional: concentra la conciliación y el gobierno de llaves, y debe <b>versionar el universo por ambiente y fecha de corte</b>.</p>
          </div>
          <div className="dcard c6"><h3>Alcance</h3>
            <b style={{ color: "var(--navy)" }}>El maestro de clientes crece 5,8 veces</b>
            <p>324.960 frente a 55.700 planificados. Los 167.221 <code>PERSON</code> corresponden, con alta probabilidad, a consumidores del canal commerce no contemplados en el maestro de clientes de ERP; su inclusión impacta AR y la deduplicación.</p>
          </div>
        </div>
      </section>

      {/* 4 · Cruce */}
      <section>
        <p className="eyebrow">4 · Cruce de universos</p>
        <h2 className="h2">Correspondencia de ítems WMS – CX/ERP</h2>
        <p className="lead">Aunque son módulos independientes, sus universos de ítems deben coincidir: todo ítem de WMS debe existir en CX/ERP. Según el diccionario WMS (D020, regla columna K), la identidad del ítem (<code>part_a</code>) es el <code>INV_ITEM_ID</code> de PeopleSoft (SETID COR01, solo activos; kits por <code>PRODUCT_ID</code>).</p>
        <div className="join">
          <h3 style={{ margin: 0, fontFamily: "var(--mfont)", fontSize: ".7rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted)" }}>Llave de unión</h3>
          <div className="joinrow">
            <span className="token">WMS <b>part_a</b> = PeopleSoft <b>INV_ITEM_ID</b></span>
            <span className="eq">=</span>
            <span className="token">Fusion <b>ITEM_NUMBER</b></span>
          </div>
          <p style={{ margin: ".7rem 0 0", fontSize: ".84rem", color: "var(--muted)", lineHeight: 1.5 }}>El extracto de CX no incluye <code>SOURCE_SYSTEM_REFERENCE</code> (0 de 28.935): no existe columna puente, por lo que la unión es por valor literal del código. La coincidencia del 21 % de prefijos confirma el namespace común con PeopleSoft.</p>
        </div>
        <div className="res">
          <div className="rescard"><div className="t g">Coincidentes</div><div className="h">WMS presentes en CX/ERP</div><div className="v">Cantidad por calcular</div><span className="pill p-pend">Pendiente</span></div>
          <div className="rescard"><div className="t r">Faltantes</div><div className="h">WMS ausentes en CX/ERP</div><div className="v">Rompen la integración WMS–ERP</div><span className="pill p-pend">Pendiente</span></div>
          <div className="rescard"><div className="t b">Adicionales</div><div className="h">CX/ERP fuera del universo WMS</div><div className="v">Cantidad por calcular</div><span className="pill p-pend">Pendiente</span></div>
        </div>
        <div className="warn-note"><b>Insumo requerido:</b> la lista de <code>INV_ITEM_ID</code> activos de WMS (SETID COR01), proveniente de la extracción PeopleSoft / consulta ITM de Fabric. El archivo D020 disponible es el mapeo de campos, no los datos. Con esa lista, el cruce contra los 28.932 ítems de CX se completa con cifras exactas.</div>
      </section>

      {/* 5 · Profundización */}
      <section>
        <p className="eyebrow">5 · Profundización</p>
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

      {/* 6 · Riesgos y decisiones */}
      <section>
        <p className="eyebrow">6 · Riesgos y decisiones</p>
        <h2 className="h2">Riesgos abiertos y decisiones pendientes</h2>
        <div className="dgrid">
          <div className="dcard c6"><h3>Riesgos</h3>
            <div className="risk">
              <div className="ri"><b>Universo en movimiento.</b><p>La sincronización continua altera la foto (324.960 / 28.932) durante la preparación de la carga.</p></div>
              <div className="ri"><b>Cross-references duplicados.</b><p>Un <code>SOURCE_SYSTEM_CODE</code> distinto en la migración genera referencias duplicadas sobre el mismo registro.</p></div>
              <div className="ri"><b>PII fuera de alcance.</b><p>167 mil registros <code>PERSON</code> elevan la exposición y el ruido en AR.</p></div>
            </div>
          </div>
          <div className="dcard c6"><h3>Decisiones pendientes</h3>
            <ol className="dec">
              <li><b>Confirmar a CX como sistema de registro</b> de Artículos y Clientes, o revertir la sincronización si no estaba prevista.</li>
              <li><b>Entregar el universo WMS activo</b> (<code>INV_ITEM_ID</code>, SETID COR01) para cerrar el cruce con cifras.</li>
              <li><b>Definir el Staging como hub de conciliación</b> entre PeopleSoft, Fusion, CX y módulos, con versionado por corte.</li>
              <li><b>Aprobar la estrategia de anonimización</b>: regla, alcance de registros y ambientes.</li>
              <li><b>Reencaminar la Ola 1</b> de inserción a reconciliación, adoptando las llaves de CX.</li>
            </ol>
          </div>
        </div>
      </section>

      <div className="cxfoot">
        <b>Documento de trabajo — borrador para revisión interna.</b><br />
        Fuentes: Articulos_OMA_FBDI_26C (EGP_SYSTEM_ITEMS_INTERFACE — 28.935 filas, 28.932 ítems únicos); Info Cabecera Clientes Dev1 (HZ_PARTIES — 324.960 parties); DAR_D020_MapeoDatos_SCM_WMS_ITEMS (regla columna K). Ambiente: Oracle Fusion DAR DEV1. Cifras de clientes y artículos: valores agregados, sin datos personales.
      </div>
    </section>
  );
}
