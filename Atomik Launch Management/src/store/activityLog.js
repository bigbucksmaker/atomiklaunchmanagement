import { create } from 'zustand'
import { supabase } from '../lib/supabase'

async function loadFromSupabase() {
  try {
    const { data, error } = await supabase.from('activity_log').select('*').order('created_at', { ascending: true }).limit(200)
    if (error) throw error
    if (data) return data.map(r => ({ id: r.id, action: r.action, details: r.details, user: r.username, timestamp: r.created_at }))
  } catch (e) { console.error('Activity log load failed:', e) }
  return null
}

async function saveEntryToSupabase(entry) {
  try {
    await supabase.from('activity_log').insert({ id: entry.id, action: entry.action, details: entry.details, username: entry.user, created_at: entry.timestamp })
  } catch (e) { console.error('Activity log save failed:', e) }
}

function loadLocal() {
  try {
    const saved = localStorage.getItem('atomik-activity-log')
    if (saved) return JSON.parse(saved)
  } catch (e) {}
  return []
}

function saveLocal(log) {
  localStorage.setItem('atomik-activity-log', JSON.stringify(log.slice(-200)))
}

const useActivityLog = create((set, get) => {
  const localEntries = loadLocal()

  loadFromSupabase().then(remote => {
    if (remote && remote.length > 0) {
      set({ entries: remote })
      saveLocal(remote)
    }
  })

  return {
    entries: localEntries,

    addEntry: (action, details = '') => {
      const entry = {
        id: Date.now().toString(),
        action,
        details,
        timestamp: new Date().toISOString(),
        user: JSON.parse(localStorage.getItem('atomik-auth') || '{}')?.name || 'Unknown',
      }
      set(state => {
        const updated = [...state.entries, entry]
        saveLocal(updated)
        saveEntryToSupabase(entry)
        return { entries: updated }
      })
    },

    clearLog: async () => {
      localStorage.removeItem('atomik-activity-log')
      try { await supabase.from('activity_log').delete().neq('id', '') } catch (e) {}
      set({ entries: [] })
    },
  }
})

export { useActivityLog }
