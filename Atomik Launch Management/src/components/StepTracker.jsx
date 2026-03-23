const STATUS_COLORS = {
  not_started: 'var(--status-not-started)',
  in_progress: 'var(--status-in-progress)',
  in_revision: 'var(--status-in-revision)',
  sent_to_client: 'var(--status-sent-to-client)',
  approved: 'var(--status-approved)',
  done: 'var(--status-approved)',
}

const STAGE_LABELS = [
  'Ideation', 'Moodboard', 'Script Options', 'Script Finalized',
  'AI Animation', 'Motion Design', 'Sent to Client', 'Approved',
]

function getStageStatus(stages, index) {
  const keys = ['ideation', 'moodboard', 'scriptOptions', 'scriptFinalized', 'aiAnimation', 'motionDesign', 'sentToClient', 'videoApproved']
  const val = stages[keys[index]]
  if (typeof val === 'boolean') return val ? 'approved' : 'not_started'
  return val?.status || 'not_started'
}

export default function StepTracker({ stages }) {
  return (
    <div className="flex items-center gap-0 flex-1">
      {STAGE_LABELS.map((label, i) => {
        const status = getStageStatus(stages, i)
        const color = STATUS_COLORS[status] || STATUS_COLORS.not_started
        const isLast = i === STAGE_LABELS.length - 1

        return (
          <div key={i} className="flex items-center flex-1" title={`${label}: ${status.replace(/_/g, ' ')}`}>
            <div
              className="w-3 h-3 rounded-full shrink-0 transition-colors duration-300"
              style={{ background: color, boxShadow: status !== 'not_started' ? `0 0 6px ${color}` : 'none' }}
            />
            {!isLast && (
              <div
                className="h-0.5 flex-1 transition-colors duration-300"
                style={{ background: status !== 'not_started' ? color : 'var(--border-color)' }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
