import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, DollarSign, Users, Target, ArrowUpRight } from 'lucide-react'
import { useCrmStore, CRM_STATUSES } from '../store/crm'

const STATUS_COLORS = {
  '1. Lead': '#6B7280',
  '2. Call booked': '#F59E0B',
  '3. Second call booked': '#F97316',
  '4. Call done': '#3B82F6',
  '5. Proposal sent': '#8B5CF6',
  '6. MSA sent': '#EC4899',
  '7. Closed': '#10B981',
  '8. Rejected': '#EF4444',
}

function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-5"
      style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
    >
      <div className="flex items-center justify-between mb-3">
        <Icon size={18} style={{ color: color || 'var(--gold-base)' }} />
        {sub && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${color}20`, color }}>{sub}</span>}
      </div>
      <p className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{value}</p>
      <p className="text-[11px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</p>
    </motion.div>
  )
}

export default function Analytics() {
  const { leads } = useCrmStore()

  const stats = useMemo(() => {
    const totalLeads = leads.length
    const closed = leads.filter(l => l.status === '7. Closed')
    const rejected = leads.filter(l => l.status === '8. Rejected')
    const active = leads.filter(l => !['7. Closed', '8. Rejected'].includes(l.status))

    const totalRevenue = closed.reduce((sum, l) => {
      const num = parseFloat((l.closedAmount || '').replace(/[$,]/g, ''))
      return sum + (isNaN(num) ? 0 : num)
    }, 0)

    const avgDealSize = closed.length > 0 ? totalRevenue / closed.length : 0
    const closeRate = totalLeads > 0 ? ((closed.length / (closed.length + rejected.length)) * 100).toFixed(0) : 0

    const byStatus = CRM_STATUSES.map(status => ({
      status,
      count: leads.filter(l => l.status === status).length,
      color: STATUS_COLORS[status],
    }))

    const byOwner = {}
    leads.forEach(l => {
      const owner = l.owner || 'Unassigned'
      if (!byOwner[owner]) byOwner[owner] = { total: 0, closed: 0, revenue: 0 }
      byOwner[owner].total++
      if (l.status === '7. Closed') {
        byOwner[owner].closed++
        const num = parseFloat((l.closedAmount || '').replace(/[$,]/g, ''))
        if (!isNaN(num)) byOwner[owner].revenue += num
      }
    })

    const byVendor = {}
    leads.forEach(l => {
      const vendor = l.launchVideoVendor || 'Not set'
      if (!byVendor[vendor]) byVendor[vendor] = 0
      byVendor[vendor]++
    })

    return { totalLeads, closed: closed.length, rejected: rejected.length, active: active.length, totalRevenue, avgDealSize, closeRate, byStatus, byOwner, byVendor }
  }, [leads])

  const maxCount = Math.max(...stats.byStatus.map(s => s.count), 1)

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
        <BarChart3 size={24} className="inline mr-2" style={{ color: 'var(--gold-base)' }} />
        Pipeline Analytics
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Target} label="Total Leads" value={stats.totalLeads} color="#3B82F6" />
        <StatCard icon={DollarSign} label="Total Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} color="#10B981" />
        <StatCard icon={TrendingUp} label="Close Rate" value={`${stats.closeRate}%`} sub={`${stats.closed} won`} color="#10B981" />
        <StatCard icon={ArrowUpRight} label="Avg Deal Size" value={`$${Math.round(stats.avgDealSize).toLocaleString()}`} color="#8B5CF6" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline funnel */}
        <div className="rounded-2xl p-5" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Pipeline Breakdown</h3>
          <div className="flex flex-col gap-3">
            {stats.byStatus.map(s => (
              <div key={s.status}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{s.status}</span>
                  <span className="text-xs font-bold" style={{ color: s.color }}>{s.count}</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(s.count / maxCount) * 100}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: s.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By Owner */}
        <div className="rounded-2xl p-5" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>By Owner</h3>
          <div className="flex flex-col gap-3">
            {Object.entries(stats.byOwner).sort((a, b) => b[1].revenue - a[1].revenue).map(([owner, data]) => (
              <div key={owner} className="flex items-center justify-between py-2 px-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                <div>
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{owner}</span>
                  <span className="text-[10px] ml-2" style={{ color: 'var(--text-muted)' }}>{data.total} leads · {data.closed} closed</span>
                </div>
                <span className="text-sm font-bold" style={{ color: 'var(--status-approved)' }}>
                  ${data.revenue.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* By Vendor */}
        <div className="rounded-2xl p-5" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>By Video Vendor</h3>
          <div className="flex flex-col gap-2">
            {Object.entries(stats.byVendor).sort((a, b) => b[1] - a[1]).map(([vendor, count]) => (
              <div key={vendor} className="flex items-center justify-between py-2 px-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{vendor}</span>
                <span className="text-sm font-bold" style={{ color: 'var(--gold-base)' }}>{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick stats */}
        <div className="rounded-2xl p-5" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Summary</h3>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--text-muted)' }}>Active pipeline</span>
              <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{stats.active} leads</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--text-muted)' }}>Won deals</span>
              <span className="font-bold" style={{ color: '#10B981' }}>{stats.closed}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--text-muted)' }}>Lost deals</span>
              <span className="font-bold" style={{ color: '#EF4444' }}>{stats.rejected}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--text-muted)' }}>Win/Loss ratio</span>
              <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{stats.closed}:{stats.rejected}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
