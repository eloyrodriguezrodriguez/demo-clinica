// ── Configuración de las citas ──
// Va en un archivo aparte de negocio.ts porque también lo usan los endpoints del servidor,
// y así el servidor no tiene que cargar las fotos ni el resto de contenidos de la web.

export const configCitas = {
  nombreClinica: "Clínica Vitalia",

  especialidades: ["Medicina general", "Fisioterapia", "Nutrición"],

  // Días que abre la clínica: 1 = lunes … 5 = viernes (0 = domingo, 6 = sábado)
  diasLaborables: [1, 2, 3, 4, 5],

  // Horas en las que se puede reservar (mismo horario para todas las especialidades)
  horas: [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00",
  ],

  // Hasta cuántos días en el futuro se puede reservar
  diasAntelacionMax: 30,
};