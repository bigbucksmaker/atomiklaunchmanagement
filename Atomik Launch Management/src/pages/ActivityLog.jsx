import { motion } from 'framer-motion'
import { Activity, Trash2, Clock } from 'lucide-react'
import { useActivityLog } from '../store/activityLog'

function timeAgo(timestamp) {
  const diff = Date.now() - new Date(timestamp).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export default function ActivityLogPage() {
  const { entries, clearLog } = useActivityLog()
  const sorted = [...entries].reverse()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
          <Activity size={24} className="inline mr-2" style={{ color: 'var(--gold-base)' }} />
          Activity Log
        </h1>
        {entries.length > 0 && (
          <button
            onClick={() => { if (confirm('Clear all activity?')) clearLog() }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border-none cursor-pointer"
            style={{ background: 'transparent', color: 'var(--danger)', border: '1px solid var(--border-color)' }}
          >
            <Trash2 size={12} /> Clear
          </button>
        )}
      </div>

      {sorted.length === 0 ? (
        <div className="rounded-2xl p-12 text-center" style={{ background: 'var(--bg-secondary)', border: '1px dashed var(--border-color)' }}>
          <Activity size={32} style={{ color: 'var(--text-muted)', margin: '0 auto 12px' }} />
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No activity yet. Actions will be logged here as you use the platform.</p>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          {sorted.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.02 }}
              className="flex items-start gap-4 px-5 py-3"
              style={{ borderBottom: i < sorted.length - 1 ? '1px solid var(--border-color)' : 'none' }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold"
                style={{ background: 'var(--gold-base)', color: 'var(--bg-primary)' }}>
                {entry.user?.[0] || '?'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{entry.user}</span>
                  <span className="text-xs" style={{ color: 'var(--gold-base)' }}>{entry.action}</span>
                </div>
                {entry.details && (
                  <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{entry.details}</p>
                )}
              </div>
              <span className="text-[10px] shrink-0 flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                <Clock size={10} />
                {timeAgo(entry.timestamp)}
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
