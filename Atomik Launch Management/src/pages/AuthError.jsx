import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldX } from 'lucide-react'

export default function AuthError() {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: 'var(--bg-primary)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <ShieldX size={48} style={{ color: 'var(--danger)', margin: '0 auto 24px' }} />
        <h1
          className="text-3xl font-bold mb-4"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
        >
          Access Denied
        </h1>
        <p
          className="text-sm mb-8 leading-relaxed"
          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
        >
          Access is restricted to Atomik Growth team members. If you think this is a mistake, reach out to your admin.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-[0.15em] border-none cursor-pointer transition-all duration-200"
          style={{
            background: 'var(--gold-base)',
            color: 'var(--bg-primary)',
            fontFamily: 'var(--font-body)',
          }}
        >
          Back to Home
        </button>
      </motion.div>
    </div>
  )
}
