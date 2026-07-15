import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase env vars. Check .env.local");
}

// Create once per browser tab (avoid multiple GoTrueClient instances)
let supabaseSingleton;

export const supabase =
    supabaseSingleton ??
    (supabaseSingleton = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
        },
    }));