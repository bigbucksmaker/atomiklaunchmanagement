import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, ExternalLink, Headphones, Search, Lock, Trash2 } from 'lucide-react'
import { useCrmStore, CRM_STATUSES, CRM_TIERS, CRM_VENDORS, CRM_OWNERS } from '../store/crm'

const CRM_PASSWORD = 'bussing'

function CrmPasswordGate({ children }) {
  const [unlocked, setUnlocked] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('atomik-crm-auth') === 'true') {
      setUnlocked(true)
    }
  }, [])

  if (unlocked) return children

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input === CRM_PASSWORD) {
      localStorage.setItem('atomik-crm-auth', 'true')
      setUnlocked(true)
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className="flex items-center justify-center py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-sm w-full"
      >
        <Lock size={36} style={{ color: 'var(--gold-base)', margin: '0 auto 16px' }} />
        <h2 className="text-2xl font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>CRM Access</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Enter the password to view the CRM.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full px-4 py-3 rounded-xl border text-sm text-center"
            style={{
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              borderColor: error ? 'var(--danger)' : 'var(--border-color)',
              outline: 'none',
            }}
          />
          {error && <p className="text-xs" style={{ color: 'var(--danger)' }}>Incorrect password</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-full text-xs font-bold uppercase tracking-[0.15em] border-none cursor-pointer"
            style={{ background: 'var(--gold-base)', color: 'var(--bg-primary)', fontFamily: 'var(--font-body)' }}
          >
            Unlock
          </button>
        </form>
      </motion.div>
    </div>
  )
}

const STATUS_COLORS = {
  '1. Lead': { bg: '#6B728022', border: '#6B7280', text: '#6B7280' },
  '2. Call booked': { bg: '#F59E0B18', border: '#F59E0B', text: '#F59E0B' },
  '3. Second call booked': { bg: '#F9731618', border: '#F97316', text: '#F97316' },
  '4. Call done': { bg: '#3B82F618', border: '#3B82F6', text: '#3B82F6' },
  '5. Proposal sent': { bg: '#8B5CF618', border: '#8B5CF6', text: '#8B5CF6' },
  '6. MSA sent': { bg: '#EC489918', border: '#EC4899', text: '#EC4899' },
  '7. Closed': { bg: '#10B98118', border: '#10B981', text: '#10B981' },
  '8. Rejected': { bg: '#EF444418', border: '#EF4444', text: '#EF4444' },
}

function VendorBadge({ vendor }) {
  if (!vendor) return null
  const colors = {
    'Atomik': { bg: '#10B98130', color: '#10B981' },
    'Other vendor': { bg: '#F59E0B30', color: '#F59E0B' },
    'Unknown': { bg: '#6B728030', color: '#6B7280' },
  }
  const c = colors[vendor] || colors['Unknown']
  return (
    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase" style={{ background: c.bg, color: c.color }}>
      {vendor}
    </span>
  )
}

function TierBadge({ tier }) {
  if (!tier) return null
  return (
    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold" style={{ background: 'var(--gold-glow)', color: 'var(--gold-base)', border: '1px solid var(--border-color)' }}>
      {tier}
    </span>
  )
}

