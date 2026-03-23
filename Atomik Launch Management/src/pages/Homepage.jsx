import { motion } from 'framer-motion'
import { ArrowRight, Eye, MessageCircle, Heart } from 'lucide-react'
import TweetCard from '../components/TwitterEmbed'

function RetweetIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 014-4h14" />
      <path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 01-4 4H3" />
    </svg>
  )
}

const CALENDLY_URL = 'https://calendly.com/d/5cr-qm2-f2h/atomik-growth-intro-call'
const PLAYBOOK_URL = 'https://www.atomikgrowth.com/blog/the-science-behind-every-viral-launch-video-on-x'
const BASE = 'https://www.atomikgrowth.com'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
}

const PROCESS_PHASES = [
  { num: '01', title: 'Discovery & Strategy', desc: "We'll start with a call to understand the product or video concept, your ICP, and the type of creative you're looking for." },
  { num: '02', title: 'Creative Development', desc: "We'll then share a short questionnaire to capture how we're collectively visualizing the project." },
  { num: '03', title: 'AI-Enhanced Production', desc: "Based on your input, we'll prepare a moodboard for each video, so we can align on the creative direction." },
  { num: '04', title: 'Launch & Amplification', desc: "Once the moodboard is approved, we'll share the first draft of the video and iterate from there." },
  { num: '05', title: 'X Virality', desc: "After launch, we share the post with our network of tech influencers to engineer virality, and sustain momentum thereafter. We guarantee millions of views based on how good your product is." },
]

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
            animate={{ opacity: 1, y: 0 }}

            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <a
              href="https://x.com/subahwadhwani/status/2027526010300993796"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl p-6 no-underline transition-all duration-300"
              style={{ border: '1px solid var(--border-color)', background: 'var(--gold-glow)' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <img alt="Subah Wadhwani" src="https://pimkkrsopwrnqbjbbvms.supabase.co/storage/v1/object/public/blog-images/avatars/subah_headshot5.png" className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="flex items-center gap-1 text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>
                      Subah Wadhwani
                      <svg width="14" height="14" viewBox="0 0 22 22" fill="var(--gold-base)"><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.853-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.636.433 1.221.878 1.69.47.446 1.055.752 1.69.883.635.13 1.294.083 1.902-.14.272.587.7 1.086 1.24 1.44s1.167.551 1.813.568c.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.223 1.26.27 1.89.14.63-.134 1.212-.438 1.68-.884.468-.47.77-1.055.9-1.69.134-.636.085-1.294-.137-1.9.586-.273 1.084-.706 1.438-1.246.355-.54.552-1.17.57-1.817z" /><path d="M9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" fill="var(--bg-primary)" /></svg>
                    </div>
                    <div className="text-[12px]" style={{ color: 'var(--text-muted)' }}>@subahwadhwani</div>
                  </div>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--text-muted)"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </div>
              {/* Article preview */}
              <div className="rounded-xl overflow-hidden mb-4" style={{ border: '1px solid var(--border-color)' }}>
                <div className="relative">
                  <img alt="The Science Behind Every Viral Launch Video on X" src="https://pbs.twimg.com/media/HCM3C4ra0AAG_hB.jpg" className="w-full block object-cover" style={{ aspectRatio: '2.5/1' }} />
                  <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold text-white" style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    Article
                  </div>
                </div>
                <div className="px-4 py-3">
                  <h3 className="text-[14px] font-bold leading-tight" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>The Science Behind Every Viral Launch Video on X</h3>
                </div>
              </div>
              {/* Stats */}
              <div className="flex gap-4 flex-wrap text-[12px]" style={{ color: 'var(--text-muted)' }}>
                <span className="flex items-center gap-1.5"><MessageCircle size={14} strokeWidth={1.5} /><span className="font-medium">19</span></span>
                <span className="flex items-center gap-1.5"><RetweetIcon size={14} /><span className="font-medium">36</span></span>
                <span className="flex items-center gap-1.5"><Heart size={14} strokeWidth={1.5} /><span className="font-medium">364</span></span>
                <span className="flex items-center gap-1.5"><Eye size={14} strokeWidth={1.5} /><span className="font-medium">92K</span></span>
              </div>
            </a>
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
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="max-w-xl mx-auto"
        >
          <TweetCard
            name="Nishkarsh"
            handle="contextkingceo"
            avatar="https://pbs.twimg.com/profile_images/1904944251517157376/gBD-1YKd_normal.jpg"
            verified
            tweetUrl="https://x.com/contextkingceo/status/2032098309029220456"
            text={"We've raised $6.5M to kill vector databases.\nEvery system today retrieves context the same way: vector search that stores everything as flat embeddings and returns whatever \"feels\" closest.\nSimilar, sure. Relevant? Almost never."}
            videoThumb="https://pbs.twimg.com/amplify_video_thumb/2032096164431216642/img/RT6n1T6AgDpzauqd.jpg"
            date={'7:16 AM · Mar 12, 2026 · <span style="font-weight:600;color:var(--text-primary)">3.7M</span> Views'}
            stats={{ views: '3.7M', replies: '614', retweets: '969', likes: '5.9K', bookmarks: '4.4K' }}
          />
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
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="max-w-xl mx-auto"
        >
          <TweetCard
            name="Dhawal Jain"
            handle="thatssodhawal"
            avatar="https://pbs.twimg.com/profile_images/1991162453175193600/nv43BxvY_normal.jpg"
            verified
            tweetUrl="https://x.com/thatssodhawal/status/2034276417530151200"
            text={"We've raised $2.1M to fix your focus.\nOur wearable headset @mavehealth improves attention & stress regulation in just 20 minutes a day for users at @Google, @ufc, @ycombinator.\nBacked by @BlumeVentures, alongside existing and new investors."}
            videoThumb=""
            date={'7:31 AM · Mar 18, 2026 · <span style="font-weight:600;color:var(--text-primary)">2.4M</span> Views'}
            stats={{ views: '2.4M', replies: '404', retweets: '1K', likes: '3.1K', bookmarks: '1.7K' }}
          />
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
          animate={{ opacity: 1, y: 0 }}
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
            animate={{ opacity: 1, y: 0 }}

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
            animate={{ opacity: 1, y: 0 }}

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
              animate={{ opacity: 1, y: 0 }}
  
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
          animate={{ opacity: 1, y: 0 }}
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
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <img
                  src="https://www.atomikgrowth.com/atomik-icon-white.png"
                  alt=""
                  className="w-5 h-5 object-contain"
                />
                <span className="text-lg font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                  Atomik Growth
                </span>
              </div>
              <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>Tech Media & Distribution.</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>San Francisco</p>
              <a href="tel:+16282944170" className="text-xs no-underline block" style={{ color: 'var(--text-muted)' }}>+1 (628) 294-4170</a>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--gold-base)' }}>Services</h4>
              <div className="flex flex-col gap-2.5 text-xs">
                <a href={`${BASE}/services/launch-virality`} target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: 'var(--text-secondary)' }}>Launch Virality</a>
                <a href={`${BASE}/services/podcasting`} target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: 'var(--text-secondary)' }}>Podcasting</a>
                <a href={`${BASE}/services/clipping`} target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: 'var(--text-secondary)' }}>Clipping</a>
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--gold-base)' }}>Company</h4>
              <div className="flex flex-col gap-2.5 text-xs">
                <a href={`${BASE}/case-studies`} target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: 'var(--text-secondary)' }}>Case Studies</a>
                <a href={`${BASE}/contact`} target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: 'var(--text-secondary)' }}>Contact</a>
                <a href={`${BASE}/blog`} target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: 'var(--text-secondary)' }}>Blog</a>
                <a href={`${BASE}/careers`} target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: 'var(--text-secondary)' }}>Careers</a>
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--gold-base)' }}>Connect</h4>
              <div className="flex flex-col gap-2.5 text-xs">
                <a href="https://linkedin.com/company/atomik-growth" target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: 'var(--text-secondary)' }}>LinkedIn</a>
                <a href="https://twitter.com/atomikgrowth_" target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: 'var(--text-secondary)' }}>X</a>
                <a href="https://instagram.com/atomikgrowth" target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: 'var(--text-secondary)' }}>Instagram</a>
              </div>
            </div>
          </div>
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px]" style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
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
