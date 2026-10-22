import { createClient } from '@supabase/supabase-js'

// The anon key is public by design (row-level security guards the tables).
// Set NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY to point at another project.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://atgnozvlbifafzxxkvsy.supabase.co'
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0Z25venZsYmlmYWZ6eHhrdnN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAxMzQ3OTEsImV4cCI6MjAyNTcxMDc5MX0.etb6UfJ-yqvuKT-XTuFqrzsRA4HO71mKn5w5VZEjtNU'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
