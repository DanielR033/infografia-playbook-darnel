import React, { useState } from "react";
import MapeoReportesBI from "./MapeoReportesBI.jsx";
import IndicadoresProyecto, { VentanaTecnica } from "./IndicadoresProyecto.jsx";

/* Temas del comité semana a semana. Agregar nuevos ítems al inicio del arreglo.
   tab: id de la pestaña destino (debe existir en el arreglo `tabs` de App.jsx). */
const AGENDA = [
  {
    etiqueta: "En curso",
    fecha: "",
    titulo: "Impacto CX · cruce con plantillas ERP",
    desc: "Cruce de lo que Oracle CX escribe en Fusion (parties, ítems) con las plantillas de carga ERP: entidades, hojas FBDI y evidencia de extracción.",
    tab: "impacto-cx",
    nuevo: true,
  },
  {
    etiqueta: "En curso",
    fecha: "",
    titulo: "PB1 Oracle Fusion",
    desc: "Insights y puntos abiertos a nivel de datos del Playback 1 (corte 26-11-2026), con el conteo de los datos cargados en PB1 —Clientes, Artículos y Proveedores— contrastado contra el volumen inicial del ERP.",
    tab: "pb1-fusion",
    nuevo: true,
  },
  {
    etiqueta: "En curso",
    fecha: "",
    titulo: "Presentación de inventario PB2 y seguimiento de mapeo de datos",
    desc: "Dimensionamiento del alcance de PB2 (objetos, plantillas, hojas y columnas por módulo) y su cronograma, junto con el avance del mapeo de columnas de las plantillas de Oracle Fusion: % por módulo, maestro y objeto, con el detalle de qué está mapeado y qué no.",
    tab: "erp-inv",
    nuevo: true,
  },
  {
    etiqueta: "En curso",
    fecha: "",
    titulo: "Seguimiento mapeo reportes BI · WMS Cloud",
    desc: "Continuidad de los reportes que hoy tiene BI para el momento de la migración: avance del pre-mapeo de los campos fuente a WMS Cloud.",
    overlay: "mapeo-bi",
    nuevo: true,
  },
  {
    etiqueta: "En curso",
    fecha: "",
    titulo: "Seguimiento plan de cutover",
    desc: "Checklist técnico y funcional del cutover de WMS, tiempos del pipeline de migración y detalle del plan con su estado.",
    tab: "cutover",
    nuevo: false,
  },
  {
    etiqueta: "15 nov 2026",
    fecha: "Domingo 15 de noviembre de 2026",
    titulo: "Resultados de las pruebas de Business Simulation",
    desc: "Volumen cargado al WMS, origen de los datos (lógica de extracción vs. construcción manual) y artículos no migrados con su motivo. Se añade la nueva lógica de manejo de inventario «Convertir el inventario de Madrid a la Unidad de Medida de Álamos». Además, se resolvió el JIRA C400402681-2520: se disponibilizó una plantilla extraída nuevamente para certificar el cambio y se hará otra extracción para certificar ambas puntas.",
    tab: "bs-wms",
    nuevo: true,
  },
];

const ACCESOS = [
  { tab: "bs-wms", titulo: "BS WMS", desc: "Resumen ejecutivo de la Business Simulation." },
  { tab: "erp-inv", titulo: "ERP Inventario", desc: "Dimensionamiento de la migración a Oracle Fusion 26C." },
  { tab: "erp", titulo: "ERP", desc: "Avance del frente ERP: volumetría y calidad de datos." },
  { tab: "fabric", titulo: "Microsoft Fabric", desc: "Ejecuciones, tiempos, almacenamiento y capacidad del workspace de migración." },
  { tab: "impacto-cx", titulo: "Impacto CX", desc: "Impacto del sistema comercial en clientes y artículos: hallazgos, unidades de medida, decisiones y plazos." },
];

