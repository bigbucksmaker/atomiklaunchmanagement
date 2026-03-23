import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'
import StepTracker from './StepTracker'
import StatusPill from './StatusPill'
import MultiAssigneeSelect from './MultiAssigneeSelect'
import MultiLinkField from './MultiLinkField'
import { useCampaignStore, STATUS_CYCLE, REVISION_STATUS_CYCLE } from '../store/campaigns'

const VIDEO_STAGES = [
  { key: 'ideation', label: 'Ideation', type: 'status', cycle: STATUS_CYCLE, assignable: true },
  { key: 'moodboard', label: 'Moodboard', type: 'status', cycle: STATUS_CYCLE, assignable: true },
  { key: 'scriptOptions', label: 'Script Options', type: 'status', cycle: STATUS_CYCLE, assignable: true },
  { key: 'scriptFinalized', label: 'Script Finalized', type: 'toggle' },
  { key: 'aiAnimation', label: 'AI Animation', type: 'status', cycle: REVISION_STATUS_CYCLE, assignable: true, hasFrameLinks: true },
  { key: 'motionDesign', label: 'Motion Design', type: 'status', cycle: REVISION_STATUS_CYCLE, assignable: true, hasFrameLinks: true },
  { key: 'sentToClient', label: 'Final Video Sent', type: 'toggle' },
  { key: 'videoApproved', label: 'Video Approved', type: 'toggle' },
]

export default function VideoCard({ video, campaignId }) {
  const [expanded, setExpanded] = useState(false)
  const updateVideoStage = useCampaignStore(s => s.updateVideoStage)

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
      }}
    >
      {/* Collapsed header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 px-4 py-3 border-none cursor-pointer transition-colors duration-200"
        style={{ background: 'transparent', color: 'var(--text-primary)' }}
      >
        <span
          className="text-sm font-semibold min-w-[80px] text-left"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {video.label}
        </span>
        <StepTracker stages={video.stages} />
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} />
        </motion.div>
      </button>

      {/* Expanded stages */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 flex flex-col gap-2" style={{ borderTop: '1px solid var(--border-color)' }}>
              {VIDEO_STAGES.map(stage => {
                const stageData = video.stages[stage.key]

                if (stage.type === 'toggle') {
                  return (
                    <div key={stage.key} className="flex items-center justify-between py-2 px-2 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                      <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{stage.label}</span>
                      <button
                        onClick={() => updateVideoStage(campaignId, video.id, stage.key, !stageData)}
                        className="w-7 h-7 rounded-lg border-none cursor-pointer flex items-center justify-center transition-all duration-200"
                        style={{
                          background: stageData ? 'var(--status-approved)' : 'var(--bg-secondary)',
                          color: stageData ? '#fff' : 'var(--text-muted)',
                          border: stageData ? 'none' : '1px solid var(--border-color)',
                        }}
                      >
                        {stageData && <Check size={14} />}
                      </button>
                    </div>
                  )
                }

                return (
                  <div key={stage.key} className="flex items-center justify-between gap-3 py-2 px-2 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                    <span className="text-xs font-medium min-w-[100px]" style={{ color: 'var(--text-primary)' }}>{stage.label}</span>
                    <div className="flex items-center gap-3 flex-wrap">
                      <StatusPill
                        status={stageData.status}
                        cycle={stage.cycle}
                        onClick={(newStatus) => updateVideoStage(
                          campaignId, video.id, stage.key,
                          { ...stageData, status: newStatus }
                        )}
                      />
                      {stage.assignable && (
                        <MultiAssigneeSelect
                          value={stageData.assignees || []}
                          onChange={(assignees) => updateVideoStage(
                            campaignId, video.id, stage.key,
                            { ...stageData, assignees }
                          )}
                        />
                      )}
                      {stage.hasFrameLinks && (
                        <MultiLinkField
                          links={stageData.frameLinks || []}
                          onChange={(frameLinks) => updateVideoStage(
                            campaignId, video.id, stage.key,
                            { ...stageData, frameLinks }
                          )}
                        />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
