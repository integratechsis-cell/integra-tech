import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

// WARNING: This client uses the Service Role Key which has admin privileges.
// In a production environment, this should only be used in a secure backend (Edge Functions, Node.js server).
// For this local prototype/admin panel, we use it directly but exercise caution.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});
