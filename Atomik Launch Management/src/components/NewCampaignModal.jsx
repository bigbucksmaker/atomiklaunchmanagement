import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useCampaignStore } from '../store/campaigns'

export default function NewCampaignModal({ isOpen, onClose }) {
  const [companyName, setCompanyName] = useState('')
  const [numberOfVideos, setNumberOfVideos] = useState(1)
  const [launchDate, setLaunchDate] = useState('')
  const [notes, setNotes] = useState('')
  const addCampaign = useCampaignStore(s => s.addCampaign)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!companyName.trim()) return
    addCampaign(companyName.trim(), numberOfVideos, launchDate || null, notes)
    setCompanyName('')
    setNumberOfVideos(1)
    setLaunchDate('')
    setNotes('')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-md rounded-2xl p-6"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                New Campaign
              </h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg border-none cursor-pointer transition-colors duration-200"
                style={{ background: 'transparent', color: 'var(--text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  Company Name *
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  placeholder="e.g. Acme Corp"
                  required
                  className="w-full px-3 py-2.5 rounded-xl border text-sm"
                  style={{
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-color)',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  Number of Videos
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={numberOfVideos}
                  onChange={e => setNumberOfVideos(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2.5 rounded-xl border text-sm"
                  style={{
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-color)',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  Launch Date
                </label>
                <input
                  type="date"
                  value={launchDate}
                  onChange={e => setLaunchDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border text-sm"
                  style={{
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-color)',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  Notes
                </label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Optional notes..."
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-xl border text-sm resize-none"
                  style={{
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-color)',
                    outline: 'none',
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full text-xs font-bold uppercase tracking-[0.15em] border-none cursor-pointer transition-all duration-200 mt-2"
                style={{
                  background: 'var(--gold-base)',
                  color: 'var(--bg-primary)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Create Campaign
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
