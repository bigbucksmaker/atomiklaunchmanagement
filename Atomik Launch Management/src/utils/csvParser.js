// Parse the influencer CSV and extract structured data
export function parseInfluencerCSV(csvText) {
  const lines = csvText.trim().split('\n')
  if (lines.length < 2) return []

  const influencers = []

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i])
    if (!cols[0] || !cols[0].trim()) continue

    const xUrl = cols[0].trim()
    const username = extractUsername(xUrl)
    if (!username) continue

    const firstName = (cols[1] || '').trim()
    const qtCommentRaw = (cols[2] || '').trim()
    const followersRaw = (cols[8] || '').trim()
    const commentPriceRaw = (cols[10] || '').trim()
    const qtPriceRaw = (cols[11] || '').trim()

    const qtCommentPrice = extractPrice(qtCommentRaw)
    const commentPrice = extractPrice(commentPriceRaw)
    const quoteTweetPrice = extractPrice(qtPriceRaw)
    const { followers, usPercent } = parseFollowers(followersRaw)

    influencers.push({
      username: username.toLowerCase(),
      firstName,
      xProfileUrl: xUrl.split('?')[0],
      qtCommentPrice,
      commentPrice,
      quoteTweetPrice,
      followers,
      usPercent,
    })
  }

  // Deduplicate by username (keep first occurrence)
  const seen = new Set()
  return influencers.filter(inf => {
    if (seen.has(inf.username)) return false
    seen.add(inf.username)
    return true
  })
}

function parseCSVLine(line) {
  const result = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      inQuotes = !inQuotes
    } else if (ch === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += ch
    }
  }
  result.push(current)
  return result
}

export function extractUsername(url) {
  if (!url) return null
  // Handle URLs like "https://x.com/username" or "https://x.com/username?s=21"
  // Also handle "https://x.com/username username" (space-separated in CSV)
  const cleaned = url.split(/\s+/)[0].split('?')[0]
  const match = cleaned.match(/(?:x\.com|twitter\.com)\/([a-zA-Z0-9_]+)/)
  return match ? match[1] : null
}

export function extractPrice(text) {
  if (!text) return 0
  // Handle various formats: "$15", "Qt+Com $15", "15$", "1000 inr", "$1,000"
  const cleaned = text.replace(/,/g, '').replace(/inr/gi, '')
  const match = cleaned.match(/\$?\s*(\d+(?:\.\d+)?)\s*\$?/)
  if (match) return parseFloat(match[1])
  return 0
}

function parseFollowers(text) {
  if (!text) return { followers: 0, usPercent: 0 }

  const parts = text.split('|').map(s => s.trim())
  let followers = 0
  let usPercent = 0

  if (parts[0]) {
    const fMatch = parts[0].replace(/,/g, '').match(/([\d.]+)\s*k?/i)
    if (fMatch) {
      followers = parseFloat(fMatch[1])
      if (parts[0].toLowerCase().includes('k')) followers *= 1000
    }
  }

  if (parts[1]) {
    const pMatch = parts[1].match(/([\d.]+)/)
    if (pMatch) usPercent = parseFloat(pMatch[1])
  }

  return { followers: Math.round(followers), usPercent }
}

export function formatFollowers(count) {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
  return count.toString()
}

export function formatPrice(price) {
  if (!price || price === 0) return '—'
  return `$${price}`
}