function LeadCard({ lead, onEdit, onDragStart, onDragEnd, isDragging }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: isDragging ? 0.4 : 1, y: 0 }}
      whileHover={{ y: -2 }}
      onClick={() => onEdit(lead)}
      draggable
      onDragStart={(e) => onDragStart?.(e, lead.id)}
      onDragEnd={onDragEnd}
      className="rounded-xl p-3.5 cursor-grab active:cursor-grabbing transition-all duration-200"
      style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', opacity: isDragging ? 0.4 : 1 }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold truncate" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
          {lead.name}
        </span>
        {lead.website && (
          <a href={lead.website} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ color: 'var(--text-muted)' }}>
            <ExternalLink size={11} />
          </a>
        )}
      </div>

      {lead.funding && (
        <p className="text-[11px] mb-1.5" style={{ color: 'var(--text-secondary)' }}>{lead.funding}</p>
      )}
      {lead.budgetInputted && (
        <p className="text-[11px] mb-1.5" style={{ color: 'var(--text-secondary)' }}>{lead.budgetInputted}</p>
      )}
      {lead.companyOneLiner && (
        <p className="text-[11px] mb-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>{lead.companyOneLiner}</p>
      )}
      {lead.source && (
        <p className="text-[10px] mb-2" style={{ color: 'var(--text-muted)' }}>{lead.source}</p>
      )}
      {lead.launchDate && (
        <p className="text-[10px] mb-2" style={{ color: 'var(--text-muted)' }}>{lead.launchDate}</p>
      )}

      <div className="flex items-center gap-1.5 flex-wrap">
        <VendorBadge vendor={lead.launchVideoVendor} />
        <TierBadge tier={lead.amplificationTier} />
      </div>

      {lead.closedAmount && (
        <p className="text-xs font-bold mt-2" style={{ color: 'var(--status-approved)' }}>{lead.closedAmount}</p>
      )}

      {lead.firefliesLinks.length > 0 && (
        <div className="flex items-center gap-1 mt-2">
          {lead.firefliesLinks.map((link, i) => (
            <a
              key={i}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="p-1 rounded no-underline"
              style={{ color: 'var(--gold-base)' }}
              title={`Call ${i + 1}`}
            >
              <Headphones size={11} />
            </a>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function LeadModal({ lead, onClose, onSave, onDelete }) {
  const [form, setForm] = useState({
    name: lead?.name || '',
    companyOneLiner: lead?.companyOneLiner || '',
    status: lead?.status || '1. Lead',
    amplificationTier: lead?.amplificationTier || '',
    budgetInputted: lead?.budgetInputted || '',
    closedAmount: lead?.closedAmount || '',
    funding: lead?.funding || '',
    launchDate: lead?.launchDate || '',
    launchVideoVendor: lead?.launchVideoVendor || '',
    owner: lead?.owner || '',
    prospectPOC: lead?.prospectPOC || '',
    source: lead?.source || '',
    website: lead?.website || '',
    firefliesLinks: lead?.firefliesLinks || [],
    notes: lead?.notes || [],
  })
  const [newLink, setNewLink] = useState('')
  const [newNote, setNewNote] = useState('')

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const addFirefliesLink = () => {
    if (!newLink.trim()) return
    update('firefliesLinks', [...form.firefliesLinks, newLink.trim()])
    setNewLink('')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-2xl rounded-2xl p-6 max-h-[85vh] overflow-y-auto"
        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
            {lead ? 'Edit Lead' : 'New Lead'}
          </h2>
          <div className="flex items-center gap-2">
            {lead && (
              <button
                onClick={() => { if (confirm(`Delete "${lead.name}"?`)) { onDelete(lead.id); onClose() } }}
                className="p-1.5 rounded-lg border-none cursor-pointer"
                style={{ background: 'transparent', color: 'var(--danger)' }}
                title="Delete lead"
              >
                <Trash2 size={16} />
              </button>
            )}
            <button onClick={onClose} className="p-1.5 rounded-lg border-none cursor-pointer" style={{ background: 'transparent', color: 'var(--text-muted)' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Company Name *" value={form.name} onChange={v => update('name', v)} />
          <Field label="Status" value={form.status} onChange={v => update('status', v)} type="select" options={CRM_STATUSES} />
          <Field label="Company One-liner" value={form.companyOneLiner} onChange={v => update('companyOneLiner', v)} full />
          <Field label="Amplification Tier" value={form.amplificationTier} onChange={v => update('amplificationTier', v)} type="select" options={['', ...CRM_TIERS]} />
          <Field label="Budget Inputted" value={form.budgetInputted} onChange={v => update('budgetInputted', v)} />
          <Field label="Closed $$" value={form.closedAmount} onChange={v => update('closedAmount', v)} />
          <Field label="Funding" value={form.funding} onChange={v => update('funding', v)} />
          <Field label="Launch Date" value={form.launchDate} onChange={v => update('launchDate', v)} type="date" />
          <Field label="Launch Video Vendor" value={form.launchVideoVendor} onChange={v => update('launchVideoVendor', v)} type="select" options={['', ...CRM_VENDORS]} />
          <Field label="Owner" value={form.owner} onChange={v => update('owner', v)} type="select" options={['', ...CRM_OWNERS]} />
          <Field label="Prospect POC" value={form.prospectPOC} onChange={v => update('prospectPOC', v)} />
          <Field label="Source" value={form.source} onChange={v => update('source', v)} />
          <Field label="Website" value={form.website} onChange={v => update('website', v)} full />

          <div className="col-span-full">
            <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>Fireflies Links</label>
            <div className="flex flex-col gap-1.5 mb-2">
              {form.firefliesLinks.map((link, i) => (
                <div key={i} className="flex items-center gap-2">
                  <a href={link} target="_blank" rel="noopener noreferrer" className="text-xs truncate flex-1 no-underline" style={{ color: 'var(--gold-base)' }}>
                    Call {i + 1}
                  </a>
                  <button onClick={() => update('firefliesLinks', form.firefliesLinks.filter((_, idx) => idx !== i))} className="p-0.5 border-none cursor-pointer" style={{ background: 'transparent', color: 'var(--text-muted)' }}>
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input type="url" placeholder="Paste Fireflies link..." value={newLink} onChange={e => setNewLink(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addFirefliesLink() } }}
                className="flex-1 text-xs px-3 py-2 rounded-xl border" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)', outline: 'none' }} />
              <button onClick={addFirefliesLink} className="px-3 py-2 rounded-xl text-xs font-bold border-none cursor-pointer" style={{ background: 'var(--gold-base)', color: 'var(--bg-primary)' }}>Add</button>
            </div>
          </div>

          {/* Notes */}
          <div className="col-span-full">
            <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>Notes</label>
            <div className="flex flex-col gap-1.5 mb-2">
              {form.notes.map((note, i) => (
                <div key={i} className="flex items-start gap-2 px-3 py-2 rounded-lg text-xs" style={{ background: 'var(--bg-tertiary)' }}>
                  <span className="flex-1" style={{ color: 'var(--text-secondary)' }}>{note.text}</span>
                  <span className="text-[9px] shrink-0" style={{ color: 'var(--text-muted)' }}>{new Date(note.timestamp).toLocaleDateString()}</span>
                  <button onClick={() => update('notes', form.notes.filter((_, idx) => idx !== i))} className="p-0.5 border-none cursor-pointer shrink-0" style={{ background: 'transparent', color: 'var(--text-muted)' }}>
                    <X size={10} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Add a note..."
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && newNote.trim()) { e.preventDefault(); update('notes', [...form.notes, { text: newNote.trim(), timestamp: new Date().toISOString(), author: JSON.parse(localStorage.getItem('atomik-auth') || '{}')?.name || 'Unknown' }]); setNewNote('') } }}
                className="flex-1 text-xs px-3 py-2 rounded-xl border"
                style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)', outline: 'none' }}
              />
              <button onClick={() => { if (newNote.trim()) { update('notes', [...form.notes, { text: newNote.trim(), timestamp: new Date().toISOString(), author: JSON.parse(localStorage.getItem('atomik-auth') || '{}')?.name || 'Unknown' }]); setNewNote('') } }}
                className="px-3 py-2 rounded-xl text-xs font-bold border-none cursor-pointer" style={{ background: 'var(--gold-base)', color: 'var(--bg-primary)' }}>Add</button>
            </div>
          </div>
        </div>

        <button
          onClick={() => { if (form.name.trim()) onSave(form) }}
          className="w-full mt-6 py-3 rounded-full text-xs font-bold uppercase tracking-[0.15em] border-none cursor-pointer"
          style={{ background: 'var(--gold-base)', color: 'var(--bg-primary)', fontFamily: 'var(--font-body)' }}
        >
          {lead ? 'Save Changes' : 'Create Lead'}
        </button>
      </motion.div>
    </motion.div>
  )
}

function Field({ label, value, onChange, type = 'text', options, full }) {
  return (
    <div className={full ? 'col-span-full' : ''}>
      <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>{label}</label>
      {type === 'select' ? (
        <select value={value} onChange={e => onChange(e.target.value)} className="w-full text-sm px-3 py-2.5 rounded-xl border appearance-none cursor-pointer"
          style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)', outline: 'none', fontFamily: 'var(--font-body)' }}>
          {options.map(o => <option key={o} value={o}>{o || '—'}</option>)}
        </select>
      ) : type === 'date' ? (
        <input type="date" value={value} onChange={e => onChange(e.target.value)} className="w-full text-sm px-3 py-2.5 rounded-xl border cursor-pointer"
          style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)', outline: 'none', fontFamily: 'var(--font-body)' }} />
      ) : (
        <input type="text" value={value} onChange={e => onChange(e.target.value)} className="w-full text-sm px-3 py-2.5 rounded-xl border"
          style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)', outline: 'none', fontFamily: 'var(--font-body)' }} />
      )}
    </div>
  )
}

export default function CRM() {
  return (
    <CrmPasswordGate>
      <CRMBoard />
    </CrmPasswordGate>
  )
}

function CRMBoard() {
  const { leads, addLead, updateLead, deleteLead } = useCrmStore()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingLead, setEditingLead] = useState(null)
  const [addToStatus, setAddToStatus] = useState(null)
  const [draggedId, setDraggedId] = useState(null)
  const [dragOverStatus, setDragOverStatus] = useState(null)

  const handleDragStart = (e, leadId) => {
    setDraggedId(leadId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e, status) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverStatus(status)
  }

  const handleDragLeave = () => {
    setDragOverStatus(null)
  }

  const handleDrop = (e, status) => {
    e.preventDefault()
    if (draggedId) {
      updateLead(draggedId, { status })
    }
    setDraggedId(null)
    setDragOverStatus(null)
  }

  const handleDragEnd = () => {
    setDraggedId(null)
    setDragOverStatus(null)
  }

  const columns = CRM_STATUSES.map(status => ({
    status,
    leads: leads.filter(l => l.status === status),
    colors: STATUS_COLORS[status] || STATUS_COLORS['1. Lead'],
  }))

  const totalClosed = leads.filter(l => l.closedAmount).reduce((sum, l) => {
    const num = parseFloat(l.closedAmount.replace(/[$,]/g, ''))
    return sum + (isNaN(num) ? 0 : num)
  }, 0)

  const handleSave = (formData) => {
    if (editingLead) {
      updateLead(editingLead.id, formData)
    } else {
      addLead({ ...formData, status: addToStatus || formData.status })
    }
    setModalOpen(false)
    setEditingLead(null)
    setAddToStatus(null)
  }

  const handleEdit = (lead) => {
    setEditingLead(lead)
    setModalOpen(true)
  }

  const handleNewInColumn = (status) => {
    setEditingLead(null)
    setAddToStatus(status)
    setModalOpen(true)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>Launch Virality CRM</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            {leads.length} leads · ${totalClosed.toLocaleString()} closed
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => { setEditingLead(null); setAddToStatus(null); setModalOpen(true) }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] border-none cursor-pointer"
          style={{ background: 'var(--gold-base)', color: 'var(--bg-primary)', fontFamily: 'var(--font-body)' }}
        >
          <Plus size={14} /> New Lead
        </motion.button>
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-3" style={{ minWidth: `${CRM_STATUSES.length * 260}px` }}>
          {columns.map(col => (
            <div
              key={col.status}
              className="flex-1 min-w-[240px] max-w-[280px] flex flex-col"
              onDragOver={(e) => handleDragOver(e, col.status)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, col.status)}
            >
              {/* Column header */}
              <div
                className="flex items-center justify-between px-3 py-2 rounded-t-xl mb-2"
                style={{ borderTop: `3px solid ${col.colors.border}` }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="text-[11px] font-bold uppercase tracking-wider"
                    style={{ color: col.colors.text }}
                  >
                    {col.status}
                  </span>
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{ background: col.colors.bg, color: col.colors.text }}
                  >
                    {col.leads.length}
                  </span>
                </div>
              </div>

              {/* Cards */}
              <div
                className="flex flex-col gap-2 flex-1 rounded-xl p-1 transition-all duration-200"
                style={{
                  background: dragOverStatus === col.status ? `${col.colors.border}15` : 'transparent',
                  border: dragOverStatus === col.status ? `2px dashed ${col.colors.border}40` : '2px dashed transparent',
                  minHeight: 60,
                }}
              >
                {col.leads.map(lead => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    onEdit={handleEdit}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    isDragging={draggedId === lead.id}
                  />
                ))}

                {/* Add new button */}
                <button
                  onClick={() => handleNewInColumn(col.status)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs border-none cursor-pointer transition-colors duration-200 w-full"
                  style={{ background: 'transparent', color: 'var(--text-muted)' }}
                >
                  <Plus size={12} /> New
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <LeadModal
            lead={editingLead}
            onClose={() => { setModalOpen(false); setEditingLead(null); setAddToStatus(null) }}
            onSave={handleSave}
            onDelete={deleteLead}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
