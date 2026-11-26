// ── POST /api/citas ──
// Valida los datos, guarda la cita en Supabase y envía los correos con Brevo.

import type { APIRoute } from "astro";
import { configCitas } from "../../data/citas";
import { errorDelDia, horasLibres, fechaLegible } from "../../lib/fechas";
import { supabase } from "../../lib/supabase";
import { enviarCorreo, escapar } from "../../lib/correo";
import { json } from "../../lib/respuesta";

export const prerender = false;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEFONO = /^\+?[\d\s-]{9,15}$/;

export const POST: APIRoute = async ({ request }) => {
  // 1. Leer los datos
  let datos: Record<string, unknown>;
  try {
    datos = await request.json();
  } catch {
    return json({ error: "No hemos podido leer los datos del formulario." }, 400);
  }
  if (!datos || typeof datos !== "object") {
    return json({ error: "No hemos podido leer los datos del formulario." }, 400);
  }

  const texto = (campo: string) => String(datos[campo] ?? "").trim();
  const especialidad = texto("especialidad");
  const fecha = texto("fecha");
  const hora = texto("hora");
  const nombre = texto("nombre");
  const email = texto("email").toLowerCase();
  const telefono = texto("telefono");
  const consentimiento = datos.consentimiento === true;

  // 2. Campo trampa: los humanos no lo ven; si viene relleno, es un bot.
  //    Respondemos como si todo fuera bien para no darle pistas.
  if (texto("web")) {
    return json({ ok: true }, 201);
  }

  // 3. Validar (nunca te fíes de lo que llega del navegador)
  if (!configCitas.especialidades.includes(especialidad)) {
    return json({ error: "Elige una especialidad válida." }, 400);
  }
  const errorDia = errorDelDia(fecha);
  if (errorDia) return json({ error: errorDia }, 400);

  if (!horasLibres(fecha, []).includes(hora)) {
    return json({ error: "Esa hora no está disponible. Elige otra." }, 400);
  }
  if (nombre.length < 2 || nombre.length > 80) {
    return json({ error: "Escribe tu nombre y apellidos." }, 400);
  }
  if (!EMAIL.test(email)) {
    return json({ error: "Revisa tu correo electrónico." }, 400);
  }
  if (!TELEFONO.test(telefono)) {
    return json({ error: "Revisa tu número de teléfono." }, 400);
  }
  if (!consentimiento) {
    return json({ error: "Necesitamos tu consentimiento para gestionar la cita." }, 400);
  }

  // 4. Guardar la cita
  const { error } = await supabase
    .from("citas")
    .insert({ especialidad, fecha, hora, nombre, email, telefono, consentimiento });

  if (error) {
    // 23505 = la regla "unique" de la tabla: otra persona ha reservado esa hora justo antes
    if (error.code === "23505") {
      return json({ error: "Esa hora se acaba de reservar. Elige otra, por favor." }, 409);
    }
    console.error("Error al guardar la cita:", error);
    return json({ error: "No hemos podido guardar tu cita. Inténtalo de nuevo." }, 500);
  }

  // 5. Enviar los correos. Si fallan, la cita ya está guardada: no se lo contamos como error al paciente.
  const dia = fechaLegible(fecha);
  const n = escapar(nombre);

  try {
    await Promise.all([
      enviarCorreo({
        para: email,
        nombre,
        asunto: `Tu cita de ${especialidad} está confirmada`,
        html: `
          <p>Hola, ${n}:</p>
          <p>Tu cita de <strong>${escapar(especialidad)}</strong> está confirmada para el
          <strong>${dia} a las ${hora}</strong>.</p>
          <p>Si necesitas cambiarla o cancelarla, responde a este correo o llámanos.</p>
          <p>Un saludo,<br />${configCitas.nombreClinica}</p>`,
      }),
      enviarCorreo({
        para: import.meta.env.EMAIL_CLINICA,
        nombre: configCitas.nombreClinica,
        asunto: `Nueva cita: ${especialidad} · ${dia} ${hora}`,
        html: `
          <p><strong>Nueva cita reservada desde la web</strong></p>
          <p>${escapar(especialidad)} · ${dia} a las ${hora}</p>
          <p>${n}<br />${escapar(email)}<br />${escapar(telefono)}</p>`,
      }),
    ]);
  } catch (errorCorreo) {
    console.error("La cita se guardó, pero falló el envío de correos:", errorCorreo);
  }

  return json({ ok: true }, 201);
};