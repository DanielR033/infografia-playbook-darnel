import React, { useState } from "react";

const hitosClave = [
  {
    fecha: "17 Mar",
    titulo: "GAP de entendimiento",
    detalle: "Alineación de alcance del frente de datos."
  },
  {
    fecha: "18 Mar",
    titulo: "Creación de usuarios",
    detalle: "Habilitación de accesos base."
  },
  {
    fecha: "19 Mar",
    titulo: "Validación de plantillas",
    detalle: "Revisión tabla por tabla y columna por columna."
  },
  {
    fecha: "20 Mar",
    titulo: "Validación de Fabric",
    detalle: "Pruebas técnicas del workspace."
  },
  {
    fecha: "23-27 Mar",
    titulo: "Semana de ingestión",
    detalle: "Conexión Fabric + pipelines + extracción inicial."
  },
  {
    fecha: "30 Mar-01 Abr",
    titulo: "Semana de estabilización",
    detalle: "Lógica final, validación funcional y pre-entrega."
  },
  {
    fecha: "13-17 Abr",
    titulo: "Semana de automatización",
    detalle: "Parametrización Bronze/Silver/Gold y ajuste final de plantilla Items."
  },
  {
    fecha: "20-24 Abr",
    titulo: "Semana de ajuste funcional",
    detalle: "Nuevas definiciones Oracle-Darnel para Items, Barcode y Ubicaciones."
  },
  {
    fecha: "27-30 Abr",
    titulo: "Semana de estabilización",
    detalle: "Estabilización de lógica de querys para extracción del Playbook."
  },
  {
    fecha: "04-08 May",
    titulo: "Semana de consolidación",
    detalle: "Zona Gold al 100% y arquitectura medallion completa."
  },
  {
    fecha: "11-15 May",
    titulo: "Semana PB2",
    detalle: "Alineación funcional/negocio e implementación de nuevas reglas de extracción.",
    anchor: "semana-11-15-mayo"
  },
  {
    fecha: "18-22 May",
    titulo: "Semana de validación funcional",
    detalle: "Pruebas de extracción, alertas de inconsistencias y validaciones pendientes.",
    anchor: "semana-18-22-mayo"
  },
  {
    fecha: "25-29 May",
    titulo: "Semana de validación PB2",
    detalle: "Implementación de nuevas reglas PB2 y pendientes explícitos de Items/Ubicaciones.",
    anchor: "semana-25-29-mayo"
  },
  {
    fecha: "01-05 Jun",
    titulo: "Semana de cierre PB2",
    detalle: "Filtros finales, volumetría PB2 y validaciones de aprobación.",
    anchor: "semana-01-05-junio"
  },
  {
    fecha: "05-11 Jun",
    titulo: "Semana de carga PB2",
    detalle: "Acompañamiento de carga, mejoras de extracción y recopilación de errores.",
    anchor: "semana-05-11-junio"
  },
  {
    fecha: "15-18 Jun",
    titulo: "ERP/SCM e integraciones",
    detalle: "Estrategia de datos, nuevas definiciones WMS PB2 e integración de tablas ATP INT13.",
    anchor: "semana-15-18-junio"
  },
  {
    fecha: "22-26 Jun",
    titulo: "ATP INT13 y reingesta WMS PB2",
    detalle: "Culminación y envío del script de Órdenes de Venta ATP INT13, reextracción de los 555 artículos y definiciones de daily (NBSP, lpns_per_tier, decimales).",
    anchor: "semana-22-26-junio"
  },
  {
    fecha: "30 Jun-03 Jul",
    titulo: "WMS PB3: avances y pendientes",
    detalle: "Cierre de reglas WMS (duplicidad, UM pack=primaria, ubicaciones position/bin, config UM TRR/TM/BBG) y pendientes para PB3 (EAN13, lpns_per_tier, depuración UM PeopleSoft, decimales y ubicaciones no estantería).",
    anchor: "semana-30-junio-03-julio"
  },
  {
    fecha: "06-10 Jul",
    titulo: "WMS PB3: ubicaciones y artículos",
    detalle: "Cierre de definiciones de ubicaciones (task_zone_code, location_lock_code, replenishment_zone_code y regla de 'type' re-pack) y de artículos (config UM BBG/TM/TRR y decimales); pendientes de Barcode, lpns_per_tier, UM PeopleSoft y putaway_seq.",
    anchor: "semana-06-10-julio"
  },
  {
    fecha: "13-17 Jul",
    titulo: "WMS PB3: cierres de artículos y ubicaciones",
    detalle: "Cierre de artículos (decimales, UM CS→CJ, duplicidad part_a, clase de UM primaria/secundaria) y de ubicaciones (regla '-C' PUERTA→PTA, item_alternate_code en 5 casos, reempaque cust_field_1); pendiente parametrización de putaway_seq.",
    anchor: "semana-13-17-julio"
  },
  {
    fecha: "21-24 Jul",
    titulo: "WMS y ERP: validación de items y fuentes",
    detalle: "Validación de novedades sobre 45 items con Julián y, en el frente ERP, acompañamiento a la unificación de UoM e identificación del catálogo de fuentes de datos.",
    anchor: "semana-21-24-julio"
  },
  {
    fecha: "27-31 Jul",
    titulo: "Reportes, maestros WMS y arquitectura medallion",
    detalle: "Mapeo de fuentes de reportes e indicadores con Jairo Ibáñez, 50% de avance en la parametría y optimización del pipeline de los 3 maestros de migración y propuesta de llevarlo a la arquitectura medallion oficial de Darnel.",
    anchor: "semana-27-31-julio"
  },
  {
    fecha: "03-06 Ago",
    titulo: "Maestros WMS: pipeline al 90% y motor lookup",
    detalle: "90% de avance en la parametría del pipeline de los 3 maestros, construcción del motor de ingesta de archivos lookup en OneLake y avance en el cargue de la plantilla de ubicaciones, a la espera del OK de Alexandra D.",
    anchor: "semana-03-06-agosto"
  },
  {
    fecha: "10-14 Ago",
    titulo: "Pipeline al 100%, reglas de ubicaciones e idempotencia ERP",
    detalle: "100% de avance en la parametría del pipeline de los 3 maestros, nuevas reglas de ubicaciones (WIP y columnas task_zone_code/putaway_seq) y planteamiento de idempotencia con cargas incrementales para las fuentes ERP; plantilla de ubicaciones aprobada por Alexandra con novedades de forma pendientes.",
    anchor: "semana-10-14-agosto"
  },
  {
    fecha: "18-21 Ago",
    titulo: "Plantilla de inventarios PB3-UAT y cargue de ubicaciones",
    detalle: "Arranque de la nueva plantilla de inventarios para PB3-UAT (empalme funcional, acceso a fuentes y cimientos), resolución de novedades del cargue de inventarios y alineación con Tomás García sobre poblado de datos de operación para pruebas de reportes.",
    anchor: "semana-18-21-agosto"
  },
  {
    fecha: "24-28 Ago",
    titulo: "Cargue WMS completado y documentación de entrega",
    detalle: "Cargue de las 3 plantillas a WMS (Items y Barcode 100%, Ubicaciones 99,99%), plantilla de inventarios al 70%, documentación de entrega WMS y nuevas reglas de soporte de Playback 3.",
    anchor: "semana-24-28-agosto"
  }
];

const tablasIngeridas = {
  peoplesoft: [
    { nombre: "PS_AJ_BU_ITEM_UOM", registros: 4133 },
    { nombre: "PS_AJ_INVUOM_WMS", registros: 247054 },
    { nombre: "PS_AJ_MASTER_ITEM", registros: 169730 },
    { nombre: "PS_AJ_UOMSTOCK_DIM", registros: 226960 },
    { nombre: "PS_INV_ITEM_UOM", registros: 347723 },
    { nombre: "PS_MASTER_ITEM_TBL", registros: 176980 },
    { nombre: "PS_PROD_ITEM", registros: 112294 },
    { nombre: "PS_PROD_ITEM_LNG", registros: 137004 }
  ],
  wms: [
    { nombre: "t_fwd_pick_bse", registros: 2350 },
    { nombre: "t_item_uom", registros: 381450 },
    { nombre: "t_location", registros: 76630 }
  ]
};

const semana23a27Marzo = [
  { texto: "Conexión al workspace de Fabric completada con pruebas exitosas.", estado: "completado" },
  {
    texto: 'Pipeline de datos construido para ingestar en OneLake bronce "lhz_mig_bronze".',
    estado: "completado"
  },
  {
    texto: "Primera versión de query de extracción para muestra de datos de la plantilla Ubicaciones.",
    estado: "completado"
  },
  {
    texto: "Primera versión de query de extracción para muestra de datos de la plantilla Barcode.",
    estado: "completado"
  },
  {
    texto: "Primera versión de query de extracción para muestra de datos de la plantilla Items.",
    estado: "completado"
  }
];

const semana30Marzoa01Abril = [
  {
    texto: "Primera versión de query de extracción para muestra de datos de la plantilla Items.",
    estado: "completado"
  },
  {
    texto: "Sesión con líder funcional (Ileana Cortina) para resolver dudas y alinear lógica de extracción y pruebas.",
    estado: "completado"
  },
  {
    texto: "Redefinición de lógica para obtención de unidad de medida primaria y secundaria con alcance del 100%.",
    estado: "completado"
  },
  {
    texto: "Envío de muestras de plantillas a Ileana Cortina para check funcional de datos.",
    estado: "completado"
  },
  {
    texto:
      'Plantilla Items en 97% de completitud por definición pendiente de "Product_life" y "Percent_acceptable_product_life" con Alexandra Duarte (correo "Definición columnas plantilla items" reforzado por Edwin Nieto).',
    estado: "completado"
  },
  {
    texto: "Sesión de pre-entrega de plantillas Oracle realizada el 01-04-2026 a las 3:00 PM.",
    estado: "completado"
  },
  {
    texto: "Envío del primer playbook con pendientes actuales.",
    estado: "completado"
  }
];

const semana6a10Abril = [
  {
    texto: "Alcance de lógica query extracción plantilla Items según último alcance 01/04/2026: 100%.",
    estado: "completado"
  },
  {
    texto: "Validación con equipo funcional Darnel del alcance de datos y transformaciones generadas.",
    estado: "completado"
  },
  {
    texto: "Validación conjunta de observaciones enviadas por Oracle sobre la primera muestra de datos.",
    estado: "completado"
  },
  {
    texto: "Implementados dos nuevos alcances funcionales sobre plantillas Barcode y Ubicaciones.",
    estado: "completado"
  },
  {
    texto: "Queries de 3 plantillas al 100% según últimos alcances funcionales para subsanar observaciones Oracle.",
    estado: "completado"
  },
  {
    texto: "Liberación de plantillas al 100% con datos a líder funcional Ileana Cortina para aprobación final.",
    estado: "completado"
  },
  {
    texto: "Liberación de plantillas con muestra de datos al equipo Oracle para prueba de cargue.",
    estado: "completado"
  },
  {
    texto: "Draft de arquitectura actualizado.",
    estado: "completado"
  }
];

const semana13a17Abril = [
  {
    texto: "Desarrollado algoritmo de dígito de chequeo para EAN14 y UPC14.",
    estado: "completado"
  },
  {
    texto:
      "Validado con funcional que extracción aplica a EAN13 y UPC13 (UPC12 desde origen), sin requerir algoritmo porque el dígito de chequeo ya viene en el campo.",
    estado: "completado"
  },
  {
    texto:
      "Automatización y parametrización de zona Bronze para escalar nuevas fuentes sin modificar código ni actividades Fabric, solo por JSON.",
    estado: "completado"
  },
  {
    texto:
      "Decisión técnica: no se parametriza con YML en Bronze por restricción de Copy Data con iteración vía Lookup (compatible con JSON/CSV). Se adopta JSON por soporte estructurado y jerárquico.",
    estado: "completado"
  },
  {
    texto:
      "Automatización y parametrización de zona Silver con proceso estándar de homogeneización, cleansing, casteo y normalización de columnas, usando Notebook estándar + archivo YML.",
    estado: "completado"
  },
  {
    texto: "Automatización y parametrización de zona Gold (25).",
    estado: "completado"
  },
  {
    texto:
      "IMPORTANTE (16-04-2026): funcional Darnel envió nuevo alcance para plantilla Items; compromiso de implementación antes de 7:00 AM del 17-04-2026 para no afectar carga de Playbook 1 desde Azurian.",
    estado: "completado"
  }
];

const semana20a24Abril = [
  {
    texto:
      "Sesiones durante la semana entre Oracle y Darnel para validar inconsistencias de cargue en WMS y redefinir reglas funcionales.",
    estado: "completado"
  },
  {
    texto:
      'ITEMS: exclusión temporal de casuística "UOM primaria CJ y BL con clase Cantidad" para este primer 20%; depuración será gestionada en origen y luego se refrescará Fabric.',
    estado: "completado"
  },
  {
    texto:
      "ITEMS: control de duplicidad de artículos aplicando regla INV_ITEM_ID = PRODUCT_ID cuando existían múltiples activos (EFF_STATUS='A').",
    estado: "completado"
  },
  {
    texto:
      "ITEMS: corrección de std_case_qty en cero por llaves con espacios en t_item_uom (ajuste de código aplicado).",
    estado: "completado"
  },
  {
    texto:
      "UBICACIONES: nuevas exclusiones por facility (solo 01 y 05), ubicaciones de estiba, transferencias rápidas (TRANS), ubicaciones erróneas/no usadas y zona WIP.",
    estado: "completado"
  },
  {
    texto:
      "BARCODE: duplicidad de EAN13 entre artículos se trata como casuística operativa; definición actual: excluir un duplicado y enviar el restante.",
    estado: "completado"
  },
  {
    texto:
      "IMPORTANTE: queda pendiente definición estructural de Darnel para manejo definitivo de duplicidades EAN13 en futuras extracciones.",
    estado: "completado"
  }
];

const semana27a30Abril = [
  {
    texto: "Semana enfocada en estabilización de lógica en los querys para la extracción de datos del Playbook.",
    estado: "completado"
  },
  {
    texto: "Ajuste de reglas y filtros aplicados manualmente a las plantillas.",
    estado: "completado"
  },
  {
    texto: "Refinamiento de cruces de datos con base en las últimas definiciones.",
    estado: "completado"
  },
  {
    texto: "Generación de control de inserciones para evitar reenvío de datos en futuras extracciones.",
    estado: "completado"
  },
  {
    texto: "Solicitud de ajustes y definiciones faltantes (ejemplo: longitud máxima de columna área = 10; algunos registros la superan).",
    estado: "completado"
  },
  {
    texto:
      "Automatización y parametrización zona Gold al 40%; esta automatización también potencia integraciones y reportes.",
    estado: "completado"
  }
];

const primeraSemanaMayo = [
  {
    texto: "Automatización y parametrización zona Gold al 100%.",
    estado: "completado"
  },
  {
    texto:
      "Implementación arquitectura medallion Bronze, Silver y Gold al 100%, parametrizable y escalable a fuentes WMS y PeopleSoft.",
    estado: "completado"
  },
  {
    texto:
      "Escalabilidad a distintas fuentes de información, considerando integración/conectividad previa con Fabric.",
    estado: "completado"
  },
  {
    texto:
      "Operatividad de extracción, tipado de datos, cleansing y constitución de producto de datos.",
    estado: "completado"
  },
  {
    texto:
      "Regla pendiente PB1: longitud máxima campo 'área' en ubicaciones (10 caracteres). Definir tratamiento para casos que superan el límite (truncamiento o transformación).",
    estado: "completado"
  },
  {
    texto:
      "Regla pendiente PB1: duplicidad EAN13 en Barcode (escenario real Darnel). Requiere definición de tratamiento por impacto operativo y de negocio.",
    estado: "pendiente"
  },
  {
    texto: "NOTA: sesión agendada para ambos puntos el lunes 11 de mayo de 2026.",
    estado: "completado"
  }
];

const semana11a15Mayo = [
  {
    texto:
      "Sesiones de contextualización y alineación con equipo funcional y negocio sobre definiciones de nuevas reglas para extracción de PB2.",
    estado: "completado"
  },
  {
    texto: 'Ubicaciones: regla de exclusión para staging de recepciones ("Puertas -S").',
    estado: "completado"
  },
  {
    texto: "Ubicaciones: reglas de sustitución de nombres para áreas con longitud superior a 10.",
    estado: "completado"
  },
  {
    texto: 'Ubicaciones: llenado de aisle, bay y level con "1" cuando la ubicación no está segmentada por ":".',
    estado: "completado"
  },
  {
    texto: "Ubicaciones: generación columnas min_volume, max_volume y volume_uom_code.",
    estado: "completado"
  },
  {
    texto: "Items: implementación de regla para manejo de lote por artículo.",
    estado: "completado"
  },
  {
    texto:
      "Pendiente definición Alexandra (Items): tipo de artículo para almacenamiento dirigido por sistema.",
    estado: "pendiente"
  },
  {
    texto: "Pendiente definición Alexandra (Items): relación del costo de los artículos.",
    estado: "pendiente"
  },
  {
    texto: "Implementación de nuevas reglas en la lógica de extracción.",
    estado: "completado"
  },
  {
    texto: "Pruebas unitarias.",
    estado: "completado"
  }
];

const semana18a22Mayo = [
  {
    texto:
      "Sesiones de pruebas de extracción con equipo funcional sobre casos puntuales de nuevas reglas definidas.",
    estado: "completado"
  },
  {
    texto:
      'Ubicaciones: validación, detección y generación de alertas sobre inconsistencias. Existen ubicaciones duplicadas por cómo se mapeó el diccionario de datos y hay inconsistencia en el entendimiento de la regla para "min_units", "max_units" e "item_alternate_code"; se encuentra en validación por el equipo funcional de Ileana Cortina.',
    estado: "pendiente"
  },
  {
    texto:
      "Lógica de reabastecimiento para ubicaciones activas en validación por Alexandra.",
    estado: "pendiente"
  },
  {
    texto:
      "Caso de duplicidad escalado a Oracle: en PB1 se enviaron duplicados y el WMS destino no generó alerta.",
    estado: "completado"
  },
  {
    texto:
      "IMPORTANTE: pendiente Alexandra (Items): tipo de artículo para almacenamiento dirigido por sistema.",
    estado: "pendiente"
  },
  {
    texto:
      "IMPORTANTE: pendiente Alexandra (Items): relación del costo de los artículos.",
    estado: "pendiente"
  }
];

