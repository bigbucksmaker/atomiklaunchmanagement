import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Film } from 'lucide-react'
import ProgressRing from '../components/ProgressRing'
import { useCampaignStore, HIGH_LEVEL_STAGES, calculateCampaignProgress, getCampaignStage } from '../store/campaigns'

export default function KanbanOverview() {
  const campaigns = useCampaignStore(s => s.campaigns)
  const navigate = useNavigate()

  const columns = HIGH_LEVEL_STAGES.map(stage => ({
    stage,
    campaigns: campaigns.filter(c => getCampaignStage(c) === stage),
  }))

  return (
    <div>
      <h1
        className="text-3xl font-semibold mb-6"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
      >
        Campaign Overview
      </h1>

      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4" style={{ minWidth: `${HIGH_LEVEL_STAGES.length * 220}px` }}>
          {columns.map((col, colIdx) => (
            <motion.div
              key={col.stage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: colIdx * 0.05 }}
              className="flex-1 min-w-[200px] rounded-2xl p-3"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: 'var(--gold-base)', fontFamily: 'var(--font-body)' }}
                >
                  {col.stage}
                </h3>
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{
                    background: 'var(--gold-glow)',
                    color: 'var(--gold-base)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  {col.campaigns.length}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {col.campaigns.map(campaign => {
                  const progress = calculateCampaignProgress(campaign)
                  return (
                    <motion.div
                      key={campaign.id}
                      whileHover={{ y: -1 }}
                      onClick={() => navigate(`/dashboard/campaign/${campaign.id}`)}
                      className="rounded-xl p-3 cursor-pointer transition-all duration-200"
                      style={{
                        background: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-color)',
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="text-sm font-semibold truncate"
                          style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
                        >
                          {campaign.companyName}
                        </span>
                        <ProgressRing progress={progress} size={32} strokeWidth={3} />
                      </div>
                      <div className="flex items-center gap-2 text-[10px]" style={{ color: 'var(--text-muted)' }}>
                        <Calendar size={10} />
                        <span>{campaign.launchDate || 'TBD'}</span>
                        <span>·</span>
                        <Film size={10} />
                        <span>{campaign.numberOfVideos}v</span>
                      </div>

                      {/* Mini assignee avatars */}
                      <div className="flex items-center gap-0.5 mt-2">
                        {getUniqueAssignees(campaign).slice(0, 4).map(name => (
                          <div
                            key={name}
                            className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold"
                            style={{
                              background: 'var(--gold-base)',
                              color: 'var(--bg-primary)',
                              border: '2px solid var(--bg-tertiary)',
                              marginLeft: '-2px',
                            }}
                            title={name}
                          >
                            {name[0]}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )
                })}

                {col.campaigns.length === 0 && (
                  <div className="text-center py-6 text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    No campaigns
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function getUniqueAssignees(campaign) {
  const assignees = new Set()
  campaign.videos.forEach(v => {
    const stages = v.stages
    ;[stages.ideation, stages.moodboard, stages.scriptOptions, stages.aiAnimation, stages.motionDesign].forEach(s => {
      if (s?.assignee) assignees.add(s.assignee)
    })
  })
  const inf = campaign.influencer
  ;[inf.listCreation, inf.copiesWritten, inf.warmupTextsSent, inf.quoteTweetsSent, inf.launchDayLinkSent].forEach(s => {
    if (s?.assignee) assignees.add(s.assignee)
  })
  return [...assignees]
}
