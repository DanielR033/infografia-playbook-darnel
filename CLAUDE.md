# Infografía de avance · Frente de Datos (Darnel / Grupo Ajover)

Contexto para Claude. Léelo completo antes de tocar código.

SPA en React 18 + Vite 5, publicada en GitHub Pages (push a `main` → `.github/workflows/deploy-pages.yml`).
Es el pre-read del **comité de datos** de la migración PeopleSoft / WMS on-premise → Oracle Fusion (ERP/SCM)
y Oracle WMS Cloud, con Oracle CX en paralelo y Microsoft Fabric como plataforma de extracción.

**Quién lo lee:** gerencia con perfil PMO clásico y muy detallista. Quiere cifras medibles, X de Y,
semáforos y trazabilidad ("¿de dónde sale este número?"). Tono corporativo: títulos claros, tablas y
números. Nada de narrativa ni frases condicionales.

Todo el texto está en **español (Colombia)**: miles con `.`, decimales con `,` (`toLocaleString("es-CO")`).

## Cómo correrlo

```bash
npm install
npm run dev     # http://localhost:5173/#comite
npm run build   # verifica que compila
```

Cada pestaña tiene su enlace con hash (`#comite`, `#fabric`...). Las válidas salen del arreglo `tabs`
de `App.jsx` (no hay lista aparte que mantener).

Revisión visual sin navegador interactivo (macOS):

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars \
  --window-size=1280,2400 --virtual-time-budget=8000 --screenshot=/tmp/shot.png "http://127.0.0.1:5173/#comite"
```

## Pestañas visibles

| Pestaña | Hash | Archivo | Autor |
|---|---|---|---|
| Seguimiento Comité | `comite` | `SeguimientoComite.jsx` + `IndicadoresProyecto.jsx` | consultor + franja de indicadores |
| ERP | `erp` | `ErpCalidadDatos.jsx` (dentro de `App.jsx`) | consultor |
| ERP Inventario | `erp-inv` | `ErpInventarioDashboard.jsx`, `ErpMapeoSeguimiento.jsx` | consultor |
| BS WMS | `bs-wms` | `BsWmsDashboard.jsx` | consultor |
| Cutover | `cutover` | `CutoverDashboard.jsx` | consultor |
| Impacto CX | `impacto-cx` | `ImpactoCx.jsx` + `cxCruce.js` | análisis CX |
| Microsoft Fabric | `fabric` | `FabricDashboard.jsx` | estado del workspace |

Las pestañas históricas (General, Metodología, Brief PB3, UAT, Items, Barcode, Locations) siguen en
`App.jsx` con `oculta: true`. Ventanas modales del comité: `Pb1OracleFusion.jsx`, `MapeoReportesBI.jsx`.

## Regla de alcance de los indicadores

La franja de la portada mide **solo lo que es responsabilidad del frente de datos**: extraer, preparar
y entregar datos a Oracle, y revisar lo cargado. Lo que depende de Oracle (ingesta, carga) o del negocio
(fechas de freeze, plan de cutover de 218 tareas) **no se semaforiza** en la portada.

## Seguimiento Comité · franja "Indicadores del frente de datos" (`IndicadoresProyecto.jsx`)

| Indicador | Cálculo | Fuente |
|---|---|---|
| Plantillas WMS automatizadas | plantillas con tiempo de generación ÷ total | `PLANTILLAS` exportado de `CutoverDashboard.jsx` |
| Prueba de piso (BS): calidad de entrega | nota por plantilla enviada = automático ÷ enviado (lo manual descuenta; no enviada o no cargada = 0); promedio simple | `bsWmsData.json` (`envios` Inicial vs Adicional) |
| Pre-mapeo reportes BI | Revisado + Revisado-Anotación ÷ total | `mapeoReportesBI.json` |
| Plantillas ERP validadas (26C) | objetos con estado `Validado…` ÷ objetos en alcance | `erpDashData.json` → `inventario[r][7]` |
| Extracción de fuentes ERP | tablas fuente PeopleSoft que existen en bronze con filas ÷ tablas identificadas | `erpFuentes.json` × `fabricConteos.json` |
| Análisis CX · cruce con plantillas ERP | entidades con extracción analizada, nivel base / profundización | `cxCruce.js` |

Debajo: tabla **Universo de datos ERP** (universo, extracción, filas en bronze, IDs extraídos, probado en PB1,
columnas PB1, carga completa) y el desplegable **Detalle del cálculo de los indicadores** (incluye el cruce
PB1 → hojas de plantilla ERP y las tablas PeopleSoft vacías en bronze). Al final de la portada, el
**dato técnico** de la ventana de cutover WMS (`VentanaTecnica`): no es indicador.

- `CORTE` (fecha de corte) está en `IndicadoresProyecto.jsx`: **actualizarla cada semana**.
- `bsPlant[].cargo`: si Oracle rechaza una plantilla de la BS, poner `false` (su nota pasa a 0).
- El gauge "Mapeo columnas ERP" (0 / 10.884) se retiró: las marcas de `ErpMapeoSeguimiento` viven en el
  `localStorage` de cada navegador y no son un dato compartido.

## Impacto CX (`ImpactoCx.jsx`, `cxCruce.js`)

- Cifras de Fusion DEV1: `CX_CIFRAS` en `cxCruce.js` (parties 324.960, ítems 28.932, inactivos 7.631).
- `CX_CRUCE`: 8 entidades donde lo que CX escribe en Fusion se cruza con las plantillas de carga ERP
  (party, ítem, direcciones, usos de dirección, contactos, cuentas, relaciones, categorías), con sus hojas
  FBDI, la razón del cruce y `datos: true` cuando hay extracción analizada. Columnas por hoja: `erpDashCols.json`.
  Evidencia PB1 por hoja: `pb1Columnas.json`. **La lista se valida con el funcional de CX.**
- Sección "5 · Profundización" de la pestaña y el tile CX de la portada leen la misma lista.

## PB1 · cruce columna de negocio → hoja de plantilla ERP

`src/pb1Columnas.json` lo genera `scripts/pb1Columnas.py` a partir de las plantillas de negocio de PB1:

```bash
python3 scripts/pb1Columnas.py <Muestra_Clientes...xlsx> <DAR_Maestro_Items_PB1_con_LOV.xlsx> \
  src/pb1Columnas.json <1Maestro Proveedores ... Col_Pan.xlsx>