const semana25a29Mayo = [
  {
    texto:
      "Implementación de nuevas reglas a tener en cuenta para la extracción de PB2.",
    estado: "completado"
  },
  {
    texto:
      "ARTÍCULOS - lpns_per_tier al 80%: se tomará la unidad de medida configurada como estándar WMS, identificada por AJ_STD_UOM_WMS = 'Y'. La consulta prioriza PS_AJ_BU_ITEM_UOM con BUSINESS_UNIT = 'AJI03' y, si no existe, busca en PS_AJ_INVUOM_WMS.",
    estado: "en-proceso"
  },
  {
    texto:
      "lpns_per_tier: si el atributo existe en PS_AJ_BU_ITEM_UOM, el valor se recupera desde t_item_master_bse uniendo PS_PROD_ITEM.INV_ITEM_ID = t_item_master_bse.item_number y PS_PROD_ITEM.EFF_STATUS = 'A', tomando std_hand_qty.",
    estado: "en-proceso"
  },
  {
    texto:
      "lpns_per_tier: si el atributo solo existe en PS_AJ_INVUOM_WMS, el valor se recupera desde t_item_master uniendo PS_PROD_ITEM.INV_ITEM_ID = t_item_master.item_number y PS_PROD_ITEM.EFF_STATUS = 'A', tomando std_hand_qty.",
    estado: "en-proceso"
  },
  {
    texto: "ARTÍCULOS - tiers_per_pallet al 100%.",
    estado: "completado"
  },
  {
    texto: "ARTÍCULOS - req_batch_nbr_flg al 100%.",
    estado: "completado"
  },
  {
    texto:
      "IMPORTANTE: pendiente Alexandra (Items): tipo de artículo para almacenamiento dirigido por sistema.",
    estado: "pendiente"
  },
  {
    texto:
      "IMPORTANTE: pendiente Alexandra (Items): relación del costo de los artículos.",
    estado: "pendiente"
  },
  {
    texto:
      'IMPORTANTE: pendiente Ubicaciones: duplicidad de ubicaciones debido a las columnas "min_units", "max_units" e "item_alternate_code".',
    estado: "pendiente"
  },
  {
    texto:
      "IMPORTANTE: pendiente Ubicaciones: lógica de reabastecimiento para ubicaciones activas.",
    estado: "pendiente"
  }
];

const semana01a05Junio = [
  {
    texto:
      'ITEMS: implementación de filtro tipo cascada para std_case_qty y std_pack_qty con orden de búsqueda WH 05 -> 01 -> 02 y sucesivos.',
    estado: "completado"
  },
  {
    texto:
      'ITEMS: reducción significativa de registros con valor 0. Total actual: 2.548 registros. Se genera archivo de soporte "Items_case_cer" con artículos excluidos por esta casuística.',
    estado: "completado"
  },
  {
    texto:
      "ITEMS: implementación de definición de tipo de artículo para almacenamiento dirigido por sistema, según lineamientos.",
    estado: "completado"
  },
  {
    texto:
      "ITEMS: aplicación de reglas para manejo de registros duplicados, con reducción significativa de duplicados.",
    estado: "completado"
  },
  {
    texto:
      "ITEMS: identificación de 9 artículos duplicados por múltiples unidades de medida estándar WMS y flag AJ_UOM_WMS = Y.",
    estado: "completado"
  },
  {
    texto:
      "ITEMS: exclusión de artículos PS502-B, P11U19-980-3000, 551412, C503506711, C563508411, P11U190-860-3000, 8919, P11U19-780-2900 y RA02024132.",
    estado: "completado"
  },
  {
    texto: "ITEMS: total final posterior a filtros y exclusiones: 43.482 ítems.",
    estado: "completado"
  },
  {
    texto:
      "UBICACIONES: implementación de todas las reglas definidas para PB2, con filtros y exclusiones correspondientes.",
    estado: "completado"
  },
  {
    texto: "UBICACIONES: total final de registros: 24.410 ubicaciones.",
    estado: "completado"
  },
  {
    texto:
      "BARCODE: se mantiene la regla actual para manejo de duplicados en vendor_barcode por falta de definición final para duplicidad de EAN13 en múltiples artículos.",
    estado: "completado"
  },
  {
    texto: "BARCODE: total final de registros: 2.173 códigos.",
    estado: "completado"
  },
  {
    texto:
      'Consideración general: todas las plantillas contienen el universo completo de datos. En Items y Barcode se incluye columna adicional PB1 con valor "X" para registros ya migrados en PB1, que deben incluirse nuevamente en PB2 para actualización masiva en WMS.',
    estado: "completado"
  },
  {
    texto:
      "Consideración general: la plantilla Ubicaciones no incluye columna PB1 porque se definió previamente migrar el 100% de ubicaciones.",
    estado: "completado"
  },
  {
    texto:
      "Pendiente: aprobación sobre consistencia de los datos generados y volumetría a migrar en PB2.",
    estado: "pendiente"
  },
  {
    texto:
      "Pendiente: confirmación sobre inclusión del 100% de ubicaciones en PB2 y validación de registros adicionales a incluir en esta fase.",
    estado: "pendiente"
  }
];

const semana05a11Junio = [
  {
    texto:
      "Acompañamiento y seguimiento a definiciones pendientes por cerrar dentro del alcance contemplado para PB2.",
    estado: "completado"
  },
  {
    texto:
      "Análisis e implementación de mejoras sobre inconsistencias reportadas por Alexandra Duarte en la extracción realizada para PB2.",
    estado: "completado"
  },
  {
    texto:
      "Implementación de nuevas definiciones generadas por el equipo de negocio Darnel.",
    estado: "completado"
  },
  {
    texto: "Sesiones de acompañamiento para revisión de consistencia de datos.",
    estado: "completado"
  },
  {
    texto:
      "Sesiones de acompañamiento sobre errores generados durante la ingesta en Oracle.",
    estado: "completado"
  },
  {
    texto: "ITEMS: 44.820 registros cargados, equivalentes al 98,73%.",
    estado: "completado"
  },
  {
    texto: "BARCODE: 1.817 registros cargados, equivalentes al 83,58%.",
    estado: "completado"
  },
  {
    texto:
      "LOCATIONS: no cargado por definición pendiente del layout de la bodega por parte de Alexandra Duarte y Zaid.",
    estado: "pendiente"
  },
  {
    texto:
      "Próximo paso: recopilar y consolidar los errores generados durante el proceso de migración PB2.",
    estado: "en-proceso"
  },
  {
    texto:
      "Error detectado: duplicidad de artículos ante el nuevo WMS por nomenclaturas casi idénticas; una contiene un carácter NBSP y ambos registros operan como artículos independientes con sus propias medidas WMS.",
    estado: "pendiente"
  },
  {
    texto:
      "Error detectado: cantidades decimales en campos definidos como enteros. Se debe contemplar un nuevo flag que permita enviar decimales.",
    estado: "pendiente"
  },
  {
    texto: "Error detectado: códigos Barcode que no existen como artículos.",
    estado: "pendiente"
  },
  {
    texto:
      "Próximo paso: desarrollar queries de extracción de datos de Órdenes de Venta actuales en formato ATP INT13.",
    estado: "programado"
  }
];

const semana15a18Junio = [
  {
    texto:
      "ERP/SCM - Estrategia de datos: trabajo sobre reglas de negocio, fuentes de información y formatos.",
    estado: "completado"
  },
  {
    texto:
      "ERP/SCM: familiarización y sesiones de diligenciamiento de plantillas para entendimiento inicial de datos, reglas de negocio, fuentes de información y formatos.",
    estado: "completado"
  },
  {
    texto:
      "WMS PB2: implementación de nuevas definiciones generadas sobre el proceso de ingesta en WMS.",
    estado: "completado"
  },
  {
    texto:
      "WMS PB2 - lpns_per_tier: tratamiento de datos cuando el valor supera 5 dígitos de longitud y la unidad de medida es GM; afecta directamente std_case_qty, max_case_qty y primary_uom_code.",
    estado: "completado"
  },
  {
    texto:
      "WMS PB2: std_pack_qty, std_case_qty y max_case_qty están definidos como enteros en la plantilla Oracle, pero pueden recibir decimales; para estos casos se debe activar handle_decimal_qty_flg.",
    estado: "completado"
  },
  {
    texto:
      "Pendiente funcional: duplicidad de artículos ante el nuevo WMS por nomenclaturas casi idénticas; una contiene un carácter NBSP y cada artículo opera independiente con sus propias medidas WMS.",
    estado: "completado"
  },
  {
    texto:
      "Pendiente funcional: Oracle requiere que la unidad de medida pack sea igual que la primaria; la actualización se realizó manualmente porque no estaba definida previamente.",
    estado: "completado"
  },
  {
    texto:
      "INTEGRACIONES: con apoyo de Aníbal se logró acceso a nuevas tablas que intervienen en Órdenes de Venta actuales en formato ATP INT13.",
    estado: "completado"
  },
  {
    texto:
      "INTEGRACIONES: implementación de integración en Fabric de 16 nuevas tablas provenientes de PeopleSoft y WMS.",
    estado: "completado"
  },
  {
    texto:
      "Próximo paso: culminar query de extracción de Órdenes de Venta actuales en formato ATP INT13 para generar todo el universo de datos y referencia PB2.",
    estado: "completado"
  }
];

const semana22a26Junio = [
  {
    texto:
      "INTEGRACIONES: se culmina el ajuste y desarrollo del script de Órdenes de Venta actuales en formato ATP INT13; se realiza la extracción y envío a Andrés Moreno posterior a la sesión de empalme.",
    estado: "completado"
  },
  {
    texto:
      "WMS PB2: se alinea la duda sobre la definición en la plantilla de artículos — para las referencias cruzadas el part_a y el barcode deben coincidir (ser iguales). Surge porque en la ingesta 555 artículos no pudieron cargarse al estar ya registrados en PB1 y asignados a otro part_a.",
    estado: "completado"
  },
  {
    texto:
      "WMS PB2: se realiza nuevamente la extracción de los 555 artículos; esta versión contempla parte de las nuevas reglas definidas durante la marcha del proceso de ingesta, que en su momento se implementaron manualmente.",
    estado: "completado"
  },
  {
    texto:
      "Daily — Duplicidad de artículos ante el nuevo WMS: existen dos artículos con nomenclatura casi idéntica (uno contiene un carácter NBSP) y cada uno opera como artículo independiente con sus propias medidas WMS (ej. P17138-36-1402S). Definición: quedarse con el que no tiene tabulador.",
    estado: "completado"
  },
  {
    texto:
      "Daily — Oracle: la unidad de medida pack debe ser igual que la primaria; la actualización se realizó a mano porque no estaba definida previamente.",
    estado: "completado"
  },
  {
    texto:
      "Daily — Duplicidad de EAN13 en códigos de barras: se requiere confirmar si en PB3 se dará el mismo manejo que en PB2 o si ya existe una definición.",
    estado: "completado"
  },
  {
    texto:
      "Daily — Columna lpns_per_tier (plantilla artículos): debe ser siempre entera y de máximo 5 caracteres. Para PB2 debe contemplarse el manejo dado a las unidades de medida tipo GM (se cambió a KG y se disminuyó la cantidad estándar). Ej. artículo 87465 (GM CASE y PACK en KG): lpns_per_tier 400000.0000 y std_case_qty 1000 → lpns_per_tier 400, std_case_qty 1, primary_uom_code KG (división por 1000). Caso por definir: el artículo 2721 tenía lpns_per_tier 2000000 → 2000, pero std_pack_qty, std_case_qty y max_case_qty venían en 500 y pasaron directamente a 1 (no a 500/1000); definir qué tratamiento se le dará.",
    estado: "completado"
  },
  {
    texto:
      "Daily — Columnas std_pack_qty, std_case_qty y max_case_qty en decimal: se resolvió activar el flag handle_decimal_qty_flg, pero WMS no inserta el decimal, lo redondea e ingesta entero. Julián escaló la consulta y respondieron: el flag es para el manejo del inventario; los campos Std Pack Qty, Std Case Qty y Max Case Qty deben ir en números enteros, los decimales sólo aplican para el inventario que entra en WMS.",
    estado: "completado"
  },
  {
    texto:
      "Daily — Definiciones pendientes de ubicaciones: charla pendiente con Zaid.",
    estado: "completado"
  }
];

const semana30Junioa03Julio = [
  {
    texto:
      "Duplicidad de artículos ante el nuevo WMS.",
    estado: "completado"
  },
  {
    texto:
      "La unidad de medida pack debe ser igual que la primaria.",
    estado: "completado"
  },
  {
    texto:
      "Se realizan nuevas definiciones de reglas sobre la plantilla de ubicaciones, específicamente las columnas \"position\" y \"bin\"; estas ya se encuentran actualizadas en la plantilla.",
    estado: "completado"
  },
  {
    texto:
      "Configuración de UM en WMS para evitar problemas en migración (TRR, TM y BBG).",
    estado: "completado"
  },
  {
    texto:
      "Implementación en la lógica de extracción sobre las nuevas reglas cerradas al 100%.",
    estado: "completado"
  },
  {
    texto:
      "Duplicidad de EAN13 en plantilla de códigos de barras; confirmar si ya existe una definición para tratar esta duplicidad o se dará el mismo manejo que en PB1 y PB2.",
    estado: "completado"
  },
  {
    texto:
      "Columna lpns_per_tier (plantilla de artículos). Alexandra Duarte y Andrés Steven Moreno Menjura gestionan el diligenciamiento de la regla dentro de la plantilla para cuando el valor de la columna supere la longitud máxima permitida (28144), ya que habría que actualizar las unidades de medida, las cantidades estándar y la propia columna lpns_per_tier (manualidad implementada sobre el Excel en PB2).",
    estado: "completado"
  },
  {
    texto:
      "Depuración por parte de Andrés Steven Moreno Menjura sobre las UM del origen PeopleSoft en referencia a las diferencias que presentan con el WMS actual, debido al inconveniente al migrar artículos con unidades de medida primaria y case que no son de la misma clase.",
    estado: "completado"
  },
  {
    texto:
      "Validación por parte de Alexandra Duarte sobre artículos con decimales en las cantidades.",
    estado: "completado"
  },
  {
    texto:
      "Validación de ubicaciones que no son de tipo estantería.",
    estado: "completado"
  }
];

const semana06a10Julio = [
  {
    texto:
      "Ubicaciones: definición de las columnas \"task_zone_code\", \"location_lock_code\" y \"replenishment_zone_code\".",
    estado: "completado"
  },
  {
    texto:
      "Ubicaciones: alcance a la regla actual definida para la generación del valor de la columna \"type\" (ubicaciones re-pack).",
    estado: "completado"
  },
  {
    texto:
      "Artículos: configuración de UM en WMS BBG, TM y TRR.",
    estado: "completado"
  },
  {
    texto:
      "Artículos: validación y depuración desde el origen por parte de Alexandra Duarte sobre artículos con decimales en las cantidades.",
    estado: "completado"
  },
  {
    texto:
      "Barcode: duplicidad de EAN13 en plantilla de códigos de barras; confirmar si ya existe una definición para tratar esta duplicidad o se dará el mismo manejo que en PB1 y PB2.",
    estado: "completado"
  },
  {
    texto:
      "Artículos: columna lpns_per_tier (plantilla de artículos). Alexandra Duarte y Andrés Steven Moreno Menjura gestionan el diligenciamiento de la regla dentro de la plantilla para cuando el valor de la columna supere la longitud máxima permitida (28144), ya que habría que actualizar las unidades de medida, las cantidades estándar y la propia columna lpns_per_tier (manualidad implementada sobre el Excel en PB2).",
    estado: "completado"
  },
  {
    texto:
      "Artículos: depuración por parte de Andrés Steven Moreno Menjura sobre las UM del origen PeopleSoft en referencia a las diferencias que presentan con el WMS actual, debido al inconveniente al migrar artículos con unidades de medida primaria y case que no son de la misma clase.",
    estado: "completado"
  },
  {
    texto:
      "Ubicaciones: definición de la columna \"putaway_seq\" y envío del Excel con la relación de la ubicación y el valor.",
    estado: "completado"
  }
];

const semana13a17Julio = [
  {
    texto:
      "Artículos: valores decimales en columnas de cantidades.",
    estado: "completado"
  },
  {
    texto:
      "Artículos: modificación de la unidad de medida CS a CJ.",
    estado: "completado"
  },
  {
    texto:
      "Artículos: duplicidad de la columna part_a; se define que únicamente para los duplicados se debe conservar el artículo que sí tiene relación con la fuente de productos y prescindir del otro registro.",
    estado: "completado"
  },
  {
    texto:
      "Artículos: clase de unidad de medida incorrecta entre primaria y secundaria; corregido directamente desde la fuente por Alexandra Duarte y Andrés Steven Moreno Menjura.",
    estado: "completado"
  },
  {
    texto:
      "Ubicaciones: ubicaciones que terminan en \"-C\"; se define modificar la palabra \"PUERTA\" por \"PTA\" para subsanar la novedad de caracteres máximo permitido en la columna \"area\".",
    estado: "completado"
  },
  {
    texto:
      "Ubicaciones: 5 ubicaciones con la columna item_alternate_code poblada sin estar creada como item; se enviará vacío dicho campo, al igual que max_units y min_units (únicamente para estos 5 casos).",
    estado: "completado"
  },
  {
    texto:
      "Ubicaciones: ubicaciones de reempaque; se queda a la espera del envío del archivo Excel con la relación de id_bodega, id_ubicacion y origen_no_conformidad para Álamos y Madrid, con el objetivo de poblar la columna cust_field_1.",
    estado: "completado"
  },
  {
    texto:
      "Ubicaciones: parametrización del campo \"putaway_seq\".",
    estado: "completado"
  }
];

const semana21a24Julio = [
  {
    texto:
      "WMS: validación de novedades sobre 45 items en conjunto con Julián — posibles duplicidades e items activos con configuración establecida.",
    estado: "completado"
  },
  {
    texto:
      "ERP: acompañamiento a usuario funcional para la unificación de UoM, revisión de necesidades de UoM para los cuestionarios y propuesta de unificación para casos especiales del negocio (Millar, Metros, Mililitro, entre otros).",
    estado: "completado"
  },
  {
    texto:
      "ERP: identificación y catálogo de fuentes de datos del ERP, con el fin de mapear posibles fuentes candidatas a partir de las sesiones de familiarización y los cuestionarios diligenciados.",
    estado: "completado"
  }
];

