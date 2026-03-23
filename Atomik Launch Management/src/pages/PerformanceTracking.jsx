import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, Plus, X, DollarSign, Eye, BarChart3, Edit3 } from 'lucide-react'
import { useCampaignStore } from '../store/campaigns'
import { supabase } from '../lib/supabase'
import { formatFollowers } from '../utils/csvParser'

async function loadPerformance(campaignId) {
  try {
    const { data } = await supabase.from('influencer_performance').select('id, data').eq('campaign_id', campaignId)
    if (data) return data.map(r => r.data)
  } catch (e) {}
  return []
}

async function savePerformance(entry, campaignId) {
  await supabase.from('influencer_performance').upsert({ id: entry.id, data: entry, campaign_id: campaignId, updated_at: new Date().toISOString() })
}

async function deletePerformance(id) {
  await supabase.from('influencer_performance').delete().eq('id', id)
}

function EntryModal({ entry, onClose, onSave }) {
  const [form, setForm] = useState({
    username: entry?.username || '',
    paid: entry?.paid || '',
    views: entry?.views || '',
    likes: entry?.likes || '',
    retweets: entry?.retweets || '',
    comments: entry?.comments || '',
    notes: entry?.notes || '',
  })
  const u = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md rounded-2xl p-6" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>{entry ? 'Edit Entry' : 'Log Performance'}</h2>
          <button onClick={onClose} className="p-1 border-none cursor-pointer" style={{ background: 'transparent', color: 'var(--text-muted)' }}><X size={18} /></button>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Username *</label>
            <input value={form.username} onChange={e => u('username', e.target.value)} placeholder="@username"
              className="w-full text-sm px-3 py-2 rounded-xl border" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)', outline: 'none' }} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Amount Paid ($)</label>
              <input type="number" value={form.paid} onChange={e => u('paid', e.target.value)} placeholder="0"
                className="w-full text-sm px-3 py-2 rounded-xl border" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)', outline: 'none' }} />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Views</label>
              <input type="number" value={form.views} onChange={e => u('views', e.target.value)} placeholder="0"
                className="w-full text-sm px-3 py-2 rounded-xl border" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)', outline: 'none' }} />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Likes</label>
              <input type="number" value={form.likes} onChange={e => u('likes', e.target.value)} placeholder="0"
                className="w-full text-sm px-3 py-2 rounded-xl border" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)', outline: 'none' }} />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Retweets</label>
              <input type="number" value={form.retweets} onChange={e => u('retweets', e.target.value)} placeholder="0"
                className="w-full text-sm px-3 py-2 rounded-xl border" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)', outline: 'none' }} />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Comments</label>
              <input type="number" value={form.comments} onChange={e => u('comments', e.target.value)} placeholder="0"
                className="w-full text-sm px-3 py-2 rounded-xl border" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)', outline: 'none' }} />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Notes</label>
            <input value={form.notes} onChange={e => u('notes', e.target.value)} placeholder="Optional notes..."
              className="w-full text-sm px-3 py-2 rounded-xl border" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)', outline: 'none' }} />
          </div>
        </div>
        <button onClick={() => { if (form.username.trim()) onSave(form) }}
          className="w-full mt-5 py-3 rounded-full text-xs font-bold uppercase tracking-[0.15em] border-none cursor-pointer"
          style={{ background: 'var(--gold-base)', color: 'var(--bg-primary)' }}>{entry ? 'Save' : 'Log Entry'}</button>
      </motion.div>
    </motion.div>
  )
}

