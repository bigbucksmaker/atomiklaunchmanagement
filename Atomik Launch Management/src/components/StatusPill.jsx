import { motion } from 'framer-motion'

const STATUS_CONFIG = {
  not_started: { label: 'Not Started', color: 'var(--status-not-started)', textColor: '#fff' },
  in_progress: { label: 'In Progress', color: 'var(--status-in-progress)', textColor: '#fff' },
  in_revision: { label: 'In Revision', color: 'var(--status-in-revision)', textColor: '#000' },
  sent_to_client: { label: 'Sent to Client', color: 'var(--status-sent-to-client)', textColor: '#fff' },
  approved: { label: 'Approved', color: 'var(--status-approved)', textColor: '#fff' },
  done: { label: 'Done', color: 'var(--status-done)', textColor: '#fff' },
}

export default function StatusPill({ status, onClick, cycle }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.not_started

  const handleClick = () => {
    if (!onClick || !cycle) return
    const currentIndex = cycle.indexOf(status)
    const nextIndex = (currentIndex + 1) % cycle.length
    onClick(cycle[nextIndex])
  }

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border-none cursor-pointer transition-all duration-200"
      style={{
        background: `${config.color}22`,
        color: config.color,
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <span
        className="w-2 h-2 rounded-full inline-block"
        style={{ background: config.color }}
      />
      {config.label}
    </motion.button>
  )
}

export { STATUS_CONFIG }
