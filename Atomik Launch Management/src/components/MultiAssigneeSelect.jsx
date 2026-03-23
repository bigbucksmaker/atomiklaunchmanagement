import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, Plus, UserPlus } from 'lucide-react'
import { TEAM_MEMBERS, useCampaignStore } from '../store/campaigns'

// Store custom members in localStorage
function getCustomMembers() {
  try {
    return JSON.parse(localStorage.getItem('atomik-custom-members') || '[]')
  } catch { return [] }
}

function saveCustomMember(name) {
  const existing = getCustomMembers()
  if (!existing.includes(name)) {
    localStorage.setItem('atomik-custom-members', JSON.stringify([...existing, name]))
  }
}

export default function MultiAssigneeSelect({ value = [], onChange }) {
  const [open, setOpen] = useState(false)
  const [adding, setAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const [customMembers, setCustomMembers] = useState(getCustomMembers)
  const ref = useRef(null)
  const [pos, setPos] = useState({ top: 0, left: 0 })

  const allMembers = [...TEAM_MEMBERS, ...customMembers.filter(m => !TEAM_MEMBERS.includes(m))]

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        // Check if click is inside the portal dropdown
        const portal = document.getElementById('assignee-dropdown-portal')
        if (portal && portal.contains(e.target)) return
        setOpen(false)
        setAdding(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    if (open && ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setPos({ top: rect.bottom + 4, left: rect.left })
    }
  }, [open])

  const toggle = (name) => {
    if (value.includes(name)) {
      onChange(value.filter(v => v !== name))
    } else {
      onChange([...value, name])
    }
  }

  const handleAddNew = () => {
    const trimmed = newName.trim()
    if (!trimmed) return
    saveCustomMember(trimmed)
    setCustomMembers(getCustomMembers())
    if (!value.includes(trimmed)) {
      onChange([...value, trimmed])
    }
    setNewName('')
    setAdding(false)
  }

  return (
    <div ref={ref} className="relative inline-flex flex-wrap items-center gap-1">
      {value.map(name => (
        <span
          key={name}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
          style={{ background: 'var(--gold-base)', color: 'var(--bg-primary)' }}
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
        style={{ background: 'var(--bg-tertiary)', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}
      >
        <Plus size={10} />
      </button>

      {open && createPortal(
        <div
          id="assignee-dropdown-portal"
          className="fixed z-[9999] rounded-xl p-1.5 min-w-[160px]"
          style={{
            top: pos.top,
            left: pos.left,
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}
        >
          {allMembers.map(name => (
            <button
              key={name}
              onClick={() => toggle(name)}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs border-none cursor-pointer transition-colors duration-150 text-left"
              style={{ background: value.includes(name) ? 'var(--gold-glow)' : 'transparent', color: 'var(--text-primary)' }}
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

          {/* Divider */}
          <div className="my-1" style={{ borderTop: '1px solid var(--border-color)' }} />

          {adding ? (
            <div className="flex items-center gap-1 px-1.5">
              <input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleAddNew(); if (e.key === 'Escape') setAdding(false) }}
                placeholder="Name..."
                autoFocus
                className="flex-1 text-xs px-2 py-1.5 rounded-lg border"
                style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)', outline: 'none' }}
              />
              <button
                onClick={handleAddNew}
                className="p-1.5 rounded-lg border-none cursor-pointer"
                style={{ background: 'var(--gold-base)', color: 'var(--bg-primary)' }}
              >
                <Plus size={10} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAdding(true)}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs border-none cursor-pointer text-left"
              style={{ background: 'transparent', color: 'var(--gold-base)' }}
            >
              <UserPlus size={12} />
              Add new member
            </button>
          )}
        </div>,
        document.body
      )}
    </div>
  )
}
