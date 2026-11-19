import React, { useMemo, useState } from "react";
import DATA from "./bsWmsData.json";

const CSS = `
.bswms{--c-blue:#0058a8;--c-blue-d:#003b70;--c-cyan:#00a7e1;--c-ink:#1f2b3a;--c-mut:#5b6b7a;
 --c-bd:#d9e3ef;--c-soft:#f3f8fd;--ok:#0f8f6c;--ok-s:#e6f7ef;--warn:#c67c12;--warn-s:#fdf2dc;
 --crit:#b5323b;--crit-s:#fbe3e4;--viol:#6b46c1;--mono:"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace}
.bswms .bs-kpis{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin:4px 0 22px}
.bswms .bs-kpi{background:linear-gradient(180deg,#fcfeff,#f2f8ff);border:1px solid var(--c-bd);border-radius:12px;padding:15px;position:relative;overflow:hidden}
.bswms .bs-kpi::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:linear-gradient(180deg,var(--c-blue),var(--c-cyan))}
.bswms .bs-kpi.manual::before{background:linear-gradient(180deg,var(--viol),#8b63e0)}
.bswms .bs-kpi .v{font-family:var(--mono);font-weight:600;font-size:1.5rem;line-height:1;color:var(--c-blue-d)}
.bswms .bs-kpi .l{font-size:.73rem;color:var(--c-mut);margin-top:7px;line-height:1.25}
.bswms .bs-kpi.manual .v{color:var(--viol)}
.bswms .bs-two{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:8px}
@media(max-width:860px){.bswms .bs-kpis{grid-template-columns:repeat(2,1fr)}.bswms .bs-two{grid-template-columns:1fr}}
.bswms .env{border:1px solid var(--c-bd);border-radius:14px;background:#fff;padding:18px;position:relative}
.bswms .env.inicial{border-top:3px solid var(--c-blue)}
.bswms .env.adicional{border-top:3px solid var(--viol)}
.bswms .env .etag{font-size:.7rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;font-family:var(--mono)}
.bswms .env.inicial .etag{color:var(--c-blue)}
.bswms .env.adicional .etag{color:var(--viol)}
.bswms .env h4{margin:3px 0 0;font-size:1.05rem;color:var(--c-ink)}
.bswms .env .edesc{font-size:.84rem;color:var(--c-mut);margin:8px 0 14px;line-height:1.45}
.bswms .env .emetrics{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.bswms .env .em{background:var(--c-soft);border-radius:10px;padding:10px 12px}
.bswms .env .em .ev{font-family:var(--mono);font-weight:600;font-size:1.15rem;color:var(--c-blue-d)}
.bswms .env.adicional .em .ev{color:var(--viol)}
.bswms .env .em .el{font-size:.72rem;color:var(--c-mut);margin-top:3px}
.bswms .split{margin:6px 0 20px}
.bswms .split .sbl{display:flex;justify-content:space-between;font-size:.82rem;color:var(--c-mut);margin-bottom:6px}
.bswms .split .track{height:16px;border-radius:8px;overflow:hidden;display:flex;border:1px solid var(--c-bd)}
.bswms .split .seg-ini{background:linear-gradient(90deg,var(--c-blue),var(--c-cyan))}
.bswms .split .seg-adi{background:linear-gradient(90deg,var(--viol),#8b63e0)}
.bswms .split .leg{display:flex;gap:18px;margin-top:8px;font-size:.78rem}
.bswms .split .leg span{display:inline-flex;align-items:center;gap:6px}
.bswms .split .dot{width:10px;height:10px;border-radius:3px;display:inline-block}
.bswms .flow{display:grid;grid-template-columns:auto 1fr;gap:14px 18px;align-items:center;margin-top:6px}
.bswms .flow .big{font-family:var(--mono);font-weight:600;font-size:2rem;color:var(--c-blue-d);line-height:1}
.bswms .funnel{display:flex;gap:10px;flex-wrap:wrap;margin-top:4px}
.bswms .fstep{flex:1;min-width:150px;border:1px solid var(--c-bd);border-radius:12px;padding:14px;background:linear-gradient(180deg,#fcfeff,#f4f9fe)}
.bswms .fstep .fv{font-family:var(--mono);font-weight:600;font-size:1.5rem}
.bswms .fstep .fl{font-size:.78rem;color:var(--c-mut);margin-top:5px;line-height:1.3}
.bswms .fstep.ok .fv{color:var(--ok)}.bswms .fstep.crit .fv{color:var(--crit)}
.bswms .fstep.add .fv{color:var(--viol)}.bswms .fstep.tot .fv{color:var(--c-blue-d)}
.bswms .fstep.ok{border-color:#bfe6d4}.bswms .fstep.crit{border-color:#f0c5c3}.bswms .fstep.add{border-color:#d8cdf0}
.bswms .mot-sum{display:flex;flex-direction:column;gap:9px;margin-top:4px}
.bswms .mot-row{display:grid;grid-template-columns:38px 1fr;gap:12px;align-items:start}
.bswms .mot-row .mc{font-family:var(--mono);font-weight:600;font-size:1.1rem;color:var(--crit);text-align:right;padding-top:1px}
.bswms .mot-row .mt{font-size:.84rem;line-height:1.4}
.bswms .mot-row .mbar{grid-column:2;height:6px;border-radius:4px;background:#eef3f8;overflow:hidden;margin-top:5px}
.bswms .mot-row .mfill{height:100%;border-radius:4px;background:linear-gradient(90deg,var(--warn),#eaa552)}
.bswms .tblwrap{overflow-x:auto;border:1px solid var(--c-bd);border-radius:12px;margin-top:6px}
.bswms table.bt{border-collapse:collapse;width:100%;font-size:.83rem;min-width:720px}
.bswms table.bt th{background:var(--c-soft);text-align:left;font-family:var(--mono);font-size:.66rem;letter-spacing:.05em;text-transform:uppercase;color:var(--c-mut);font-weight:600;padding:10px 12px;border-bottom:2px solid var(--c-bd);white-space:nowrap}
.bswms table.bt td{padding:9px 12px;border-bottom:1px solid #eef3f8;vertical-align:top}
.bswms table.bt tbody tr:hover{background:var(--c-soft)}
.bswms .mono2{font-family:var(--mono);font-size:.8rem}
.bswms .zbars{display:flex;flex-direction:column;gap:8px;margin-top:6px}
.bswms .zbar{display:grid;grid-template-columns:120px 1fr 60px;gap:10px;align-items:center;font-size:.82rem}
.bswms .zbar .zt{display:block;height:8px;border-radius:5px;background:#eef3f8;overflow:hidden}
.bswms .zbar .zf{display:block;height:100%;border-radius:5px;background:linear-gradient(90deg,var(--c-blue),var(--c-cyan))}
.bswms .zbar .zv{font-family:var(--mono);text-align:right;color:var(--c-mut)}
.bswms .bs-note{font-size:.8rem;color:var(--c-mut);margin-top:12px;background:var(--c-soft);border-left:3px solid var(--c-blue);border-radius:0 8px 8px 0;padding:10px 14px}
.bswms h2 .pico{font-family:var(--mono);font-size:.7rem;font-weight:600;color:var(--c-blue);background:#e3eefb;border-radius:999px;padding:3px 9px;margin-left:10px;vertical-align:middle;letter-spacing:.04em}
.bswms .sec-t{font-size:1.15rem;font-weight:700;color:var(--c-blue-d);margin:26px 0 2px}
.bswms .sec-d{font-size:.88rem;color:var(--c-mut);margin:0 0 12px;max-width:72ch;line-height:1.5}
.bswms .subt{font-size:.78rem;letter-spacing:.05em;text-transform:uppercase;color:var(--c-mut);font-family:var(--mono);font-weight:600;margin:18px 0 8px}
.bswms .sem-sum{display:grid;grid-template-columns:repeat(3,1fr) 2fr;gap:12px;align-items:stretch;margin:6px 0 18px}
.bswms .sem-c{border:1px solid var(--c-bd);border-radius:12px;padding:14px 16px;display:flex;align-items:center;gap:12px;background:#fff}
.bswms .sem-dot{width:16px;height:16px;border-radius:50%;flex:none;box-shadow:0 0 0 4px rgba(0,0,0,.04)}
.bswms .sem-dot.verde{background:var(--ok)}.bswms .sem-dot.amarillo{background:var(--warn)}.bswms .sem-dot.rojo{background:var(--crit)}
.bswms .sem-c .sv{font-family:var(--mono);font-weight:600;font-size:1.5rem;line-height:1}
.bswms .sem-c.verde .sv{color:var(--ok)}.bswms .sem-c.amarillo .sv{color:var(--warn)}.bswms .sem-c.rojo .sv{color:var(--crit)}
.bswms .sem-c .sl{font-size:.74rem;color:var(--c-mut);margin-top:3px;line-height:1.25}
.bswms .sem-bar-wrap{border:1px solid var(--c-bd);border-radius:12px;padding:14px 16px;background:#fff;display:flex;flex-direction:column;justify-content:center}
.bswms .sem-bar{height:16px;border-radius:8px;overflow:hidden;display:flex;border:1px solid var(--c-bd)}
.bswms .sem-bar .sg{height:100%}.bswms .sem-bar .sg.verde{background:var(--ok)}.bswms .sem-bar .sg.amarillo{background:var(--warn)}.bswms .sem-bar .sg.rojo{background:var(--crit)}
.bswms .sem-bar-lbl{font-size:.74rem;color:var(--c-mut);margin-top:7px}
.bswms table.sem{border-collapse:collapse;width:100%;font-size:.84rem;min-width:720px}
.bswms table.sem th{background:var(--c-soft);text-align:left;font-family:var(--mono);font-size:.66rem;letter-spacing:.05em;text-transform:uppercase;color:var(--c-mut);font-weight:600;padding:10px 12px;border-bottom:2px solid var(--c-bd);white-space:nowrap}
.bswms table.sem th.r,.bswms table.sem td.r{text-align:right}
.bswms table.sem td{padding:10px 12px;border-bottom:1px solid #eef3f8;vertical-align:middle}
.bswms table.sem tbody tr.semmain{cursor:pointer}
.bswms table.sem tbody tr.semmain:hover{background:var(--c-soft)}
.bswms .sdot{display:inline-block;width:12px;height:12px;border-radius:50%;vertical-align:middle}
.bswms .sdot.verde{background:var(--ok)}.bswms .sdot.amarillo{background:var(--warn)}.bswms .sdot.rojo{background:var(--crit)}
.bswms .pbar{display:flex;align-items:center;gap:8px;min-width:130px;justify-content:flex-end}
.bswms .pbar .pt{display:block;flex:1;max-width:90px;height:7px;border-radius:5px;background:#eef3f8;overflow:hidden}
.bswms .pbar .pf{display:block;height:100%;border-radius:5px}
.bswms .pbar .pf.verde{background:var(--ok)}.bswms .pbar .pf.amarillo{background:var(--warn)}.bswms .pbar .pf.rojo{background:var(--crit)}
.bswms .pbar .pp{font-family:var(--mono);font-size:.8rem;font-weight:600;width:52px;text-align:right}
.bswms .obs{font-size:.82rem;color:var(--c-mut)}
.bswms .caretb{display:inline-block;width:12px;color:var(--c-blue);font-size:.7rem;transition:transform .15s}
.bswms tr.open .caretb{transform:rotate(90deg)}
.bswms .rulerow td{background:#f8fbfe;padding:0}
.bswms .rulebox{padding:12px 16px 14px 34px;font-size:.84rem;color:var(--c-ink);line-height:1.5}
.bswms .rulebox .rl{font-family:var(--mono);font-size:.66rem;letter-spacing:.05em;text-transform:uppercase;color:var(--c-mut);display:block;margin-bottom:4px}
.bswms .inv-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:6px 0 14px}
.bswms .inv-k{border:1px solid var(--c-bd);border-radius:12px;padding:12px 14px;background:linear-gradient(180deg,#fcfeff,#f2f8ff)}
.bswms .inv-k .v{font-family:var(--mono);font-weight:600;font-size:1.25rem;color:var(--c-blue-d)}
.bswms .inv-k.warn .v{color:var(--warn)}.bswms .inv-k.ok .v{color:var(--ok)}
.bswms .inv-k .l{font-size:.72rem;color:var(--c-mut);margin-top:5px;line-height:1.25}
.bswms table.inv{border-collapse:collapse;width:100%;font-size:.82rem;min-width:620px}
.bswms table.inv th{background:var(--c-soft);text-align:left;font-family:var(--mono);font-size:.64rem;text-transform:uppercase;color:var(--c-mut);padding:8px 11px;border-bottom:2px solid var(--c-bd)}
.bswms table.inv th.r,.bswms table.inv td.r{text-align:right}
.bswms table.inv td{padding:8px 11px;border-bottom:1px solid #eef3f8}
.bswms table.inv tr.tot td{font-weight:700;background:var(--c-soft);border-top:2px solid var(--c-bd)}
@media(max-width:860px){.bswms .sem-sum{grid-template-columns:1fr 1fr}.bswms .inv-kpis{grid-template-columns:1fr 1fr}}
`;

