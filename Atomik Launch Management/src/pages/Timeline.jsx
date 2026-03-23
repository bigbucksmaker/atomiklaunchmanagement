import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Film, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCampaignStore, calculateCampaignProgress, getCampaignStage } from '../store/campaigns'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

export default function Timeline() {
  const campaigns = useCampaignStore(s => s.campaigns)
  const navigate = useNavigate()
  const [currentDate, setCurrentDate] = useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

  // Map campaigns to their launch dates
  const campaignsByDate = useMemo(() => {
    const map = {}
    campaigns.forEach(c => {
      if (!c.launchDate) return
      const d = new Date(c.launchDate)
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate()
        if (!map[day]) map[day] = []
        map[day].push(c)
      }
    })
    return map
  }, [campaigns, year, month])

  // Upcoming launches
  const upcoming = campaigns
    .filter(c => c.launchDate && new Date(c.launchDate) >= new Date())
    .sort((a, b) => new Date(a.launchDate) - new Date(b.launchDate))

  const today = new Date()
  const isToday = (day) => today.getFullYear() === year && today.getMonth() === month && today.getDate() === day

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
        <Calendar size={24} className="inline mr-2" style={{ color: 'var(--gold-base)' }} />
        Campaign Timeline
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 rounded-2xl p-6" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className="p-2 rounded-lg border-none cursor-pointer" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>
              <ChevronLeft size={16} />
            </button>
            <h2 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
              {MONTHS[month]} {year}
            </h2>
            <button onClick={nextMonth} className="p-2 rounded-lg border-none cursor-pointer" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map(d => (
              <div key={d} className="text-center text-[10px] font-bold uppercase tracking-wider py-2" style={{ color: 'var(--text-muted)' }}>
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }, (_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1
              const dayCampaigns = campaignsByDate[day] || []
              return (
                <div
                  key={day}
                  className="aspect-square rounded-lg p-1 flex flex-col transition-colors duration-200"
                  style={{
                    background: isToday(day) ? 'var(--gold-glow)' : dayCampaigns.length > 0 ? 'var(--bg-tertiary)' : 'transparent',
                    border: isToday(day) ? '1px solid var(--gold-base)' : '1px solid transparent',
                  }}
                >
                  <span className="text-[11px] font-medium" style={{ color: isToday(day) ? 'var(--gold-base)' : 'var(--text-secondary)' }}>
                    {day}
                  </span>
                  {dayCampaigns.map(c => (
                    <div
                      key={c.id}
                      onClick={() => navigate(`/dashboard/campaign/${c.id}`)}
                      className="mt-0.5 px-1 py-0.5 rounded text-[8px] font-bold truncate cursor-pointer"
                      style={{ background: 'var(--gold-base)', color: 'var(--bg-primary)' }}
                      title={c.companyName}
                    >
                      {c.companyName}
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>

        {/* Upcoming launches sidebar */}
        <div>
          <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Upcoming Launches</h3>
          <div className="flex flex-col gap-2">
            {upcoming.length === 0 && (
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No upcoming launches scheduled</p>
            )}
            {upcoming.map(c => {
              const progress = calculateCampaignProgress(c)
              const stage = getCampaignStage(c)
              const daysUntil = Math.ceil((new Date(c.launchDate) - new Date()) / (1000 * 60 * 60 * 24))
              return (
                <motion.div
                  key={c.id}
                  whileHover={{ y: -2 }}
                  onClick={() => navigate(`/dashboard/campaign/${c.id}`)}
                  className="rounded-xl p-3 cursor-pointer"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>{c.companyName}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'var(--gold-glow)', color: 'var(--gold-base)' }}>
                      {progress}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px]" style={{ color: 'var(--text-muted)' }}>
                    <Calendar size={10} />
                    <span>{c.launchDate}</span>
                    <span>·</span>
                    <span style={{ color: daysUntil <= 3 ? 'var(--danger)' : daysUntil <= 7 ? 'var(--status-in-revision)' : 'var(--text-muted)' }}>
                      {daysUntil <= 0 ? 'Today!' : `${daysUntil}d away`}
                    </span>
                  </div>
                  <div className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>
                    <Film size={10} className="inline mr-1" />{c.numberOfVideos} video{c.numberOfVideos > 1 ? 's' : ''} · {stage}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
