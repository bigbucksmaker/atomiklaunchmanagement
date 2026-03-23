import { motion } from 'framer-motion'
import { ArrowRight, Eye, MessageCircle, Repeat2, Heart, Bookmark } from 'lucide-react'

const CALENDLY_URL = 'https://calendly.com/d/5cr-qm2-f2h/atomik-growth-intro-call'
const PLAYBOOK_URL = 'https://www.atomikgrowth.com/blog/the-science-behind-every-viral-launch-video-on-x'
const BASE = 'https://www.atomikgrowth.com'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: 'easeOut' },
}

const PROCESS_PHASES = [
  { num: '01', title: 'Discovery & Strategy', desc: "We'll start with a call to understand the product or video concept, your ICP, and the type of creative you're looking for." },
  { num: '02', title: 'Creative Development', desc: "We'll then share a short questionnaire to capture how we're collectively visualizing the project." },
  { num: '03', title: 'AI-Enhanced Production', desc: "Based on your input, we'll prepare a moodboard for each video, so we can align on the creative direction." },
  { num: '04', title: 'Launch & Amplification', desc: "Once the moodboard is approved, we'll share the first draft of the video and iterate from there." },
  { num: '05', title: 'X Virality', desc: "After launch, we share the post with our network of tech influencers to engineer virality, and sustain momentum thereafter. We guarantee millions of views based on how good your product is." },
]

