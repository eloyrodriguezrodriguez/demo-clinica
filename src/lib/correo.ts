// ── Envío de correos con Brevo (solo servidor) ──

import { configCitas } from "../data/citas";

/** Evita que lo que escribe el usuario se interprete como HTML dentro del correo */
export function escapar(texto: string) {
  const sustituciones: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return texto.replace(/[&<>"']/g, (c) => sustituciones[c]);
}

interface Correo {
  para: string;
  nombre: string;
  asunto: string;
  html: string;
}

export async function enviarCorreo({ para, nombre, asunto, html }: Correo) {
  const respuesta = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": import.meta.env.BREVO_API_KEY,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: configCitas.nombreClinica, email: import.meta.env.EMAIL_REMITENTE },
      to: [{ email: para, name: nombre }],
      subject: asunto,
      htmlContent: html,
    }),
  });

  if (!respuesta.ok) {
    throw new Error(`Brevo respondió ${respuesta.status}: ${await respuesta.text()}`);
  }
}