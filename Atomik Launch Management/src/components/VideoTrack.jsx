import { motion } from 'framer-motion'
import { Film } from 'lucide-react'
import VideoCard from './VideoCard'

export default function VideoTrack({ campaign }) {
  return (
    <div>
      <h2
        className="text-2xl font-semibold mb-4 flex items-center gap-2"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
      >
        <Film size={20} style={{ color: 'var(--gold-base)' }} />
        Video Production Pipeline
      </h2>

      <div className="flex flex-col gap-2">
        {campaign.videos.map((video, idx) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <VideoCard video={video} campaignId={campaign.id} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
