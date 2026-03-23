import { create } from 'zustand'
import { INFLUENCER_CSV_DATA } from './influencerSeedData'
import { parseInfluencerCSV } from '../utils/csvParser'

function loadDb() {
  try {
    const saved = localStorage.getItem('atomik-influencer-db')
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.length > 0) return parsed
    }
  } catch (e) {
    console.error('Failed to load influencer DB:', e)
  }
  // Seed from CSV
  return parseInfluencerCSV(INFLUENCER_CSV_DATA)
}

function saveDb(db) {
  try {
    localStorage.setItem('atomik-influencer-db', JSON.stringify(db))
  } catch (e) {
    console.error('Failed to save influencer DB:', e)
  }
}

const useInfluencerDb = create((set, get) => ({
  influencers: loadDb(),

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
      if (match) {
        return { ...match, isKnown: true }
      }
      return {
        username: clean,
        firstName: '',
        xProfileUrl: `https://x.com/${clean}`,
        qtCommentPrice: 0,
        commentPrice: 0,
        quoteTweetPrice: 0,
        followers: 0,
        usPercent: 0,
        isKnown: false,
      }
    }).filter(Boolean)
  },

  importCSV: (csvText) => {
    const parsed = parseInfluencerCSV(csvText)
    set(state => {
      const existing = new Map(state.influencers.map(i => [i.username.toLowerCase(), i]))
      parsed.forEach(i => existing.set(i.username.toLowerCase(), i))
      const merged = Array.from(existing.values())
      saveDb(merged)
      return { influencers: merged }
    })
  },

  addInfluencer: (data) => {
    set(state => {
      const updated = [...state.influencers, data]
      saveDb(updated)
      return { influencers: updated }
    })
  },
}))

export { useInfluencerDb }
