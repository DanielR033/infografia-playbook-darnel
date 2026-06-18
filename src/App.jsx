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
    estado: "en-proceso"
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
    estado: "pendiente"
  },
  {
    texto:
      "Pendiente funcional: Oracle requiere que la unidad de medida pack sea igual que la primaria; la actualización se realizó manualmente porque no estaba definida previamente.",
    estado: "pendiente"
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

const estadoLabel = {
  completado: "Completado",
  "en-proceso": "En proceso",
  pendiente: "Pendiente",
  compromiso: "Compromiso",
  programado: "Programado",
  dependencia: "Dependencia"
};

const cargaPorEntidad = [
  {
    entidad: "Items",
    porcentaje: "98.73",
    detalle: "44.820 cargados",
    estado: "partial"
  },
  {
    entidad: "Barcode",
    porcentaje: "83.58",
    detalle: "1.817 cargados",
    estado: "partial"
  },
  {
    entidad: "Locations",
    porcentaje: "0.00",
    detalle: "Pendiente layout",
    estado: "partial"
  }
];

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
    responsable: "Oracle",
    consultado: "Darnel",
    informado: "Azurian"
  },
  {
    paso: 2,
    titulo: "Entendimiento de fuentes de información que consolidan el dato",
    responsable: "Darnel",
    consultado: "-",
    informado: "Oracle, Azurian"
  },
  {
    paso: 3,
    titulo: "Levantamiento de fuente e inclusión en Microsoft Fabric",
    responsable: "Darnel",
    consultado: "Azurian",
    informado: "Oracle"
  },
  {
    paso: 4,
    titulo: "Desarrollo ETL y primer llenado para validación",
    responsable: "Azurian",
    consultado: "Darnel",
    informado: "Oracle"
  },
  {
    paso: 5,
    titulo: "Validación del primer volcado de datos",
    responsable: "Darnel, Oracle",
    consultado: "Azurian",
    informado: "-",
    decision: "Si no aprueba, se refina y retorna al paso 4."
  },
  {
    paso: 6,
    titulo: "Validación de casos de uso",
    responsable: "Darnel Negocio",
    consultado: "Azurian",
    informado: "Oracle",
    decision: "Si no aprueba, retorna al paso 4."
  },
  {
    paso: 7,
    titulo: "Carga de insumo de prueba",
    responsable: "Oracle",
    consultado: "Azurian",
    informado: "Darnel",
    decision: "Si falla, retorna al paso 4."
  },
  {
    paso: 8,
    titulo: "Completitud del porcentaje de información comprometido",
    responsable: "Darnel, Oracle, Azurian",
    consultado: "-",
    informado: "-"
  },
  {
    paso: 9,
    titulo: "Repetición de validaciones",
    responsable: "Darnel, Oracle, Azurian",
    consultado: "-",
    informado: "-"
  },
  {
    paso: 10,
    titulo: "Comité de carga en vivo (mínimo 2 horas)",
    responsable: "Todos los equipos",
    consultado: "-",
    informado: "-",
    decision:
      "Se resuelve, acuerda y corrige en tiempo real hasta carga exitosa o decisión de no cargar casos específicos."
  }
];

const actoresRaci = ["Oracle", "Darnel", "Azurian", "Darnel Negocio", "Todos los equipos"];

