/* =========================================================
   DATOS DEL KÍNDER
   Teléfono, WhatsApp, precios y calendario escolar.
   Es el único archivo que hay que editar para actualizar datos.
   Precio: número, o null para mostrar "Por confirmar".
   Calendario: k = sin (no hay clases) | vac (vacaciones) | aviso
   ========================================================= */
const KINDER = {
  telefono: "4626241262",
  telefonoTexto: "462 624 1262",
  whatsapp: "524622548646",
  whatsappTexto: "462 254 8646",
  mensajeWhatsapp: "Hola, me gustaría recibir informes y agendar una visita al kínder.",
  facebook: "",                    // enlace a la página (PENDIENTE)
  lat: 20.684469, lng: -101.352722,
  // Precio: escribe el número o deja null para mostrar "Por confirmar"
  inscripcion: [
    { concepto: "Inscripción", detalle: "Pago anual", precio: 3500 },
    { concepto: "Material", detalle: "Pago anual", precio: 1600 },
    { concepto: "Seguro de gastos médicos", detalle: "Pago anual", precio: 400 }
  ],
  mensual: [
    { concepto: "Colegiatura", detalle: "Solo 10 meses", precio: 2800 },
    { concepto: "Transporte completo", detalle: "Opcional, no incluido. Ida y regreso, 10 meses", precio: 2300 },
    { concepto: "Medio transporte", detalle: "Opcional, no incluido. Solo ida o solo regreso, 10 meses", precio: 1350 }
  ]
};

/* Calendario. tipo: sin | vac | aviso */
const EVENTOS = [
  { d:"2026-08-31", t:"Inicio del ciclo escolar", k:"aviso" },
  { d:"2026-09-16", t:"Día de la Independencia", k:"sin" },
  { d:"2026-09-25", t:"Consejo Técnico Escolar", k:"sin" },
  { d:"2026-10-30", t:"Consejo Técnico Escolar", k:"sin" },
  { d:"2026-11-02", t:"Día de Muertos", k:"sin" },
  { d:"2026-11-16", t:"Día de la Revolución", k:"sin" },
  { d:"2026-11-23", e:"2026-11-26", t:"Entrega de boletas oficiales", k:"aviso" },
  { d:"2026-11-27", t:"Consejo Técnico Escolar", k:"sin" },
  { d:"2026-12-21", e:"2027-01-06", t:"Vacaciones de invierno", k:"vac" },
  { d:"2027-01-07", t:"Regreso a clases", k:"aviso" },
  { d:"2027-01-29", t:"Consejo Técnico Escolar", k:"sin" },
  { d:"2027-02-01", t:"Día de la Constitución", k:"sin" },
  { d:"2027-02-26", t:"Consejo Técnico Escolar", k:"sin" },
  { d:"2027-03-15", t:"Natalicio de Benito Juárez", k:"sin" },
  { d:"2027-03-16", e:"2027-03-19", t:"Entrega de boletas oficiales", k:"aviso" },
  { d:"2027-03-22", e:"2027-04-02", t:"Vacaciones de Semana Santa", k:"vac" },
  { d:"2027-04-05", t:"Regreso a clases", k:"aviso" },
  { d:"2027-04-30", t:"Consejo Técnico Escolar", k:"sin" },
  { d:"2027-05-05", t:"Batalla de Puebla", k:"sin" },
  { d:"2027-05-15", t:"Último día de inscripciones ciclo 2027-2028", k:"aviso" },
  { d:"2027-05-28", t:"Consejo Técnico Escolar", k:"sin" },
  { d:"2027-06-25", t:"Consejo Técnico Escolar", k:"sin" },
  { d:"2027-07-06", e:"2027-07-08", t:"Entrega de boletas oficiales", k:"aviso" },
  { d:"2027-07-09", t:"Fin del ciclo escolar", k:"aviso" }
];