```

Por columna guarda: validada (`ok`), registros con dato y `destino` (hoja FBDI). El destino se asigna por el
significado de la columna (clientes/ítems) o por el grupo del archivo (proveedores: PERFIL, DIRECCIÓN, PAGOS,
SITIO). **Es un cruce propuesto: debe validarlo el consultor.** Los archivos Excel no están en el repo.
`pb1Data.json` (ventana PB1 del consultor) tiene los conteos por maestro: Clientes 153 (37 en formato
plantilla), Artículos 1.895, Proveedores 204 (CO 127 + PA 77).

## Microsoft Fabric (`FabricDashboard.jsx`)

Workspace `WS_Migracion_WMS_Fusion` (East US 2). Datos en dos archivos generados, solo lectura:

- `src/fabricConteos.json`: filas por tabla y capa (bronze 93, silver 19, gold 4). Conteo leyendo el
  `_delta_log` de cada tabla en OneLake (suma de `stats.numRecords` de archivos activos). Tablas con
  checkpoint quedan en `null`; la franja usa silver como respaldo.
- `src/fabricEstado.json`: ítems, ejecuciones de pipelines y notebooks (API de job instances; historial
  disponible desde 21-oct-2026), detalle por actividad del pipeline (filas, GB, duración, `billingReference`),
  almacenamiento OneLake por lakehouse y **consumo estimado de CU**.

Consumo estimado (tarifas publicadas por Microsoft):

| Motor | Tarifa | Base |
|---|---|---|
| Copia (pipeline) | 1,5 CU-h por hora de throughput | horas facturables de cada copia (`billingReference`) |
| Orquestación | 0,0056 CU-h por actividad no-copia | actividades de cada ejecución |
| Spark (notebooks) | 1 CU = 2 vCores | sesión base starter pool 16 vCores (8 CU) × duración: **piso**, no techo |

% diario = CU-h del día ÷ (64 CU × 24 h) con F64 como **referencia** (SKU no visible con el rol actual).
Consumo real, throttling y SKU requieren rol de capacidad / Capacity Metrics app: se muestran "Requiere rol".
Fuentes: learn.microsoft.com/fabric/data-factory/pricing-pipelines y /fabric/data-engineering/spark-compute.

### Refrescar los datos de Fabric

Requiere `az login` con la cuenta del cliente que tiene rol en el workspace. Esa cuenta no tiene suscripciones,
así que el Azure CLI no la deja como predeterminada: `scripts/fabric/token.py` toma el token de la caché MSAL
del CLI (usar el Python del Azure CLI, que trae `msal`). Variables de entorno:

```bash
export FABRIC_TENANT_ID=<tenant del cliente> FABRIC_USER=<cuenta del az login>
export FABRIC_WORKSPACE_ID=<id del workspace>
export FABRIC_LAKEHOUSES='{"bronze":"<id>","silver":"<id>","gold":"<id>"}'
export CORTE=AAAA-MM-DD
cd scripts/fabric
PY=$(ls -d /opt/homebrew/Cellar/azure-cli/*/libexec/bin/python | tail -1)
umask 077; $PY -I token.py > .tf; $PY -I token.py https://storage.azure.com/.default > .ts
python3 conteos.py .ts          # → src/fabricConteos.json
python3 estado.py .tf .ts       # → estado.json (intermedio)
python3 actividades.py .tf      # → actividades.json (intermedio)
python3 armar.py                # → src/fabricEstado.json
rm -f .tf .ts
```

Los IDs no van en el repo (es público). Nunca imprimir ni guardar tokens en archivos versionados.
Otras cuentas del Azure CLI de este equipo pertenecen a otros clientes: no usarlas.

## Reglas que no se rompen

1. **Nunca inventes un número.** Sin dato → `null` y la vista muestra "Por confirmar" / "Requiere rol".
2. **Deriva, no copies.** Totales y porcentajes se calculan en el componente desde los JSON.
3. **Semáforo único** (`controlUi.jsx` → `UMBRAL`): verde ≥ 90 %, ámbar 70–89,9 %, rojo < 70 %, gris sin dato.
   No usar gauge para métricas donde "más alto es peor" (p. ej. consumo de capacidad): usar tabla o barra.
4. Lo que no es responsabilidad del frente de datos no se semaforiza en la portada.
5. Lo no gerencial (tablas vacías, notas de lectura, metodología) va dentro de "Detalle del cálculo".
6. Estilos aislados: las vistas nuevas usan `.wmsc` + `CTL_CSS` (`controlUi.jsx`: `Gauge`, `Light`, `Legend`, `toneOf`).

## Pendientes y datos a confirmar

- Ventana técnica: extracción 1 h 15 + generación 29 min = 1 h 44 en serie; Cutover dice "~1 h 30".
- BS: la referencia de Oracle "28.000 registros en ~5 h" no cuadra con lo enviado (5.358 líneas + 4.796 ubicaciones).
- Bronze: `PS_CUST_ADDRESS`, `PS_ORD_HEADER`, `PS_ORD_HOLD`, `PS_ORD_NOTE`, `PS_AJ_ORDHDR_PRNBR` con 0 filas.
- Artículos ERP: 4 de 22 tablas fuente en bronze.
- Pipeline 15-nov falló por un nombre mal escrito: `t_stored_item_nse` (debe ser `t_stored_item_bse`).
- Silver y gold sin actualizar desde agosto (06-ago / 17-ago).
- La pestaña Impacto CX está marcada "Borrador · uso interno" y el sitio de GitHub Pages es público.

## Rama de respaldo

`respaldo-control-local` (solo local) guarda las pestañas "Control WMS" y "Control ERP" de una versión previa
(`WmsControl.jsx`, `ErpControl.jsx`, `seguimientoComite.js`), no integradas en `main`.
