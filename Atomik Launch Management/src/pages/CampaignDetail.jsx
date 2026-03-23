import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Trash2, StickyNote } from 'lucide-react'
import VideoTrack from '../components/VideoTrack'
import InfluencerTrack from '../components/InfluencerTrack'
import ProgressRing from '../components/ProgressRing'
import { useCampaignStore, calculateCampaignProgress, getCampaignStage } from '../store/campaigns'

export default function CampaignDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const campaigns = useCampaignStore(s => s.campaigns)
  const updateCampaign = useCampaignStore(s => s.updateCampaign)
  const deleteCampaign = useCampaignStore(s => s.deleteCampaign)
  const campaign = campaigns.find(c => c.id === id)

  const [editingDate, setEditingDate] = useState(false)

  if (!campaign) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg" style={{ color: 'var(--text-muted)' }}>Campaign not found</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border-none cursor-pointer"
          style={{ background: 'var(--gold-base)', color: 'var(--bg-primary)' }}
        >
          Back to Dashboard
        </button>
      </div>
    )
  }

  const progress = calculateCampaignProgress(campaign)
  const stage = getCampaignStage(campaign)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-start gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-xl border-none cursor-pointer transition-colors duration-200 mt-1"
            style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1
              className="text-3xl font-bold"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
            >
              {campaign.companyName}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--text-muted)' }}>
                <Calendar size={14} />
                {editingDate ? (
                  <input
                    type="date"
                    defaultValue={campaign.launchDate || ''}
                    onBlur={e => {
                      updateCampaign(campaign.id, { launchDate: e.target.value || null })
                      setEditingDate(false)
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        updateCampaign(campaign.id, { launchDate: e.target.value || null })
                        setEditingDate(false)
                      }
                    }}
                    autoFocus
                    className="text-sm px-2 py-0.5 rounded-md border"
                    style={{
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      borderColor: 'var(--border-color)',
                      outline: 'none',
                    }}
                  />
                ) : (
                  <span
                    onClick={() => setEditingDate(true)}
                    className="cursor-pointer hover:underline"
                  >
                    {campaign.launchDate || 'Set launch date'}
                  </span>
                )}
              </div>
              <div
                className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                style={{
                  background: 'var(--gold-glow)',
                  color: 'var(--gold-base)',
                  border: '1px solid var(--border-color)',
                }}
              >
                {stage}
              </div>
            </div>
            {campaign.notes && (
              <div className="flex items-start gap-1.5 mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                <StickyNote size={12} className="mt-0.5 shrink-0" />
                <span>{campaign.notes}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ProgressRing progress={progress} size={64} strokeWidth={5} />
          <button
            onClick={() => {
              if (confirm(`Delete campaign "${campaign.companyName}"?`)) {
                deleteCampaign(campaign.id)
                navigate('/dashboard')
              }
            }}
            className="p-2 rounded-xl border-none cursor-pointer transition-colors duration-200"
            style={{ background: 'transparent', color: 'var(--danger)' }}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Tracks */}
      <div className="flex flex-col gap-8">
        <VideoTrack campaign={campaign} />
        <InfluencerTrack campaign={campaign} />
      </div>
    </motion.div>
  )
}
