import erpCols from "./erpDashCols.json";
import pb1Columnas from "./pb1Columnas.json";

// Cifras verificadas en las extracciones de Fusion DAR DEV1 (Impacto CX).
export const CX_CIFRAS = { articulos: 28932, clientes: 324960, inactivos: 7631 };

// ---------------------------------------------------------------------------
// Entidades donde lo que Oracle CX escribe en Fusion (TCA / Product Hub) se cruza
// con las plantillas de carga del ERP. Lo usan la portada (indicador "Análisis CX")
// y la pestaña Impacto CX (sección de profundización).
//
//   nivel 1 = maestro base (volumen y llaves) · nivel 2 = profundización
//   datos   = true cuando ya hay extracción desde Fusion analizada
//   porque  = por qué esa entidad nos cruza (lista a validar con el funcional de CX)
// Columnas de plantilla: erpDashCols.json. Evidencia PB1: pb1Columnas.json.
// ---------------------------------------------------------------------------
export const CX_CRUCE = [
  {
    ent: "Party (persona / organización)", maestro: "Maestra de Clientes", hojas: ["HZ_IMP_PARTIES_T"], nivel: 1, datos: true, cifra: "clientes",
    porque: "CX crea el party al registrar al cliente; la plantilla de Clientes carga el mismo party. Quien llega primero asigna el PARTY_NUMBER: hay riesgo de duplicado."
  },
  {
    ent: "Ítem", maestro: "Maestra de productos", hojas: ["EGP_SYSTEM_ITEMS_INTERFACE"], nivel: 1, datos: true, cifra: "articulos",
    porque: "CX publica el catálogo que vende; la plantilla de Ítems carga los mismos artículos. El ITEM_NUMBER ya lo fijó CX."
  },
  {
    ent: "Direcciones", maestro: "Maestra de Clientes", hojas: ["HZ_IMP_LOCATIONS_T", "HZ_IMP_PARTYSITES_T"], nivel: 2, datos: false,
    porque: "CX necesita la dirección para cotizar y entregar; ERP la carga para facturar y despachar. Son las mismas direcciones del mismo party: duplicado o versiones distintas."
  },
  {
    ent: "Usos de dirección (facturación / envío)", maestro: "Maestra de Clientes", hojas: ["HZ_IMP_PARTYSITEUSES_T"], nivel: 2, datos: false,
    porque: "Define a dónde se factura y a dónde se despacha. El pedido de CX y la plantilla ERP deben usar el mismo sitio de facturación y de envío."
  },
  {
    ent: "Contactos y medios de contacto", maestro: "Maestra de Clientes", hojas: ["HZ_IMP_CONTACTS_T", "HZ_IMP_CONTACTPTS_T", "HZ_IMP_CONTACTROLES"], nivel: 2, datos: false,
    porque: "CX gestiona las personas de contacto, teléfonos y correos del cliente; ERP los carga para facturación y cobranza."
  },
  {
    ent: "Cuentas de cliente y sus sitios", maestro: "Maestra de Clientes", hojas: ["HZ_IMP_ACCOUNTS_T", "HZ_IMP_ACCTSITES_T", "HZ_IMP_ACCTSITEUSES_T"], nivel: 2, datos: false,
    porque: "ERP factura y cobra contra la cuenta; si los pedidos de CX llegan a ERP, la cuenta debe existir y ser la misma que carga la migración."
  },
  {
    ent: "Relaciones entre parties", maestro: "Maestra de Clientes", hojas: ["HZ_IMP_RELSHIPS_T"], nivel: 2, datos: false,
    porque: "Jerarquías (grupo empresarial, contacto de) que usan ambos sistemas sobre los mismos parties."
  },
  {
    ent: "Categorías del ítem", maestro: "Maestra de productos", hojas: ["EGP_ITEM_CATEGORIES_INTERFACE"], nivel: 2, datos: false,
    porque: "CX clasifica el catálogo para la venta; ERP asigna categorías de inventario, compras y precios a los mismos ítems."
  }
];

const colsHoja = (maestro, hoja) => (erpCols[maestro] || []).filter((r) => r[2] === hoja).length;

// Columnas de PB1 que caen en una hoja ERP (unión CO + PA por nombre de columna).
export function pb1PorHoja(hoja) {
  const def = new Map();
  pb1Columnas.hojas.forEach((h) => h.cols.forEach((c) => {
    if (c.destino !== hoja) return;
    const prev = def.get(c.col) || 0;
    def.set(c.col, Math.max(prev, c.conDatos));
  }));
  return { definidas: def.size, conDatos: [...def.values()].filter((n) => n > 0).length };
}

export function cruceCx() {
  const ent = CX_CRUCE.map((e) => {
    const pb1 = e.hojas.map(pb1PorHoja).reduce((a, b) => ({ definidas: a.definidas + b.definidas, conDatos: a.conDatos + b.conDatos }), { definidas: 0, conDatos: 0 });
    return {
      ...e,
      cols: e.hojas.reduce((s, h) => s + colsHoja(e.maestro, h), 0),
      volumen: e.cifra ? CX_CIFRAS[e.cifra] : null,
      pb1
    };
  });
  const nivel = (n) => {
    const l = ent.filter((e) => e.nivel === n);
    const ok = l.filter((e) => e.datos);
    return { n: ok.length, total: l.length, cols: ok.reduce((s, e) => s + e.cols, 0), colsTot: l.reduce((s, e) => s + e.cols, 0) };
  };
  return { ent, n1: nivel(1), n2: nivel(2) };
}
