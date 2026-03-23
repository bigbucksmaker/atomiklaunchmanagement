import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Film, Users, Check, ExternalLink, ShieldX } from 'lucide-react'
import { supabase } from '../lib/supabase'
import ProgressRing from '../components/ProgressRing'

const STATUS_LABELS = {
  not_started: 'Not Started', in_progress: 'In Progress', in_revision: 'In Revision',
  sent_to_client: 'Sent to Client', approved: 'Approved', done: 'Done',
}
const STATUS_COLORS = {
  not_started: '#555', in_progress: '#3B82F6', in_revision: '#F59E0B',
  sent_to_client: '#8B5CF6', approved: '#10B981', done: '#10B981',
}

function isComplete(stage) {
  if (typeof stage === 'boolean') return stage
  if (stage && typeof stage === 'object') return stage.status === 'approved' || stage.status === 'done'
  return false
}

function calcProgress(campaign) {
  let done = 0, total = 0
  campaign.videos.forEach(v => {
    const s = v.stages
    ;[s.ideation, s.moodboard, s.scriptOptions, s.scriptFinalized, s.aiAnimation, s.motionDesign, s.sentToClient, s.videoApproved].forEach(st => {
      total++; if (isComplete(st)) done++
    })
  })
  const inf = campaign.influencer
  ;[inf.listCreation, inf.listSentToClient, inf.listApproved, inf.copiesWritten, inf.copiesSentToClient, inf.copiesApproved, inf.warmupTextsSent, inf.quoteTweetsSent, inf.launchDayLinkSent].forEach(st => {
    total++; if (isComplete(st)) done++
  })
  return total === 0 ? 0 : Math.round((done / total) * 100)
}

function StatusBadge({ status }) {
  const color = STATUS_COLORS[status] || '#555'
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase" style={{ background: `${color}22`, color }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />{STATUS_LABELS[status] || status}
    </span>
  )
}

function CheckBadge({ done }) {
  return (
    <span className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: done ? '#10B981' : 'var(--bg-tertiary)', color: done ? '#fff' : 'var(--text-muted)', border: done ? 'none' : '1px solid var(--border-color)' }}>
      {done && <Check size={14} />}
    </span>
  )
}

const VIDEO_STAGES = [
  { key: 'ideation', label: 'Ideation', type: 'status' },
  { key: 'moodboard', label: 'Moodboard', type: 'status' },
  { key: 'scriptOptions', label: 'Script Options', type: 'status' },
  { key: 'scriptFinalized', label: 'Script Finalized', type: 'toggle' },
  { key: 'aiAnimation', label: 'AI Animation', type: 'status' },
  { key: 'motionDesign', label: 'Motion Design', type: 'status' },
  { key: 'sentToClient', label: 'Final Video Sent', type: 'toggle' },
  { key: 'videoApproved', label: 'Video Approved', type: 'toggle' },
]

const INF_STAGES = [
  { key: 'listCreation', label: 'Influencer List Creation', type: 'status' },
  { key: 'listSentToClient', label: 'List Sent to Client', type: 'toggle' },
  { key: 'listApproved', label: 'List Approved', type: 'toggle' },
  { key: 'copiesWritten', label: 'Influencer Copies Written', type: 'status' },
  { key: 'copiesSentToClient', label: 'Copies Sent to Client', type: 'toggle' },
  { key: 'copiesApproved', label: 'Copies Approved', type: 'toggle' },
  { key: 'warmupTextsSent', label: 'Warm-up Texts Sent', type: 'status' },
  { key: 'quoteTweetsSent', label: 'QT & Comment Copy Sent', type: 'status' },
  { key: 'launchDayLinkSent', label: 'Launch Day Link Sent', type: 'status' },
]

export default function ClientPortal() {
  const { token } = useParams()
  const [campaign, setCampaign] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const { data: portal } = await supabase.from('client_portals').select('campaign_id').eq('token', token).single()
        if (!portal) { setError(true); setLoading(false); return }
        const { data: camp } = await supabase.from('campaigns').select('data').eq('id', portal.campaign_id).single()
        if (!camp) { setError(true); setLoading(false); return }
        setCampaign(camp.data)
      } catch (e) {
        setError(true)
      }
      setLoading(false)
    }
    load()
  }, [token])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
      <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
    </div>
  )

  if (error || !campaign) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
      <div className="text-center">
        <ShieldX size={48} style={{ color: 'var(--danger)', margin: '0 auto 16px' }} />
        <h1 className="text-2xl font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Invalid Link</h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>This client portal link is invalid or has expired.</p>
      </div>
    </div>
  )

  const progress = calcProgress(campaign)

  return (
    <div className="min-h-screen px-6 py-8 max-w-4xl mx-auto" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <img src="/atomik-icon-white.png" alt="" className="w-6 h-6" />
          <span className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-heading)' }}>Atomik Growth · Client Portal</span>
        </div>
      </div>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{campaign.companyName}</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {campaign.launchDate ? `Launch: ${campaign.launchDate}` : 'Launch date TBD'} · {campaign.numberOfVideos} video{campaign.numberOfVideos > 1 ? 's' : ''}
          </p>
        </div>
        <ProgressRing progress={progress} size={72} strokeWidth={6} />
      </div>

      {/* Video Production */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
          <Film size={18} style={{ color: 'var(--gold-base)' }} /> Video Production
        </h2>
        {campaign.videos.map(video => (
          <div key={video.id} className="rounded-xl mb-3 p-4" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{video.label}</h3>
            <div className="flex flex-col gap-2">
              {VIDEO_STAGES.map(stage => {
                const val = video.stages[stage.key]
                return (
                  <div key={stage.key} className="flex items-center justify-between py-1.5">
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{stage.label}</span>
                    {stage.type === 'toggle' ? <CheckBadge done={val} /> : <StatusBadge status={val.status} />}
                  </div>
                )
              })}
            </div>
            {/* Frame links */}
            {(video.stages.aiAnimation.frameLinks?.length > 0 || video.stages.motionDesign.frameLinks?.length > 0) && (
              <div className="mt-3 pt-3 flex gap-2 flex-wrap" style={{ borderTop: '1px solid var(--border-color)' }}>
                {[...video.stages.aiAnimation.frameLinks || [], ...video.stages.motionDesign.frameLinks || []].map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-medium no-underline"
                    style={{ background: 'var(--gold-glow)', color: 'var(--gold-base)', border: '1px solid var(--border-color)' }}>
                    <ExternalLink size={10} /> Preview {i + 1}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Influencer Pipeline */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
          <Users size={18} style={{ color: 'var(--gold-base)' }} /> Influencer Amplification
        </h2>
        <div className="rounded-xl p-4" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <div className="flex flex-col gap-2">
            {INF_STAGES.map(stage => {
              const val = campaign.influencer[stage.key]
              return (
                <div key={stage.key} className="flex items-center justify-between py-1.5">
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{stage.label}</span>
                  {stage.type === 'toggle' ? <CheckBadge done={val} /> : <StatusBadge status={val.status} />}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8" style={{ borderTop: '1px solid var(--border-color)' }}>
        <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Powered by Atomik Growth · atomikgrowth.com</p>
      </div>
    </div>
  )
}
