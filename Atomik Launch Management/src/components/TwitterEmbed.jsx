import { useEffect, useRef } from 'react'

export default function TwitterEmbed({ tweetUrl }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    // Clear any previous content
    ref.current.innerHTML = ''

    // Create the blockquote that Twitter's widget.js expects
    const blockquote = document.createElement('blockquote')
    blockquote.className = 'twitter-tweet'
    blockquote.setAttribute('data-theme', document.documentElement.getAttribute('data-theme') || 'dark')

    const anchor = document.createElement('a')
    anchor.href = tweetUrl
    blockquote.appendChild(anchor)
    ref.current.appendChild(blockquote)

    // Load or re-run Twitter widget script
    if (window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load(ref.current)
    } else {
      const script = document.createElement('script')
      script.src = 'https://platform.twitter.com/widgets.js'
      script.async = true
      script.charset = 'utf-8'
      document.head.appendChild(script)
    }
  }, [tweetUrl])

  return <div ref={ref} className="min-h-[200px]" />
}