const semana27a31Julio = [
  {
    texto:
      "Reportes e indicadores: alineación con Jairo Ibáñez para mapear las fuentes que hoy nutren las métricas y reportes de WMS, con el fin de estar preparados para dar continuidad a su actualización cuando entre en operación el nuevo WMS.",
    estado: "completado"
  },
  {
    texto:
      "Reportes e indicadores: validaciones a nivel de arquitectura sobre el retorno de información WMS – ERP.",
    estado: "completado"
  },
  {
    texto:
      "Maestros WMS: 50% de avance en el alcance y la optimización del pipeline para que la migración sea escalable a cualquier región, aplicado en la lógica de extracción de los 3 maestros de migración WMS.",
    estado: "completado"
  },
  {
    texto:
      "Maestros WMS: propuesta de implementación del pipeline de maestros de migración WMS sobre la arquitectura medallion \"oficial\" de Darnel.",
    estado: "completado"
  },
  {
    texto:
      "Observación — Cargue WMS: la plantilla de ubicaciones aún no ha sido cargada. Se generaron nuevas definiciones que deben actualizarse en la extracción y en la plantilla; con esos ajustes se entregarán las nuevas plantillas para el cargue.",
    estado: "completado"
  },
  {
    texto:
      "Observación — Integraciones: a la fecha se ha recibido 1 solicitud de generación de datos, gestionada a través del workspace asignado para la migración; los datos ya fueron remitidos.",
    estado: "completado"
  }
];

const semana03a06Agosto = [
  {
    texto:
      "Maestros WMS: 90% de avance en el alcance y la optimización del pipeline para que la migración sea escalable a cualquier región, aplicado en la lógica de extracción de los 3 maestros de migración WMS.",
    estado: "completado"
  },
  {
    texto:
      "Maestros WMS: construcción del \"motor\" de ingesta de archivos lookup para la generación de tablas en el OneLake y su adhesión al pipeline principal de los 3 maestros de migración WMS.",
    estado: "completado"
  },
  {
    texto:
      "Maestros WMS: propuesta de implementación del pipeline de maestros de migración WMS sobre la arquitectura medallion \"oficial\" de Darnel — pendiente agendar con el equipo de analítica de Darnel.",
    estado: "completado"
  },
  {
    texto:
      "Observación — Cargue WMS (ubicaciones): el 31-07 se realiza sesión de nuevas reglas con el equipo funcional y negocio, implementadas en la lógica de extracción y confirmada nueva extracción el 03-08. El 05-08 Alexandra D. envía observaciones sobre la plantilla, que fueron subsanadas y se confirma nuevamente la extracción y generación de la plantilla. Oracle se encuentra a la espera del OK por parte de Alexandra.",
    estado: "completado"
  },
  {
    texto:
      "Observación — Integraciones: a la fecha se ha recibido 1 solicitud de generación de datos, gestionada a través del workspace asignado para la migración; los datos ya fueron remitidos.",
    estado: "completado"
  }
];

const semana10a14Agosto = [
  {
    texto:
      "Maestros WMS: 100% de avance en el alcance y la optimización del pipeline para que la migración sea escalable a cualquier región, aplicado en la lógica de extracción de los 3 maestros de migración WMS.",
    estado: "completado"
  },
  {
    texto:
      "Maestros WMS: propuesta de implementación del pipeline de maestros de migración WMS sobre la arquitectura medallion \"oficial\" de Darnel — pendiente agendar con el equipo de analítica de Darnel.",
    estado: "completado"
  },
  {
    texto:
      "Maestros WMS: implementación de nuevas reglas en la plantilla de ubicaciones — ubicaciones de tipo WIP, con alcance en la lógica de generación de las columnas aisle, bay, level y position.",
    estado: "completado"
  },
  {
    texto:
      "Maestros WMS: alcance en la lógica para la generación de las columnas \"task_zone_code\" y \"putaway_seq\" en la plantilla de ubicaciones.",
    estado: "completado"
  },
  {
    texto:
      "ERP: planteamiento de resolución de idempotencia con cargas incrementales para la transaccionalidad de las fuentes ERP.",
    estado: "completado"
  },
  {
    texto:
      "Observación — Cargue WMS (ubicaciones): Alexandra aprobó y confirmó la consistencia de los datos en la extracción de la plantilla el 10-08; el 12-08 Yaiza, del equipo Oracle, reportó novedades de forma. A la fecha no se ha recibido retroalimentación del cargue ni la resolución de las novedades o la definición de nuevas reglas.",
    estado: "completado"
  },
  {
    texto:
      "Observación — Integraciones: a la fecha se ha recibido 1 solicitud de generación de datos, gestionada a través del workspace asignado para la migración; los datos ya fueron remitidos. Se establecerá contacto con Tomás debido a un comentario en el comité técnico.",
    estado: "completado"
  }
];

const semana18a21Agosto = [
  {
    texto:
      "Maestros WMS: empalme con el equipo funcional y de negocio sobre la nueva necesidad de una plantilla de inventarios para PB3-UAT.",
    estado: "completado"
  },
  {
    texto:
      "Maestros WMS: solicitud de acceso a las fuentes de datos para la plantilla de inventarios.",
    estado: "completado"
  },
  {
    texto:
      "Maestros WMS: avance en la configuración inicial y los cimientos para la nueva plantilla de inventarios.",
    estado: "completado"
  },
  {
    texto:
      "Maestros WMS: propuesta de implementación del pipeline de maestros de migración WMS sobre la arquitectura medallion \"oficial\" de Darnel — pendiente agendar con el equipo de analítica de Darnel.",
    estado: "completado"
  },
  {
    texto:
      "Observación — Cargue WMS (ubicaciones): el 14-08 Alexandra autorizó la consistencia y calidad de los datos de la plantilla de ubicaciones. Queda a la espera de la confirmación del cargue por parte de Zaid.",
    estado: "completado"
  },
  {
    texto:
      "Observación — Cargue WMS (inventarios): el 17-08 Alexandra e Ileana confirman que se cargarán datos de inventarios para PB3 y que generaron manualmente una plantilla con un snapshot de datos; para el escenario UAT se desarrolla un proceso que automatiza la extracción con la lógica planteada.",
    estado: "completado"
  },
  {
    texto:
      "Observación — Cargue WMS (inventarios): Zaid y Julián, del equipo de Oracle, remitieron novedades sobre el proceso de cargue de inventarios, las cuales fueron resueltas el 20-08.",
    estado: "completado"
  },
  {
    texto:
      "Observación — Integraciones: a la fecha se ha recibido 1 solicitud de generación de datos, gestionada a través del workspace asignado para la migración; los datos ya fueron remitidos. Se establecerá contacto con Tomás debido a un comentario en el comité técnico.",
    estado: "completado"
  },
  {
    texto:
      "Reportes: alineación con Tomás García sobre la necesidad de poblar el WMS con datos de operación para las pruebas de reportes.",
    estado: "completado"
  },
  {
    texto:
      "Reportes: sesión con Oracle para el entendimiento de la integración con WMS para ingestar datos desde Fabric — agendada.",
    estado: "completado"
  }
];

const semana24a28Agosto = [
  {
    texto:
      "Maestros WMS: desarrollo y configuración de la nueva plantilla de inventarios — 70% de avance.",
    estado: "en-proceso"
  },
  {
    texto:
      "Maestros WMS: propuesta de implementación del pipeline de maestros de migración WMS sobre la arquitectura medallion \"oficial\" de Darnel — agendada para el lunes 31.",
    estado: "programado"
  },
  {
    texto:
      "Documentación WMS de entrega — Diccionario de datos por cada maestro PB3 WMS: 100%.",
    estado: "completado"
  },
  {
    texto:
      "Documentación WMS de entrega — Criterios y volúmenes de datos a migrar PB3 WMS: 100%.",
    estado: "completado"
  },
  {
    texto:
      "Documentación WMS de entrega — Pruebas de transformación y validación funcional PB2 WMS: 80%.",
    estado: "en-proceso"
  },
  {
    texto:
      "Documentación WMS de entrega — Repositorio staging con evidencias de extracción y validación WMS: 100%.",
    estado: "completado"
  },
  {
    texto:
      "Documentación WMS de entrega — Estrategia de levantamiento de datos faltantes (workshops, matrices, reglas) WMS: 10%.",
    estado: "en-proceso"
  },
  {
    texto:
      "Soporte WMS Playback 3: ubicaciones de tipo Reserva (R) — el campo Allow Reserve Partial Pick debe ir en true. 100%.",
    estado: "completado"
  },
  {
    texto:
      "Soporte WMS Playback 3: ubicaciones de tipo consolidación — el atributo cust_field_4 debe tener el valor \"PUERTA\". 100%.",
    estado: "completado"
  },
  {
    texto:
      "Soporte WMS Playback 3: Items — nueva lógica en la columna description_3, 40%. Se debe agendar reunión con Andrés Moreno para resolver duda sobre la regla escrita.",
    estado: "en-proceso"
  },
  {
    texto:
      "Observación — Cargue WMS: se recibió la confirmación del cargue de ubicaciones, satisfactorio. Cargaron 24.303 de 24.304 ubicaciones enviadas (99,99%). Estado final de cargue: Items 100%, Barcode 100%, Locations 99,99%.",
    estado: "completado"
  },
  {
    texto:
      "Reportes: sesión de entendimiento con el equipo de Oracle sobre la integración con WMS — agendada para el lunes 31-08-2026.",
    estado: "programado"
  }
];

const elementosTransversales = [
  "Asistencia a talleres de familiarización para identificar inventario de datos ERP.",
  "Habilitar datos en ambientes de prueba para integraciones.",
  "Sinergia entre brechas funcionales de gestión de impactos y el impacto técnico a nivel de datos.",
  "ERP/SCM: estrategia de datos sobre reglas de negocio, fuentes de información y formatos.",
  "Integraciones: acceso a nuevas tablas ATP INT13 e integración Fabric de 16 tablas PeopleSoft/WMS."
];

const resultadoCantidadesAbr23 = [
  {
    entidad: "ITEMS",
    universo: "42.350",
    enviados: "8.495",
    nota: "Universo recalculado con nuevas reglas."
  },
  {
    entidad: "UBICACIONES",
    universo: "26.081",
    enviados: "5.216",
    nota: "Aplicadas exclusiones funcionales adicionales."
  },
  {
    entidad: "BARCODE",
    universo: "2.228",
    enviados: "531",
    nota: "Envío con exclusión de duplicidad EAN13."
  }
];

const notaNoCargadosItems = [
  {
    item: "8332 - Autoadhesivo Cajas 425 x 25 pulg Transf Trmica Material",
    motivo:
      "La información no es consistente entre las bases de datos origen desde donde se extrae para Playbook 1."
  },
  {
    item: "P5PT1SB06701904280 - Darnel Printable Treated P5 19mc75Gax67cm273 in x4280",
    motivo:
      "Presenta 3 unidades de medida adicionales y el ordenamiento actual deja inconsistencias; se evaluarán ajustes para garantizar un ordenamiento consistente."
  }
];

const comparativoPlantillas = [
  {
    plantilla: "ITEMS",
    universo: "Corte de carga PB2",
    resultado: "44.820 cargados / 98,73%",
    detalle: "Quedan inconsistencias por analizar y corregir del proceso de extracción/carga."
  },
  {
    plantilla: "LOCATIONS",
    universo: "24.410 ubicaciones preparadas",
    resultado: "No cargado",
    detalle: "Pendiente definición del layout de bodega por Alexandra Duarte y Zaid."
  },
  {
    plantilla: "BARCODE",
    universo: "Corte de carga PB2",
    resultado: "1.817 cargados / 83,58%",
    detalle: "Se detectaron códigos Barcode que no existen como artículos."
  }
];

const temasValidados = [
  "Se implementaron mejoras sobre inconsistencias reportadas en la extracción PB2.",
  "Se realizaron sesiones conjuntas de revisión de consistencia y acompañamiento a la ingesta Oracle.",
  "Se habilitó acceso a nuevas tablas para Órdenes de Venta actuales en formato ATP INT13.",
  "Se implementó integración en Fabric de 16 nuevas tablas de PeopleSoft y WMS."
];

const faltantes = [
  "Alinear definiciones funcionales pendientes dentro del alcance PB2.",
  "Resolver duplicidad de artículos causada por diferencias de nomenclatura y carácter NBSP.",
  "Confirmar definición Oracle sobre unidad de medida pack igual a la primaria.",
  "Resolver códigos Barcode que no existen como artículos.",
  "Definir layout de bodega para habilitar carga de Locations.",
  "Culminar query de Órdenes de Venta actuales en formato ATP INT13."
];

const planEntidades = [
  {
    entidad: "Items",
    estado: "44.820 registros cargados (98,73%).",
    siguiente: "Alinear duplicidades por NBSP y regla Oracle de unidad pack igual a primaria."
  },
  {
    entidad: "Barcode",
    estado: "1.817 registros cargados (83,58%).",
    siguiente: "Resolver códigos Barcode que no existen como artículos."
  },
  {
    entidad: "Locations",
    estado: "No cargado por definición pendiente del layout de bodega.",
    siguiente: "Cerrar definición con Alexandra Duarte y Zaid para ejecutar la carga."
  },
  {
    entidad: "Integraciones",
    estado: "16 nuevas tablas PeopleSoft/WMS integradas en Fabric para ATP INT13.",
    siguiente: "Culminar query de extracción de Órdenes de Venta actuales y universo PB2."
  }
];

// ---------------------------------------------------------------------------
// BRIEF PB3 - SIT: definición de datos WMS, reglas vs integraciones
// Corte 23-07-2026. Punto de partida para el plan 360 de pruebas PB3 y UAT.
// ---------------------------------------------------------------------------

const briefCorte = "23-07-2026";

const briefFuentes = [
  { tabla: "PS_MASTER_ITEM_TBL", registros: 187129, destino: ["Items"] },
  { tabla: "PS_INV_ITEM_UOM", registros: 372102, destino: ["Items"] },
  { tabla: "PS_AJ_INVUOM_WMS", registros: 263098, destino: ["Items", "Barcode"] },
  { tabla: "PS_AJ_BU_ITEM_UOM", registros: 4197, destino: ["Items", "Barcode"] },
  { tabla: "PS_SET_CNTRL_REC", registros: 8662570, destino: ["Items"] },
  { tabla: "PS_BU_ITEMS_INV", registros: 1423325, destino: ["Items"] },
  { tabla: "t_item_master_bse", registros: 55624, destino: ["Items"] },
  { tabla: "t_item_master", registros: 281298, destino: ["Items"] },
  { tabla: "PS_AJ_UOMSTOCK_DIM", registros: 256714, destino: ["Items"] },
  { tabla: "t_item_uom", registros: 379845, destino: ["Items"] },
  { tabla: "PS_PROD_ITEM", registros: 115697, destino: ["Items"] },
  { tabla: "PS_PROD_ITEM_LNG", registros: 140374, destino: ["Items"] },
  { tabla: "vida_util", registros: 322, destino: ["Items"] },
  { tabla: "PS_AJ_MASTER_ITEM", registros: 179830, destino: ["Barcode"] },
  { tabla: "t_location", registros: 77187, destino: ["Ubicaciones"] },
  { tabla: "t_fwd_pick_bse", registros: 2381, destino: ["Ubicaciones"] },
  { tabla: "ubicaciones_reempaque", registros: 49, destino: ["Ubicaciones"] }
];

const briefLookups = [
  { tabla: "uom_class", uso: "Clase de UoM para validar primaria vs caja en Items." },
  { tabla: "maestro_wms_articulos", uso: "Maestro actual del WMS para derivar CREATE/UPDATE/DELETE." },
  { tabla: "lkp_item_pb3", uso: "Universo PB3 para validar integridad referencial en Barcode y Ubicaciones." }
];

const briefSalida = [
  {
    plantilla: "Items",
    pb2: 44820,
    pb3: 46807,
    estadoCargue: "cargado",
    reglas: 26,
    reglasNuevas: 19,
    fuentes: 13
  },
  {
    plantilla: "Barcode",
    pb2: 1817,
    pb3: 2163,
    estadoCargue: "cargado",
    reglas: 9,
    reglasNuevas: 4,
    fuentes: 3
  },
  {
    plantilla: "Ubicaciones",
    pb2: 24410,
    pb3: 24503,
    estadoCargue: "cargado",
    reglas: 21,
    reglasNuevas: 15,
    fuentes: 3
  }
];

const briefCargueNota =
  "Cargue completado: las 3 plantillas fueron cargadas a WMS. Items y Barcode al 100% y Ubicaciones al 99,99% (24.303 de 24.304 registros enviados). En paralelo avanza la nueva plantilla de inventarios para PB3-UAT (70%) — actualización semana 24-28 ago.";

const briefConsideraciones = [
  "Las tablas fuente fueron previamente depuradas por el usuario funcional para eliminar datos basura detectados durante las fases de exploración y validación de la información.",
  "Los volúmenes de las plantillas de salida corresponden a los registros resultantes después de aplicar la lógica de transformación y las reglas funcionales definidas conjuntamente entre el equipo técnico y el usuario funcional.",
  "Las reglas aplicadas incluyen filtros de exclusión, validaciones de integridad referencial, deduplicación y normalización de datos.",
  "Del conteo de fuentes se excluyeron las tablas de control y referencia, que no aportan registros de negocio sino que operan como lookup para validaciones y mapeos."
];

const briefIntegraciones = {
  total: 15,
  entregadas: 1,
  pendientesValidacion: 14,
  flujos: [
    { nombre: "PeopleSoft → WMS", cantidad: 8, tono: "entrada" },
    { nombre: "WMS → PeopleSoft", cantidad: 6, tono: "salida" },
    { nombre: "Sin flujo definido", cantidad: 1, tono: "sin" }
  ],
  plantilla: [
    { nombre: "Plantilla completa", cantidad: 11, tono: "ok" },
    { nombre: "Plantilla parcial", cantidad: 3, tono: "medio" },
    { nombre: "Sin diseño", cantidad: 1, tono: "malo" }
  ],
  muestra: [
    { nombre: "Con datos de muestra", cantidad: 4, tono: "ok" },
    { nombre: "Sin datos de muestra", cantidad: 11, tono: "malo" }
  ]
};

