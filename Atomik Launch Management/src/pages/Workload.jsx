import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Users, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import { useCampaignStore, TEAM_MEMBERS, isStageComplete } from '../store/campaigns'

const VIDEO_STAGE_KEYS = ['ideation', 'moodboard', 'scriptOptions', 'aiAnimation', 'motionDesign']
const INF_STAGE_KEYS = ['listCreation', 'copiesWritten', 'warmupTextsSent', 'quoteTweetsSent', 'launchDayLinkSent']

export default function Workload() {
  const campaigns = useCampaignStore(s => s.campaigns)

  const workload = useMemo(() => {
    const members = {}

    // Get custom members too
    const customMembers = JSON.parse(localStorage.getItem('atomik-custom-members') || '[]')
    const allMembers = [...TEAM_MEMBERS, ...customMembers.filter(m => !TEAM_MEMBERS.includes(m))]

    allMembers.forEach(name => {
      members[name] = { total: 0, done: 0, inProgress: 0, tasks: [] }
    })

    campaigns.forEach(campaign => {
      // Video stages
      campaign.videos.forEach(video => {
        VIDEO_STAGE_KEYS.forEach(key => {
          const stage = video.stages[key]
          if (stage && stage.assignees) {
            stage.assignees.forEach(assignee => {
              if (!members[assignee]) members[assignee] = { total: 0, done: 0, inProgress: 0, tasks: [] }
              members[assignee].total++
              if (isStageComplete(stage)) {
                members[assignee].done++
              } else if (stage.status !== 'not_started') {
                members[assignee].inProgress++
              }
              members[assignee].tasks.push({
                campaign: campaign.companyName,
                video: video.label,
                stage: key,
                status: stage.status,
              })
            })
          }
        })
      })

      // Influencer stages
      INF_STAGE_KEYS.forEach(key => {
        const stage = campaign.influencer[key]
        if (stage && stage.assignees) {
          stage.assignees.forEach(assignee => {
            if (!members[assignee]) members[assignee] = { total: 0, done: 0, inProgress: 0, tasks: [] }
            members[assignee].total++
            if (isStageComplete(stage)) {
              members[assignee].done++
            } else if (stage.status !== 'not_started') {
              members[assignee].inProgress++
            }
            members[assignee].tasks.push({
              campaign: campaign.companyName,
              stage: key,
              status: stage.status,
            })
          })
        }
      })
    })

    return Object.entries(members)
      .map(([name, data]) => ({ name, ...data, pending: data.total - data.done - data.inProgress }))
      .sort((a, b) => b.total - a.total)
  }, [campaigns])

  const maxTasks = Math.max(...workload.map(w => w.total), 1)

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
        <Users size={24} className="inline mr-2" style={{ color: 'var(--gold-base)' }} />
        Team Workload
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workload.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl p-5"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: 'var(--gold-base)', color: 'var(--bg-primary)' }}
                >
                  {member.name[0]}
                </div>
                <div>
                  <span className="text-sm font-semibold block" style={{ fontFamily: 'var(--font-heading)' }}>{member.name}</span>
                  <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{member.total} total tasks</span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 rounded-full overflow-hidden flex mb-3" style={{ background: 'var(--bg-tertiary)' }}>
              {member.done > 0 && (
                <div className="h-full" style={{ width: `${(member.done / maxTasks) * 100}%`, background: '#10B981' }} />
              )}
              {member.inProgress > 0 && (
                <div className="h-full" style={{ width: `${(member.inProgress / maxTasks) * 100}%`, background: '#3B82F6' }} />
              )}
              {member.pending > 0 && (
                <div className="h-full" style={{ width: `${(member.pending / maxTasks) * 100}%`, background: '#F59E0B' }} />
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1" style={{ color: '#10B981' }}>
                <CheckCircle size={12} /> {member.done} done
              </span>
              <span className="flex items-center gap-1" style={{ color: '#3B82F6' }}>
                <Clock size={12} /> {member.inProgress} active
              </span>
              <span className="flex items-center gap-1" style={{ color: '#F59E0B' }}>
                <AlertTriangle size={12} /> {member.pending} pending
              </span>
            </div>

            {/* Task list */}
            {member.tasks.length > 0 && (
              <div className="mt-3 pt-3 flex flex-col gap-1" style={{ borderTop: '1px solid var(--border-color)' }}>
                {member.tasks.slice(0, 5).map((task, j) => (
                  <div key={j} className="flex items-center justify-between text-[10px]">
                    <span style={{ color: 'var(--text-secondary)' }}>
                      {task.campaign} {task.video ? `· ${task.video}` : ''} · {task.stage.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span
                      className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase"
                      style={{
                        background: task.status === 'approved' ? '#10B98120' : task.status === 'in_progress' ? '#3B82F620' : '#6B728020',
                        color: task.status === 'approved' ? '#10B981' : task.status === 'in_progress' ? '#3B82F6' : '#6B7280',
                      }}
                    >
                      {task.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                ))}
                {member.tasks.length > 5 && (
                  <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>+{member.tasks.length - 5} more</span>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
