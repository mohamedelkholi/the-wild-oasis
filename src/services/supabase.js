import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://neldsjmzfzamofgbjozs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lbGRzam16ZnphbW9mZ2Jqb3pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3ODEzMzEsImV4cCI6MjA1MjM1NzMzMX0.4Xj9OMNpQVYmvmshz1bazAZR_vInX5v-NSOlkhhOqss";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