export default function PerformanceTracking() {
  const campaigns = useCampaignStore(s => s.campaigns)
  const [selectedCampaign, setSelectedCampaign] = useState('')
  const [entries, setEntries] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    if (selectedCampaign) {
      loadPerformance(selectedCampaign).then(setEntries)
    } else {
      setEntries([])
    }
  }, [selectedCampaign])

  const handleSave = async (form) => {
    const entry = {
      id: editing?.id || Date.now().toString(),
      ...form,
      paid: parseFloat(form.paid) || 0,
      views: parseInt(form.views) || 0,
      likes: parseInt(form.likes) || 0,
      retweets: parseInt(form.retweets) || 0,
      comments: parseInt(form.comments) || 0,
      timestamp: editing?.timestamp || new Date().toISOString(),
    }
    await savePerformance(entry, selectedCampaign)
    setEntries(editing ? entries.map(e => e.id === entry.id ? entry : e) : [...entries, entry])
    setModalOpen(false)
    setEditing(null)
  }

  const handleDelete = async (id) => {
    await deletePerformance(id)
    setEntries(entries.filter(e => e.id !== id))
  }

  const totalPaid = entries.reduce((s, e) => s + (e.paid || 0), 0)
  const totalViews = entries.reduce((s, e) => s + (e.views || 0), 0)
  const totalEngagement = entries.reduce((s, e) => s + (e.likes || 0) + (e.retweets || 0) + (e.comments || 0), 0)
  const costPerView = totalViews > 0 ? (totalPaid / totalViews).toFixed(4) : '—'
  const costPer1kViews = totalViews > 0 ? ((totalPaid / totalViews) * 1000).toFixed(2) : '—'

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
        <TrendingUp size={24} className="inline mr-2" style={{ color: 'var(--gold-base)' }} />
        Influencer Performance
      </h1>

      {/* Campaign selector */}
      <div className="flex items-center gap-3 mb-6">
        <select value={selectedCampaign} onChange={e => setSelectedCampaign(e.target.value)}
          className="text-sm px-4 py-2.5 rounded-xl border cursor-pointer appearance-none"
          style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)', outline: 'none', minWidth: 200 }}>
          <option value="">Select a campaign...</option>
          {campaigns.map(c => <option key={c.id} value={c.id}>{c.companyName}</option>)}
        </select>
        {selectedCampaign && (
          <button onClick={() => { setEditing(null); setModalOpen(true) }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] border-none cursor-pointer"
            style={{ background: 'var(--gold-base)', color: 'var(--bg-primary)' }}>
            <Plus size={14} /> Log Performance
          </button>
        )}
      </div>

      {!selectedCampaign ? (
        <div className="rounded-2xl p-12 text-center" style={{ background: 'var(--bg-secondary)', border: '1px dashed var(--border-color)' }}>
          <BarChart3 size={32} style={{ color: 'var(--text-muted)', margin: '0 auto 12px' }} />
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Select a campaign to view or log influencer performance data.</p>
        </div>
      ) : (
        <>
          {/* KPI cards */}
          {entries.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <KPI icon={DollarSign} label="Total Spent" value={`$${totalPaid.toLocaleString()}`} color="#EF4444" />
              <KPI icon={Eye} label="Total Views" value={formatFollowers(totalViews)} color="#3B82F6" />
              <KPI icon={TrendingUp} label="Total Engagement" value={formatFollowers(totalEngagement)} color="#10B981" />
              <KPI icon={BarChart3} label="CPM (Cost/1K Views)" value={`$${costPer1kViews}`} color="#8B5CF6" />
            </div>
          )}

          {/* Table */}
          <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <div className="grid gap-2 px-4 py-3 text-[10px] font-bold uppercase tracking-wider"
              style={{ gridTemplateColumns: '1fr 80px 80px 70px 70px 70px 60px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>
              <span>Username</span><span>Paid</span><span>Views</span><span>Likes</span><span>RTs</span><span>Comments</span><span />
            </div>
            {entries.length === 0 ? (
              <div className="py-12 text-center text-sm" style={{ color: 'var(--text-muted)' }}>No performance data yet. Click "Log Performance" to start tracking.</div>
            ) : entries.map((e, i) => {
              const roi = e.paid > 0 && e.views > 0 ? ((e.views / e.paid) * 1).toFixed(0) : '—'
              return (
                <motion.div key={e.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="grid gap-2 px-4 py-2.5 items-center text-xs"
                  style={{ gridTemplateColumns: '1fr 80px 80px 70px 70px 70px 60px', borderBottom: i < entries.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                  <span className="font-medium" style={{ color: 'var(--gold-base)' }}>@{e.username.replace(/^@/, '')}</span>
                  <span style={{ color: 'var(--danger)' }}>${e.paid}</span>
                  <span style={{ color: 'var(--status-in-progress)' }}>{formatFollowers(e.views)}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{formatFollowers(e.likes)}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{formatFollowers(e.retweets)}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{formatFollowers(e.comments)}</span>
                  <div className="flex gap-1">
                    <button onClick={() => { setEditing(e); setModalOpen(true) }} className="p-1 border-none cursor-pointer" style={{ background: 'transparent', color: 'var(--text-muted)' }}><Edit3 size={11} /></button>
                    <button onClick={() => { if (confirm('Delete?')) handleDelete(e.id) }} className="p-1 border-none cursor-pointer" style={{ background: 'transparent', color: 'var(--danger)' }}><X size={11} /></button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </>
      )}

      <AnimatePresence>
        {modalOpen && <EntryModal entry={editing} onClose={() => { setModalOpen(false); setEditing(null) }} onSave={handleSave} />}
      </AnimatePresence>
    </div>
  )
}

function KPI({ icon: Icon, label, value, color }) {
  return (
    <div className="rounded-xl p-4" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
      <Icon size={16} style={{ color, marginBottom: 8 }} />
      <p className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{value}</p>
      <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</p>
    </div>
  )
}
