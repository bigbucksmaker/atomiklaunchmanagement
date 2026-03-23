import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import StatusPill from './StatusPill'
import MultiAssigneeSelect from './MultiAssigneeSelect'
import { useCampaignStore, STATUS_CYCLE, REVISION_STATUS_CYCLE } from '../store/campaigns'

const PHASE_GROUPS = [
  {
    label: 'List Phase',
    stages: [
      { key: 'listCreation', label: 'Influencer List Creation', type: 'status', cycle: STATUS_CYCLE, assignable: true },
      { key: 'listSentToClient', label: 'List Sent to Client', type: 'toggle' },
      { key: 'listApproved', label: 'List Approved', type: 'toggle' },
    ]
  },
  {
    label: 'Copies Phase',
    stages: [
      { key: 'copiesWritten', label: 'Influencer Copies Written', type: 'status', cycle: REVISION_STATUS_CYCLE, assignable: true },
      { key: 'copiesSentToClient', label: 'Copies Sent to Client', type: 'toggle' },
      { key: 'copiesApproved', label: 'Copies Approved', type: 'toggle' },
    ]
  },
  {
    label: 'Outreach Phase',
    stages: [
      { key: 'warmupTextsSent', label: 'Warm-up Texts Sent', type: 'status', cycle: STATUS_CYCLE, assignable: true },
      { key: 'quoteTweetsSent', label: 'QT & Comment Copy Sent', type: 'status', cycle: STATUS_CYCLE, assignable: true },
      { key: 'launchDayLinkSent', label: 'Launch Day Link Sent', type: 'status', cycle: STATUS_CYCLE, assignable: true },
    ]
  },
]

export default function InfluencerStepper({ campaign }) {
  const updateInfluencerStage = useCampaignStore(s => s.updateInfluencerStage)

  return (
    <div className="flex flex-col gap-3">
      {PHASE_GROUPS.map((group, gi) => (
        <motion.div
          key={group.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: gi * 0.08 }}
          className="rounded-xl overflow-hidden"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
          }}
        >
          <div
            className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider"
            style={{ color: 'var(--gold-base)', borderBottom: '1px solid var(--border-color)' }}
          >
            {group.label}
          </div>

          <div className="flex flex-col">
            {group.stages.map((stage, si) => {
              const stageData = campaign.influencer[stage.key]
              const isLast = si === group.stages.length - 1

              return (
                <div
                  key={stage.key}
                  className="flex items-center justify-between gap-3 px-4 py-2.5"
                  style={{ borderBottom: isLast ? 'none' : '1px solid var(--border-color)' }}
                >
                  <span className="text-xs font-medium flex-1" style={{ color: 'var(--text-primary)' }}>
                    {stage.label}
                  </span>

                  <div className="flex items-center gap-3">
                    {stage.type === 'toggle' ? (
                      <button
                        onClick={() => updateInfluencerStage(campaign.id, stage.key, !stageData)}
                        className="w-7 h-7 rounded-lg border-none cursor-pointer flex items-center justify-center transition-all duration-200"
                        style={{
                          background: stageData ? 'var(--status-approved)' : 'var(--bg-tertiary)',
                          color: stageData ? '#fff' : 'var(--text-muted)',
                          border: stageData ? 'none' : '1px solid var(--border-color)',
                        }}
                      >
                        {stageData && <Check size={14} />}
                      </button>
                    ) : (
                      <>
                        <StatusPill
                          status={stageData.status}
                          cycle={stage.cycle}
                          onClick={(newStatus) => updateInfluencerStage(
                            campaign.id, stage.key,
                            { ...stageData, status: newStatus }
                          )}
                        />
                        {stage.assignable && (
                          <MultiAssigneeSelect
                            value={stageData.assignees || []}
                            onChange={(assignees) => updateInfluencerStage(
                              campaign.id, stage.key,
                              { ...stageData, assignees }
                            )}
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
