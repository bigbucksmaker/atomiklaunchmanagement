import { create } from 'zustand'
import { INFLUENCER_CSV_DATA } from './influencerSeedData'
import { parseInfluencerCSV } from '../utils/csvParser'
import { supabase } from '../lib/supabase'

async function loadFromSupabase() {
  try {
    const { data, error } = await supabase.from('influencer_db').select('username, data')
    if (error) throw error
    if (data && data.length > 0) return data.map(r => r.data)
  } catch (e) { console.error('Influencer DB load failed:', e) }
  return null
}

async function syncToSupabase(influencers) {
  try {
    const rows = influencers.map(i => ({ username: i.username.toLowerCase(), data: i, updated_at: new Date().toISOString() }))
    // Batch in chunks of 50
    for (let i = 0; i < rows.length; i += 50) {
      await supabase.from('influencer_db').upsert(rows.slice(i, i + 50))
    }
  } catch (e) { console.error('Influencer DB sync failed:', e) }
}

function loadLocal() {
  try {
    const saved = localStorage.getItem('atomik-influencer-db')
    if (saved) { const parsed = JSON.parse(saved); if (parsed.length > 0) return parsed }
  } catch (e) {}
  return null
}

function saveLocal(db) {
  try { localStorage.setItem('atomik-influencer-db', JSON.stringify(db)) } catch (e) {}
}

const useInfluencerDb = create((set, get) => {
  const seedData = parseInfluencerCSV(INFLUENCER_CSV_DATA)
  const localData = loadLocal() || seedData

  loadFromSupabase().then(remote => {
    if (remote && remote.length > 0) {
      set({ influencers: remote })
      saveLocal(remote)
    } else {
      syncToSupabase(localData)
    }
  })

  return {
    influencers: localData,

    getByUsername: (username) => {
      const clean = username.toLowerCase().replace(/^@/, '')
      return get().influencers.find(i => i.username.toLowerCase() === clean)
    },

    matchUsernames: (usernames) => {
      const db = get().influencers
      return usernames.map(raw => {
        const clean = raw.toLowerCase().replace(/^@/, '').trim()
        if (!clean) return null
        const match = db.find(i => i.username.toLowerCase() === clean)
        if (match) return { ...match, isKnown: true }
        return { username: clean, firstName: '', xProfileUrl: `https://x.com/${clean}`, qtCommentPrice: 0, commentPrice: 0, quoteTweetPrice: 0, followers: 0, usPercent: 0, isKnown: false }
      }).filter(Boolean)
    },

    importCSV: (csvText) => {
      const parsed = parseInfluencerCSV(csvText)
      set(state => {
        const existing = new Map(state.influencers.map(i => [i.username.toLowerCase(), i]))
        parsed.forEach(i => existing.set(i.username.toLowerCase(), i))
        const merged = Array.from(existing.values())
        saveLocal(merged)
        syncToSupabase(merged)
        return { influencers: merged }
      })
    },

    addInfluencer: (data) => {
      set(state => {
        const updated = [...state.influencers, data]
        saveLocal(updated)
        syncToSupabase([data])
        return { influencers: updated }
      })
    },
  }
})

export { useInfluencerDb }
