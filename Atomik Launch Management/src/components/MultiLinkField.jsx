import { useState } from 'react'
import { ExternalLink, Plus, X, Check } from 'lucide-react'

export default function MultiLinkField({ links = [], onChange }) {
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState('')

  const addLink = () => {
    if (!draft.trim()) return
    onChange([...links, { url: draft.trim(), label: `v${links.length + 1}` }])
    setDraft('')
    setAdding(false)
  }

  const removeLink = (index) => {
    onChange(links.filter((_, i) => i !== index))
  }

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {links.map((link, i) => (
        <div key={i} className="relative group">
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full flex items-center justify-center no-underline transition-all duration-200"
            style={{
              background: 'var(--gold-glow)',
              color: 'var(--gold-base)',
              border: '1px solid var(--border-color)',
            }}
            title={link.url}
          >
            <ExternalLink size={12} />
          </a>
          <button
            onClick={() => removeLink(i)}
            className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-none cursor-pointer items-center justify-center hidden group-hover:flex"
            style={{ background: 'var(--danger)', color: '#fff' }}
          >
            <X size={8} />
          </button>
        </div>
      ))}

      {adding ? (
        <div className="flex items-center gap-1">
          <input
            type="url"
            placeholder="Paste URL..."
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') addLink(); if (e.key === 'Escape') setAdding(false) }}
            className="text-[10px] px-2 py-1 rounded-lg border w-28"
            style={{
              background: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)',
              outline: 'none',
            }}
            autoFocus
          />
          <button
            onClick={addLink}
            className="w-5 h-5 rounded-full border-none cursor-pointer flex items-center justify-center"
            style={{ background: 'var(--gold-base)', color: 'var(--bg-primary)' }}
          >
            <Check size={10} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="w-7 h-7 rounded-full border-none cursor-pointer flex items-center justify-center transition-colors duration-200"
          style={{
            background: 'var(--bg-tertiary)',
            color: 'var(--text-muted)',
            border: '1px dashed var(--border-color)',
          }}
          title="Add Frame link"
        >
          <Plus size={12} />
        </button>
      )}
    </div>
  )
}
