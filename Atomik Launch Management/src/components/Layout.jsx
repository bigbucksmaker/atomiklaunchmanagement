import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Sun, Moon, LogOut, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { GoogleLogin } from '@react-oauth/google'
import { useAuthStore } from '../store/auth'

const CALENDLY_URL = 'https://calendly.com/d/5cr-qm2-f2h/atomik-growth-intro-call'

export default function Layout({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('atomik-theme') || 'dark')
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, login, logout } = useAuthStore()
  const [avatarOpen, setAvatarOpen] = useState(false)
  const avatarRef = useRef(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.body.setAttribute('data-theme', theme)
    localStorage.setItem('atomik-theme', theme)
  }, [theme])

  useEffect(() => {
    function handleClick(e) {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) setAvatarOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleLogin = (credentialResponse) => {
    const result = login(credentialResponse)
    if (result.success) {
      navigate('/dashboard')
    } else {
      navigate('/auth/error')
    }
  }

  const handleLogout = () => {
    logout()
    setAvatarOpen(false)
    navigate('/')
  }

  const isPublicPage = location.pathname === '/' || location.pathname === '/auth/error'

  const dashboardNavItems = [
    { path: '/dashboard', label: 'Dashboard' },
  ]

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <nav
        className="sticky top-0 z-40 px-6 py-3 flex items-center justify-between"
        style={{
          background: isPublicPage ? 'transparent' : 'var(--bg-secondary)',
          borderBottom: isPublicPage ? 'none' : '1px solid var(--border-color)',
          backdropFilter: 'blur(12px)',
          position: isPublicPage ? 'fixed' : 'sticky',
          left: 0, right: 0,
        }}
      >
        {/* Left — Logo */}
        <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-3 no-underline">
          <img
            src={theme === 'dark'
              ? 'https://www.atomikgrowth.com/atomik-icon-white.png'
              : 'https://www.atomikgrowth.com/atomik-icon-black.png'
            }
            alt="Atomik"
            className="w-7 h-7 object-contain"
          />
          <span
            className="text-lg font-semibold"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
          >
            Atomik Growth
          </span>
        </Link>

        {/* Center — Dashboard nav (logged in only) */}
        {isAuthenticated && !isPublicPage && (
          <div
            className="flex items-center rounded-full p-1 gap-1"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            {dashboardNavItems.map(item => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider no-underline transition-colors duration-200"
                  style={{
                    color: isActive ? 'var(--bg-primary)' : 'var(--text-secondary)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'var(--gold-base)' }}
                      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              )
            })}
          </div>
        )}

        {/* Right */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {/* Theme toggle */}
              <button
                onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full border-none cursor-pointer transition-all duration-200"
                style={{ background: 'var(--bg-tertiary)', color: 'var(--gold-base)' }}
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* User avatar + dropdown */}
              <div ref={avatarRef} className="relative">
                <button
                  onClick={() => setAvatarOpen(!avatarOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-full border-none cursor-pointer transition-all duration-200"
                  style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                >
                  {user?.picture ? (
                    <img src={user.picture} alt="" className="w-6 h-6 rounded-full" />
                  ) : (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                      style={{ background: 'var(--gold-base)', color: 'var(--bg-primary)' }}
                    >
                      {user?.name?.[0] || '?'}
                    </div>
                  )}
                  <ChevronDown size={12} style={{ color: 'var(--text-muted)' }} />
                </button>

                {avatarOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 rounded-xl p-2 min-w-[180px]"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      boxShadow: 'var(--shadow)',
                    }}
                  >
                    <div className="px-3 py-2 mb-1" style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <div className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{user?.name}</div>
                      <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{user?.email}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs border-none cursor-pointer text-left transition-colors duration-150"
                      style={{ background: 'transparent', color: 'var(--danger)' }}
                    >
                      <LogOut size={12} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Book a Call */}
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.15em] no-underline transition-all duration-200"
                style={{
                  background: 'var(--gold-base)',
                  color: 'var(--bg-primary)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Book A Call
              </a>

              {/* Login */}
              {import.meta.env.VITE_GOOGLE_CLIENT_ID && <div className="relative">
                <GoogleLogin
                  onSuccess={handleLogin}
                  onError={() => navigate('/auth/error')}
                  type="standard"
                  shape="pill"
                  text="signin"
                  size="medium"
                  theme={theme === 'dark' ? 'filled_black' : 'outline'}
                />
              </div>}
              {!import.meta.env.VITE_GOOGLE_CLIENT_ID && (
                <button
                  onClick={() => alert('Google OAuth not configured. Set VITE_GOOGLE_CLIENT_ID environment variable.')}
                  className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.15em] border cursor-pointer transition-all duration-200"
                  style={{
                    background: 'transparent',
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-color)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Login
                </button>
              )}
            </>
          )}
        </div>
      </nav>

      {isPublicPage ? (
        children
      ) : (
        <main className="px-6 py-6 max-w-7xl mx-auto">
          {children}
        </main>
      )}
    </div>
  )
}
