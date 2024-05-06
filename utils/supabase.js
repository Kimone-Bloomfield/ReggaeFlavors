import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://atgnozvlbifafzxxkvsy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0Z25venZsYmlmYWZ6eHhrdnN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAxMzQ3OTEsImV4cCI6MjAyNTcxMDc5MX0.etb6UfJ-yqvuKT-XTuFqrzsRA4HO71mKn5w5VZEjtNU';
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;