import { useState } from 'react'
import { Share2, Copy, Check, ExternalLink } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function SharePortal({ campaignId }) {
  const [link, setLink] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const generateLink = async () => {
    setLoading(true)
    try {
      // Check if one already exists
      const { data: existing } = await supabase.from('client_portals').select('token').eq('campaign_id', campaignId).limit(1)
      if (existing && existing.length > 0) {
        setLink(`${window.location.origin}/portal/${existing[0].token}`)
        setLoading(false)
        return
      }
      // Create new token
      const token = crypto.randomUUID()
      await supabase.from('client_portals').insert({ token, campaign_id: campaignId })
      setLink(`${window.location.origin}/portal/${token}`)
    } catch (e) {
      console.error('Failed to generate portal link:', e)
    }
    setLoading(false)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!link) {
    return (
      <button
        onClick={generateLink}
        disabled={loading}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider border-none cursor-pointer transition-all duration-200"
        style={{ background: 'var(--bg-secondary)', color: 'var(--gold-base)', border: '1px solid var(--border-color)' }}
      >
        <Share2 size={12} />
        {loading ? 'Generating...' : 'Share with Client'}
      </button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px]"
        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
        <Share2 size={10} style={{ color: 'var(--gold-base)' }} />
        <span className="max-w-[200px] truncate">{link}</span>
      </div>
      <button onClick={copyLink} className="p-1.5 rounded-lg border-none cursor-pointer"
        style={{ background: 'var(--gold-base)', color: 'var(--bg-primary)' }}>
        {copied ? <Check size={12} /> : <Copy size={12} />}
      </button>
      <a href={link} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg no-underline"
        style={{ background: 'var(--bg-tertiary)', color: 'var(--gold-base)', border: '1px solid var(--border-color)' }}>
        <ExternalLink size={12} />
      </a>
    </div>
  )
}
