// ── Utilidades de fechas para las citas ──
// Las fechas viajan como texto "AAAA-MM-DD" y las horas como "HH:MM".
// Siempre se calculan con la hora de Madrid: el servidor puede estar en otro país.

import { configCitas } from "../data/citas";

/** Fecha y hora actuales en Madrid, como { fecha: "2026-11-26", hora: "14:02" } */
export function ahoraEnMadrid() {
  const texto = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date());

  const [fecha, hora] = texto.split(" ");
  return { fecha, hora };
}

export function esFechaValida(fecha: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(fecha) && !Number.isNaN(Date.parse(`${fecha}T12:00:00Z`));
}

export function sumarDias(fecha: string, dias: number) {
  const d = new Date(`${fecha}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + dias);
  return d.toISOString().slice(0, 10);
}

export function diaDeLaSemana(fecha: string) {
  return new Date(`${fecha}T12:00:00Z`).getUTCDay();
}

/** Devuelve un mensaje de error si no se puede reservar ese día, o null si es válido */
export function errorDelDia(fecha: string): string | null {
  if (!esFechaValida(fecha)) return "La fecha no es válida.";

  const { fecha: hoy } = ahoraEnMadrid();
  if (fecha < hoy) return "Esa fecha ya ha pasado.";
  if (fecha > sumarDias(hoy, configCitas.diasAntelacionMax)) {
    return `Solo se puede reservar con ${configCitas.diasAntelacionMax} días de antelación como máximo.`;
  }
  if (!configCitas.diasLaborables.includes(diaDeLaSemana(fecha))) {
    return "Ese día la clínica está cerrada. Elige un día de lunes a viernes.";
  }
  return null;
}

/** Horas libres de un día: las del horario, menos las ocupadas y menos las que ya han pasado hoy */
export function horasLibres(fecha: string, ocupadas: string[]) {
  const { fecha: hoy, hora: ahora } = ahoraEnMadrid();
  return configCitas.horas.filter(
    (hora) => !ocupadas.includes(hora) && (fecha !== hoy || hora > ahora)
  );
}

/** "jueves, 26 de noviembre" */
export function fechaLegible(fecha: string) {
  return new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(`${fecha}T12:00:00Z`));
}