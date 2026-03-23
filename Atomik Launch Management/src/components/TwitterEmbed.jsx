import { Eye, MessageCircle, Heart, Bookmark } from 'lucide-react'

function VerifiedBadge() {
  return (
    <svg width="16" height="16" viewBox="0 0 22 22" fill="var(--gold-base)">
      <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.853-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.636.433 1.221.878 1.69.47.446 1.055.752 1.69.883.635.13 1.294.083 1.902-.14.272.587.7 1.086 1.24 1.44s1.167.551 1.813.568c.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.223 1.26.27 1.89.14.63-.134 1.212-.438 1.68-.884.468-.47.77-1.055.9-1.69.134-.636.085-1.294-.137-1.9.586-.273 1.084-.706 1.438-1.246.355-.54.552-1.17.57-1.817z" />
      <path d="M9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" fill="var(--bg-primary)" />
    </svg>
  )
}

function XLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--text-muted)">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function RetweetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 014-4h14" />
      <path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 01-4 4H3" />
    </svg>
  )
}

export default function TweetCard({ name, handle, avatar, verified, text, date, videoThumb, tweetUrl, stats }) {
  return (
    <a
      href={tweetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl p-6 md:p-8 no-underline transition-all duration-300"
      style={{
        border: '1px solid var(--border-color)',
        background: 'var(--gold-glow)',
        cursor: 'pointer',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <img
            alt={name}
            src={avatar}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-1 text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>
              {name}
              {verified && <VerifiedBadge />}
            </div>
            <div className="text-[13px]" style={{ color: 'var(--text-muted)' }}>@{handle}</div>
          </div>
        </div>
        <XLogo />
      </div>

      {/* Tweet text */}
      <p
        className="text-[15px] leading-[1.7] mb-5 whitespace-pre-wrap text-left"
        style={{ color: 'var(--text-primary)' }}
      >
        {text}
      </p>

      {/* Video thumbnail */}
      {videoThumb && (
        <div className="rounded-xl overflow-hidden mb-5 relative" style={{ aspectRatio: '16/9' }}>
          <img
            alt="Video preview"
            src={videoThumb}
            className="w-full h-full block object-cover"
          />
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.3)' }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(0,0,0,0.6)' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Date */}
      {date && (
        <div
          className="text-[13px] mb-4 pb-4"
          style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}
          dangerouslySetInnerHTML={{ __html: date }}
        />
      )}

      {/* Stats */}
      {stats && (
        <div className="flex gap-5 flex-wrap text-[13px]" style={{ color: 'var(--text-muted)' }}>
          {stats.views && (
            <span className="flex items-center gap-1.5">
              <Eye size={16} strokeWidth={1.5} />
              <span className="font-medium">{stats.views}</span>
            </span>
          )}
          {stats.replies && (
            <span className="flex items-center gap-1.5">
              <MessageCircle size={16} strokeWidth={1.5} />
              <span className="font-medium">{stats.replies}</span>
            </span>
          )}
          {stats.retweets && (
            <span className="flex items-center gap-1.5">
              <RetweetIcon />
              <span className="font-medium">{stats.retweets}</span>
            </span>
          )}
          {stats.likes && (
            <span className="flex items-center gap-1.5">
              <Heart size={16} strokeWidth={1.5} />
              <span className="font-medium">{stats.likes}</span>
            </span>
          )}
          {stats.bookmarks && (
            <span className="flex items-center gap-1.5">
              <Bookmark size={16} strokeWidth={1.5} />
              <span className="font-medium">{stats.bookmarks}</span>
            </span>
          )}
        </div>
      )}
    </a>
  )
}
