// src/utils/supabase.ts
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

// Validación de las variables de entorno
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  throw new Error("Faltan las variables de entorno SUPABASE_URL o SUPABASE_ANON_KEY");
}
console.log(process.env.SUPABASE_URL )
console.log(process.env.SUPABASE_ANON_KEY )
// Creamos el cliente de Supabase con tipado
export const supabase: SupabaseClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);


