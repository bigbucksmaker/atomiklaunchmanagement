import { Users } from 'lucide-react'
import InfluencerStepper from './InfluencerStepper'
import CampaignInfluencerList from './CampaignInfluencerList'

export default function InfluencerTrack({ campaign }) {
  return (
    <div>
      <h2
        className="text-2xl font-semibold mb-4 flex items-center gap-2"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
      >
        <Users size={20} style={{ color: 'var(--gold-base)' }} />
        Influencer Amplification Pipeline
      </h2>

      {/* Pipeline workflow stages */}
      <div className="mb-6">
        <InfluencerStepper campaign={campaign} />
      </div>

      {/* Campaign influencer list */}
      <CampaignInfluencerList campaign={campaign} />
    </div>
  )
}
