// ── GET /api/disponibilidad?especialidad=Fisioterapia&fecha=2026-12-01 ──
// Devuelve las horas libres de una especialidad en un día.

import type { APIRoute } from "astro";
import { configCitas } from "../../data/citas";
import { errorDelDia, horasLibres } from "../../lib/fechas";
import { supabase } from "../../lib/supabase";
import { json } from "../../lib/respuesta";

// Esta ruta se ejecuta en el servidor en cada petición (no se genera como página estática)
export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const especialidad = url.searchParams.get("especialidad") ?? "";
  const fecha = url.searchParams.get("fecha") ?? "";

  if (!configCitas.especialidades.includes(especialidad)) {
    return json({ error: "Elige una especialidad válida." }, 400);
  }

  const errorDia = errorDelDia(fecha);
  if (errorDia) {
    return json({ error: errorDia }, 400);
  }

  const { data, error } = await supabase
    .from("citas")
    .select("hora")
    .eq("especialidad", especialidad)
    .eq("fecha", fecha);

  if (error) {
    console.error("Error al consultar la disponibilidad:", error);
    return json({ error: "No hemos podido consultar la disponibilidad. Inténtalo de nuevo." }, 500);
  }

  // Supabase devuelve las horas como "09:00:00": nos quedamos con "09:00"
  const ocupadas = data.map((cita) => String(cita.hora).slice(0, 5));

  return json({ horas: horasLibres(fecha, ocupadas) });
};