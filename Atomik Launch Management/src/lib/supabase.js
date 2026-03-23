import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://wuvakmnzhvknaixcwfrn.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_4PzMEeVBqQlIe4iJhvz3Gw_I4UbUsQY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
