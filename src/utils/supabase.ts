import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-project-id')) {
  console.warn(
    'Supabase credentials are not configured. Please create a .env.local file at the root of your project with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
  )
}

// Custom storage driver that dynamically switches between localStorage (persistent) 
// and sessionStorage (temporary) based on the "Remember Me" setting.
const customStorage = {
  getItem: (key: string): string | null => {
    const localVal = localStorage.getItem(key)
    if (localVal) return localVal
    return sessionStorage.getItem(key)
  },
  setItem: (key: string, value: string): void => {
    const rememberMe = localStorage.getItem('rpstories_remember_me') === 'true'
    if (rememberMe) {
      localStorage.setItem(key, value)
      sessionStorage.removeItem(key)
    } else {
      sessionStorage.setItem(key, value)
      localStorage.removeItem(key)
    }
  },
  removeItem: (key: string): void => {
    localStorage.removeItem(key)
    sessionStorage.removeItem(key)
  }
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      storage: customStorage,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
)
