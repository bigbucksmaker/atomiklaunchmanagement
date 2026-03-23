import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserPlus, X, AlertTriangle, ExternalLink, DollarSign } from 'lucide-react'
import { useCampaignStore } from '../store/campaigns'
import { useInfluencerDb } from '../store/influencerDb'
import { formatFollowers, formatPrice, extractUsername } from '../utils/csvParser'

export default function CampaignInfluencerList({ campaign }) {
  const [input, setInput] = useState('')
  const [showInput, setShowInput] = useState(false)
  const setCampaignInfluencers = useCampaignStore(s => s.setCampaignInfluencers)
  const removeCampaignInfluencer = useCampaignStore(s => s.removeCampaignInfluencer)
  const matchUsernames = useInfluencerDb(s => s.matchUsernames)

  const handleAddInfluencers = () => {
    if (!input.trim()) return
    const usernames = input.split(/[\n,]+/).map(s => {
      const trimmed = s.trim()
      if (!trimmed) return null
      // Handle X/Twitter URLs like https://x.com/username or https://x.com/username?s=21
      if (trimmed.includes('x.com/') || trimmed.includes('twitter.com/')) {
        return extractUsername(trimmed)
      }
      return trimmed.replace(/^@/, '')
    }).filter(Boolean)
    const matched = matchUsernames(usernames)
    const existing = new Set(campaign.campaignInfluencers.map(i => i.username.toLowerCase()))
    const newOnes = matched.filter(m => !existing.has(m.username.toLowerCase()))
    if (newOnes.length > 0) {
      setCampaignInfluencers(campaign.id, [...campaign.campaignInfluencers, ...newOnes])
    }
    setInput('')
    setShowInput(false)
  }

  const influencers = campaign.campaignInfluencers || []
  const knownCount = influencers.filter(i => i.isKnown).length
  const unknownCount = influencers.filter(i => !i.isKnown).length
  const totalCost = influencers.reduce((sum, i) => sum + (i.qtCommentPrice || 0), 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3
          className="text-lg font-semibold flex items-center gap-2"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
        >
          Campaign Influencer List
          {influencers.length > 0 && (
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'var(--gold-glow)', color: 'var(--gold-base)' }}
            >
              {influencers.length}
            </span>
          )}
        </h3>
        <div className="flex items-center gap-2">
          {influencers.length > 0 && (
            <button
              onClick={() => { if (confirm('Remove all influencers from this campaign?')) setCampaignInfluencers(campaign.id, []) }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border-none cursor-pointer transition-all duration-200"
              style={{ background: 'transparent', color: 'var(--danger)', border: '1px solid var(--border-color)' }}
            >
              <X size={12} />
              Clear All
            </button>
          )}
          <button
            onClick={() => setShowInput(!showInput)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border-none cursor-pointer transition-all duration-200"
            style={{ background: 'var(--gold-base)', color: 'var(--bg-primary)' }}
          >
            <UserPlus size={12} />
            Add Influencers
          </button>
        </div>
      </div>

      {/* Input area */}
      <AnimatePresence>
        {showInput && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-4"
          >
            <div
              className="rounded-xl p-4"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
            >
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                Paste usernames or X profile URLs (one per line or comma-separated)
              </label>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="@username1, https://x.com/username2&#10;username3"
                rows={4}
                className="w-full px-3 py-2 rounded-lg border text-xs resize-none mb-3"
                style={{
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  borderColor: 'var(--border-color)',
                  outline: 'none',
                  fontFamily: 'var(--font-body)',
                }}
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddInfluencers}
                  className="px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider border-none cursor-pointer"
                  style={{ background: 'var(--gold-base)', color: 'var(--bg-primary)' }}
                >
                  Match & Add
                </button>
                <button
                  onClick={() => { setShowInput(false); setInput('') }}
                  className="px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider border-none cursor-pointer"
                  style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Influencer table */}
      {influencers.length > 0 ? (
        <div
          className="rounded-xl overflow-hidden"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
        >
          {/* Header */}
          <div
            className="grid gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-wider"
            style={{
              gridTemplateColumns: '1fr 100px 80px 80px 70px 30px',
              color: 'var(--text-muted)',
              borderBottom: '1px solid var(--border-color)',
            }}
          >
            <span>Username</span>
            <span>Name</span>
            <span>QT+Com</span>
            <span>Comment</span>
            <span>Followers</span>
            <span />
          </div>

          {/* Rows */}
          {influencers.map((inf, idx) => (
            <motion.div
              key={inf.username + idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.02 }}
              className="grid gap-2 px-4 py-2.5 items-center text-xs"
              style={{
                gridTemplateColumns: '1fr 100px 80px 80px 70px 30px',
                borderBottom: idx < influencers.length - 1 ? '1px solid var(--border-color)' : 'none',
                background: !inf.isKnown ? 'rgba(239,68,68,0.05)' : 'transparent',
              }}
            >
              <div className="flex items-center gap-2 min-w-0">
                {!inf.isKnown && (
                  <AlertTriangle size={12} style={{ color: 'var(--status-in-revision)', flexShrink: 0 }} title="Unknown — not in database" />
                )}
                <a
                  href={inf.xProfileUrl || `https://x.com/${inf.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate no-underline font-medium flex items-center gap-1"
                  style={{ color: 'var(--gold-base)' }}
                >
                  @{inf.username}
                  <ExternalLink size={10} className="shrink-0 opacity-50" />
                </a>
              </div>
              <span className="truncate" style={{ color: inf.isKnown ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                {inf.firstName || (inf.isKnown ? '—' : 'Unknown')}
              </span>
              <span className="font-medium" style={{ color: inf.qtCommentPrice ? 'var(--status-approved)' : 'var(--text-muted)' }}>
                {formatPrice(inf.qtCommentPrice)}
              </span>
              <span style={{ color: 'var(--text-secondary)' }}>
                {formatPrice(inf.commentPrice)}
              </span>
              <span style={{ color: 'var(--text-secondary)' }}>
                {inf.followers ? formatFollowers(inf.followers) : '—'}
              </span>
              <button
                onClick={() => removeCampaignInfluencer(campaign.id, inf.username)}
                className="p-1 rounded border-none cursor-pointer transition-colors duration-200"
                style={{ background: 'transparent', color: 'var(--text-muted)' }}
              >
                <X size={12} />
              </button>
            </motion.div>
          ))}

          {/* Summary */}
          <div
            className="grid gap-2 px-4 py-3 text-xs font-bold"
            style={{
              gridTemplateColumns: '1fr 100px 80px 80px 70px 30px',
              borderTop: '1px solid var(--border-color)',
              background: 'var(--bg-tertiary)',
            }}
          >
            <span className="flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <DollarSign size={12} style={{ color: 'var(--gold-base)' }} />
              {knownCount} known · {unknownCount} unknown
            </span>
            <span style={{ color: 'var(--text-muted)' }}>Total</span>
            <span style={{ color: 'var(--status-approved)' }}>${totalCost}</span>
            <span />
            <span />
            <span />
          </div>
        </div>
      ) : (
        <div
          className="rounded-xl p-8 text-center"
          style={{ background: 'var(--bg-secondary)', border: '1px dashed var(--border-color)' }}
        >
          <UserPlus size={24} style={{ color: 'var(--text-muted)', margin: '0 auto 8px' }} />
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            No influencers added yet. Click "Add Influencers" to paste usernames.
          </p>
        </div>
      )}
    </div>
  )
}
