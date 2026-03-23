import { create } from 'zustand'

const ALLOWED_EMAILS = [
  'aviralxatomik@gmail.com',
  'devansh.atomik@gmail.com',
  'akhilbunny04@gmail.com',
  'devanshrathod.atomik@gmail.com',
  'abdul.hannaan.kirmani@gmail.com',
]

function isEmailAllowed(email) {
  if (!email) return false
  const lower = email.toLowerCase()
  if (lower.endsWith('@atomikgrowth.com')) return true
  return ALLOWED_EMAILS.includes(lower)
}

function loadSession() {
  try {
    const saved = localStorage.getItem('atomik-auth')
    if (saved) return JSON.parse(saved)
  } catch (e) {
    console.error('Failed to load auth:', e)
  }
  return null
}

function saveSession(user) {
  if (user) {
    localStorage.setItem('atomik-auth', JSON.stringify(user))
  } else {
    localStorage.removeItem('atomik-auth')
  }
}

const useAuthStore = create((set) => ({
  user: loadSession(),
  isAuthenticated: !!loadSession(),

  login: (credentialResponse) => {
    try {
      // Decode the JWT token from Google
      const token = credentialResponse.credential
      const payload = JSON.parse(atob(token.split('.')[1]))
      const user = {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        sub: payload.sub,
      }

      if (!isEmailAllowed(user.email)) {
        return { success: false, error: 'unauthorized' }
      }

      saveSession(user)
      set({ user, isAuthenticated: true })
      return { success: true }
    } catch (e) {
      console.error('Login failed:', e)
      return { success: false, error: 'failed' }
    }
  },

  logout: () => {
    saveSession(null)
    set({ user: null, isAuthenticated: false })
  },
}))

export { useAuthStore, isEmailAllowed }