const CSS = `
.comite{--c-blue:#0058a8;--c-blue-d:#003b70;--c-cyan:#00a7e1;--c-ink:#1f2b3a;--c-mut:#5b6b7a;
 --c-bd:#d9e3ef;--c-soft:#f3f8fd;--ok:#0f8f6c;--mono:"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace}
.comite .cm-eyebrow{font-family:var(--mono);font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--c-blue);font-weight:600;margin:0}
.comite .sec-t{font-size:1.1rem;font-weight:700;color:var(--c-blue-d);margin:24px 0 2px}
.comite .sec-d{font-size:.88rem;color:var(--c-mut);margin:0 0 14px;max-width:72ch;line-height:1.5}
.comite .agenda{display:flex;flex-direction:column;gap:12px}
.comite .ag-item{display:grid;grid-template-columns:132px 1fr auto;gap:16px;align-items:center;width:100%;text-align:left;
  border:1px solid var(--c-bd);border-left:4px solid var(--c-blue);border-radius:12px;background:linear-gradient(180deg,#fcfeff,#f4f9fe);
  padding:16px 18px;cursor:pointer;font:inherit;color:inherit;transition:box-shadow .15s,transform .05s,border-color .15s}
.comite .ag-item:hover{box-shadow:0 6px 18px rgba(0,88,168,.12);border-color:var(--c-blue)}
.comite .ag-item:active{transform:translateY(1px)}
.comite .ag-date{display:flex;flex-direction:column;gap:4px}
.comite .ag-date .dchip{font-family:var(--mono);font-size:.74rem;font-weight:600;color:var(--c-blue-d);background:#e3eefb;border-radius:8px;padding:5px 9px;text-align:center}
.comite .ag-body{display:flex;flex-direction:column}
.comite .ag-body .at{font-size:1rem;font-weight:700;color:var(--c-ink);display:flex;align-items:center;gap:9px;flex-wrap:wrap}
.comite .ag-body .ad{display:block;font-size:.85rem;color:var(--c-mut);margin-top:5px;line-height:1.45}
.comite .ag-body .afecha{display:block;font-size:.74rem;color:var(--c-mut);font-family:var(--mono);margin-top:7px}
.comite .badge-new{font-family:var(--mono);font-size:.64rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#fff;background:linear-gradient(90deg,var(--ok),#23b98a);border-radius:999px;padding:2px 8px}
.comite .ag-go{font-family:var(--mono);font-size:.82rem;font-weight:600;color:var(--c-blue);white-space:nowrap}
.comite .accesos{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px}
.comite .acc{border:1px solid var(--c-bd);border-radius:12px;background:#fff;padding:16px;cursor:pointer;text-align:left;font:inherit;color:inherit;transition:box-shadow .15s,border-color .15s}
.comite .acc:hover{box-shadow:0 6px 16px rgba(0,88,168,.1);border-color:var(--c-blue)}
.comite .acc .act{font-weight:700;color:var(--c-blue-d);display:flex;align-items:center;justify-content:space-between;gap:8px}
.comite .acc .act .arrow{color:var(--c-blue);font-family:var(--mono)}
.comite .acc .acd{font-size:.82rem;color:var(--c-mut);margin-top:6px;line-height:1.4}
.comite .cm-hint{font-size:.8rem;color:var(--c-mut);margin-top:14px;background:var(--c-soft);border-left:3px solid var(--c-blue);border-radius:0 8px 8px 0;padding:10px 14px}
@media(max-width:820px){.comite .accesos{grid-template-columns:1fr}.comite .ag-item{grid-template-columns:1fr;gap:10px}.comite .ag-go{display:none}}
`;

export default function SeguimientoComite({ onNavigate }) {
  const [verMapeo, setVerMapeo] = useState(false);
  const go = (tab) => typeof onNavigate === "function" && onNavigate(tab);
  const abrir = (a) => {
    if (a.overlay === "mapeo-bi") setVerMapeo(true);
    else go(a.tab);
  };
  return (
    <section className="card comite">
      {verMapeo && <MapeoReportesBI onClose={() => setVerMapeo(false)} />}
      <style>{CSS}</style>
      <p className="cm-eyebrow">Comité de datos</p>
      <h2 style={{ marginTop: 6 }}>Seguimiento semanal</h2>
      <p className="entity-summary">
        Punto de partida del comité de datos. Desde aquí se presentan los avances semana a semana;
        cada tema enlaza directamente a la vista con el detalle correspondiente.
      </p>

      <IndicadoresProyecto irA={go} abrirBI={() => setVerMapeo(true)} />

      <div className="sec-t">Temas de la semana</div>
      <p className="sec-d">Selecciona un tema para abrir su tablero.</p>
      <div className="agenda">
        {AGENDA.map((a, i) => (
          <button className="ag-item" key={i} onClick={() => abrir(a)}>
            <span className="ag-date"><span className="dchip">{a.etiqueta}</span></span>
            <span className="ag-body">
              <span className="at">{a.titulo}{a.nuevo && <span className="badge-new">Nuevo</span>}</span>
              <span className="ad">{a.desc}</span>
              {a.fecha && <span className="afecha">{a.fecha}</span>}
            </span>
            <span className="ag-go">{a.overlay ? "Abrir ventana →" : "Ver tablero →"}</span>
          </button>
        ))}
      </div>

      <div className="sec-t">Accesos directos a tableros</div>
      <p className="sec-d">Vistas de referencia que se consultan de forma recurrente en el comité.</p>
      <div className="accesos">
        {ACCESOS.map((a, i) => (
          <button className="acc" key={i} onClick={() => go(a.tab)}>
            <span className="act">{a.titulo}<span className="arrow">→</span></span>
            <span className="acd">{a.desc}</span>
          </button>
        ))}
      </div>

      <p className="cm-hint">
        Cada pestaña tiene su propio enlace: usa el botón de una pestaña y la dirección del navegador
        queda apuntando a ella (por ejemplo <span className="mono">…/#bs-wms</span>), lista para compartir
        o abrir directamente en esa vista.
      </p>
      <VentanaTecnica irA={go} />
    </section>
  );
}