const briefIntegracionesDetalle = [
  { int: "13/19/32", nombre: "Sincronización Órdenes de Venta y Transferencias", flujo: "PS → ATP → WMS", plantilla: "completa", muestra: true, estado: "entregado" },
  { int: "12", nombre: "Creación de Carga de Salida", flujo: "PS + Logisfrete → WMS", plantilla: "completa", muestra: true, estado: "validacion" },
  { int: "21", nombre: "Orden de transferencia de entrada", flujo: "PS → WMS", plantilla: "completa", muestra: true, estado: "validacion" },
  { int: "33", nombre: "Confirmación Recepción Orden de Trabajo", flujo: "WMS → PS", plantilla: "completa", muestra: true, estado: "validacion" },
  { int: "015", nombre: "Generación ASN PO Importación", flujo: "Fusion SCM → WMS", plantilla: "completa", muestra: false, estado: "validacion" },
  { int: "022", nombre: "Recepción de Orden de Transferencia", flujo: "WMS → PS", plantilla: "completa", muestra: false, estado: "validacion" },
  { int: "20/14", nombre: "Confirmación Órdenes de Venta y Transferencias", flujo: "WMS → ATP → PS", plantilla: "completa", muestra: false, estado: "validacion" },
  { int: "D020", nombre: "Sincronización Artículos y Referencias Cruzadas", flujo: "PS → WMS", plantilla: "completa", muestra: false, estado: "validacion" },
  { int: "—", nombre: "ITEM_SYNC — Catálogo de productos", flujo: "PS → WMS", plantilla: "completa", muestra: false, estado: "validacion" },
  { int: "—", nombre: "AJ_VENDOR_TO_WMS — Proveedores", flujo: "PS → WMS", plantilla: "completa", muestra: false, estado: "validacion" },
  { int: "—", nombre: "TMS_ORDER_RELEASE — Envío de Órdenes de Venta", flujo: "PS → WMS", plantilla: "completa", muestra: false, estado: "validacion" },
  { int: "—", nombre: "Confirmación de Cumplimiento de Órdenes", flujo: "WMS → PS", plantilla: "parcial", muestra: false, estado: "validacion" },
  { int: "—", nombre: "Orden de transferencia salida — Confirmación", flujo: "WMS → PS", plantilla: "parcial", muestra: false, estado: "validacion" },
  { int: "—", nombre: "Confirmación recepción RMA", flujo: "WMS → PS", plantilla: "parcial", muestra: false, estado: "validacion" },
  { int: "—", nombre: "Retroalimentación de inventarios", flujo: "Sin definir", plantilla: "sin", muestra: false, estado: "sin" }
];

const briefBloqueos = [
  {
    titulo: "Plantilla de inventarios PB3-UAT en construcción",
    impacto: "Requisito del escenario UAT",
    detalle:
      "La nueva plantilla de inventarios para PB3-UAT avanza al 70%. Para el escenario UAT se automatiza la extracción con la lógica planteada; hasta cerrarla, el poblado de inventario en WMS depende de un snapshot manual generado por negocio."
  },
  {
    titulo: "Retroalimentación de inventarios sin diseño",
    impacto: "Sin cobertura de pruebas",
    detalle:
      "Es la integración que cierra el ciclo de stock entre WMS y ERP. No existe documento de diseño ni plantilla, por lo que no puede incluirse en el alcance de pruebas de PB3."
  },
  {
    titulo: "Tres contratos de integración sin diligenciar",
    impacto: "Criterios de prueba indefinidos",
    detalle:
      "Cumplimiento de Órdenes, Transferencia de salida y RMA tienen los parámetros de entrada EIP, pero requisitos, eventos disparadores, precondiciones y poscondiciones están en blanco o en N/A."
  },
  {
    titulo: "Frecuencias de integración sin definir",
    impacto: "Sin criterio de aceptación",
    detalle:
      "INT 21, INT 20/14 e INT 022 registran la frecuencia como 'En proceso'. Sin frecuencia definida no hay criterio objetivo para validar el comportamiento en SIT ni en UAT."
  },
  {
    titulo: "Campos sin origen sistémico en Items",
    impacto: "Dato no reproducible",
    detalle:
      "product_life y percent_acceptable_product_life se alimentan desde un Excel de negocio. No existe query que los reproduzca, por lo que su calidad depende de un proceso manual."
  },
  {
    titulo: "Reglas de ubicaciones recién implementadas sin verificar en cargue",
    impacto: "Riesgo de reproceso",
    detalle:
      "En la semana 10-14 ago se incorporó la lógica de generación de task_zone_code, putaway_seq y de las columnas aisle/bay/level/position para ubicaciones WIP. Estas reglas nuevas aún no se han validado contra un cargue real en WMS."
  }
];

const estadoLabel = {
  completado: "Completado",
  "en-proceso": "En proceso",
  pendiente: "Pendiente",
  compromiso: "Compromiso",
  programado: "Programado",
  dependencia: "Dependencia"
};

const mostrarArquitecturaToBe = false;

const leccionesAprendidas = [
  "Se consolidó una simbiosis operativa entre Oracle, Darnel y Azurian para ejecutar trabajo mancomunado.",
  "La comunicación entre puntas y actores mejoró el cierre de observaciones y redujo reprocesos.",
  "El enfoque colaborativo en sesiones conjuntas permitió definir reglas de negocio accionables para migración."
];

const frameworkCarga = [
  {
    paso: 1,
    titulo: "Entendimiento de plantilla o ajuste a plantilla existente",
    fase: "Definir",
    aprobador: "Oracle",
    responsable: "Oracle",
    consultado: "Darnel",
    informado: "Azurian",
    entregable: "Plantilla y criterios Oracle entendidos.",
    criterio: "Columnas, formatos, obligatoriedad y restricciones documentadas."
  },
  {
    paso: 2,
    titulo: "Entendimiento de fuentes y definición de reglas de negocio",
    fase: "Definir",
    aprobador: "Darnel",
    responsable: "Darnel",
    consultado: "-",
    informado: "Oracle, Azurian",
    entregable: "Inventario de fuentes, dueños de datos y reglas de negocio definidas.",
    criterio: "Fuentes, llaves, universo, reglas de negocio, excepciones y criterios de exclusión identificados."
  },
  {
    paso: 3,
    titulo: "Levantamiento de fuente e inclusión en Microsoft Fabric",
    fase: "Construir",
    aprobador: "Darnel",
    responsable: "Azurian",
    consultado: "Darnel",
    informado: "Oracle",
    entregable: "Fuente disponible en Fabric.",
    criterio: "Acceso, permisos, conteos iniciales y trazabilidad técnica confirmados."
  },
  {
    paso: 4,
    titulo: "Desarrollo ETL y primer llenado para validación",
    fase: "Construir",
    aprobador: "Azurian",
    responsable: "Azurian",
    consultado: "Darnel",
    informado: "Oracle",
    entregable: "Producto de datos inicial y archivo de validación.",
    criterio: "Reglas implementadas, log de ejecución y controles técnicos disponibles."
  },
  {
    paso: 5,
    titulo: "Validación del primer volcado de datos",
    fase: "Validar",
    aprobador: "Darnel",
    responsable: "Darnel, Oracle",
    consultado: "Azurian",
    informado: "-",
    entregable: "Primer volcado aprobado o defectos clasificados.",
    criterio: "Conciliación contra fuente, estructura y reglas críticas dentro de tolerancia.",
    decision: "Si no aprueba, se refina y retorna al paso 4."
  },
  {
    paso: 6,
    titulo: "Validación de casos de uso",
    fase: "Validar",
    aprobador: "Darnel",
    responsable: "Darnel",
    consultado: "Azurian",
    informado: "Oracle",
    entregable: "Casos de uso funcionales aprobados.",
    criterio: "Negocio confirma que los datos soportan la operación esperada.",
    decision: "Si no aprueba, retorna al paso 4."
  },
  {
    paso: 7,
    titulo: "Carga de insumo de prueba",
    fase: "Validar",
    aprobador: "Oracle",
    responsable: "Oracle",
    consultado: "Azurian",
    informado: "Darnel",
    entregable: "Resultado de carga de prueba y log de errores Oracle.",
    criterio: "Errores clasificados por severidad y plan de corrección definido.",
    decision: "Si falla, retorna al paso 4."
  },
  {
    paso: 8,
    titulo: "Validación de completitud, calidad y conciliación",
    fase: "Aprobar",
    aprobador: "Darnel",
    responsable: "Darnel, Oracle, Azurian",
    consultado: "-",
    informado: "-",
    entregable: "Acta de completitud y calidad.",
    criterio: "Universo, exclusiones, errores remanentes y tolerancias aceptadas."
  },
  {
    paso: 9,
    titulo: "Validación de regresión y cierre de defectos",
    fase: "Aprobar",
    aprobador: "PMO",
    responsable: "Darnel, Oracle, Azurian",
    consultado: "-",
    informado: "-",
    entregable: "Matriz de defectos cerrada o aceptada.",
    criterio: "Sin defectos críticos abiertos y plan definido para excepciones."
  },
  {
    paso: 10,
    titulo: "Go-live, control de excepciones y cierre de carga",
    fase: "Ejecutar",
    aprobador: "PMO",
    responsable: "Oracle, Darnel, Azurian",
    consultado: "-",
    informado: "Darnel",
    entregable: "Acta de go-live, excepciones y cierre.",
    criterio: "Go/no-go, rollback, monitoreo y decisión sobre casos no cargados.",
    decision:
      "Se resuelve, acuerda y corrige en tiempo real hasta carga exitosa o decisión de no cargar casos específicos."
  }
];

const methodologyPhases = [
  {
    nombre: "Definir",
    rango: "Pasos 1-2",
    objetivo: "Alinear plantilla, fuentes, reglas y alcance antes de construir.",
    color: "define"
  },
  {
    nombre: "Construir",
    rango: "Pasos 3-4",
    objetivo: "Habilitar fuentes en Fabric y preparar el primer producto de datos.",
    color: "build"
  },
  {
    nombre: "Validar",
    rango: "Pasos 5-7",
    objetivo: "Probar calidad, reglas funcionales, casos de uso e ingesta Oracle.",
    color: "validate"
  },
  {
    nombre: "Aprobar",
    rango: "Pasos 8-9",
    objetivo: "Cerrar completitud, defectos, excepciones y readiness.",
    color: "approve"
  },
  {
    nombre: "Ejecutar",
    rango: "Paso 10",
    objetivo: "Tomar decisión go/no-go, ejecutar carga y cerrar evidencias.",
    color: "execute"
  }
];

const methodologyControls = [
  { titulo: "Gates", detalle: "Cada fase avanza con evidencia, criterio de salida y aprobador explícito." },
  { titulo: "RAID", detalle: "Riesgos, supuestos, issues y decisiones se registran con dueño y fecha compromiso." },
  { titulo: "KPIs", detalle: "% carga exitosa, errores por severidad, defectos abiertos/cerrados y aging de definiciones." },
  { titulo: "Escalamiento", detalle: "Bloqueos funcionales o técnicos se elevan por severidad y tiempo de permanencia." }
];

const roleMandates = {
  Oracle:
    "Define qué datos necesita, cómo los necesita, restricciones de plantilla, formatos objetivo y reglas de ingesta Oracle.",
  Darnel:
    "Define qué información debe tomarse, desde qué tablas o sistemas, reglas de negocio, alcance funcional y aprobación del dato.",
  Azurian:
    "Consolida, cruza, transforma, aplica reglas y estandariza en Microsoft Fabric bajo arquitectura medallion para reutilizar en futuras unidades o locaciones.",
  PMO:
    "Gobierna plan, gates, RAID, escalamiento, evidencias y decisiones de avance o bloqueo."
};

const responsablesRaci = {
  Oracle: "Julian Bacca",
  Darnel: "Alexandra Duarte e Ileana Cortina",
  Azurian: "Fabian Alomia",
  PMO: "Fredy Mayorga, Balmore Ortíz y David Higuera"
};

const medallionTrace = [
  {
    capa: "Fuente",
    objetivo: "Sistemas origen",
    detalle: "Darnel confirma tablas, llaves, dueños funcionales y universo esperado."
  },
  {
    capa: "Bronze",
    objetivo: "Dato crudo",
    detalle: "Azurian ingesta en Fabric con trazabilidad, conteos y control técnico inicial."
  },
  {
    capa: "Silver",
    objetivo: "Dato normalizado",
    detalle: "Homologación, limpieza, tipado, cruces y aplicación de reglas acordadas."
  },
  {
    capa: "Gold",
    objetivo: "Plantilla objetivo",
    detalle: "Producto de datos validable para Oracle WMS/Fusion, con exclusiones y evidencias."
  }
];

const ganttWmsPB3 = [
  {
    task: "Playback 3 WMS Madrid / Alamos",
    start: "02 Jul",
    end: "31 Ago",
    span: "2 Jul - 31 Ago",
    type: "summary",
    tipo: "Macro",
    lane: "Programa",
    owner: "PMO",
    note: "Plan macro PB3. El playback inicia el 2 de julio."
  },
  {
    task: "Readiness de datos PB3: Items, Barcode y Locations",
    start: "02 Jul",
    end: "02 Jul",
    span: "2 Jul",
    type: "milestone",
    tipo: "Hito",
    lane: "Datos",
    owner: "Darnel / Azurian",
    note: "Llegar con cambios PB2 incorporados y últimos datos PB3 listos para arranque."
  },
  {
    task: "Preparación PB3 · Instancia TEST",
    start: "02 Jul",
    end: "23 Jul",
    span: "2 - 23 Jul",
    type: "work",
    tipo: "Trabajo",
    lane: "Preparación",
    owner: "PMO",
    note: "Ambientes, accesos, customizaciones y ajustes iniciales."
  },
  {
    task: "Habilitación de entornos y accesos",
    start: "02 Jul",
    end: "08 Jul",
    span: "2 - 8 Jul",
    type: "work",
    tipo: "Trabajo",
    lane: "Preparación",
    owner: "Darnel",
    note: "Entornos de prueba legados y aseguramiento de accesos."
  },
  {
    task: "Configuración y ajustes pendientes para PB3",
    start: "02 Jul",
    end: "08 Jul",
    span: "2 - 8 Jul",
    type: "work",
    tipo: "Trabajo",
    lane: "SIT",
    owner: "Oracle",
    note: "Ajustes de configuración requeridos antes de pruebas."
  },
  {
    task: "Sizing Playback 3",
    start: "02 Jul",
    end: "22 Jul",
    span: "2 - 22 Jul",
    type: "work",
    tipo: "Trabajo",
    lane: "Sizing",
    owner: "Oracle",
    note: "Levantamiento, cuestionario, SR y aprobación de sizing PB3."
  },
  {
    task: "Levantamiento de volúmenes de datos WMS PB3",
    start: "02 Jul",
    end: "03 Jul",
    span: "2 - 3 Jul",
    type: "work",
    tipo: "Trabajo",
    lane: "Sizing",
    owner: "Darnel",
    note: "Volúmenes base para Items, Barcode y Locations."
  },
  {
    task: "Completar cuestionario estándar sizing",
    start: "06 Jul",
    end: "06 Jul",
    span: "6 Jul",
    type: "milestone",
    tipo: "Hito",
    lane: "Sizing",
    owner: "Oracle",
    note: "Insumo estándar requerido para sizing."
  },
  {
    task: "Evaluación de sizing · apertura SR PB3",
    start: "07 Jul",
    end: "07 Jul",
    span: "7 Jul",
    type: "milestone",
    tipo: "Hito",
    lane: "Sizing",
    owner: "Oracle",
    note: "Apertura SR para evaluación Oracle."
  },
  {
    task: "Aprobación de sizing PB3",
    start: "08 Jul",
    end: "22 Jul",
    span: "8 - 22 Jul",
    type: "gate",
    tipo: "Gate",
    lane: "Sizing",
    owner: "Oracle",
    note: "Gate de sizing. La carga 15-16 Jul queda condicionada si la aprobación final continúa hasta el 22 Jul."
  },
  {
    task: "Pruebas SIT",
    start: "07 Jul",
    end: "15 Jul",
    span: "7 - 15 Jul",
    type: "work",
    tipo: "Trabajo",
    lane: "SIT",
    owner: "Oracle / Azurian",
    note: "Incluye SIT WMS-People y desarrollos WMS completados."
  },
  {
    task: "Preparación de datos 80% PB3",
    start: "09 Jul",
    end: "14 Jul",
    span: "9 - 14 Jul",
    type: "work",
    tipo: "Trabajo",
    lane: "Datos",
    owner: "Azurian",
    note: "Preparación del primer volumen operativo para PB3."
  },
  {
    task: "Carga de datos en el sistema PB3",
    start: "15 Jul",
    end: "16 Jul",
    span: "15 - 16 Jul",
    type: "gate",
    tipo: "Gate condicionado",
    lane: "Datos",
    owner: "Oracle",
    note: "Carga técnica condicionada a trazabilidad de sizing, logs Oracle y aceptación de riesgos abiertos."
  },
  {
    task: "Confirmación de escenarios y roles custom",
    start: "15 Jul",
    end: "22 Jul",
    span: "15 - 22 Jul",
    type: "work",
    tipo: "Trabajo",
    lane: "SIT",
    owner: "Darnel",
    note: "Escenarios de prueba, roles custom y carga de escenarios en Jira."
  },
  {
    task: "Kickoff Playback 3",
    start: "23 Jul",
    end: "23 Jul",
    span: "23 Jul",
    type: "milestone",
    tipo: "Hito",
    lane: "Playback",
    owner: "PMO",
    note: "Inicio formal de Playback 3."
  },
  {
    task: "Ejecución Playback 3 · pruebas E2E",
    start: "24 Jul",
    end: "14 Ago",
    span: "24 Jul - 14 Ago",
    type: "work",
    tipo: "Trabajo",
    lane: "Playback",
    owner: "Darnel / Oracle / Azurian",
    note: "Recepción, almacenamiento, conteos cíclicos, planeación de olas, picking y despacho."
  },
  {
    task: "Ejecución BS PB3",
    start: "18 Ago",
    end: "20 Ago",
    span: "18 - 20 Ago",
    type: "work",
    tipo: "Trabajo",
    lane: "Playback",
    owner: "Darnel",
    note: "Ejecución de business scenarios PB3."
  },
  {
    task: "Aceptación Playback 3",
    start: "21 Ago",
    end: "24 Ago",
    span: "21 - 24 Ago",
    type: "gate",
    tipo: "Gate",
    lane: "Playback",
    owner: "Darnel",
    note: "Cierre formal de aceptación del Playback 3."
  },
  {
    task: "Estabilización y cierre administrativo",
    start: "25 Ago",
    end: "31 Ago",
    span: "25 - 31 Ago",
    type: "work",
    tipo: "Cierre",
    lane: "Cierre",
    owner: "PMO",
    note: "Remediación de excepciones aceptadas, actas finales, transición y cierre administrativo."
  }
];

