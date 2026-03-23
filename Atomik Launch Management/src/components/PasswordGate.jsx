import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'

const PASSWORD = 'bussing'
const STORAGE_KEY = 'atomik-crm-auth'

export default function PasswordGate({ children }) {
  const [unlocked, setUnlocked] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === 'true') setUnlocked(true)
  }, [])

  if (unlocked) return children

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input === PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'true')
      setUnlocked(true)
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className="flex items-center justify-center py-32">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-sm w-full">
        <Lock size={36} style={{ color: 'var(--gold-base)', margin: '0 auto 16px' }} />
        <h2 className="text-2xl font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Access Required</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Enter the password to continue.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input type="password" value={input} onChange={e => setInput(e.target.value)} placeholder="Password" autoFocus
            className="w-full px-4 py-3 rounded-xl border text-sm text-center"
            style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: error ? 'var(--danger)' : 'var(--border-color)', outline: 'none' }} />
          {error && <p className="text-xs" style={{ color: 'var(--danger)' }}>Incorrect password</p>}
          <button type="submit" className="w-full py-3 rounded-full text-xs font-bold uppercase tracking-[0.15em] border-none cursor-pointer"
            style={{ background: 'var(--gold-base)', color: 'var(--bg-primary)', fontFamily: 'var(--font-body)' }}>Unlock</button>
        </form>
      </motion.div>
    </div>
  )
}
