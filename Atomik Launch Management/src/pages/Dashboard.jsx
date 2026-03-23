import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import CampaignCard from '../components/CampaignCard'
import NewCampaignModal from '../components/NewCampaignModal'
import { useCampaignStore } from '../store/campaigns'

export default function Dashboard() {
  const campaigns = useCampaignStore(s => s.campaigns)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="text-3xl font-semibold"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
          >
            Campaign Dashboard
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            {campaigns.length} active campaign{campaigns.length !== 1 ? 's' : ''}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] border-none cursor-pointer transition-all duration-200"
          style={{
            background: 'var(--gold-base)',
            color: 'var(--bg-primary)',
            fontFamily: 'var(--font-body)',
          }}
        >
          <Plus size={14} />
          New Campaign
        </motion.button>
      </div>

      <motion.div
        className="grid gap-4"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}
      >
        {campaigns.map((campaign, idx) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
          >
            <CampaignCard campaign={campaign} />
          </motion.div>
        ))}
      </motion.div>

      <NewCampaignModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