function parseActores(valor) {
  if (!valor || valor === "-") return [];
  return valor
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getRolPasoActor(paso, actor) {
  const responsables = parseActores(paso.responsable);
  const consultados = parseActores(paso.consultado);
  const informados = parseActores(paso.informado);

  if (responsables.includes(actor)) return "R";
  if (consultados.includes(actor)) return "C";
  if (informados.includes(actor)) return "I";
  return "";
}

const entidadDetalle = {
  items: {
    titulo: "Items",
    inicial: "61.148 (antes de nuevas definiciones)",
    actual: "44.820 cargados / 98,73%",
    resumen:
      "La carga PB2 de Items alcanzó 44.820 registros. Continúa el análisis de inconsistencias y errores detectados durante la migración.",
    reglas: [
      {
        negocio: "Tomar solo artículos del set corporativo definido para la operación.",
        tecnica: "Filtro base: PS_MASTER_ITEM_TBL.SETID = 'COR01'."
      },
      {
        negocio: "Incluir únicamente artículos con UOM habilitada para WMS.",
        tecnica:
          "Join PS_INV_ITEM_UOM + PS_AJ_INVUOM_WMS con AJ_UOM_WMS = 'Y' y match por SETID/INV_ITEM_ID/UNIT_OF_MEASURE."
      },
      {
        negocio: "Definir unidad primaria por prioridad funcional.",
        tecnica:
          "CASE en PRIMARY_RESOLVED: AJ_BU_ITEM_UOM (AJ_STD_UOM_WMS='Y', BUSINESS_UNIT='AJI03') > AJ_INVUOM_WMS (AJ_STD_UOM_WMS='Y') > UOM_RANKED RN=1 (menor CONVERSION_RATE)."
      },
      {
        negocio: "Definir unidad secundaria garantizando alternativa válida.",
        tecnica:
          "CASE en SECONDARY_RESOLVED: si primaria viene de AJ usa UOM_RANKED RN=1; si no, usa UOM_DISTINCT_RATE RN_RATE=2; fallback a UOM_PRIMARY."
      },
      {
        negocio: "Publicar solo artículos completos para logística.",
        tecnica: "Filtro en Universo: UOM_PRIMARY IS NOT NULL AND UOM_SECONDARY IS NOT NULL."
      },
      {
        negocio: "Normalizar salida para consumo Oracle/WMS.",
        tecnica:
          "Limpieza con REGEXP_REPLACE en descripciones; COALESCE(...,0) para dimensiones/peso/volumen y campos numéricos."
      },
      {
        negocio: "Calcular vida útil y porcentaje mínimo aceptable de recibo.",
        tecnica:
          "product_life = TRY_CAST(VIDA_UTIL_MESES AS DOUBLE)/30; percent_acceptable_product_life = ROUND(MINIMO_PARA_EL_RECIBO_MESES*100/NULLIF(VIDA_UTIL_MESES,0))."
      },
      {
        negocio: "Excluir temporalmente casuística CJ/BL clase Cantidad en primer 20% del cargue.",
        tecnica:
          "Regla funcional de exclusión aplicada en query; depuración en origen a cargo de Ileana Cortina y posterior refresh en Fabric.",
        nueva: true
      },
      {
        negocio: "Evitar duplicidad de artículo por múltiples registros activos.",
        tecnica:
          "Aplicar condición INV_ITEM_ID = PRODUCT_ID para resolver casos con más de un EFF_STATUS='A' en PS_PROD_ITEM.",
        nueva: true
      },
      {
        negocio: "Corregir std_case_qty/std_pack_qty en cero para artículos de una sola UOM.",
        tecnica:
          "Ajuste de llaves con TRIM contra t_item_uom y uso de factor de conversión 1 cuando primary=case=pack.",
        nueva: true
      },
      {
        negocio: "Resolver artículos duplicados por diferencias mínimas de nomenclatura.",
        tecnica:
          "Identificar diferencias por caracteres NBSP y validar cada artículo independiente junto con sus medidas WMS.",
        nueva: true
      },
      {
        negocio: "Permitir cantidades decimales cuando aplique.",
        tecnica:
          "Definir e implementar un nuevo flag para habilitar el envío de valores decimales.",
        nueva: true
      },
      {
        negocio: "Tratar valores de lpns_per_tier superiores a 5 dígitos con UOM GM.",
        tecnica:
          "Aplicar tratamiento específico porque impacta std_case_qty, max_case_qty y primary_uom_code.",
        nueva: true
      },
      {
        negocio: "Activar manejo decimal en campos enteros de Oracle cuando aplique.",
        tecnica:
          "Para std_pack_qty, std_case_qty y max_case_qty con decimales, activar handle_decimal_qty_flg.",
        nueva: true
      },
      {
        negocio: "Alinear regla Oracle de unidad pack igual a la unidad primaria.",
        tecnica:
          "Definición pendiente; la actualización inicial se realizó manualmente por no estar definida previamente.",
        nueva: true
      }
    ],
    tablas: [
      { tabla: "PS_MASTER_ITEM_TBL", registros: "176.980", uso: "Maestro base de artículo y descripción." },
      { tabla: "PS_INV_ITEM_UOM", registros: "347.723", uso: "Unidades, conversión, peso y volumen por artículo." },
      { tabla: "PS_AJ_INVUOM_WMS", registros: "247.054", uso: "Habilitación funcional de UOM para WMS." },
      { tabla: "PS_AJ_BU_ITEM_UOM", registros: "4.133", uso: "Definición de unidad primaria estándar por negocio (AJI03)." },
      { tabla: "PS_AJ_UOMSTOCK_DIM", registros: "226.960", uso: "Dimensiones físicas por UOM." },
      { tabla: "t_item_uom", registros: "381.450", uso: "Factor de conversión por warehouse (01/05)." },
      { tabla: "PS_PROD_ITEM", registros: "112.294", uso: "Relación de producto activo." },
      { tabla: "PS_PROD_ITEM_LNG", registros: "137.004", uso: "Descripción larga en español." },
      { tabla: "vida_util", registros: "Pendiente conteo", uso: "Meses de vida útil y mínimo para recibo." }
    ]
  },
  barcode: {
    titulo: "Barcode",
    inicial: "2.228 (alcance previo)",
    actual: "1.817 cargados / 83,58%",
    resumen:
      "La carga PB2 de Barcode alcanzó 1.817 registros. Se identificaron códigos Barcode que no existen como artículos.",
    reglas: [
      {
        negocio: "Incluir solo artículos con unidad de medida Paquete (PQ).",
        tecnica:
          "CTE principal: AJ_STD_UOM_WMS = 'Y' AND UNIT_OF_MEASURE = 'PQ'. CTE secundaria: AJ_UOM_WMS = 'Y' AND UNIT_OF_MEASURE = 'PQ'."
      },
      {
        negocio: "Usar códigos de barras según definición funcional vigente.",
        tecnica:
          "Generación de salida con STACK(2): EAN13 (AJ_EAN13) y UPC13 (AJ_UPC13). No se aplica algoritmo de dígito de chequeo."
      },
      {
        negocio: "Publicar solo códigos válidos y no vacíos.",
        tecnica:
          "Filtros finales: UNIT_OF_MEASURE IS NOT NULL, vendor_barcode IS NOT NULL, vendor_barcode <> '0' y TRIM(vendor_barcode) <> ''."
      },
      {
        negocio: "Mantener estándar de integración para cargue Oracle.",
        tecnica:
          "Campos de salida parametrizados: company_code='DARNEL', action_code='CREATE', item_barcode=INV_ITEM_ID, uom=UNIT_OF_MEASURE."
      },
      {
        negocio: "Resolver duplicidad de EAN13 entre artículos distintos para esta entrega.",
        tecnica:
          "Tratamiento temporal: excluir uno de los duplicados y enviar el restante; queda pendiente política definitiva de Darnel.",
        nueva: true
      },
      {
        negocio: "Evitar carga de códigos Barcode sin artículo asociado.",
        tecnica:
          "Validar existencia del artículo antes de generar y cargar el registro Barcode.",
        nueva: true
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
      }
    ]
  },
  locations: {
    titulo: "Locations",
    inicial: "76.951 (antes de nuevas exclusiones)",
    actual: "24.410 preparadas / carga pendiente",
    resumen:
      "La plantilla PB2 contiene 24.410 ubicaciones, pero la carga está detenida hasta cerrar la definición del layout de bodega con Alexandra Duarte y Zaid.",
    reglas: [
      {
        negocio: "Excluir ubicaciones de tipo no operativo para la plantilla final.",
        tecnica: "Filtro final: WHERE l.type <> 'F'."
      },
      {
        negocio: "Clasificar cada ubicación según reglas logísticas de operación.",
        tecnica:
          "CASE principal sobre l.type + segmentos de location_id (SPLIT) para derivar tipo objetivo: Q, D, P, S, R."
      },
      {
        negocio: "Construir estructura física y jerárquica de la ubicación para el WMS.",
        tecnica:
          "Segmentación de location_id para area, bay, level, position y bin; uso de short_location_id para aisle."
      },
      {
        negocio: "Determinar tipo de tamaño de ubicación con criterios de almacenamiento.",
        tecnica:
          "CASE de locn_size_type por nivel, pick_area y prefijos de location_id (ESTANTERIA, CANTILIEVER, PATIO, FORWARDPICK, PISO)."
      },
      {
        negocio: "Traer capacidades de replenishment para ubicaciones forward pick.",
        tecnica:
          "LEFT JOIN dbo.t_fwd_pick_bse f ON l.location_id = f.location_id para min_units y max_units."
      },
      {
        negocio: "Definir regla de convivencia de SKUs por ubicación.",
        tecnica: "allow_multi_sku = FALSE cuando l.type='I', en otro caso TRUE."
      },
      {
        negocio: "Mantener layout estandarizado de salida para cargue Oracle.",
        tecnica:
          "Selección de columnas objetivo con placeholders ('') en campos no informados por origen."
      },
      {
        negocio: "Excluir ubicaciones fuera del alcance operativo para Oracle.",
        tecnica:
          "Excluir facility_code distintos de 01/05, ubicaciones de estiba, prefijo TRANS, lista de ubicaciones erróneas/no usadas y zona WIP.",
        nueva: true
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
        uso: "Atributos de forward pick: mínimos y máximos de reposición por ubicación."
      }
    ]
  }
};

function App() {
  const [tabActiva, setTabActiva] = useState("general");
  const tabs = [
    { id: "general", label: "General" },
    { id: "items", label: "Items" },
    { id: "barcode", label: "Barcode" },
    { id: "locations", label: "Locations" }
  ];
  const detalle = entidadDetalle[tabActiva];
  const bloquesFlujo = [frameworkCarga.slice(0, 5), frameworkCarga.slice(5, 10)];

  return (
    <main className="layout">
      <header className="hero">
        <p className="pill">Fase actual: Playbook 2</p>
        <h1>Infografía de avance - Frente de Datos</h1>
        <p className="subtitle">
          Contexto inicial: ya se realizaron sesiones de entendimiento de
          plantillas (paso a paso por tabla y columna) y se negoció acceso a
          Microsoft Fabric con workspace dedicado para procesamiento.
        </p>
        <div className="hero-kpi-grid">
          {cargaPorEntidad.map((kpi) => (
            <article className={`hero-kpi-card ${kpi.estado}`} key={kpi.entidad}>
              <small>{kpi.entidad}</small>
              <strong>{kpi.porcentaje}%</strong>
              <span>{kpi.detalle}</span>
              <i className={`kpi-dot ${kpi.estado}`} aria-hidden="true" />
            </article>
          ))}
        </div>
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
              {hitosClave.map((hito) => (
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

          <details className="card week-card" id="semana-15-18-junio" open>
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

          <section className="card">
            <h2>Elementos transversales (independientes de módulos)</h2>
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

          {!mostrarArquitecturaToBe && (
            <section className="card">
              <h2>Lecciones aprendidas y framework operativo</h2>
              <div className="lessons-box">
                <h3>Lecciones aprendidas</h3>
                <div className="task-list">
                  {leccionesAprendidas.map((item) => (
                    <div className="task-item" key={item}>
                      <p>{item}</p>
                      <span className="tag completado">Clave</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="framework-flow">
                <h3>Diagrama de flujo (step by step)</h3>
                <div className="process-blocks">
                  {bloquesFlujo.map((bloque, bloqueIdx) => (
                    <div className="process-chain" key={`bloque-${bloqueIdx}`}>
                      {bloque.map((item, index) => (
                        <React.Fragment key={`flow-${item.paso}`}>
                          <div className="process-node">
                            <span className="process-num">Paso {item.paso}</span>
                            <p>{item.titulo}</p>
                          </div>
                          {index < bloque.length - 1 && (
                            <div className="process-link" aria-hidden="true">
                              →
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  ))}
                  <div className="process-block-note">
                    Flujo continuo: Paso 1 → ... → Paso 10
                  </div>
                </div>

                <div className="framework-notes">
                  {frameworkCarga
                    .filter((item) => item.decision)
                    .map((item) => (
                      <p className="fw-decision" key={`decision-${item.paso}`}>
                        <strong>Paso {item.paso}:</strong> {item.decision}
                      </p>
                    ))}
                </div>
              </div>

              <div className="raci-matrix">
                <h3>Matriz RACI · Propiedad por actor</h3>
                <div className="table-wrap raci-wrap">
                  <table className="raci-table">
                    <thead>
                      <tr>
                        <th>Paso</th>
                        <th>Actividad</th>
                        {actoresRaci.map((actor) => (
                          <th key={`head-${actor}`}>{actor}</th>
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
          )}
        </>
      )}

      {tabActiva !== "general" && detalle && (
        <>
          <section className="card">
            <h2>Entidad: {detalle.titulo}</h2>
            <div className="entity-kpis">
              <article className="kpi-card">
                <small>Registros iniciales</small>
                <strong>{detalle.inicial}</strong>
              </article>
              <article className="kpi-card">
                <small>Registros actuales</small>
                <strong>{detalle.actual}</strong>
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
                    <tr key={fila.tabla}>
                      <td>{fila.tabla}</td>
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