function TweetCard({ name, handle, avatar, verified, text, date, stats, tweetUrl, children }) {
  return (
    <a
      href={tweetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl p-5 no-underline transition-all duration-300"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ background: 'var(--gold-dim)', color: 'var(--bg-primary)' }}
          >
            {avatar || name[0]}
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{name}</span>
              {verified && <span style={{ color: 'var(--gold-base)' }}>&#10003;</span>}
            </div>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>@{handle}</span>
          </div>
        </div>
        <span className="text-lg font-bold" style={{ color: 'var(--text-muted)' }}>&#x1D54F;</span>
      </div>

      <div className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
        {text}
      </div>

      {children}

      {date && (
        <div className="text-xs mt-3 mb-2" style={{ color: 'var(--text-muted)' }}>
          {date}
        </div>
      )}

      {stats && (
        <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
          {stats.views && <span className="flex items-center gap-1"><Eye size={12} /> {stats.views}</span>}
          {stats.replies && <span className="flex items-center gap-1"><MessageCircle size={12} /> {stats.replies}</span>}
          {stats.retweets && <span className="flex items-center gap-1"><Repeat2 size={12} /> {stats.retweets}</span>}
          {stats.likes && <span className="flex items-center gap-1"><Heart size={12} /> {stats.likes}</span>}
          {stats.bookmarks && <span className="flex items-center gap-1"><Bookmark size={12} /> {stats.bookmarks}</span>}
        </div>
      )}
    </a>
  )
}

export default function Homepage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>

      {/* ─── Hero ─── */}
      <section className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div {...fadeUp}>
            <span
              className="text-xs font-bold uppercase tracking-[0.2em] mb-4 block"
              style={{ color: 'var(--gold-base)', fontFamily: 'var(--font-body)' }}
            >
              01
            </span>
            <h1
              className="text-5xl md:text-7xl font-bold leading-none mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Launch Virality
            </h1>
            <p
              className="text-base md:text-lg max-w-md mb-8 leading-relaxed"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
            >
              From ideation, scripting, recording, editing, to guaranteeing millions of views on X & LinkedIn. We do it all.
            </p>
            <a
              href={PLAYBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] no-underline transition-all duration-200 group"
              style={{ color: 'var(--gold-base)', fontFamily: 'var(--font-body)' }}
            >
              Our Playbook
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <TweetCard
              name="Subah Wadhwani"
              handle="subahwadhwani"
              verified
              tweetUrl="https://x.com/subahwadhwani/status/2027526010300993796"
              text=""
              stats={{ replies: '19', retweets: '36', likes: '364', views: '92K' }}
            >
              <div
                className="rounded-xl overflow-hidden mb-2"
                style={{ border: '1px solid var(--border-color)' }}
              >
                <div
                  className="h-36 flex items-end p-3"
                  style={{ background: 'linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary))' }}
                >
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                    style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                  >
                    &#x1D54F; Article
                  </span>
                </div>
                <div className="p-3">
                  <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                    The Science Behind Every Viral Launch Video on X
                  </span>
                </div>
              </div>
            </TweetCard>
          </motion.div>
        </div>
      </section>

      {/* ─── HydraDB Case Study ─── */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <motion.div {...fadeUp}>
          <h2
            className="text-3xl md:text-4xl font-semibold mb-2"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            HydraDB Launch: 3M+ Views In 24 Hours
          </h2>
          <p className="text-sm italic mb-10" style={{ color: 'var(--text-muted)' }}>
            Full case study coming soon
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="max-w-xl mx-auto"
        >
          <TweetCard
            name="Nishkarsh"
            handle="contextkingceo"
            verified
            tweetUrl="https://x.com/contextkingceo/status/2032098309029220456"
            text={<>
              <p className="mb-2">We've raised $6.5M to kill vector databases.</p>
              <p className="mb-2">Every system today retrieves context the same way: vector search that stores everything as flat embeddings and returns whatever "feels" closest.</p>
              <p>Similar, sure. Relevant? Almost never.</p>
            </>}
            date="7:16 AM · Mar 12, 2026 · 3.7M Views"
            stats={{ views: '3.7M', replies: '614', retweets: '969', likes: '5.9K', bookmarks: '4.4K' }}
          >
            <div
              className="rounded-xl h-48 flex items-center justify-center mb-2"
              style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)', border: '1px solid var(--border-color)' }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
                <span style={{ fontSize: '20px' }}>&#9654;</span>
              </div>
            </div>
          </TweetCard>
        </motion.div>
      </section>

      {/* ─── Mave Health Case Study ─── */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <motion.div {...fadeUp}>
          <h2
            className="text-3xl md:text-4xl font-semibold mb-2"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Mave Health Seed: 2M Views in 12 Hours
          </h2>
          <p className="text-sm italic mb-10" style={{ color: 'var(--text-muted)' }}>
            Launch video done separately. Strategy & amplification by Atomik
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="max-w-xl mx-auto"
        >
          <TweetCard
            name="Dhawal Jain"
            handle="thatssodhawal"
            verified
            tweetUrl="https://x.com/thatssodhawal/status/2034276417530151200"
            text={<>
              <p className="mb-2">We've raised $2.1M to fix your focus.</p>
              <p className="mb-2">Our wearable headset @mavehealth improves attention & stress regulation in just 20 minutes a day for users at @Google, @ufc, @ycombinator.</p>
              <p>Backed by @BlumeVentures, alongside existing and new investors.</p>
            </>}
            date="7:31 AM · Mar 18, 2026 · 2.4M Views"
            stats={{ views: '2.4M', replies: '404', retweets: '1K', likes: '3.1K', bookmarks: '1.7K' }}
          >
            <div
              className="rounded-xl h-48 flex items-center justify-center mb-2"
              style={{ background: 'linear-gradient(135deg, #1a2e1a, #162e16)', border: '1px solid var(--border-color)' }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
                <span style={{ fontSize: '20px' }}>&#9654;</span>
              </div>
            </div>
          </TweetCard>
        </motion.div>
      </section>

      {/* ─── Our Work (YouTube Videos) ─── */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.div {...fadeUp}>
          <h2
            className="text-4xl font-semibold mb-12"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Our Work
          </h2>
        </motion.div>

        {/* First row — full width hero video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden aspect-video max-w-4xl mx-auto mb-4"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
        >
          <iframe
            src="https://www.youtube.com/embed/E2E1GmvMgkc"
            title="Atomik Launch Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </motion.div>

        {/* Second row — two videos side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="rounded-2xl overflow-hidden aspect-video"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
          >
            <iframe
              src="https://www.youtube.com/embed/wUikKaFZT0k"
              title="Atomik Launch Video 2"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="rounded-2xl overflow-hidden aspect-video"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
          >
            <iframe
              src="https://www.youtube.com/embed/wwjTnJ8MIuY"
              title="Atomik Launch Video 3"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </motion.div>
        </div>
      </section>

      {/* ─── Process (2-column grid) ─── */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <motion.div {...fadeUp} className="text-center mb-16">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.3em] mb-3 block"
            style={{ color: 'var(--gold-base)' }}
          >
            Our Process
          </span>
          <h2
            className="text-4xl font-semibold"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            From Concept To Launch
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14 mb-14">
          {PROCESS_PHASES.slice(0, 4).map((phase, i) => (
            <motion.div
              key={phase.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <span
                className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
              >
                Phase {phase.num}
              </span>
              <h3
                className="text-2xl font-semibold mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {phase.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {phase.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Phase 05 centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-lg mx-auto"
        >
          <span
            className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block"
            style={{ color: 'var(--text-muted)' }}
          >
            Phase {PROCESS_PHASES[4].num}
          </span>
          <h3
            className="text-2xl font-semibold mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {PROCESS_PHASES[4].title}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {PROCESS_PHASES[4].desc}
          </p>
        </motion.div>
      </section>

      {/* ─── Partner CTA ─── */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center" style={{ borderTop: '1px solid var(--border-color)' }}>
        <motion.div {...fadeUp}>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Partner With Us
          </h2>
          <p
            className="text-base mb-8 max-w-md mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            For launch videos that refuse to not go viral and get demos lined up.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] no-underline transition-all duration-200"
            style={{
              background: 'transparent',
              color: 'var(--gold-base)',
              border: '1px solid var(--gold-base)',
              fontFamily: 'var(--font-body)',
            }}
          >
            Book A Call
          </a>
        </motion.div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        className="py-16 px-6"
        style={{ borderTop: '1px solid var(--border-color)' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <img
                  src="https://www.atomikgrowth.com/atomik-icon-white.png"
                  alt=""
                  className="w-5 h-5 object-contain"
                  style={{ filter: 'var(--text-primary)' === '#1C1917' ? 'invert(1)' : 'none' }}
                />
                <span
                  className="text-lg font-semibold"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Atomik Growth
                </span>
              </div>
              <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>
                Tech Media & Distribution.
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>San Francisco</p>
              <a href="tel:+16282944170" className="text-xs no-underline block" style={{ color: 'var(--text-muted)' }}>
                +1 (628) 294-4170
              </a>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--gold-base)' }}>Services</h4>
              <div className="flex flex-col gap-2.5 text-xs">
                <a href={`${BASE}/services/launch-virality`} target="_blank" rel="noopener noreferrer" className="no-underline transition-colors duration-200" style={{ color: 'var(--text-secondary)' }}>Launch Virality</a>
                <a href={`${BASE}/services/podcasting`} target="_blank" rel="noopener noreferrer" className="no-underline transition-colors duration-200" style={{ color: 'var(--text-secondary)' }}>Podcasting</a>
                <a href={`${BASE}/services/clipping`} target="_blank" rel="noopener noreferrer" className="no-underline transition-colors duration-200" style={{ color: 'var(--text-secondary)' }}>Clipping</a>
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--gold-base)' }}>Company</h4>
              <div className="flex flex-col gap-2.5 text-xs">
                <a href={`${BASE}/case-studies`} target="_blank" rel="noopener noreferrer" className="no-underline transition-colors duration-200" style={{ color: 'var(--text-secondary)' }}>Case Studies</a>
                <a href={`${BASE}/contact`} target="_blank" rel="noopener noreferrer" className="no-underline transition-colors duration-200" style={{ color: 'var(--text-secondary)' }}>Contact</a>
                <a href={`${BASE}/blog`} target="_blank" rel="noopener noreferrer" className="no-underline transition-colors duration-200" style={{ color: 'var(--text-secondary)' }}>Blog</a>
                <a href={`${BASE}/careers`} target="_blank" rel="noopener noreferrer" className="no-underline transition-colors duration-200" style={{ color: 'var(--text-secondary)' }}>Careers</a>
              </div>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--gold-base)' }}>Connect</h4>
              <div className="flex flex-col gap-2.5 text-xs">
                <a href="https://linkedin.com/company/atomik-growth" target="_blank" rel="noopener noreferrer" className="no-underline transition-colors duration-200" style={{ color: 'var(--text-secondary)' }}>LinkedIn</a>
                <a href="https://twitter.com/atomikgrowth_" target="_blank" rel="noopener noreferrer" className="no-underline transition-colors duration-200" style={{ color: 'var(--text-secondary)' }}>X</a>
                <a href="https://instagram.com/atomikgrowth" target="_blank" rel="noopener noreferrer" className="no-underline transition-colors duration-200" style={{ color: 'var(--text-secondary)' }}>Instagram</a>
              </div>
            </div>
          </div>

          <div
            className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px]"
            style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
          >
            <span>&copy; 2026 Atomik Growth. All rights reserved.</span>
            <div className="flex items-center gap-1">
              <span>·</span>
              <a href={`${BASE}/privacy`} target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: 'var(--text-muted)' }}>Privacy Policy</a>
              <span>·</span>
              <a href={`${BASE}/terms`} target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: 'var(--text-muted)' }}>Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
