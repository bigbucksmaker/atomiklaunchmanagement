import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Search, Plus, X, DollarSign, Users, UserPlus } from 'lucide-react'
import { useInfluencerDb } from '../store/influencerDb'
import { formatFollowers, formatPrice, extractUsername } from '../utils/csvParser'

export default function CostCalculator() {
  const { influencers } = useInfluencerDb()
  const [selected, setSelected] = useState([])
  const [search, setSearch] = useState('')
  const [showBulk, setShowBulk] = useState(false)
  const [bulkInput, setBulkInput] = useState('')

  const filtered = useMemo(() => {
    if (!search) return []
    const q = search.toLowerCase()
    return influencers
      .filter(i => i.username.toLowerCase().includes(q) || i.firstName.toLowerCase().includes(q))
      .filter(i => !selected.find(s => s.username === i.username))
      .slice(0, 10)
  }, [search, influencers, selected])

  const addInfluencer = (inf) => {
    setSelected([...selected, inf])
    setSearch('')
  }

  const removeInfluencer = (username) => {
    setSelected(selected.filter(s => s.username !== username))
  }

  const handleBulkAdd = () => {
    if (!bulkInput.trim()) return
    const usernames = bulkInput.split(/[\n,]+/).map(s => {
      const trimmed = s.trim()
      if (!trimmed) return null
      if (trimmed.includes('x.com/') || trimmed.includes('twitter.com/')) {
        return extractUsername(trimmed)
      }
      return trimmed.replace(/^@/, '')
    }).filter(Boolean)

    const existing = new Set(selected.map(s => s.username.toLowerCase()))
    const newOnes = usernames
      .filter(u => !existing.has(u.toLowerCase()))
      .map(u => {
        const match = influencers.find(i => i.username.toLowerCase() === u.toLowerCase())
        return match || { username: u, firstName: 'Unknown', qtCommentPrice: 0, commentPrice: 0, followers: 0 }
      })

    setSelected([...selected, ...newOnes])
    setBulkInput('')
    setShowBulk(false)
  }

  const totalQtCom = selected.reduce((sum, i) => sum + (i.qtCommentPrice || 0), 0)
  const totalComment = selected.reduce((sum, i) => sum + (i.commentPrice || 0), 0)
  const totalFollowers = selected.reduce((sum, i) => sum + (i.followers || 0), 0)

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
        <Calculator size={24} className="inline mr-2" style={{ color: 'var(--gold-base)' }} />
        Campaign Cost Calculator
      </h1>

      {/* Search + Bulk add */}
      <div className="flex items-start gap-3 mb-6">
      <div className="relative flex-1 max-w-md">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
        <input
          type="text"
          placeholder="Search influencers to add..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full text-sm pl-9 pr-3 py-2.5 rounded-xl border"
          style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)', outline: 'none' }}
        />
        {filtered.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 z-50 rounded-xl overflow-hidden max-h-60 overflow-y-auto"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
            {filtered.map(inf => (
              <button
                key={inf.username}
                onClick={() => addInfluencer(inf)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-xs border-none cursor-pointer text-left"
                style={{ background: 'transparent', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)' }}
              >
                <div>
                  <span className="font-medium" style={{ color: 'var(--gold-base)' }}>@{inf.username}</span>
                  <span className="ml-2" style={{ color: 'var(--text-muted)' }}>{inf.firstName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span style={{ color: 'var(--status-approved)' }}>{formatPrice(inf.qtCommentPrice)}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{formatFollowers(inf.followers)}</span>
                  <Plus size={12} style={{ color: 'var(--gold-base)' }} />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => setShowBulk(!showBulk)}
        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border-none cursor-pointer"
        style={{ background: 'var(--bg-secondary)', color: 'var(--gold-base)', border: '1px solid var(--border-color)' }}
      >
        <UserPlus size={14} /> Paste Usernames
      </button>
      </div>

      {showBulk && (
        <div className="mb-6 rounded-xl p-4" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <label className="block text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
            Paste usernames or X profile URLs (one per line or comma-separated)
          </label>
          <textarea
            value={bulkInput}
            onChange={e => setBulkInput(e.target.value)}
            placeholder="@username1, https://x.com/username2&#10;username3"
            rows={4}
            className="w-full px-3 py-2 rounded-lg border text-xs resize-none mb-3"
            style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)', outline: 'none' }}
          />
          <div className="flex items-center gap-2">
            <button onClick={handleBulkAdd} className="px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider border-none cursor-pointer"
              style={{ background: 'var(--gold-base)', color: 'var(--bg-primary)' }}>Match & Add</button>
            <button onClick={() => { setShowBulk(false); setBulkInput('') }} className="px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider border-none cursor-pointer"
              style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}>Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Selected influencers */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <div className="grid gap-2 px-4 py-3 text-[10px] font-bold uppercase tracking-wider"
            style={{ gridTemplateColumns: '1fr 80px 80px 80px 70px 30px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>
            <span>Username</span><span>Name</span><span>QT+Com</span><span>Comment</span><span>Followers</span><span />
          </div>
          {selected.length === 0 ? (
            <div className="py-12 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
              Search and add influencers to calculate campaign cost
            </div>
          ) : (
            selected.map((inf, i) => (
              <motion.div key={inf.username} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="grid gap-2 px-4 py-2.5 items-center text-xs"
                style={{ gridTemplateColumns: '1fr 80px 80px 80px 70px 30px', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--gold-base)' }}>@{inf.username}</span>
                <span style={{ color: 'var(--text-secondary)' }}>{inf.firstName}</span>
                <span style={{ color: 'var(--status-approved)' }}>{formatPrice(inf.qtCommentPrice)}</span>
                <span style={{ color: 'var(--text-secondary)' }}>{formatPrice(inf.commentPrice)}</span>
                <span style={{ color: 'var(--text-secondary)' }}>{formatFollowers(inf.followers)}</span>
                <button onClick={() => removeInfluencer(inf.username)} className="p-1 border-none cursor-pointer" style={{ background: 'transparent', color: 'var(--text-muted)' }}>
                  <X size={12} />
                </button>
              </motion.div>
            ))
          )}
        </div>

        {/* Summary */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl p-5" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Cost Summary</h3>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <span className="text-sm flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}><Users size={14} /> Influencers</span>
                <span className="text-sm font-bold">{selected.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}><DollarSign size={14} /> QT+Comment Total</span>
                <span className="text-sm font-bold" style={{ color: 'var(--status-approved)' }}>${totalQtCom.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Comment Only Total</span>
                <span className="text-sm font-bold">${totalComment.toLocaleString()}</span>
              </div>
              <div className="pt-3 flex justify-between" style={{ borderTop: '1px solid var(--border-color)' }}>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Total Reach</span>
                <span className="text-sm font-bold" style={{ color: 'var(--gold-base)' }}>{formatFollowers(totalFollowers)}</span>
              </div>
            </div>
          </div>

          {selected.length > 0 && (
            <button
              onClick={() => setSelected([])}
              className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border-none cursor-pointer"
              style={{ background: 'transparent', color: 'var(--danger)', border: '1px solid var(--border-color)' }}
            >
              Clear All
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
