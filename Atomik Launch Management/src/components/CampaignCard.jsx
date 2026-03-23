import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Film } from 'lucide-react'
import ProgressRing from './ProgressRing'
import { calculateCampaignProgress, calculateTrackProgress, getCampaignStage } from '../store/campaigns'

export default function CampaignCard({ campaign }) {
  const navigate = useNavigate()
  const overallProgress = calculateCampaignProgress(campaign)
  const videoProgress = calculateTrackProgress(campaign, 'video')
  const influencerProgress = calculateTrackProgress(campaign, 'influencer')
  const stage = getCampaignStage(campaign)

  return (
    <motion.div
      layout
      whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
      onClick={() => navigate(`/dashboard/campaign/${campaign.id}`)}
      className="rounded-2xl p-5 cursor-pointer transition-all duration-300"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3
            className="text-xl font-semibold mb-1 truncate"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
          >
            {campaign.companyName}
          </h3>
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            <Calendar size={12} />
            <span>{campaign.launchDate || 'TBD'}</span>
            <span className="mx-1">·</span>
            <Film size={12} />
            <span>{campaign.numberOfVideos} video{campaign.numberOfVideos > 1 ? 's' : ''}</span>
          </div>
        </div>
        <ProgressRing progress={overallProgress} size={52} strokeWidth={4} />
      </div>

      <div
        className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4"
        style={{
          background: 'var(--gold-glow)',
          color: 'var(--gold-base)',
          border: '1px solid var(--border-color)',
        }}
      >
        {stage}
      </div>

      <div className="flex flex-col gap-2.5">
        <TrackBar label="Video Production" progress={videoProgress} />
        <TrackBar label="Influencer Amplification" progress={influencerProgress} />
      </div>

      {(campaign.campaignInfluencers?.length > 0) && (
        <div className="flex items-center gap-2 mt-4 pt-3 text-[10px]" style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
          {campaign.campaignInfluencers.length} influencer{campaign.campaignInfluencers.length !== 1 ? 's' : ''}
        </div>
      )}
    </motion.div>
  )
}

function TrackBar({ label, progress }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
          {label}
        </span>
        <span className="text-[10px] font-bold" style={{ color: 'var(--text-secondary)' }}>
          {progress}%
        </span>
      </div>
      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'var(--gold-base)' }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
