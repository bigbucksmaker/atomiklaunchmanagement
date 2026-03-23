import { useState } from 'react'
import { ExternalLink, Edit3, Check } from 'lucide-react'

export default function LinkField({ value, onChange, label, buttonLabel }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value || '')

  if (value && !editing) {
    return (
      <div className="flex items-center gap-2">
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider no-underline transition-all duration-200"
          style={{
            background: 'var(--gold-base)',
            color: 'var(--bg-primary)',
          }}
        >
          <ExternalLink size={12} />
          {buttonLabel || label || 'Open Link'}
        </a>
        <button
          onClick={() => { setEditing(true); setDraft(value) }}
          className="p-1 rounded-md border-none cursor-pointer transition-colors duration-200"
          style={{ background: 'transparent', color: 'var(--text-muted)' }}
        >
          <Edit3 size={12} />
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="url"
        placeholder={`Paste ${label || 'link'} URL...`}
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && draft) {
            onChange(draft)
            setEditing(false)
          }
        }}
        className="text-xs px-3 py-1.5 rounded-lg border flex-1 min-w-0"
        style={{
          background: 'var(--bg-tertiary)',
          color: 'var(--text-primary)',
          borderColor: 'var(--border-color)',
          fontFamily: 'var(--font-body)',
          outline: 'none',
        }}
        autoFocus
      />
      <button
        onClick={() => { if (draft) { onChange(draft); setEditing(false) } }}
        className="p-1.5 rounded-md border-none cursor-pointer transition-colors duration-200"
        style={{ background: 'var(--gold-base)', color: 'var(--bg-primary)' }}
      >
        <Check size={12} />
      </button>
    </div>
  )
}
