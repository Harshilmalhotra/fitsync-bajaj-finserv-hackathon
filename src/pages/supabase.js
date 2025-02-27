import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://upjtdyweyzwijxuqfafk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwanRkeXdleXp3aWp4dXFmYWZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NTQ3MjMsImV4cCI6MjA1NjIzMDcyM30.vc54ef7x65xHjaJ3GcfXRvqylVM_UAbJcLVF8jaAdGA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
