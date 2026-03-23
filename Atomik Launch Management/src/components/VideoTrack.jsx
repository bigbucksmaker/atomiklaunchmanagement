import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Film, Plus, Video, ExternalLink, X, Check } from 'lucide-react'
import VideoCard from './VideoCard'
import { useCampaignStore } from '../store/campaigns'

export default function VideoTrack({ campaign }) {
  const updateCampaign = useCampaignStore(s => s.updateCampaign)
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState('')

  const previews = campaign.videoPreviews || []

  const addPreview = () => {
    if (!draft.trim()) return
    updateCampaign(campaign.id, {
      videoPreviews: [...previews, { url: draft.trim(), label: `${previews.length + 1}` }]
    })
    setDraft('')
    setAdding(false)
  }

  const removePreview = (index) => {
    updateCampaign(campaign.id, {
      videoPreviews: previews.filter((_, i) => i !== index)
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-2xl font-semibold flex items-center gap-2"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
        >
          <Film size={20} style={{ color: 'var(--gold-base)' }} />
          Video Production Pipeline
        </h2>

        <div className="flex items-center gap-2">
          {/* Preview links */}
          {previews.map((preview, i) => (
            <div key={i} className="relative group">
              <a
                href={preview.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium no-underline transition-all duration-200"
                style={{
                  background: 'var(--bg-secondary)',
                  color: 'var(--gold-base)',
                  border: '1px solid var(--border-color)',
                }}
                title={preview.url}
              >
                <Video size={12} />
                {preview.label}
                <ExternalLink size={10} className="opacity-50" />
              </a>
              <button
                onClick={() => removePreview(i)}
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full border-none cursor-pointer items-center justify-center hidden group-hover:flex"
                style={{ background: 'var(--danger)', color: '#fff' }}
              >
                <X size={8} />
              </button>
            </div>
          ))}

          {/* Add preview */}
          {adding ? (
            <div className="flex items-center gap-1.5">
              <input
                type="url"
                placeholder="Paste video URL..."
                value={draft}
                onChange={e => setDraft(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') addPreview(); if (e.key === 'Escape') setAdding(false) }}
                className="text-xs px-3 py-1.5 rounded-lg border w-48"
                style={{
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  borderColor: 'var(--border-color)',
                  outline: 'none',
                }}
                autoFocus
              />
              <button
                onClick={addPreview}
                className="p-1.5 rounded-lg border-none cursor-pointer"
                style={{ background: 'var(--gold-base)', color: 'var(--bg-primary)' }}
              >
                <Check size={12} />
              </button>
              <button
                onClick={() => { setAdding(false); setDraft('') }}
                className="p-1.5 rounded-lg border-none cursor-pointer"
                style={{ background: 'transparent', color: 'var(--text-muted)' }}
              >
                <X size={12} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAdding(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider border-none cursor-pointer transition-all duration-200"
              style={{
                background: 'var(--bg-secondary)',
                color: 'var(--gold-base)',
                border: '1px solid var(--border-color)',
              }}
            >
              <Plus size={12} />
              Add Preview
            </button>
          )}
        </div>
      </div>

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
