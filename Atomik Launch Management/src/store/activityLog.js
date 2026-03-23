import { create } from 'zustand'

function loadLog() {
  try {
    const saved = localStorage.getItem('atomik-activity-log')
    if (saved) return JSON.parse(saved)
  } catch (e) {}
  return []
}

function saveLog(log) {
  // Keep last 200 entries
  const trimmed = log.slice(-200)
  localStorage.setItem('atomik-activity-log', JSON.stringify(trimmed))
}

const useActivityLog = create((set, get) => ({
  entries: loadLog(),

  addEntry: (action, details = '') => {
    set(state => {
      const entry = {
        id: Date.now().toString(),
        action,
        details,
        timestamp: new Date().toISOString(),
        user: JSON.parse(localStorage.getItem('atomik-auth') || '{}')?.name || 'Unknown',
      }
      const updated = [...state.entries, entry]
      saveLog(updated)
      return { entries: updated }
    })
  },

  clearLog: () => {
    localStorage.removeItem('atomik-activity-log')
    set({ entries: [] })
  },
}))

export { useActivityLog }
