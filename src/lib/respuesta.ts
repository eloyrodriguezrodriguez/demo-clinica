// ── Respuestas JSON para los endpoints ──

export function json(datos: unknown, estado = 200) {
  return new Response(JSON.stringify(datos), {
    status: estado,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}