const timelineErpFusionPB1 = [
  {
    fase: "Formularios y reglas",
    estado: "En curso",
    responsable: "Darnel",
    tareas: "Cerrar definiciones de formularios después de sesiones de familiarización."
  },
  {
    fase: "Identificación de fuentes",
    estado: "Siguiente",
    responsable: "Darnel / Azurian",
    tareas: "Mapear fuentes ERP/SCM, dueños, llaves, formatos y reglas de negocio."
  },
  {
    fase: "Plan de extracción PB1",
    estado: "Por fechar",
    responsable: "Azurian / PMO",
    tareas: "Diseñar queries, contratos de datos, criterios de calidad y plan de validación."
  }
];

const equipoFechasClavePB3 = [
  {
    equipo: "Oracle",
    foco: "Requerimientos, sizing, ingesta y criterios Oracle.",
    fechas: "6-22 Jul",
    entrega:
      "Cuestionario sizing, apertura/evaluación SR, aprobación de sizing y soporte a carga PB3.",
    gate: "Sizing aprobado antes de ejecución PB3."
  },
  {
    equipo: "Darnel",
    foco: "Fuentes, reglas de negocio, layout, escenarios y validación funcional.",
    fechas: "2-22 Jul",
    entrega:
      "Volúmenes PB3, fuentes/tablas confirmadas, escenarios PB3, roles custom y aprobación funcional.",
    gate: "Readiness de datos y escenarios antes del kickoff del 23 Jul."
  },
  {
    equipo: "Azurian",
    foco: "Consolidación, cruces, transformación, reglas y estandarización en Fabric.",
    fechas: "2-16 Jul",
    entrega:
      "Cambios PB2 incorporados, datos PB3 preparados para Items/Barcode/Locations y carga inicial.",
    gate: "Datos 80% preparados al 14 Jul y carga inicial 15-16 Jul."
  },
  {
    equipo: "PMO",
    foco: "Plan integrado, RAID, dependencias, evidencias y escalamiento.",
    fechas: "2 Jul - 24 Ago",
    entrega:
      "Control de gates, seguimiento de bloqueos, coordinación de kickoff, E2E y aceptación PB3.",
    gate: "Go/no-go y aceptación Playback 3 entre 21-24 Ago."
  }
];

const gatesCriticosPB3 = [
  { fecha: "2 Jul", hito: "Inicio PB3", accountable: "PMO", evidencia: "Checklist PB2/PB3 y acta de readiness." },
  { fecha: "6 Jul", hito: "Cuestionario sizing", accountable: "Oracle", evidencia: "Cuestionario estándar completo y enviado." },
  { fecha: "8-22 Jul", hito: "Aprobación sizing", accountable: "Oracle", evidencia: "SR Oracle, respuesta de sizing y riesgos aceptados." },
  { fecha: "15-16 Jul", hito: "Carga inicial PB3", accountable: "Oracle", evidencia: "Log Oracle, conteo cargado y errores clasificados." },
  { fecha: "23 Jul", hito: "Kickoff Playback 3", accountable: "PMO", evidencia: "Escenarios Jira, roles, accesos TEST y datos listos." },
  { fecha: "21-24 Ago", hito: "Aceptación Playback 3", accountable: "Darnel", evidencia: "Acta firmada, excepciones y dueños por pendiente." }
];

const bloqueantesReadinessPB3 = [
  { item: "Layout de Locations", owner: "Darnel", fecha: "2 Jul", criterio: "Definición cerrada o riesgo aceptado para PB3." },
  { item: "Duplicidad NBSP", owner: "Darnel / Azurian", fecha: "2 Jul", criterio: "Regla definida y aplicada en preparación de datos." },
  { item: "handle_decimal_qty_flg", owner: "Azurian", fecha: "14 Jul", criterio: "Regla implementada y trazable en Fabric." },
  { item: "Pack igual a UOM primaria", owner: "Oracle / Darnel", fecha: "14 Jul", criterio: "Definición confirmada y mapeada." },
  { item: "Política EAN13 / Barcode", owner: "Darnel", fecha: "14 Jul", criterio: "Criterio de exclusión o corrección aprobado." }
];

const cadenciaGobiernoPB3 = [
  {
    cadencia: "Daily PB2 · Locations y errores",
    ventana: "22 Jun-2 Jul",
    regla:
      "Seguimiento diario a carga de Locations PB2 y a errores identificados en pruebas para llegar a PB3 con decisiones cerradas."
  },
  { cadencia: "Daily readiness", ventana: "2-23 Jul", regla: "Bloqueos de datos/accesos/configuración se revisan diariamente." },
  { cadencia: "Daily defectos E2E", ventana: "24 Jul-14 Ago", regla: "Defectos críticos con dueño y fecha compromiso el mismo día." },
  { cadencia: "Comité de gates", ventana: "Cada hito crítico", regla: "Si un gate se bloquea, escalamiento PMO en menos de 24h." },
  { cadencia: "Steering semanal", ventana: "Jul-Ago", regla: "Impacto en fecha, alcance o go/no-go se eleva a dirección." }
];

const actoresRaci = ["Oracle", "Darnel", "Azurian", "PMO"];

