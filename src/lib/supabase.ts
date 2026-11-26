// ── Cliente de Supabase SOLO para el servidor ──
// Usa la clave secreta: nunca importes este archivo desde un componente de React
// ni desde nada que se ejecute en el navegador.

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } }
);