const nf = (n) => (n == null || n === "") ? "—" : Number(n).toLocaleString("es-CO");

/* Resultados del cargue en WMS (UAT · Test 2). Semáforo: verde = OK,
   amarillo = con observaciones, rojo = con errores. Reglas resumidas desde
   GD-12-1 Especificaciones de Transformación WMS. */
const UAT = {
  corte: "18/10/2026 · 23:06",
  plantillas: [
    { n: "Items", env: 14036, ok: 14036, pct: 100, sem: "verde", obs: "100% creados en WMS Test 2.",
      regla: "Universo de ítems activos y vigentes (EFF_STATUS='A', ITM_STATUS_CURRENT='1') con UOM de WMS (AJ_UOM_WMS='Y') y SETID = COR01. Especificación de 123 campos: derivación de unidades de medida, costo y atributos." },
    { n: "Barcodes", env: 16139, ok: 16130, pct: 99.94, sem: "amarillo", obs: "9 no cargados por duplicidad; informados a Azurian y Darnel para revisión.",
      regla: "Un registro por formato (EAN13/UPC12) con vendor_barcode único; solo artículos existentes en el maestro de WMS. 7 campos." },
    { n: "Item Facility Code", env: 418, ok: 418, pct: 100, sem: "verde", obs: "Cargados correctamente · Facility 01 Madrid 214 · Facility 05 Álamos 214.",
      regla: "facility_code se envía como constante: primero los registros con '01' y luego se repiten con '05'. Depende de Item y de Item Pre-Pack (el IPP se carga primero); part_a se obtiene de PS_PROD_ITEM. 27 campos." },
    { n: "Item Pre-Pack (kits)", env: 209, ok: 209, pct: 100, sem: "verde", obs: "209 padres completamente configurados · 383 relaciones padre-hijo enviadas.",
      regla: "Universo: registros de PS_PROD_ITEM con PRODUCT_KIT_FLAG = 'Y' (preempaquetado) y sus relaciones padre–hijo. 33 campos." },
    { n: "Ubicaciones", env: 24502, ok: 24502, pct: 100, sem: "verde", obs: "Cargadas correctamente · Facility 01 Madrid 21.855 · Facility 05 Álamos 2.640.",
      regla: "wh_id 01/05; derivación de type y locn_size_type, segmentación de location_id y normalización de caracteres especiales." },
    { n: "Inventarios (carga y recepción)", env: 28326, ok: 28326, pct: 100, sem: "verde", obs: "28.326 LPN enviados; 100% cargados y recibidos.",
      regla: "Universo con status in (A, H) de t_stored_item; lpn_nbr se toma de hu_id y, si es NULL, se genera un consecutivo de 10 dígitos con prefijo 'DAR'. action_code constante. 97 campos." },
    { n: "Ubicaciones de inventario", env: 28326, ok: 27833, pct: 98.26, sem: "amarillo", obs: "27.833 LPN con ubicación procesada; 493 pendientes de ubicar.",
      regla: "Plantilla derivada del inventario: company_code, facility_code, lpn_nbr, receipt_ts, location_barcode y lock_code dependen de las columnas de la plantilla de inventario (ISS). 8 campos." },
  ],
  inv: {
    lpn: 28326, recibidos: 28326, ubicacion: 27833, pctUbic: 98.26, pendientes: 493,
    asn: [
      ["01", "ASNINV20261017", 26133, 26133, 26133, 25679, 98.26],
      ["05", "ASNINV20101705", 2193, 2193, 2193, 2154, 98.22],
    ],
    fac: [
      { f: "Facility 01 · Madrid", reserva: 23834, activos: 1845, pend: 454 },
      { f: "Facility 05 · Álamos", reserva: 1130, activos: 1024, pend: 39 },
    ],
  },
};