function parseActores(valor) {
  if (!valor || valor === "-") return [];
  return valor
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getRolPasoActor(paso, actor) {
  const aprobadores = parseActores(paso.aprobador);
  const responsables = parseActores(paso.responsable);
  const consultados = parseActores(paso.consultado);
  const informados = parseActores(paso.informado);

  if (aprobadores.includes(actor)) return "A";
  if (responsables.includes(actor)) return "R";
  if (consultados.includes(actor)) return "C";
  if (informados.includes(actor)) return "I";
  if (actor === "PMO") return "I";
  return "";
}

const entidadDetalle = {
  items: {
    titulo: "Items",
    destinoBrief: "Items",
    pb2: 44820,
    pb3: 46807,
    estadoCargue: "cargado",
    resumen:
      "La extracción PB3 de Items genera 46.807 registros a partir de 13 tablas fuente, tras aplicar 26 reglas de negocio (19 nuevas o redefinidas para PB3). La plantilla fue cargada en WMS al 23-07-2026.",
    reglas: [
      {
        negocio: "Tomar solo artículos del set corporativo definido para la operación.",
        tecnica: "Filtro base en PS_MASTER_ITEM_TBL: SETID = 'COR01'. Se arrastra LOT_CONTROL para el manejo de lotes."
      },
      {
        negocio: "Excluir de raíz los artículos duplicados por carácter invisible.",
        tecnica:
          "Filtro en el universo base: NOT (INV_ITEM_ID RLIKE '\\u00A0'). Elimina el duplicado con NBSP y conserva el artículo sin tabulador.",
        nueva: true
      },
      {
        negocio: "Incluir únicamente artículos con UOM habilitada para WMS.",
        tecnica:
          "Join PS_INV_ITEM_UOM + PS_AJ_INVUOM_WMS con AJ_UOM_WMS = 'Y' y match por SETID/INV_ITEM_ID/UNIT_OF_MEASURE."
      },
      {
        negocio: "Descartar la unidad de medida ML en todo el cálculo de unidades.",
        tecnica:
          "UNIT_OF_MEASURE <> 'ML' aplicado en UOM_RANKED, AJ_PRIMARY y WMS_PRIMARY.",
        nueva: true
      },
      {
        negocio: "Definir unidad primaria por prioridad funcional.",
        tecnica:
          "CASE en PRIMARY_RESOLVED: AJ_BU_ITEM_UOM (AJ_STD_UOM_WMS='Y', BUSINESS_UNIT='AJI03') > AJ_INVUOM_WMS (AJ_STD_UOM_WMS='Y' y AJ_UOM_WMS='Y') > UOM_RANKED RN=1 (menor CONVERSION_RATE). Se marca el origen en FLAG_SOURCE (1/2/0)."
      },
      {
        negocio: "Definir la unidad secundaria por el segundo factor de conversión distinto.",
        tecnica:
          "Nuevo CTE UOM_DISTINCT_RATE ordenado por CONVERSION_RATE y UNIT_OF_MEASURE. Si la primaria viene de AJ (FLAG_SOURCE=1) se usa UOM_RANKED RN=1; en caso contrario UOM_DISTINCT_RATE RN_RATE=2.",
        nueva: true
      },
      {
        negocio: "Impedir que la unidad secundaria sea igual a la primaria.",
        tecnica:
          "En SECONDARY_RESOLVED, si la secundaria calculada coincide con UOM_PRIMARY se devuelve vacío en lugar de duplicar la unidad.",
        nueva: true
      },
      {
        negocio: "Publicar solo artículos completos para logística.",
        tecnica: "Filtro en Universo: UOM_PRIMARY IS NOT NULL AND UOM_SECONDARY IS NOT NULL."
      },
      {
        negocio: "Identificar el artículo por su producto comercial cuando exista.",
        tecnica:
          "part_a = COALESCE(PRODUCT_ID, INV_ITEM_ID) desde PS_PROD_ITEM con EFF_STATUS='A' y PROD_FIELD_C1_D='Y', deduplicado con ROW_NUMBER (RN_PROD=1) por PRODUCT_ID ascendente.",
        nueva: true
      },
      {
        negocio: "Clasificar cada registro como creación, actualización o eliminación frente al WMS actual.",
        tecnica:
          "action_code contra maestro_wms_articulos: DELETE si el barcode ya existe asociado a otro part_a; UPDATE si coinciden part_a y barcode; CREATE en el resto.",
        nueva: true
      },
      {
        negocio: "Calcular el costo unitario en la unidad primaria del artículo.",
        tecnica:
          "UNIT_COST = MAX(DFLT_ACTUAL_COST) de PS_BU_ITEMS_INV sobre las BUs del SETID (PS_SET_CNTRL_REC), multiplicado por el CONVERSION_RATE de la unidad primaria y redondeado a 2 decimales.",
        nueva: true
      },
      {
        negocio: "Obtener la cantidad por caja desde la bodega que tenga el dato.",
        tecnica:
          "std_case_qty y max_case_qty = COALESCE en cascada del conversion_factor de t_item_uom para las bodegas 05, 01, 02 y 03 sobre la unidad secundaria; 0 si ninguna aporta valor.",
        nueva: true
      },
      {
        negocio: "Tomar el lpns_per_tier de la bodega correspondiente al origen de la unidad primaria.",
        tecnica:
          "CTE LPNS_CALC: si FLAG_SOURCE=1 usa t_item_master_bse (wh_id='05'); si FLAG_SOURCE=2 usa t_item_master en cascada wh_id 01, 02 y 03. Se descartan los valores en cero con NULLIF.",
        nueva: true
      },
      {
        negocio: "Normalizar lpns_per_tier al máximo de longitud permitido por la plantilla.",
        tecnica:
          "Escalamiento por rango: 8 dígitos se divide entre 1000, 7 dígitos entre 100 y 6 dígitos entre 10. Por debajo de 6 dígitos el valor se conserva.",
        nueva: true
      },
      {
        negocio: "Dejar trazable el factor de escalamiento aplicado al lpns_per_tier.",
        tecnica:
          "tiers_per_pallet registra el divisor usado ('1000', '100' o '10'); '1' cuando hay valor sin escalar y vacío cuando no hay dato.",
        nueva: true
      },
      {
        negocio: "Clasificar el artículo en su tipo de almacenamiento según la línea de producto.",
        tecnica:
          "putaway_type derivado del prefijo del código en 11 categorías: DEXTON, MATERIALES, ALVEOLAR, LAMINA, PLASTICA, THERMO, ALIMENTO, ASEO, TANQUE, PELICULA y DESECHABLE (fallback). El orden de evaluación es significativo: PS antes de PELICULA, ALVEOLAR antes de LAMINA y RM* antes de ASEO.",
        nueva: true
      },
      {
        negocio: "Homologar la unidad de medida CS a CJ.",
        tecnica:
          "CASE sobre primary_uom_code y case_uom_code: si la unidad es 'CS' se envía 'CJ'.",
        nueva: true
      },
      {
        negocio: "Marcar el requerimiento de lote a partir del control de lote del maestro.",
        tecnica:
          "req_batch_nbr_flg = 'true' cuando PS_MASTER_ITEM_TBL.LOT_CONTROL = 'Y'; 'false' en caso contrario.",
        nueva: true
      },
      {
        negocio: "Calcular vida útil en días y porcentaje mínimo aceptable de recibo.",
        tecnica:
          "product_life = VIDA_UTIL_MESES * 30; percent_acceptable_product_life = ROUND(MINIMO_PARA_EL_RECIBO_MESES * 100 / NULLIF(VIDA_UTIL_MESES,0)). Se excluyen los registros con vida útil 'No tiene' o vacía."
      },
      {
        negocio: "Garantizar que todo artículo tenga descripción utilizable.",
        tecnica:
          "Limpieza con REGEXP_REPLACE a caracteres alfanuméricos; si el resultado queda vacío se envía 'sin descripcion'. description_2 se toma de PS_PROD_ITEM_LNG (DESCR254, idioma ESP) con la misma limpieza."
      },
      {
        negocio: "Heredar las unidades de peso y volumen desde las unidades resueltas.",
        tecnica:
          "CTE PRIMARY_RATE: weight_uom_code = UNIT_MEASURE_WT de la unidad primaria; volume_uom_code = UNIT_MEASURE_VOL de la unidad secundaria.",
        nueva: true
      },
      {
        negocio: "Validar que la unidad primaria y la de caja pertenezcan a la misma clase.",
        tecnica:
          "Cruce contra uom_class por primary_uom_code y case_uom_code; el campo validacion marca 'CLASE' cuando coinciden y 'ERROR' cuando difieren.",
        nueva: true
      },
      {
        negocio: "Entregar un único registro por artículo.",
        tecnica:
          "ROW_NUMBER particionado por part_a, priorizando los registros con PRODUCT_ID y desempatando por barcode; se conserva RN_DEDUP = 1.",
        nueva: true
      },
      {
        negocio: "Descartar artículos con caja declarada pero sin cantidad por caja.",
        tecnica:
          "Filtro final: NOT (std_case_qty = 0 AND case_uom_code <> '').",
        nueva: true
      },
      {
        negocio: "Aplicar las exclusiones funcionales definidas por negocio.",
        tecnica:
          "Se excluyen los prefijos A, B, Z y PZ, más una lista explícita de 38 artículos depurados con negocio.",
        nueva: true
      },
      {
        negocio: "Normalizar salida para consumo Oracle/WMS.",
        tecnica:
          "COALESCE(...,0) en dimensiones, peso y volumen; std_pack_* en 0 y valores fijos en retail_price, net_cost y dimension1-3."
      }
    ],
    tablas: [
      { tabla: "PS_MASTER_ITEM_TBL", registros: "176.980", uso: "Maestro base de artículo, descripción y control de lote." },
      { tabla: "PS_INV_ITEM_UOM", registros: "347.723", uso: "Unidades, conversión, peso y volumen por artículo." },
      { tabla: "PS_AJ_INVUOM_WMS", registros: "247.054", uso: "Habilitación funcional de UOM para WMS." },
      { tabla: "PS_AJ_BU_ITEM_UOM", registros: "4.133", uso: "Definición de unidad primaria estándar por negocio (AJI03)." },
      { tabla: "PS_AJ_UOMSTOCK_DIM", registros: "226.960", uso: "Dimensiones físicas por UOM." },
      { tabla: "PS_SET_CNTRL_REC", registros: "Pendiente conteo", uso: "Unidades de negocio asociadas al SETID.", nueva: true },
      { tabla: "PS_BU_ITEMS_INV", registros: "Pendiente conteo", uso: "Costo real por defecto del artículo por unidad de negocio.", nueva: true },
      { tabla: "t_item_uom", registros: "381.450", uso: "Factor de conversión por bodega (05/01/02/03)." },
      { tabla: "t_item_master", registros: "Pendiente conteo", uso: "std_hand_qty por bodega para lpns_per_tier (01/02/03).", nueva: true },
      { tabla: "t_item_master_bse", registros: "Pendiente conteo", uso: "std_hand_qty de la bodega 05 para lpns_per_tier.", nueva: true },
      { tabla: "PS_PROD_ITEM", registros: "112.294", uso: "Producto comercial activo para resolver part_a." },
      { tabla: "PS_PROD_ITEM_LNG", registros: "137.004", uso: "Descripción larga en español." },
      { tabla: "maestro_wms_articulos", registros: "Pendiente conteo", uso: "Maestro actual del WMS para determinar CREATE/UPDATE/DELETE.", nueva: true },
      { tabla: "uom_class", registros: "Pendiente conteo", uso: "Clase de unidad de medida para validar primaria vs caja.", nueva: true },
      { tabla: "vida_util", registros: "Pendiente conteo", uso: "Meses de vida útil y mínimo para recibo." }
    ]
  },
  barcode: {
    titulo: "Barcode",
    destinoBrief: "Barcode",
    pb2: 1817,
    pb3: 2163,
    estadoCargue: "cargado",
    resumen:
      "La extracción PB3 de Barcode genera 2.163 registros, el mayor crecimiento relativo de las tres plantillas. La validación contra el universo PB3 descarta los códigos sin artículo asociado y la deduplicación por vendor_barcode resuelve la duplicidad de EAN13. Cargada en WMS al 23-07-2026.",
    reglas: [
      {
        negocio: "Tomar solo artículos del set corporativo definido para la operación.",
        tecnica: "Filtro base sobre PS_AJ_MASTER_ITEM: SETID IN ('COR01')."
      },
      {
        negocio: "Incluir solo artículos con unidad de medida Paquete (PQ).",
        tecnica:
          "CTE principal: PS_AJ_BU_ITEM_UOM con AJ_STD_UOM_WMS = 'Y' y UNIT_OF_MEASURE = 'PQ'. CTE segundaria: PS_AJ_INVUOM_WMS con AJ_UOM_WMS = 'Y' y UNIT_OF_MEASURE = 'PQ'."
      },
      {
        negocio: "Resolver la unidad priorizando la definición estándar de negocio.",
        tecnica:
          "uom = COALESCE(principal.UNIT_OF_MEASURE, segundaria.UNIT_OF_MEASURE); primero la definición de PS_AJ_BU_ITEM_UOM y como respaldo la habilitación WMS.",
        nueva: true
      },
      {
        negocio: "Generar un registro por cada tipo de código de barras del artículo.",
        tecnica:
          "STACK(2) para desdoblar en dos filas: EAN13 (AJ_EAN13) y UPC13 (AJ_UPC13), conservando el tipo en barcode_type. No se aplica algoritmo de dígito de chequeo."
      },
      {
        negocio: "Publicar solo códigos válidos y no vacíos.",
        tecnica:
          "Filtros: UNIT_OF_MEASURE IS NOT NULL, vendor_barcode IS NOT NULL, vendor_barcode <> '0' y TRIM(vendor_barcode) <> ''."
      },
      {
        negocio: "Resolver la duplicidad de EAN13 conservando un único artículo.",
        tecnica:
          "ROW_NUMBER particionado por vendor_barcode y ordenado por INV_ITEM_ID; se conserva unico = 1, es decir el artículo menor cuando un mismo código aplica a varios.",
        nueva: true
      },
      {
        negocio: "Evitar carga de códigos Barcode sin artículo asociado en PB3.",
        tecnica:
          "LEFT JOIN lkp_item_pb3 por barcode = INV_ITEM_ID y filtro final barcode_val IS NOT NULL: solo se publican los códigos cuyo artículo existe en el universo PB3.",
        nueva: true
      },
      {
        negocio: "Clasificar el registro como creación o actualización frente a PB3.",
        tecnica:
          "action_code = 'UPDATE' cuando el artículo ya existe en lkp_item_pb3; 'CREATE' en caso contrario.",
        nueva: true
      },
      {
        negocio: "Mantener estándar de integración para cargue Oracle.",
        tecnica:
          "Campos de salida parametrizados: company_code = 'DARNEL', item_barcode = INV_ITEM_ID, uom desde la unidad resuelta; qty_per_uom y associated_pack_case_qty se envían vacíos."
      }
    ],
    tablas: [
      {
        tabla: "PS_AJ_MASTER_ITEM",
        registros: "169.730",
        uso: "Fuente base del barcode (AJ_EAN13, AJ_UPC13) e identificador de artículo."
      },
      {
        tabla: "PS_AJ_BU_ITEM_UOM",
        registros: "4.133",
        uso: "Definición primaria de UOM para negocio con criterio AJ_STD_UOM_WMS."
      },
      {
        tabla: "PS_AJ_INVUOM_WMS",
        registros: "247.054",
        uso: "Definición secundaria de UOM habilitada para WMS (fallback con COALESCE)."
      },
      {
        tabla: "lkp_item_pb3",
        registros: "Pendiente conteo",
        uso: "Universo de artículos PB3 para validar existencia y determinar CREATE/UPDATE.",
        nueva: true
      }
    ]
  },
  locations: {
    titulo: "Locations",
    destinoBrief: "Ubicaciones",
    pb2: 24410,
    pb3: 24503,
    estadoCargue: "cargado",
    resumen:
      "La plantilla PB3 contiene 24.503 ubicaciones validadas, tras aplicar 21 reglas de negocio (15 nuevas para PB3). El cargue a WMS fue satisfactorio: 24.303 de 24.304 registros enviados (99,99%).",
    reglas: [
      {
        negocio: "Limpiar el identificador de ubicación antes de cualquier cálculo.",
        tecnica:
          "CTE cleaned: REGEXP_REPLACE sobre location_id y short_location_id eliminando espacios y caracteres NBSP ('[\\s\\u00A0]+').",
        nueva: true
      },
      {
        negocio: "Clasificar cada ubicación según reglas logísticas de operación.",
        tecnica:
          "CASE de type con 8 condiciones: M con prefijo 'R:' o Q → R; P o E → A; D u O con PUERTA/MUELLE/DOOR sin '-C' ni '-S' → D; O o S que no inicien en PUERTA → P; S con PUERTA/MUELLE y '-C' → S; R → Y; A con short_location_id → R; I o M → R. Si no cumple ninguna conserva el type original."
      },
      {
        negocio: "Abreviar los nombres de área que superan la longitud permitida.",
        tecnica:
          "Cuando el location_id no tiene ':' se reemplaza MUELLE por ML, ESTA por STG y PUERTA por PTA; en caso contrario area = SPLIT(location_id, ':')[0].",
        nueva: true
      },
      {
        negocio: "Construir la estructura física y jerárquica de la ubicación.",
        tecnica:
          "aisle = short_location_id o '1'; bay = SPLIT[1] o '1'; level = SPLIT[2] si inicia en N o W, si no SPLIT[3], o '1' cuando no hay segmentación."
      },
      {
        negocio: "Separar posición y bin en las ubicaciones de picking.",
        tecnica:
          "Si type = 'P' y SPLIT[4] inicia en 'P': position toma el primer carácter y bin el resto de la cadena. En las demás ubicaciones position = SPLIT[4] y bin queda vacío.",
        nueva: true
      },
      {
        negocio: "Determinar el tipo de tamaño de ubicación con criterios de almacenamiento.",
        tecnica:
          "CASE de locn_size_type: R → vacío; TANQ1 sin short_location_id → PATIO; type P → FORWARDPICK; LAM1/PLASTIC1/PERFILERIA → CANTILIEVER; TERMO1 o área ESTA% → PISO; nivel N1 → ESTANTERIA1; nivel distinto de N1 → ESTANTERIA."
      },
      {
        negocio: "Traer un único registro de forward pick por ubicación.",
        tecnica:
          "LEFT JOIN a dbo.t_fwd_pick_bse deduplicado con ROW_NUMBER particionado por location_id y ordenado por item_number (val1 = 1), para min_units, max_units e item_alternate_code.",
        nueva: true
      },
      {
        negocio: "Definir regla de convivencia de SKUs por ubicación.",
        tecnica: "allow_multi_sku = FALSE cuando l.type = 'I', en otro caso TRUE."
      },
      {
        negocio: "Permitir surtido parcial en las ubicaciones de tipo Reserva (R).",
        tecnica:
          "Soporte PB3 (semana 24-28 ago): allow_reserve_partial_pick_flg = true para las ubicaciones cuyo type resultante es Reserva (R).",
        nueva: true
      },
      {
        negocio: "Marcar la puerta en las ubicaciones de consolidación.",
        tecnica:
          "Soporte PB3 (semana 24-28 ago): cust_field_4 = \"PUERTA\" para las ubicaciones de tipo consolidación.",
        nueva: true
      },
      {
        negocio: "Marcar la zona de reabastecimiento en las ubicaciones de picking.",
        tecnica:
          "replenishment_zone_code = 'REABASTO' cuando el type de origen es 'P' o 'E'; vacío en el resto.",
        nueva: true
      },
      {
        negocio: "Bloquear las ubicaciones que no deben recibir asignación automática.",
        tecnica:
          "location_lock_code = 'LLEVAR_A_PUERTA' para O o S que no inicien en PUERTA; 'NO_ASIGNABLE' para M con prefijo 'R:' o type Q; vacío en el resto.",
        nueva: true
      },
      {
        negocio: "Identificar el origen de no conformidad en las ubicaciones de reempaque.",
        tecnica:
          "cust_field_1 = origen_no_conformidad desde ubicaciones_reempaque, cruzando id_bodega contra wh_id e id_ubicacion contra location_id (Álamos y Madrid).",
        nueva: true
      },
      {
        negocio: "Validar que el artículo asignado a la ubicación exista en el universo PB3.",
        tecnica:
          "LEFT JOIN lkp_item_pb3 por item_number del forward pick; el campo part_a_pb3 permite detectar ubicaciones con artículo inexistente en PB3.",
        nueva: true
      },
      {
        negocio: "Estandarizar la unidad de volumen de la ubicación.",
        tecnica: "volume_uom_code fijo en 'MT3'; min_volume en '0' y max_volume desde capacity_volume.",
        nueva: true
      },
      {
        negocio: "Excluir los tipos de ubicación fuera del alcance.",
        tecnica:
          "WHERE type NOT IN ('F','Y','T') y se descartan las ubicaciones type 'A' sin short_location_id.",
        nueva: true
      },
      {
        negocio: "Excluir las puertas y muelles marcados como salida.",
        tecnica:
          "Se descartan los location_id que contienen PUERTA o MUELLE junto con el sufijo '-S'.",
        nueva: true
      },
      {
        negocio: "Excluir ubicaciones fuera del alcance operativo para Oracle.",
        tecnica:
          "Solo bodegas 01 y 05; se descartan los prefijos ES-, ESTIBA, TRANS y Clasificacion, más una lista explícita de 15 ubicaciones erróneas o no usadas (incluye Zona Wip y AUDITORIA-P)."
      },
      {
        negocio: "Generar aisle, bay, level y position en las ubicaciones de tipo WIP.",
        tecnica:
          "Alcance en la lógica de segmentación de aisle, bay, level y position para las ubicaciones de tipo WIP (semana 10-14 ago).",
        nueva: true
      },
      {
        negocio: "Generar las columnas task_zone_code y putaway_seq por lógica.",
        tecnica:
          "task_zone_code y putaway_seq pasan de enviarse en blanco a generarse por lógica definida con negocio (semana 10-14 ago).",
        nueva: true
      },
      {
        negocio: "Mantener layout estandarizado de salida para cargue Oracle.",
        tecnica:
          "Selección de columnas objetivo con placeholders ('') en los campos aún no informados por el origen."
      }
    ],
    tablas: [
      {
        tabla: "dbo.t_location",
        registros: "76.951 (resultado actual)",
        uso: "Fuente principal de ubicaciones, dimensiones, clasificación y facility."
      },
      {
        tabla: "dbo.t_fwd_pick_bse",
        registros: "2.350",
        uso: "Atributos de forward pick: mínimos y máximos de reposición y artículo por ubicación."
      },
      {
        tabla: "ubicaciones_reempaque",
        registros: "Pendiente conteo",
        uso: "Relación de bodega, ubicación y origen de no conformidad para cust_field_1.",
        nueva: true
      },
      {
        tabla: "lkp_item_pb3",
        registros: "Pendiente conteo",
        uso: "Universo de artículos PB3 para validar el item asignado a la ubicación.",
        nueva: true
      }
    ]
  }
};

function App() {
  const [tabActiva, setTabActiva] = useState("general");
  const tabs = [
    { id: "general", label: "General" },
    { id: "transversales", label: "Transversales" },
    { id: "metodologia", label: "Metodología" },
    { id: "brief", label: "Brief PB3" },
    { id: "items", label: "Items" },
    { id: "barcode", label: "Barcode" },
    { id: "locations", label: "Locations" }
  ];
  const nf = (valor) => valor.toLocaleString("es-CO");
  const totalFuentes = briefFuentes.reduce((acc, f) => acc + f.registros, 0);
  const maxFuente = Math.max(...briefFuentes.map((f) => f.registros));
  const totalSalidaPb3 = briefSalida.reduce((acc, s) => acc + s.pb3, 0);
  const totalSalidaPb2 = briefSalida.reduce((acc, s) => acc + s.pb2, 0);
  const maxSalida = Math.max(...briefSalida.map((s) => s.pb3));
  const totalReglas = briefSalida.reduce((acc, s) => acc + s.reglas, 0);
  const totalReglasNuevas = briefSalida.reduce((acc, s) => acc + s.reglasNuevas, 0);
  const tasaConversion = (totalSalidaPb3 / totalFuentes) * 100;
  const plantillasCargadas = briefSalida.filter((s) => s.estadoCargue === "cargado").length;
  const detalle = entidadDetalle[tabActiva];
  // KPIs de la entidad activa, derivados del mismo origen que el Brief
  const fuentesEntidad = detalle
    ? briefFuentes.filter((f) => f.destino.includes(detalle.destinoBrief))
    : [];
  const origenEntidad = fuentesEntidad.reduce((acc, f) => acc + f.registros, 0);
  const deltaEntidad = detalle ? detalle.pb3 - detalle.pb2 : 0;
  const deltaPctEntidad = detalle ? (deltaEntidad / detalle.pb2) * 100 : 0;
  const reglasNuevasEntidad = detalle ? detalle.reglas.filter((r) => r.nueva).length : 0;
  const bloquesFlujo = [frameworkCarga.slice(0, 5), frameworkCarga.slice(5, 10)];
  const hitosJunioJulio = hitosClave.filter(
    (hito) =>
      hito.fecha.includes("Jun") ||
      hito.fecha.includes("Jul") ||
      hito.fecha.includes("Ago")
  );

  return (
    <main className="layout">
      <header className="hero">
        <p className="pill">Fase actual: Playbook 3 (SIT)</p>
        <h1>Infografía de avance - Frente de Datos</h1>
        <p className="subtitle">
          Contexto inicial: ya se realizaron sesiones de entendimiento de
          plantillas (paso a paso por tabla y columna) y se negoció acceso a
          Microsoft Fabric con workspace dedicado para procesamiento.
        </p>
      </header>

      <nav className="tabs card">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`tab-btn ${tabActiva === tab.id ? "active" : ""}`}
            onClick={() => setTabActiva(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {tabActiva === "general" && (
        <>
          <section className="card">
            <h2>Cronograma de hitos clave</h2>
            <div className="flow">
              {hitosJunioJulio.map((hito) => (
                <a
                  className="flow-item"
                  href={hito.anchor ? `#${hito.anchor}` : undefined}
                  key={hito.fecha + hito.titulo}
                >
                  <span className="flow-date">{hito.fecha}</span>
                  <h3>{hito.titulo}</h3>
                  <p>{hito.detalle}</p>
                </a>
              ))}
            </div>
          </section>

          <section className="grid">
            <details className="card week-card">
              <summary>
                <h2>WMS - Avances semana 23-27 de marzo</h2>
              </summary>
              <div className="task-list">
                {semana23a27Marzo.map((item) => (
                  <div className="task-item" key={item.texto}>
                    <p>{item.texto}</p>
                    <span className={`tag ${item.estado}`}>{estadoLabel[item.estado]}</span>
                  </div>
                ))}
              </div>
              <div className="subcard">
                <h3>Tablas ingeridas a OneLake bronce</h3>
                <div className="table-wrap">
                  <div>
                    <p className="mini-title">PEOPLESOFT</p>
                    <table>
                      <thead>
                        <tr>
                          <th>Tabla</th>
                          <th>Registros</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tablasIngeridas.peoplesoft.map((tabla) => (
                          <tr key={tabla.nombre}>
                            <td>{tabla.nombre}</td>
                            <td>{tabla.registros.toLocaleString("es-CO")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <p className="mini-title">WMS</p>
                    <table>
                      <thead>
                        <tr>
                          <th>Tabla</th>
                          <th>Registros</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tablasIngeridas.wms.map((tabla) => (
                          <tr key={tabla.nombre}>
                            <td>{tabla.nombre}</td>
                            <td>{tabla.registros.toLocaleString("es-CO")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </details>
            <details className="card week-card">
              <summary>
                <h2>WMS - Avances semana 30 de marzo-01 de abril</h2>
              </summary>
              <div className="task-list">
                {semana30Marzoa01Abril.map((item) => (
                  <div className="task-item" key={item.texto}>
                    <p>{item.texto}</p>
                    <span className={`tag ${item.estado}`}>{estadoLabel[item.estado]}</span>
                  </div>
                ))}
              </div>
            </details>
          </section>

          <details className="card week-card">
            <summary>
              <h2>WMS - Avances semana 6-10 de abril</h2>
            </summary>
            <div className="task-list">
              {semana6a10Abril.map((item) => (
                <div className="task-item" key={item.texto}>
                  <p>{item.texto}</p>
                  <span className={`tag ${item.estado}`}>{estadoLabel[item.estado]}</span>
                </div>
              ))}
            </div>
          </details>

          <details className="card week-card">
            <summary>
              <h2>WMS - Avances semana 13-17 de abril</h2>
            </summary>
            <div className="task-list">
              {semana13a17Abril.map((item) => (
                <div className="task-item" key={item.texto}>
                  <p>{item.texto}</p>
                  <span className={`tag ${item.estado}`}>{estadoLabel[item.estado]}</span>
                </div>
              ))}
            </div>
          </details>

          <details className="card week-card">
            <summary>
              <h2>WMS - Avances semana 20-24 de abril</h2>
            </summary>
            <div className="task-list">
              {semana20a24Abril.map((item) => (
                <div className="task-item" key={item.texto}>
                  <p>{item.texto}</p>
                  <span className={`tag ${item.estado}`}>{estadoLabel[item.estado]}</span>
                </div>
              ))}
            </div>
          </details>

          <details className="card week-card">
            <summary>
              <h2>WMS - Avances semana 27-30 de abril</h2>
            </summary>
            <div className="task-list">
              {semana27a30Abril.map((item) => (
                <div className="task-item" key={item.texto}>
                  <p>{item.texto}</p>
                  <span className={`tag ${item.estado}`}>{estadoLabel[item.estado]}</span>
                </div>
              ))}
            </div>
          </details>

          <details className="card week-card">
            <summary>
              <h2>WMS - Avances semana 4-8 de mayo</h2>
            </summary>
            <div className="task-list">
              {primeraSemanaMayo.map((item) => (
                <div className="task-item" key={item.texto}>
                  <p>{item.texto}</p>
                  <span className={`tag ${item.estado}`}>{estadoLabel[item.estado]}</span>
                </div>
              ))}
            </div>
          </details>

          <details className="card week-card" id="semana-11-15-mayo">
            <summary>
              <h2>WMS - Avances semana 11-15 de mayo</h2>
            </summary>
            <div className="task-list">
              {semana11a15Mayo.map((item) => (
                <div className="task-item" key={item.texto}>
                  <p>{item.texto}</p>
                  <span className={`tag ${item.estado}`}>{estadoLabel[item.estado]}</span>
                </div>
              ))}
            </div>
          </details>

          <details className="card week-card" id="semana-18-22-mayo">
            <summary>
              <h2>WMS - Avances semana 18-22 de mayo</h2>
            </summary>
            <div className="task-list">
              {semana18a22Mayo.map((item) => (
                <div className="task-item" key={item.texto}>
                  <p>{item.texto}</p>
                  <span className={`tag ${item.estado}`}>{estadoLabel[item.estado]}</span>
                </div>
              ))}
            </div>
          </details>

          {semana25a29Mayo.length > 0 && (
            <details className="card week-card" id="semana-25-29-mayo">
              <summary>
                <h2>WMS - Avances semana 25-29 de mayo</h2>
              </summary>
              <div className="task-list">
                {semana25a29Mayo.map((item) => (
                  <div className="task-item" key={item.texto}>
                    <p>{item.texto}</p>
                    <span className={`tag ${item.estado}`}>{estadoLabel[item.estado]}</span>
                  </div>
                ))}
              </div>
            </details>
          )}

          <details className="card week-card" id="semana-01-05-junio">
            <summary>
              <h2>WMS - Avances semana 1-5 de junio</h2>
            </summary>
            <div className="task-list">
              {semana01a05Junio.map((item) => (
                <div className="task-item" key={item.texto}>
                  <p>{item.texto}</p>
                  <span className={`tag ${item.estado}`}>{estadoLabel[item.estado]}</span>
                </div>
              ))}
            </div>
          </details>

          <details className="card week-card" id="semana-05-11-junio">
            <summary>
              <h2>WMS - Avances semana 5-11 de junio</h2>
            </summary>
            <div className="task-list">
              {semana05a11Junio.map((item) => (
                <div className="task-item" key={item.texto}>
                  <p>{item.texto}</p>
                  <span className={`tag ${item.estado}`}>{estadoLabel[item.estado]}</span>
                </div>
              ))}
            </div>
          </details>

          <details className="card week-card" id="semana-15-18-junio">
            <summary>
              <h2>ERP/SCM - WMS PB2 - Integraciones semana 15-18 de junio</h2>
            </summary>
            <div className="task-list">
              {semana15a18Junio.map((item) => (
                <div className="task-item" key={item.texto}>
                  <p>{item.texto}</p>
                  <span className={`tag ${item.estado}`}>{estadoLabel[item.estado]}</span>
                </div>
              ))}
            </div>
          </details>

          <details className="card week-card" id="semana-22-26-junio">
            <summary>
              <h2>ERP/SCM - WMS PB2 - Integraciones semana 22-26 de junio</h2>
            </summary>
            <div className="task-list">
              {semana22a26Junio.map((item) => (
                <div className="task-item" key={item.texto}>
                  <p>{item.texto}</p>
                  <span className={`tag ${item.estado}`}>{estadoLabel[item.estado]}</span>
                </div>
              ))}
            </div>
          </details>

          <details className="card week-card" id="semana-30-junio-03-julio">
            <summary>
              <h2>WMS PB3 - Avances y pendientes semana 30 de junio al 3 de julio</h2>
            </summary>
            <div className="task-list">
              {semana30Junioa03Julio.map((item) => (
                <div className="task-item" key={item.texto}>
                  <p>{item.texto}</p>
                  <span className={`tag ${item.estado}`}>{estadoLabel[item.estado]}</span>
                </div>
              ))}
            </div>
          </details>

          <details className="card week-card" id="semana-06-10-julio">
            <summary>
              <h2>WMS PB3 - Avances y pendientes semana 6 al 10 de julio</h2>
            </summary>
            <div className="task-list">
              {semana06a10Julio.map((item) => (
                <div className="task-item" key={item.texto}>
                  <p>{item.texto}</p>
                  <span className={`tag ${item.estado}`}>{estadoLabel[item.estado]}</span>
                </div>
              ))}
            </div>
          </details>

          <details className="card week-card" id="semana-13-17-julio">
            <summary>
              <h2>WMS PB3 - Avances y pendientes semana 13 al 17 de julio</h2>
            </summary>
            <div className="task-list">
              {semana13a17Julio.map((item) => (
                <div className="task-item" key={item.texto}>
                  <p>{item.texto}</p>
                  <span className={`tag ${item.estado}`}>{estadoLabel[item.estado]}</span>
                </div>
              ))}
            </div>
          </details>

          <details className="card week-card" id="semana-21-24-julio">
            <summary>
              <h2>WMS - ERP - Avances semana 21 al 24 de julio</h2>
            </summary>
            <div className="task-list">
              {semana21a24Julio.map((item) => (
                <div className="task-item" key={item.texto}>
                  <p>{item.texto}</p>
                  <span className={`tag ${item.estado}`}>{estadoLabel[item.estado]}</span>
                </div>
              ))}
            </div>
          </details>

          <details className="card week-card" id="semana-27-31-julio">
            <summary>
              <h2>Reportes - Maestros WMS - Avances semana 27 al 31 de julio</h2>
            </summary>
            <div className="task-list">
              {semana27a31Julio.map((item) => (
                <div className="task-item" key={item.texto}>
                  <p>{item.texto}</p>
                  <span className={`tag ${item.estado}`}>{estadoLabel[item.estado]}</span>
                </div>
              ))}
            </div>
          </details>

          <details className="card week-card" id="semana-03-06-agosto">
            <summary>
              <h2>Maestros WMS - Avances semana 3 al 6 de agosto</h2>
            </summary>
            <div className="task-list">
              {semana03a06Agosto.map((item) => (
                <div className="task-item" key={item.texto}>
                  <p>{item.texto}</p>
                  <span className={`tag ${item.estado}`}>{estadoLabel[item.estado]}</span>
                </div>
              ))}
            </div>
          </details>

          <details className="card week-card" id="semana-10-14-agosto">
            <summary>
              <h2>Maestros WMS - ERP - Avances semana 10 al 14 de agosto</h2>
            </summary>
            <div className="task-list">
              {semana10a14Agosto.map((item) => (
                <div className="task-item" key={item.texto}>
                  <p>{item.texto}</p>
                  <span className={`tag ${item.estado}`}>{estadoLabel[item.estado]}</span>
                </div>
              ))}
            </div>
          </details>

          <details className="card week-card" id="semana-18-21-agosto">
            <summary>
              <h2>Maestros WMS - Reportes - Avances semana 18 al 21 de agosto</h2>
            </summary>
            <div className="task-list">
              {semana18a21Agosto.map((item) => (
                <div className="task-item" key={item.texto}>
                  <p>{item.texto}</p>
                  <span className={`tag ${item.estado}`}>{estadoLabel[item.estado]}</span>
                </div>
              ))}
            </div>
          </details>

          <details className="card week-card" id="semana-24-28-agosto" open>
            <summary>
              <h2>Cargue WMS - Documentación - Avances semana 24 al 28 de agosto</h2>
            </summary>
            <div className="task-list">
              {semana24a28Agosto.map((item) => (
                <div className="task-item" key={item.texto}>
                  <p>{item.texto}</p>
                  <span className={`tag ${item.estado}`}>{estadoLabel[item.estado]}</span>
                </div>
              ))}
            </div>
          </details>

          <section className="card">
            <h2>Resultado de cantidades (corte 23-04-2026)</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Entidad</th>
                    <th>Universo</th>
                    <th>Enviados a Oracle</th>
                    <th>Nota</th>
                  </tr>
                </thead>
                <tbody>
                  {resultadoCantidadesAbr23.map((fila) => (
                    <tr key={fila.entidad}>
                      <td>{fila.entidad}</td>
                      <td>{fila.universo}</td>
                      <td>{fila.enviados}</td>
                      <td>{fila.nota}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="card">
            <h2>Comparativo de cantidades en plantillas</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Plantilla</th>
                    <th>Universo</th>
                    <th>Resultado</th>
                    <th>Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {comparativoPlantillas.map((fila) => (
                    <tr key={fila.plantilla}>
                      <td>{fila.plantilla}</td>
                      <td>{fila.universo}</td>
                      <td>{fila.resultado}</td>
                      <td>{fila.detalle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="grid">
            <article className="card">
              <h2>Temas validados con funcional</h2>
              <div className="task-list">
                {temasValidados.map((item) => (
                  <div className="task-item" key={item}>
                    <p>{item}</p>
                    <span className="tag completado">{estadoLabel.completado}</span>
                  </div>
                ))}
              </div>
            </article>
            <article className="card">
              <h2>Faltantes</h2>
              <div className="task-list">
                {faltantes.map((item) => (
                  <div className="task-item" key={item}>
                    <p>{item}</p>
                    <span className="tag pendiente">{estadoLabel.pendiente}</span>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="card">
            <h2>Plan por entidad (roadmap incremental)</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Entidad</th>
                    <th>Estado actual</th>
                    <th>Siguiente paso</th>
                  </tr>
                </thead>
                <tbody>
                  {planEntidades.map((fila) => (
                    <tr key={fila.entidad}>
                      <td>{fila.entidad}</td>
                      <td>{fila.estado}</td>
                      <td>{fila.siguiente}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {mostrarArquitecturaToBe && (
            <section className="card">
              <h2>Arquitectura de referencia (objetivo)</h2>
              <div className="architecture-board">
                <p className="lane-title">Flujo principal de ingesta (alcance TO-BE)</p>
                <div className="arch-row solid">
                  <article className="arch-node source">
                    <h3>PeopleSoft</h3>
                    <small>Origen maestro</small>
                  </article>
                  <div className="arrow">→</div>
                  <article className="arch-node source">
                    <h3>WMS actual</h3>
                    <small>Origen operativo</small>
                  </article>
                  <div className="arrow">→</div>
                  <article className="arch-node option">
                    <h3>APIs Oracle</h3>
                    <small>Exposición de datos de salida</small>
                  </article>
                  <div className="arrow">→</div>
                  <article className="arch-node option">
                    <h3>OCI Scheduler + CSV</h3>
                    <small>Generación de N archivos por lote calendarizable</small>
                  </article>
                  <div className="arrow">→</div>
                  <article className="arch-node infra">
                    <h3>Gateway + Conexión Fabric</h3>
                    <small>Canal de entrada orquestado</small>
                  </article>
                  <div className="arrow">→</div>
                  <article className="arch-node process">
                    <h3>Pipeline de ingesta</h3>
                    <small>Copy Data + ForEach (tablas actuales)</small>
                  </article>
                  <div className="arrow">→</div>
                  <article className="arch-node bronze">
                    <h3>Lakehouse Bronze</h3>
                    <small>Carga inicial + deltas</small>
                  </article>
                  <div className="arrow">→</div>
                  <article className="arch-node silver">
                    <h3>Lakehouse Silver</h3>
                    <small>Filtrado y calidad</small>
                  </article>
                  <div className="arrow">→</div>
                  <article className="arch-node gold">
                    <h3>Lakehouse Gold</h3>
                    <small>Estructura de negocio + remediación</small>
                  </article>
                </div>
              </div>
            </section>
          )}

        </>
      )}

      {tabActiva === "transversales" && (
        <>
          <section className="card">
            <h2>Elementos transversales</h2>
            <div className="task-list">
              {elementosTransversales.map((item) => (
                <div className="task-item" key={item}>
                  <p>{item}</p>
                  <span className="tag pendiente">Transversal</span>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h2>Lecciones aprendidas</h2>
            <div className="task-list">
              {leccionesAprendidas.map((item) => (
                <div className="task-item" key={item}>
                  <p>{item}</p>
                  <span className="tag completado">Clave</span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {tabActiva === "metodologia" && (
        <>
          <section className="card method-hero">
            <div>
              <p className="method-eyebrow">Modelo de gobierno de carga</p>
              <h2>Metodología de ejecución, validación y cierre</h2>
              <p>
                Esta metodología define cómo se gobiernan las cargas de datos: quién define,
                quién construye, quién valida, quién aprueba y qué evidencia habilita el avance
                entre fases. El objetivo es avanzar por readiness, no solo por calendario.
              </p>
            </div>
            <div className="method-chip-row">
              <span>5 fases</span>
              <span>10 pasos</span>
              <span>4 actores</span>
              <span>Accountable por paso</span>
            </div>
          </section>

          <section className="card">
            <h2>Flujo de ejecución por fases</h2>
            <div className="method-flow-board">
              {methodologyPhases.map((fase) => {
                const pasosFase = frameworkCarga.filter((paso) => paso.fase === fase.nombre);
                return (
                  <article className={`method-lane ${fase.color}`} key={fase.nombre}>
                    <div className="method-lane-head">
                      <span>{fase.rango}</span>
                      <h3>{fase.nombre}</h3>
                      <p>{fase.objetivo}</p>
                    </div>
                    <div className="method-lane-steps">
                      {pasosFase.map((paso) => (
                        <div className={`method-step ${paso.decision ? "gate" : ""}`} key={paso.paso}>
                          <span className="method-step-num">{String(paso.paso).padStart(2, "0")}</span>
                          <strong>{paso.titulo}</strong>
                          <small>A: {paso.aprobador}</small>
                          {paso.decision && <em>Gate</em>}
                        </div>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="card">
            <h2>Gates, evidencia y criterio de salida</h2>
            <div className="gate-grid">
              {frameworkCarga
                .filter((paso) => paso.decision || paso.fase === "Aprobar" || paso.fase === "Ejecutar")
                .map((paso) => (
                  <article className="gate-card" key={`gate-${paso.paso}`}>
                    <div className="gate-card-head">
                      <span>Gate {paso.paso}</span>
                      <strong>{paso.titulo}</strong>
                    </div>
                    <p>
                      <b>Accountable:</b> {paso.aprobador}
                    </p>
                    <p>
                      <b>Evidencia:</b> {paso.entregable}
                    </p>
                    <p>
                      <b>Criterio:</b> {paso.criterio}
                    </p>
                  </article>
                ))}
            </div>
          </section>

          <section className="card">
            <h2>Trazabilidad de datos en Fabric</h2>
            <p className="section-note">
              El patrón de WMS PB3 deja una base reutilizable para ERP Oracle Fusion PB1:
              Darnel define la fuente y la regla de negocio, Oracle define el formato objetivo
              y Azurian estandariza el dato en arquitectura medallion para futuras unidades o locaciones.
            </p>
            <div className="medallion-flow">
              {medallionTrace.map((item) => (
                <article className="medallion-card" key={item.capa}>
                  <span>{item.capa}</span>
                  <strong>{item.objetivo}</strong>
                  <p>{item.detalle}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="method-grid-2">
            <article className="card">
              <h2>Accountability por rol</h2>
              <div className="role-card-grid">
                {actoresRaci.map((actor) => {
                  const aprobaciones = frameworkCarga
                    .filter((paso) => getRolPasoActor(paso, actor) === "A")
                    .map((paso) => paso.paso);
                  const responsabilidades = frameworkCarga
                    .filter((paso) => parseActores(paso.responsable).includes(actor))
                    .map((paso) => paso.paso);
                  return (
                    <div className="role-card" key={actor}>
                      <h3>{actor}</h3>
                      <p className="role-mandate">{roleMandates[actor]}</p>
                      <p>
                        <span className="raci-chip a">A</span>
                        {aprobaciones.length ? ` Aprueba pasos ${aprobaciones.join(", ")}` : " Sin aprobación directa"}
                      </p>
                      <p>
                        <span className="raci-chip r">R</span>
                        {responsabilidades.length
                          ? ` Ejecuta pasos ${responsabilidades.join(", ")}`
                          : " Sin ejecución directa"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </article>

            <article className="card">
              <h2>Control PMO</h2>
              <div className="control-list">
                {methodologyControls.map((control) => (
                  <div className="control-item" key={control.titulo}>
                    <strong>{control.titulo}</strong>
                    <p>{control.detalle}</p>
                  </div>
                ))}
              </div>
              <div className="cadence-list">
                {cadenciaGobiernoPB3.map((item) => (
                  <div className="cadence-item" key={item.cadencia}>
                    <span>{item.ventana}</span>
                    <strong>{item.cadencia}</strong>
                    <p>{item.regla}</p>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="card">
            <h2>Matriz RACI extendida</h2>
            <div className="raci-matrix compact">
              <div className="table-wrap raci-wrap">
                <table className="raci-table">
                  <thead>
                    <tr>
                      <th>Paso</th>
                      <th>Actividad</th>
                      {actoresRaci.map((actor) => (
                        <th key={`head-${actor}`}>
                          {actor}
                          <small>{responsablesRaci[actor]}</small>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {frameworkCarga.map((item) => (
                      <tr key={`raci-${item.paso}`}>
                        <td>{item.paso}</td>
                        <td>{item.titulo}</td>
                        {actoresRaci.map((actor) => {
                          const rol = getRolPasoActor(item, actor);
                          return (
                            <td key={`cell-${item.paso}-${actor}`}>
                              {rol ? (
                                <span className={`raci-chip ${rol.toLowerCase()}`}>{rol}</span>
                              ) : (
                                <span className="raci-chip empty">-</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="raci-legend">
                <span>
                  <i className="dot a" /> A · Accountable
                </span>
                <span>
                  <i className="dot r" /> R · Responsable
                </span>
                <span>
                  <i className="dot c" /> C · Consultado
                </span>
                <span>
                  <i className="dot i" /> I · Informado
                </span>
              </div>
            </div>
          </section>

          <section className="timeline-section">
            <article className="card gantt-card">
              <h2>Responsables, entregables y fechas clave · PB3</h2>
              <p className="section-note">
                Los gates tienen un accountable único para evitar ambigüedad. Cuando un hito depende de
                sizing, layout, reglas funcionales o carga Oracle, se controla con evidencia verificable
                y decisión explícita de avance, corrección o aceptación de riesgo.
              </p>
              <div className="critical-gates">
                {gatesCriticosPB3.map((gate) => (
                  <div className="critical-gate" key={gate.fecha + gate.hito}>
                    <span>{gate.fecha}</span>
                    <strong>{gate.hito}</strong>
                    <p>
                      <b>A:</b> {gate.accountable}
                    </p>
                    <p>{gate.evidencia}</p>
                  </div>
                ))}
              </div>
              <h3 className="subsection-title">Bloqueantes PB2 que condicionan readiness PB3</h3>
              <div className="blocker-grid">
                {bloqueantesReadinessPB3.map((item) => (
                  <div className="blocker-card" key={item.item}>
                    <span>{item.fecha}</span>
                    <strong>{item.item}</strong>
                    <p>
                      <b>Dueño:</b> {item.owner}
                    </p>
                    <p>{item.criterio}</p>
                  </div>
                ))}
              </div>
              <h3 className="subsection-title">Resumen por equipo</h3>
              <div className="owner-deadline-grid">
                {equipoFechasClavePB3.map((item) => (
                  <div className="owner-deadline-card" key={item.equipo}>
                    <div>
                      <span>{item.fechas}</span>
                      <h3>{item.equipo}</h3>
                    </div>
                    <p>{item.foco}</p>
                    <p>
                      <b>Entregable:</b> {item.entrega}
                    </p>
                    <p>
                      <b>Gate:</b> {item.gate}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="card gantt-card">
              <h2>Cierre WMS · PB3</h2>
              <p className="section-note">
                Playback 3 inicia el 2 de julio de 2026. Para esa fecha deben estar incorporados los cambios
                de PB2 y alistados los últimos datos PB3 de Items, Barcode y Locations. La aceptación
                funcional se concentra entre el 21 y 24 de agosto de 2026; el plan macro conserva margen hasta
                el 31 de agosto de 2026 para estabilización y cierre administrativo.
              </p>
              <div className="gantt-table">
                <div className="gantt-head">
                  <span>Frente</span>
                  <span>Dueño</span>
                  <span>Tarea</span>
                  <span>Ventana</span>
                  <span>Tipo</span>
                </div>
                {ganttWmsPB3.map((item) => (
                  <div className={`gantt-row ${item.type}`} key={item.task}>
                    <span className="gantt-lane">{item.lane}</span>
                    <span className="gantt-owner">{item.owner}</span>
                    <div>
                      <strong>{item.task}</strong>
                      <p>{item.note}</p>
                    </div>
                    <span>{item.span}</span>
                    <span className={`gantt-state ${item.type}`}>{item.tipo}</span>
                  </div>
                ))}
              </div>
            </article>

            <details className="card week-card gantt-card compact-method-card">
              <summary>
                <h2>Inicio ERP Oracle Fusion · PB1 (en proceso de construcción)</h2>
              </summary>
              <div className="timeline-track">
                {timelineErpFusionPB1.map((item) => (
                  <div className="timeline-item" key={item.fase}>
                    <span>{item.estado}</span>
                    <strong>{item.fase}</strong>
                    <small>Responsable: {item.responsable}</small>
                    <p>{item.tareas}</p>
                  </div>
                ))}
              </div>
            </details>
          </section>
        </>
      )}

      {tabActiva === "brief" && (
        <>
          <section className="card brief-hero">
            <p className="method-eyebrow">Cargue WMS · PB3 — SIT</p>
            <h2>Definición de datos WMS: reglas vs integraciones</h2>
            <p>
              Punto de partida para el plan 360 de pruebas en PB3 y su posterior
              ejecución en UAT. Consolida el estado real de las tres plantillas de
              carga, las reglas de negocio aplicadas y la cobertura de integraciones.
            </p>
            <p className="brief-corte">Corte: {briefCorte}</p>
          </section>

          <section className="card">
            <h2>Indicadores del cargue</h2>
            <div className="entity-kpis">
              <article className="kpi-card">
                <small>Tablas fuente</small>
                <strong>{briefFuentes.length}</strong>
                <span className="kpi-foot">+ {briefLookups.length} de lookup no contabilizadas</span>
              </article>
              <article className="kpi-card">
                <small>Registros en origen</small>
                <strong>{nf(totalFuentes)}</strong>
                <span className="kpi-foot">Suma de las {briefFuentes.length} tablas fuente</span>
              </article>
              <article className="kpi-card">
                <small>Registros de salida</small>
                <strong>{nf(totalSalidaPb3)}</strong>
                <span className="kpi-foot">{briefSalida.length} plantillas de carga</span>
              </article>
              <article className="kpi-card">
                <small>Tasa de conversión</small>
                <strong>{tasaConversion.toFixed(2)}%</strong>
                <span className="kpi-foot">Origen depurado hasta plantilla final</span>
              </article>
              <article className="kpi-card">
                <small>Reglas de negocio</small>
                <strong>{totalReglas}</strong>
                <span className="kpi-foot">{totalReglasNuevas} nuevas o redefinidas en PB3</span>
              </article>
              <article className="kpi-card">
                <small>Integraciones Oracle</small>
                <strong>{briefIntegraciones.total}</strong>
                <span className="kpi-foot">
                  {briefIntegraciones.entregadas} entregada · {briefIntegraciones.pendientesValidacion} por validar
                </span>
              </article>
            </div>
          </section>

          <section className="card">
            <h2>Estado de cargue a WMS</h2>
            <p className="entity-summary">
              A cierre del {briefCorte}, {plantillasCargadas} de {briefSalida.length} plantillas
              fueron cargadas exitosamente a WMS.
            </p>
            <div className="load-grid">
              {briefSalida.map((fila) => (
                <article
                  className={`load-card ${fila.estadoCargue}`}
                  key={`load-${fila.plantilla}`}
                >
                  <div className="load-card-head">
                    <span className="load-icon">{fila.estadoCargue === "cargado" ? "✓" : "!"}</span>
                    <h3>{fila.plantilla}</h3>
                  </div>
                  <strong className="load-qty">{nf(fila.pb3)}</strong>
                  <span className={`tag ${fila.estadoCargue === "cargado" ? "completado" : "pendiente"}`}>
                    {fila.estadoCargue === "cargado" ? "Cargado en WMS" : "Pendiente de cargue"}
                  </span>
                </article>
              ))}
            </div>
            <div className="brief-callout">
              <span>Bloqueo</span>
              <p>{briefCargueNota}</p>
            </div>
          </section>

          <section className="card">
            <h2>Del origen a la plantilla</h2>
            <p className="entity-summary">
              De {nf(totalFuentes)} registros en las tablas fuente se publican {nf(totalSalidaPb3)} a
              las plantillas de carga: el {tasaConversion.toFixed(2)}% del volumen original.
            </p>
            <div className="funnel">
              <div className="funnel-step">
                <div className="funnel-bar origen" style={{ width: "100%" }}>
                  <span>{nf(totalFuentes)}</span>
                </div>
                <small>Registros en las {briefFuentes.length} tablas fuente</small>
              </div>
              <div className="funnel-step">
                <div
                  className="funnel-bar salida"
                  style={{ width: `${Math.max(tasaConversion, 1.5)}%` }}
                >
                  <span>{nf(totalSalidaPb3)}</span>
                </div>
                <small>
                  Registros publicados tras exclusiones, deduplicación, integridad referencial y
                  normalización
                </small>
              </div>
            </div>
          </section>

          <section className="card">
            <h2>Volumetría de tablas fuente</h2>
            <div className="table-wrap">
              <table className="brief-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tabla fuente</th>
                    <th>Registros</th>
                    <th>Peso relativo</th>
                    <th>Plantilla destino</th>
                  </tr>
                </thead>
                <tbody>
                  {briefFuentes.map((fila, indice) => (
                    <tr key={fila.tabla}>
                      <td>{indice + 1}</td>
                      <td className="mono">{fila.tabla}</td>
                      <td className="num">{nf(fila.registros)}</td>
                      <td>
                        <div className="bar-track">
                          <div
                            className="bar-fill"
                            style={{ width: `${(fila.registros / maxFuente) * 100}%` }}
                          />
                        </div>
                      </td>
                      <td>
                        {fila.destino.map((destino) => (
                          <span className={`dest-chip ${destino.toLowerCase()}`} key={destino}>
                            {destino}
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                  <tr className="total-row">
                    <td />
                    <td>TOTAL</td>
                    <td className="num">{nf(totalFuentes)}</td>
                    <td colSpan={2} />
                  </tr>
                </tbody>
              </table>
            </div>
            <h3 className="subsection-title">Tablas de control y referencia (no contabilizadas)</h3>
            <div className="grid">
              {briefLookups.map((fila) => (
                <article className="subcard" key={fila.tabla}>
                  <h3 className="mono">{fila.tabla}</h3>
                  <p>{fila.uso}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="card">
            <h2>Plantillas de salida y comparativo con PB2</h2>
            <div className="table-wrap">
              <table className="brief-table">
                <thead>
                  <tr>
                    <th>Plantilla</th>
                    <th>PB2</th>
                    <th>PB3</th>
                    <th>Variación</th>
                    <th>Volumen PB3</th>
                    <th>Fuentes</th>
                    <th>Reglas</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {briefSalida.map((fila) => {
                    const delta = fila.pb3 - fila.pb2;
                    const pct = (delta / fila.pb2) * 100;
                    return (
                      <tr key={`out-${fila.plantilla}`}>
                        <td><strong>{fila.plantilla}</strong></td>
                        <td className="num">{nf(fila.pb2)}</td>
                        <td className="num">{nf(fila.pb3)}</td>
                        <td className="num">
                          <span className={`delta ${delta >= 0 ? "up" : "down"}`}>
                            {delta >= 0 ? "+" : ""}
                            {nf(delta)} ({pct >= 0 ? "+" : ""}
                            {pct.toFixed(2)}%)
                          </span>
                        </td>
                        <td>
                          <div className="bar-track">
                            <div
                              className="bar-fill salida"
                              style={{ width: `${(fila.pb3 / maxSalida) * 100}%` }}
                            />
                          </div>
                        </td>
                        <td className="num">{fila.fuentes}</td>
                        <td className="num">
                          {fila.reglas} <small className="reglas-nuevas">({fila.reglasNuevas} nuevas)</small>
                        </td>
                        <td>
                          <span
                            className={`tag ${fila.estadoCargue === "cargado" ? "completado" : "pendiente"}`}
                          >
                            {fila.estadoCargue === "cargado" ? "Cargado" : "Pendiente"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="total-row">
                    <td>TOTAL</td>
                    <td className="num">{nf(totalSalidaPb2)}</td>
                    <td className="num">{nf(totalSalidaPb3)}</td>
                    <td className="num">
                      <span className="delta up">
                        +{nf(totalSalidaPb3 - totalSalidaPb2)} (+
                        {(((totalSalidaPb3 - totalSalidaPb2) / totalSalidaPb2) * 100).toFixed(2)}%)
                      </span>
                    </td>
                    <td />
                    <td className="num">{briefFuentes.length}</td>
                    <td className="num">{totalReglas}</td>
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="card">
            <h2>Reglas de negocio aplicadas</h2>
            <p className="entity-summary">
              {totalReglas} reglas documentadas sobre las tres plantillas, de las cuales{" "}
              {totalReglasNuevas} ({((totalReglasNuevas / totalReglas) * 100).toFixed(0)}%) son
              nuevas o fueron redefinidas para PB3.
            </p>
            <div className="rules-chart">
              {briefSalida.map((fila) => (
                <div className="rules-row" key={`rules-${fila.plantilla}`}>
                  <span className="rules-label">{fila.plantilla}</span>
                  <div className="rules-track">
                    <div
                      className="rules-seg nuevas"
                      style={{ width: `${(fila.reglasNuevas / totalReglas) * 100 * 1.6}%` }}
                      title={`${fila.reglasNuevas} nuevas en PB3`}
                    >
                      {fila.reglasNuevas}
                    </div>
                    <div
                      className="rules-seg heredadas"
                      style={{
                        width: `${((fila.reglas - fila.reglasNuevas) / totalReglas) * 100 * 1.6}%`
                      }}
                      title={`${fila.reglas - fila.reglasNuevas} heredadas de PB1/PB2`}
                    >
                      {fila.reglas - fila.reglasNuevas}
                    </div>
                  </div>
                  <span className="rules-total">{fila.reglas}</span>
                </div>
              ))}
            </div>
            <div className="rules-legend">
              <span><i className="swatch nuevas" /> Nuevas o redefinidas en PB3</span>
              <span><i className="swatch heredadas" /> Heredadas de PB1/PB2</span>
            </div>
          </section>

          <section className="card">
            <h2>Cobertura de integraciones</h2>
            <p className="entity-summary">
              {briefIntegraciones.total} integraciones desarrolladas por Oracle. Solo la INT 13/19/32
              ha sido solicitada y entregada por el frente de datos; las demás quedan pendientes de
              validación y priorización.
            </p>
            <div className="grid">
              <article className="subcard">
                <h3>Por flujo</h3>
                {briefIntegraciones.flujos.map((fila) => (
                  <div className="mini-bar-row" key={fila.nombre}>
                    <span>{fila.nombre}</span>
                    <div className="mini-bar-track">
                      <div
                        className={`mini-bar-fill ${fila.tono}`}
                        style={{ width: `${(fila.cantidad / briefIntegraciones.total) * 100}%` }}
                      />
                    </div>
                    <strong>{fila.cantidad}</strong>
                  </div>
                ))}
              </article>
              <article className="subcard">
                <h3>Por plantilla de datos</h3>
                {briefIntegraciones.plantilla.map((fila) => (
                  <div className="mini-bar-row" key={fila.nombre}>
                    <span>{fila.nombre}</span>
                    <div className="mini-bar-track">
                      <div
                        className={`mini-bar-fill ${fila.tono}`}
                        style={{ width: `${(fila.cantidad / briefIntegraciones.total) * 100}%` }}
                      />
                    </div>
                    <strong>{fila.cantidad}</strong>
                  </div>
                ))}
              </article>
              <article className="subcard">
                <h3>Por datos de muestra</h3>
                {briefIntegraciones.muestra.map((fila) => (
                  <div className="mini-bar-row" key={fila.nombre}>
                    <span>{fila.nombre}</span>
                    <div className="mini-bar-track">
                      <div
                        className={`mini-bar-fill ${fila.tono}`}
                        style={{ width: `${(fila.cantidad / briefIntegraciones.total) * 100}%` }}
                      />
                    </div>
                    <strong>{fila.cantidad}</strong>
                  </div>
                ))}
              </article>
            </div>
            <h3 className="subsection-title">Detalle por integración</h3>
            <div className="table-wrap">
              <table className="brief-table">
                <thead>
                  <tr>
                    <th>INT</th>
                    <th>Integración</th>
                    <th>Flujo</th>
                    <th>Plantilla</th>
                    <th>Muestra</th>
                    <th>Estado frente de datos</th>
                  </tr>
                </thead>
                <tbody>
                  {briefIntegracionesDetalle.map((fila) => (
                    <tr key={fila.nombre}>
                      <td className="mono">{fila.int}</td>
                      <td>{fila.nombre}</td>
                      <td className="nowrap">{fila.flujo}</td>
                      <td>
                        <span className={`pill-state ${fila.plantilla}`}>
                          {fila.plantilla === "completa"
                            ? "Completa"
                            : fila.plantilla === "parcial"
                            ? "Parcial"
                            : "Sin diseño"}
                        </span>
                      </td>
                      <td className="center">{fila.muestra ? "Sí" : "—"}</td>
                      <td>
                        <span
                          className={`tag ${
                            fila.estado === "entregado"
                              ? "completado"
                              : fila.estado === "sin"
                              ? "dependencia"
                              : "pendiente"
                          }`}
                        >
                          {fila.estado === "entregado"
                            ? "Entregado"
                            : fila.estado === "sin"
                            ? "Sin alcance"
                            : "Por validar"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="card">
            <h2>Consideraciones generales</h2>
            <div className="task-list">
              {briefConsideraciones.map((texto) => (
                <div className="task-item" key={texto}>
                  <p>{texto}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h2>Bloqueos y riesgos para el plan 360</h2>
            <p className="entity-summary">
              Puntos que deben resolverse o aceptarse como riesgo antes de cerrar el alcance de
              pruebas de PB3 y habilitar UAT.
            </p>
            <div className="blocker-grid">
              {briefBloqueos.map((fila, indice) => (
                <article className="blocker-card" key={fila.titulo}>
                  <span>{indice + 1}</span>
                  <strong>{fila.titulo}</strong>
                  <p className="blocker-impact">{fila.impacto}</p>
                  <p>{fila.detalle}</p>
                </article>
              ))}
            </div>
          </section>
        </>
      )}

      {tabActiva !== "general" && detalle && (
        <>
          <section className="card">
            <h2>Entidad: {detalle.titulo}</h2>
            <div className="entity-kpis">
              <article className="kpi-card">
                <small>Registros en origen</small>
                <strong>{nf(origenEntidad)}</strong>
                <span className="kpi-foot">{fuentesEntidad.length} tablas fuente</span>
              </article>
              <article className="kpi-card">
                <small>Salida PB2</small>
                <strong>{nf(detalle.pb2)}</strong>
                <span className="kpi-foot">Referencia del playbook anterior</span>
              </article>
              <article className="kpi-card">
                <small>Salida PB3</small>
                <strong>{nf(detalle.pb3)}</strong>
                <span className="kpi-foot">
                  <span className={`delta ${deltaEntidad >= 0 ? "up" : "down"}`}>
                    {deltaEntidad >= 0 ? "+" : ""}
                    {nf(deltaEntidad)} ({deltaPctEntidad >= 0 ? "+" : ""}
                    {deltaPctEntidad.toFixed(2)}%)
                  </span>{" "}
                  frente a PB2
                </span>
              </article>
              <article className="kpi-card">
                <small>Reglas de negocio</small>
                <strong>{detalle.reglas.length}</strong>
                <span className="kpi-foot">{reglasNuevasEntidad} nuevas o redefinidas en PB3</span>
              </article>
              <article className="kpi-card">
                <small>Estado de cargue a WMS</small>
                <strong>
                  <span
                    className={`tag ${detalle.estadoCargue === "cargado" ? "completado" : "pendiente"}`}
                  >
                    {detalle.estadoCargue === "cargado" ? "Cargado" : "Pendiente"}
                  </span>
                </strong>
                <span className="kpi-foot">Corte {briefCorte}</span>
              </article>
            </div>
            <p className="entity-summary">{detalle.resumen}</p>
          </section>

          <section className="card">
            <h2>Tablas asociadas</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Tabla</th>
                    <th>Registros</th>
                    <th>Uso en negocio</th>
                  </tr>
                </thead>
                <tbody>
                  {detalle.tablas.map((fila) => (
                    <tr key={fila.tabla} className={fila.nueva ? "rule-new-row" : ""}>
                      <td>
                        {fila.tabla}
                        {fila.nueva && <span className="rule-new-badge">Nueva</span>}
                      </td>
                      <td>{fila.registros}</td>
                      <td>{fila.uso}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="card">
            <h2>Reglas de calidad (Negocio vs Técnica)</h2>
            <div className="table-wrap">
              <table className="rules-table">
                <thead>
                  <tr>
                    <th>Término de negocio</th>
                    <th>Condición técnica</th>
                  </tr>
                </thead>
                  <tbody>
                    {detalle.reglas.map((regla) => (
                    <tr key={regla.negocio} className={regla.nueva ? "rule-new-row" : ""}>
                      <td>
                        {regla.negocio}
                        {regla.nueva && <span className="rule-new-badge">Nueva</span>}
                      </td>
                      <td>{regla.tecnica}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {tabActiva === "items" && (
            <section className="card">
              <h2>Nota de no cargue (2 registros)</h2>
              <div className="task-list">
                {notaNoCargadosItems.map((item) => (
                  <div className="task-item" key={`items-${item.item}`}>
                    <p>
                      <strong>{item.item}</strong>: {item.motivo}
                    </p>
                    <span className="tag pendiente">Excepción</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
}

export default App;
