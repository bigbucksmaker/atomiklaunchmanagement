import { useEffect, useRef, useState } from 'react'

export default function TwitterEmbed({ tweetUrl }) {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    ref.current.innerHTML = ''
    setLoaded(false)

    const theme = document.documentElement.getAttribute('data-theme') || 'dark'

    const blockquote = document.createElement('blockquote')
    blockquote.className = 'twitter-tweet'
    blockquote.setAttribute('data-theme', theme)
    blockquote.setAttribute('data-conversation', 'none')

    const anchor = document.createElement('a')
    anchor.href = tweetUrl
    blockquote.appendChild(anchor)
    ref.current.appendChild(blockquote)

    const loadWidgets = () => {
      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load(ref.current).then(() => setLoaded(true))
      }
    }

    if (window.twttr && window.twttr.widgets) {
      loadWidgets()
    } else {
      // Check if script is already loading
      if (!document.querySelector('script[src*="platform.twitter.com/widgets.js"]')) {
        const script = document.createElement('script')
        script.src = 'https://platform.twitter.com/widgets.js'
        script.async = true
        script.charset = 'utf-8'
        script.onload = loadWidgets
        document.body.appendChild(script)
      } else {
        // Script exists but not loaded yet, poll for it
        const interval = setInterval(() => {
          if (window.twttr && window.twttr.widgets) {
            clearInterval(interval)
            loadWidgets()
          }
        }, 200)
        // Clean up after 10 seconds
        setTimeout(() => clearInterval(interval), 10000)
      }
    }
  }, [tweetUrl])

  return (
    <div ref={ref} className="min-h-[200px]">
      {!loaded && (
        <div
          className="rounded-2xl p-5 animate-pulse"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full" style={{ background: 'var(--bg-tertiary)' }} />
            <div>
              <div className="w-24 h-3 rounded mb-1" style={{ background: 'var(--bg-tertiary)' }} />
              <div className="w-16 h-2 rounded" style={{ background: 'var(--bg-tertiary)' }} />
            </div>
          </div>
          <div className="w-full h-3 rounded mb-2" style={{ background: 'var(--bg-tertiary)' }} />
          <div className="w-3/4 h-3 rounded mb-4" style={{ background: 'var(--bg-tertiary)' }} />
          <div className="w-full h-48 rounded-xl" style={{ background: 'var(--bg-tertiary)' }} />
        </div>
      )}
    </div>
  )
}