export default function BsWmsDashboard() {
  const [ruleOpen, setRuleOpen] = React.useState(null);
  const semCount = UAT.plantillas.reduce((a, p) => (a[p.sem]++, a), { verde: 0, amarillo: 0, rojo: 0 });
  const semTot = UAT.plantillas.length;
  const K = DATA.kpis;
  const [ini, adi] = DATA.envios;
  const P = DATA.piso;
  const M = DATA.motivos;
  const zmax = Math.max(...DATA.zonas.map((z) => z[1]), 1);
  const pctManual = (adi.lineas / K.lineas_total) * 100;

  // Conteo de motivos: unifica variantes equivalentes en un solo renglón.
  const motResumen = useMemo(() => {
    const grupos = [
      { test: (t) => t.startsWith("Sin stock en bodega 01"),
        label: "Sin stock en bodega 01 (el stock está en otras bodegas que no se envían)." },
      { test: (t) => t.startsWith("Su única línea en bodega 01"),
        label: "Su única línea en bodega 01 está en una ubicación tipo D/P no inventariable (incluye PUERTA24)." },
    ];
    const acc = new Map();
    const out = [];
    for (const [texto, n] of M.resumen) {
      const g = grupos.find((x) => x.test(texto));
      if (g) acc.set(g.label, (acc.get(g.label) || 0) + n);
      else out.push([texto, n]);
    }
    for (const [label, n] of acc) out.push([label, n]);
    return out.sort((a, b) => b[1] - a[1]);
  }, [M]);
  const motMax = Math.max(...motResumen.map((m) => m[1]), 1);

  const kpis = [
    { v: K.lineas_total, l: "Líneas de inventario enviadas (ISS)" },
    { v: K.lpns_total, l: "Contenedores / LPN cargados" },
    { v: K.unidades_total, l: "Unidades de inventario" },
    { v: K.items_inicial, l: "Ítems distintos (envío inicial)" },
    { v: K.ubic_total, l: "Registros de ubicación (LLL)" },
    { v: pctManual.toFixed(1) + "%", l: "Del total construido manualmente", cls: "manual" },
  ];

  const seg = (base, n) => ((n / base) * 100).toFixed(1) + "%";

  return (
    <section className="card bswms">
      <style>{CSS}</style>
      <h2>Business Simulation · WMS<span className="pico">Resumen ejecutivo</span></h2>
      <p className="entity-summary">
        Prueba de Business Simulation (BS) ejecutada sobre los datos migrados en UAT, incorporando
        las correcciones surgidas durante las pruebas. Se cargó el inventario de piso de la bodega 01
        al WMS mediante las plantillas de inventario (ISS) y ubicaciones (LLL). Esta vista resume el
        volumen enviado, el origen de los datos (lógica de extracción vs. construcción manual) y los
        artículos que no migraron con su motivo.
      </p>

      <div className="bs-kpis">
        {kpis.map((k, i) => (
          <div className={`bs-kpi ${k.cls || ""}`} key={i}>
            <div className="v">{typeof k.v === "number" ? nf(k.v) : k.v}</div>
            <div className="l">{k.l}</div>
          </div>
        ))}
      </div>

      <div className="sec-t">Origen de los datos enviados</div>
      <p className="sec-d">
        El envío inicial lo generó la extracción automática aplicando las reglas de negocio; lo que no
        migró por esas reglas se rearmó manualmente en los archivos «adicional».
      </p>
      <div className="split">
        <div className="sbl"><span>Distribución de líneas de inventario</span><span>{nf(K.lineas_total)} líneas</span></div>
        <div className="track">
          <div className="seg-ini" style={{ width: seg(K.lineas_total, ini.lineas) }} />
          <div className="seg-adi" style={{ width: seg(K.lineas_total, adi.lineas) }} />
        </div>
        <div className="leg">
          <span><i className="dot" style={{ background: "var(--c-blue)" }} /> Inicial · {nf(ini.lineas)} ({seg(K.lineas_total, ini.lineas)})</span>
          <span><i className="dot" style={{ background: "var(--viol)" }} /> Adicional · {nf(adi.lineas)} ({seg(K.lineas_total, adi.lineas)})</span>
        </div>
      </div>

      <div className="bs-two">
        {DATA.envios.map((e, i) => (
          <div className={`env ${e.tipo.toLowerCase()}`} key={i}>
            <div className="etag">{e.tipo === "Inicial" ? "Envío inicial" : "Envío adicional"}</div>
            <h4>{e.etiqueta}</h4>
            <p className="edesc">{e.desc}</p>
            <div className="emetrics">
              <div className="em"><div className="ev">{nf(e.lineas)}</div><div className="el">Líneas de inventario</div></div>
              <div className="em"><div className="ev">{nf(e.lpns)}</div><div className="el">Contenedores / LPN</div></div>
              <div className="em"><div className="ev">{nf(e.unidades)}</div><div className="el">Unidades</div></div>
              <div className="em"><div className="ev">{nf(e.items)}</div><div className="el">Ítems distintos</div></div>
              <div className="em"><div className="ev">{nf(e.ubicaciones)}</div><div className="el">Registros de ubicación</div></div>
              <div className="em"><div className="ev">{nf(e.ubic_unicas)}</div><div className="el">Ubicaciones únicas</div></div>
            </div>
          </div>
        ))}
      </div>

      <div className="sec-t">Cobertura de los artículos de piso</div>
      <p className="sec-d">
        La definición de la BS fue migrar todos los artículos que estuvieran en la misma ubicación y
        pallet que los artículos listados. Partiendo de {nf(P.total)} artículos de referencia, la regla
        arrastró el resto del stock co-ubicado.
      </p>
      <div className="funnel">
        <div className="fstep tot"><div className="fv">{nf(P.total)}</div><div className="fl">Artículos de piso listados (semilla de la prueba)</div></div>
        <div className="fstep ok"><div className="fv">{nf(P.migrados)}</div><div className="fl">De los listados, migraron correctamente</div></div>
        <div className="fstep crit"><div className="fv">{nf(P.no_migraron)}</div><div className="fl">De los listados, no migraron (ver motivos)</div></div>
        <div className="fstep add"><div className="fv">+{nf(P.arrastrados)}</div><div className="fl">Arrastrados por la regla misma ubicación / pallet</div></div>
        <div className="fstep tot"><div className="fv">{nf(P.enviados)}</div><div className="fl">Ítems distintos enviados en total (inicial)</div></div>
      </div>

      <div className="sec-t">Artículos no migrados y su motivo</div>
      <p className="sec-d">
        Relación ítem ↔ motivo de falla ({M.total} artículos), y el conteo de artículos por cada motivo único.
      </p>
      <div className="bs-two" style={{ gridTemplateColumns: "1fr", marginBottom: 0 }}>
        <div>
          <div className="mot-sum">
            {motResumen.map((m, i) => (
              <div className="mot-row" key={i}>
                <div className="mc">{m[1]}</div>
                <div className="mt">{m[0]}</div>
                <div className="mbar"><div className="mfill" style={{ width: (m[1] / motMax * 100) + "%" }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="tblwrap">
        <table className="bt">
          <thead><tr>
            <th>Ítem origen</th><th>part_a (código final)</th><th>item_alternate_code</th><th>Motivo</th>
          </tr></thead>
          <tbody>
            {M.rows.map((r, i) => (
              <tr key={i}>
                <td className="mono2">{r[0]}</td>
                <td className="mono2">{r[1]}</td>
                <td className="mono2">{r[2]}</td>
                <td>{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="bs-note">
        El motivo «código de producto como prioridad» no es una falla: esos artículos sí migraron, pero
        bajo el código de producto en lugar del código de artículo, según la regla de la plantilla.
      </p>

      <div className="sec-t">Distribución del inventario inicial por zona de ubicación</div>
      <p className="sec-d">Contenedores por zona del barcode de ubicación (primer segmento), en el envío inicial.</p>
      <div className="zbars">
        {DATA.zonas.map((z, i) => (
          <div className="zbar" key={i}>
            <span className="mono2">{z[0]}</span>
            <span className="zt"><span className="zf" style={{ width: (z[1] / zmax * 100) + "%" }} /></span>
            <span className="zv">{nf(z[1])}</span>
          </div>
        ))}
      </div>

      {/* ---------- RESULTADOS WMS UAT ---------- */}
      <div className="sec-t">Resultados WMS UAT · Test 2</div>
      <p className="sec-d">
        Resultado del cargue de las 7 plantillas en WMS Test 2 (corte {UAT.corte}), evaluado con un
        semáforo: <b style={{ color: "var(--ok)" }}>verde</b> = cargado sin novedades,
        <b style={{ color: "var(--warn)" }}> amarillo</b> = con observaciones,
        <b style={{ color: "var(--crit)" }}> rojo</b> = con errores. Cada plantilla despliega su regla de
        transformación.
      </p>

      <div className="sem-sum">
        {[["verde", "Sin novedades"], ["amarillo", "Con observaciones"], ["rojo", "Con errores"]].map(([k, l]) => (
          <div className={`sem-c ${k}`} key={k}>
            <span className={`sem-dot ${k}`} />
            <span><span className="sv">{semCount[k]}</span><span className="sl">{l}</span></span>
          </div>
        ))}
        <div className="sem-bar-wrap">
          <div className="sem-bar">
            {["verde", "amarillo", "rojo"].map((k) => semCount[k] > 0 && (
              <span className={`sg ${k}`} key={k} style={{ width: (semCount[k] / semTot * 100) + "%" }} />
            ))}
          </div>
          <div className="sem-bar-lbl">{semCount.verde} de {semTot} plantillas cargadas sin novedades · {semCount.amarillo} con observaciones · {semCount.rojo} con errores.</div>
        </div>
      </div>

      <div className="tblwrap">
        <table className="sem">
          <thead><tr>
            <th style={{ width: 34 }}></th><th>Plantilla</th><th className="r">Enviados</th><th className="r">Cargados</th><th className="r">% éxito</th><th>Observación</th>
          </tr></thead>
          <tbody>
            {UAT.plantillas.map((p, i) => {
              const isOpen = ruleOpen === i;
              return (
                <React.Fragment key={i}>
                  <tr className={`semmain ${isOpen ? "open" : ""}`} onClick={() => setRuleOpen(isOpen ? null : i)}>
                    <td><span className={`sdot ${p.sem}`} /></td>
                    <td><span className="caretb">▶</span> <b>{p.n}</b></td>
                    <td className="r n">{nf(p.env)}</td>
                    <td className="r n">{nf(p.ok)}</td>
                    <td className="r">
                      <span className="pbar"><span className="pt"><span className={`pf ${p.sem}`} style={{ width: p.pct + "%" }} /></span><span className="pp">{p.pct}%</span></span>
                    </td>
                    <td className="obs">{p.obs}</td>
                  </tr>
                  {isOpen && (
                    <tr className="rulerow"><td colSpan={6}>
                      <div className="rulebox"><span className="rl">Regla de transformación</span>{p.regla}</div>
                    </td></tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="subt" style={{ marginTop: 20 }}>Detalle del inventario · carga, recepción y ubicación</div>
      <div className="inv-kpis">
        <div className="inv-k"><div className="v">{nf(UAT.inv.lpn)}</div><div className="l">LPN enviados</div></div>
        <div className="inv-k ok"><div className="v">100%</div><div className="l">Cargados y recibidos</div></div>
        <div className="inv-k warn"><div className="v">{UAT.inv.pctUbic}%</div><div className="l">Ubicación procesada</div></div>
        <div className="inv-k warn"><div className="v">{nf(UAT.inv.pendientes)}</div><div className="l">LPN pendientes de ubicar</div></div>
      </div>
      <div className="tblwrap">
        <table className="inv">
          <thead><tr>
            <th>Facility</th><th>ASN</th><th className="r">Plantilla</th><th className="r">Cargados</th><th className="r">Recibidos</th><th className="r">Ubicación proc.</th><th className="r">% ubicación</th>
          </tr></thead>
          <tbody>
            {UAT.inv.asn.map((r, i) => (
              <tr key={i}>
                <td className="mono2">{r[0]}</td><td className="mono2">{r[1]}</td>
                <td className="r n">{nf(r[2])}</td><td className="r n">{nf(r[3])}</td><td className="r n">{nf(r[4])}</td><td className="r n">{nf(r[5])}</td><td className="r n">{r[6]}%</td>
              </tr>
            ))}
            <tr className="tot">
              <td>Total</td><td>—</td>
              <td className="r">{nf(28326)}</td><td className="r">{nf(28326)}</td><td className="r">{nf(28326)}</td><td className="r">{nf(27833)}</td><td className="r">98,26%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="inv-kpis" style={{ gridTemplateColumns: "1fr 1fr", marginTop: 14 }}>
        {UAT.inv.fac.map((f, i) => (
          <div className="cal-box" style={{ border: "1px solid var(--c-bd)", borderRadius: 12, padding: 14 }} key={i}>
            <div style={{ fontWeight: 700, color: "var(--c-blue-d)", marginBottom: 8 }}>{f.f}</div>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap", fontSize: ".84rem" }}>
              <span><b className="n" style={{ color: "var(--ok)" }}>{nf(f.reserva)}</b> <span style={{ color: "var(--c-mut)" }}>ubicados en reserva</span></span>
              <span><b className="n" style={{ color: "var(--c-blue-d)" }}>{nf(f.activos)}</b> <span style={{ color: "var(--c-mut)" }}>consumidos en activos</span></span>
              <span><b className="n" style={{ color: "var(--warn)" }}>{nf(f.pend)}</b> <span style={{ color: "var(--c-mut)" }}>pendientes</span></span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
