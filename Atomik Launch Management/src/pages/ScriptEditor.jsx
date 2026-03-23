import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Plus, Save, Trash2, Clock, ChevronDown } from 'lucide-react'
import { useCampaignStore } from '../store/campaigns'
import { supabase } from '../lib/supabase'

async function loadScripts(campaignId) {
  try {
    const { data } = await supabase.from('scripts').select('id, data').eq('campaign_id', campaignId)
    if (data) return data.map(r => r.data)
  } catch (e) {}
  return []
}

async function saveScript(script, campaignId) {
  await supabase.from('scripts').upsert({ id: script.id, data: script, campaign_id: campaignId, updated_at: new Date().toISOString() })
}

async function deleteScriptFromDb(id) {
  await supabase.from('scripts').delete().eq('id', id)
}

export default function ScriptEditor() {
  const campaigns = useCampaignStore(s => s.campaigns)
  const [selectedCampaign, setSelectedCampaign] = useState('')
  const [scripts, setScripts] = useState([])
  const [activeScript, setActiveScript] = useState(null)
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)

  useEffect(() => {
    if (selectedCampaign) {
      loadScripts(selectedCampaign).then(s => {
        setScripts(s)
        if (s.length > 0) {
          setActiveScript(s[0])
          setContent(s[0].content || '')
          setTitle(s[0].title || '')
        } else {
          setActiveScript(null)
          setContent('')
          setTitle('')
        }
      })
    }
  }, [selectedCampaign])

  const handleSave = useCallback(async () => {
    if (!activeScript || !selectedCampaign) return
    setSaving(true)
    const updated = { ...activeScript, title, content, updatedAt: new Date().toISOString() }
    await saveScript(updated, selectedCampaign)
    setScripts(scripts.map(s => s.id === updated.id ? updated : s))
    setActiveScript(updated)
    setLastSaved(new Date())
    setSaving(false)
  }, [activeScript, title, content, selectedCampaign, scripts])

  // Auto-save on Ctrl+S
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        handleSave()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleSave])

  const createScript = async () => {
    const newScript = {
      id: Date.now().toString(),
      title: `Script ${scripts.length + 1}`,
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: JSON.parse(localStorage.getItem('atomik-auth') || '{}')?.name || 'Unknown',
    }
    await saveScript(newScript, selectedCampaign)
    setScripts([...scripts, newScript])
    setActiveScript(newScript)
    setTitle(newScript.title)
    setContent('')
  }

  const deleteScript = async (id) => {
    if (!confirm('Delete this script?')) return
    await deleteScriptFromDb(id)
    const remaining = scripts.filter(s => s.id !== id)
    setScripts(remaining)
    if (activeScript?.id === id) {
      if (remaining.length > 0) {
        setActiveScript(remaining[0])
        setTitle(remaining[0].title)
        setContent(remaining[0].content)
      } else {
        setActiveScript(null)
        setTitle('')
        setContent('')
      }
    }
  }

  const selectScript = (script) => {
    setActiveScript(script)
    setTitle(script.title)
    setContent(script.content || '')
  }

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
        <FileText size={24} className="inline mr-2" style={{ color: 'var(--gold-base)' }} />
        Script Editor
      </h1>

      {/* Campaign selector */}
      <div className="flex items-center gap-3 mb-6">
        <select value={selectedCampaign} onChange={e => setSelectedCampaign(e.target.value)}
          className="text-sm px-4 py-2.5 rounded-xl border cursor-pointer appearance-none"
          style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)', outline: 'none', minWidth: 200 }}>
          <option value="">Select a campaign...</option>
          {campaigns.map(c => <option key={c.id} value={c.id}>{c.companyName}</option>)}
        </select>
        {selectedCampaign && (
          <button onClick={createScript}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] border-none cursor-pointer"
            style={{ background: 'var(--gold-base)', color: 'var(--bg-primary)' }}>
            <Plus size={14} /> New Script
          </button>
        )}
      </div>

      {!selectedCampaign ? (
        <div className="rounded-2xl p-12 text-center" style={{ background: 'var(--bg-secondary)', border: '1px dashed var(--border-color)' }}>
          <FileText size={32} style={{ color: 'var(--text-muted)', margin: '0 auto 12px' }} />
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Select a campaign to write or edit scripts.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Script list sidebar */}
          <div className="lg:col-span-1">
            <div className="flex flex-col gap-1.5">
              {scripts.map(s => (
                <button key={s.id} onClick={() => selectScript(s)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs text-left border-none cursor-pointer w-full"
                  style={{
                    background: activeScript?.id === s.id ? 'var(--gold-glow)' : 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    border: activeScript?.id === s.id ? '1px solid var(--gold-base)' : '1px solid var(--border-color)',
                  }}>
                  <div className="min-w-0">
                    <span className="font-medium block truncate">{s.title}</span>
                    <span className="text-[9px]" style={{ color: 'var(--text-muted)' }}>{s.author}</span>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); deleteScript(s.id) }}
                    className="p-1 border-none cursor-pointer shrink-0" style={{ background: 'transparent', color: 'var(--text-muted)' }}>
                    <Trash2 size={10} />
                  </button>
                </button>
              ))}
              {scripts.length === 0 && (
                <p className="text-xs text-center py-4" style={{ color: 'var(--text-muted)' }}>No scripts yet</p>
              )}
            </div>
          </div>

          {/* Editor */}
          <div className="lg:col-span-3">
            {activeScript ? (
              <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                {/* Toolbar */}
                <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <input value={title} onChange={e => setTitle(e.target.value)}
                    className="text-sm font-semibold border-none bg-transparent outline-none flex-1"
                    style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}
                    placeholder="Script title..." />
                  <div className="flex items-center gap-3">
                    <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{wordCount} words</span>
                    {lastSaved && (
                      <span className="text-[10px] flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                        <Clock size={10} /> Saved {lastSaved.toLocaleTimeString()}
                      </span>
                    )}
                    <button onClick={handleSave} disabled={saving}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold border-none cursor-pointer"
                      style={{ background: 'var(--gold-base)', color: 'var(--bg-primary)' }}>
                      <Save size={12} /> {saving ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>

                {/* Text area */}
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Start writing your script here...

You can structure it like:

[HOOK]
Opening line that grabs attention...

[PROBLEM]
The problem your product solves...

[SOLUTION]
How the product works...

[CTA]
Call to action..."
                  className="w-full p-6 border-none resize-none outline-none text-sm leading-relaxed"
                  style={{
                    background: 'transparent',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    minHeight: 500,
                  }}
                />
              </div>
            ) : (
              <div className="rounded-2xl p-12 text-center" style={{ background: 'var(--bg-secondary)', border: '1px dashed var(--border-color)' }}>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Select a script or create a new one.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
