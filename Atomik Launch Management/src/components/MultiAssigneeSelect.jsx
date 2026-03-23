import { useState, useRef, useEffect } from 'react'
import { X, Plus } from 'lucide-react'
import { TEAM_MEMBERS } from '../store/campaigns'

export default function MultiAssigneeSelect({ value = [], onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const toggle = (name) => {
    if (value.includes(name)) {
      onChange(value.filter(v => v !== name))
    } else {
      onChange([...value, name])
    }
  }

  return (
    <div ref={ref} className="relative inline-flex flex-wrap items-center gap-1">
      {value.map(name => (
        <span
          key={name}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
          style={{
            background: 'var(--gold-base)',
            color: 'var(--bg-primary)',
          }}
        >
          {name}
          <button
            onClick={(e) => { e.stopPropagation(); toggle(name) }}
            className="border-none bg-transparent cursor-pointer p-0 flex items-center"
            style={{ color: 'var(--bg-primary)' }}
          >
            <X size={10} />
          </button>
        </span>
      ))}
      <button
        onClick={() => setOpen(!open)}
        className="w-5 h-5 rounded-full border-none cursor-pointer flex items-center justify-center transition-colors duration-200"
        style={{
          background: 'var(--bg-tertiary)',
          color: 'var(--text-muted)',
          border: '1px solid var(--border-color)',
        }}
      >
        <Plus size={10} />
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-1 z-50 rounded-xl p-1.5 min-w-[140px]"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow)',
          }}
        >
          {TEAM_MEMBERS.map(name => (
            <button
              key={name}
              onClick={() => toggle(name)}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs border-none cursor-pointer transition-colors duration-150 text-left"
              style={{
                background: value.includes(name) ? 'var(--gold-glow)' : 'transparent',
                color: 'var(--text-primary)',
              }}
            >
              <span
                className="w-3.5 h-3.5 rounded border flex items-center justify-center text-[8px]"
                style={{
                  borderColor: value.includes(name) ? 'var(--gold-base)' : 'var(--border-color)',
                  background: value.includes(name) ? 'var(--gold-base)' : 'transparent',
                  color: 'var(--bg-primary)',
                }}
              >
                {value.includes(name) && '✓'}
              </span>
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
