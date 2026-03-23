import { motion } from 'framer-motion'
import { ArrowRight, Eye, MessageCircle, Heart, Bookmark } from 'lucide-react'
import TweetCard from '../components/TwitterEmbed'

const CALENDLY_URL = 'https://calendly.com/d/5cr-qm2-f2h/atomik-growth-intro-call'
const PLAYBOOK_URL = 'https://www.atomikgrowth.com/blog/the-science-behind-every-viral-launch-video-on-x'
const BASE = 'https://www.atomikgrowth.com'

function RetweetIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 014-4h14" />
      <path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 01-4 4H3" />
    </svg>
  )
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
      <header className="relative pt-32 pb-16 md:pb-20 px-6 md:px-12 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>01</p>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl mb-6"
              style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, lineHeight: 1.1, color: 'var(--text-primary)' }}
            >
              Launch Virality
            </h1>
            <p
              className="text-base md:text-lg max-w-md leading-relaxed mb-8"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
            >
              From ideation, scripting, recording, editing, to guaranteeing millions of views on X & LinkedIn. We do it all.
            </p>
            <a
              href={PLAYBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-[0.2em] inline-flex items-center gap-2 transition-opacity"
              style={{ color: '#D4B46E', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}
            >
              Our Playbook <ArrowRight size={14} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Subah's Article Card */}
            <a
              href="https://x.com/subahwadhwani/status/2027526010300993796"
              target="_blank"
              rel="noopener noreferrer"
              className="block no-underline transition-all duration-300"
              style={{ padding: 24, borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: 'inherit' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <img alt="Subah Wadhwani" src="/subah_headshot5.png" className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="flex items-center gap-1 text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>
                      Subah Wadhwani
                      <svg width="14" height="14" viewBox="0 0 22 22" fill="#D4B46E"><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.853-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.636.433 1.221.878 1.69.47.446 1.055.752 1.69.883.635.13 1.294.083 1.902-.14.272.587.7 1.086 1.24 1.44s1.167.551 1.813.568c.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.223 1.26.27 1.89.14.63-.134 1.212-.438 1.68-.884.468-.47.77-1.055.9-1.69.134-.636.085-1.294-.137-1.9.586-.273 1.084-.706 1.438-1.246.355-.54.552-1.17.57-1.817z" /><path d="M9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" fill="#050505" /></svg>
                    </div>
                    <div className="text-[12px]" style={{ color: 'var(--text-muted)' }}>@subahwadhwani</div>
                  </div>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--text-muted)"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </div>
              <div className="rounded-xl overflow-hidden mb-4" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="relative">
                  <img alt="The Science Behind Every Viral Launch Video on X" src="/HCM3C4ra0AAG_hB.jpg" className="w-full block object-cover" style={{ aspectRatio: '2.5/1' }} />
                  <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold text-white" style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    Article
                  </div>
                </div>
                <div className="px-4 py-3">
                  <h3 className="text-[14px] font-bold leading-tight" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>The Science Behind Every Viral Launch Video on X</h3>
                </div>
              </div>
              <div className="flex gap-4 flex-wrap text-[12px]" style={{ color: 'var(--text-muted)' }}>
                <span className="flex items-center gap-1.5"><MessageCircle size={14} strokeWidth={1.5} /><span className="font-medium">19</span></span>
                <span className="flex items-center gap-1.5"><RetweetIcon /><span className="font-medium">36</span></span>
                <span className="flex items-center gap-1.5"><Heart size={14} strokeWidth={1.5} /><span className="font-medium">364</span></span>
                <span className="flex items-center gap-1.5"><Eye size={14} strokeWidth={1.5} /><span className="font-medium">92K</span></span>
              </div>
            </a>
          </motion.div>
        </div>
      </header>

      {/* ─── HydraDB Case Study ─── */}
      <section className="py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              HydraDB Launch: 3M+ Views In 24 Hours
            </h2>
            <p className="italic" style={{ color: 'var(--text-muted)', fontSize: 15 }}>Full case study coming soon</p>
          </div>
          <TweetCard
            name="Nishkarsh"
            handle="contextkingceo"
            avatar="/gBD-1YKd_normal.jpg"
            verified
            tweetUrl="https://x.com/contextkingceo/status/2032098309029220456"
            text={"We've raised $6.5M to kill vector databases.\nEvery system today retrieves context the same way: vector search that stores everything as flat embeddings and returns whatever \"feels\" closest.\nSimilar, sure. Relevant? Almost never."}
            videoThumb="/RT6n1T6AgDpzauqd.jpg"
            date={'7:16 AM · Mar 12, 2026 · <span style="font-weight:600;color:var(--text-primary)">3.7M</span> Views'}
            stats={{ views: '3.7M', replies: '614', retweets: '969', likes: '5.9K', bookmarks: '4.4K' }}
          />
        </div>
      </section>

      {/* ─── Mave Health Case Study ─── */}
      <section className="py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              Mave Health Seed: 2M Views in 12 Hours
            </h2>
            <p className="italic" style={{ color: 'var(--text-muted)', fontSize: 15 }}>Launch video done separately. Strategy & amplification by Atomik</p>
          </div>
          <TweetCard
            name="Dhawal Jain"
            handle="thatssodhawal"
            avatar="/nv43BxvY_normal.jpg"
            verified
            tweetUrl="https://x.com/thatssodhawal/status/2034276417530151200"
            text={<>We've raised $2.1M to fix your focus.{'\n'}Our wearable headset <span style={{ color: '#D4B46E' }}>@mavehealth</span> improves attention & stress regulation in just 20 minutes a day for users at <span style={{ color: '#D4B46E' }}>@Google</span>, <span style={{ color: '#D4B46E' }}>@ufc</span>, <span style={{ color: '#D4B46E' }}>@ycombinator</span>.{'\n'}Backed by <span style={{ color: '#D4B46E' }}>@BlumeVentures</span>, alongside existing and new investors.</>}
            videoThumb="/SCR-20260319-hxzy.jpeg"
            date={'7:31 AM · Mar 18, 2026 · <span style="font-weight:600;color:var(--text-primary)">2.4M</span> Views'}
            stats={{ views: '2.4M', replies: '404', retweets: '1K', likes: '3.1K', bookmarks: '1.7K' }}
          />
        </div>
      </section>

      {/* ─── Our Work (YouTube Videos) ─── */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-12" style={{ fontFamily: 'var(--font-heading)' }}>Our Work</h2>

          <div className="relative aspect-video rounded-2xl overflow-hidden mb-6" style={{ boxShadow: '0 25px 60px -15px rgba(0,0,0,0.5)' }}>
            <iframe
              src="https://www.youtube.com/embed/E2E1GmvMgkc"
              title="HydraDB Launch: 3M Views In 1 Day"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="aspect-video rounded-xl overflow-hidden" style={{ boxShadow: '0 15px 40px -10px rgba(0,0,0,0.4)' }}>
              <iframe
                src="https://www.youtube.com/embed/wUikKaFZT0k"
                title="ElevenLabs x a16z Originals Intro"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
            <div className="aspect-video rounded-xl overflow-hidden" style={{ boxShadow: '0 15px 40px -10px rgba(0,0,0,0.4)' }}>
              <iframe
                src="https://www.youtube.com/embed/wwjTnJ8MIuY"
                title="Anduril Fury | Unofficial Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Process ─── */}
      <section className="py-20 md:py-28 px-6 md:px-12" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--gold-base)', fontFamily: 'var(--font-body)' }}>Our Process</p>
            <h2 className="text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>From Concept To Launch</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {PROCESS_PHASES.slice(0, 4).map(phase => (
              <div key={phase.num} className="space-y-4">
                <p className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>Phase {phase.num}</p>
                <h3 className="text-2xl md:text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>{phase.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{phase.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-left md:text-center max-w-2xl mx-auto space-y-4">
            <p className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--gold-base)', fontFamily: 'var(--font-body)' }}>Phase 05</p>
            <h3 className="text-2xl md:text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>X Virality</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{PROCESS_PHASES[4].desc}</p>
          </div>
        </div>
      </section>

      {/* ─── Partner CTA ─── */}
      <section className="py-20 md:py-28 px-6 md:px-12 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Partner With Us</h2>
          <p className="text-base md:text-lg mb-8" style={{ color: 'var(--text-muted)' }}>
            For launch videos that refuse to not go viral and get demos lined up.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] no-underline transition-transform hover:scale-105"
            style={{ background: '#D4B46E', color: '#050505', fontFamily: 'var(--font-body)' }}
          >
            Book A Call
          </a>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="pt-16 pb-8 px-6 md:px-12" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
            <div>
              <a href={BASE} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-2xl tracking-wide no-underline mb-4" style={{ color: '#FFFFFF', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
                <img src="/atomik-icon-white.png" alt="" className="w-8 h-8" />
                Atomik Growth
              </a>
              <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Tech Media & Distribution.</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>San Francisco</p>
              <a href="tel:+16282944170" className="text-sm no-underline" style={{ color: 'var(--text-muted)' }}>+1 (628) 294-4170</a>
            </div>
            <div className="flex flex-wrap gap-16 md:gap-20">
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--gold-base)', fontFamily: 'var(--font-body)' }}>Services</h4>
                <div className="flex flex-col gap-2.5 text-sm">
                  <a href={`${BASE}/services/launch-virality`} target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: 'var(--text-muted)' }}>Launch Virality</a>
                  <a href={`${BASE}/services/podcasting`} target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: 'var(--text-muted)' }}>Podcasting</a>
                  <a href={`${BASE}/services/clipping`} target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: 'var(--text-muted)' }}>Clipping</a>
                </div>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--gold-base)', fontFamily: 'var(--font-body)' }}>Company</h4>
                <div className="flex flex-col gap-2.5 text-sm">
                  <a href={`${BASE}/case-studies`} target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: 'var(--text-muted)' }}>Case Studies</a>
                  <a href={`${BASE}/contact`} target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: 'var(--text-muted)' }}>Contact</a>
                  <a href={`${BASE}/blog`} target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: 'var(--text-muted)' }}>Blog</a>
                  <a href={`${BASE}/careers`} target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: 'var(--text-muted)' }}>Careers</a>
                </div>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--gold-base)', fontFamily: 'var(--font-body)' }}>Connect</h4>
                <div className="flex flex-col gap-2.5 text-sm">
                  <a href="https://linkedin.com/company/atomik-growth" target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: 'var(--text-muted)' }}>LinkedIn</a>
                  <a href="https://twitter.com/atomikgrowth_" target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: 'var(--text-muted)' }}>X</a>
                  <a href="https://instagram.com/atomikgrowth" target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: 'var(--text-muted)' }}>Instagram</a>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
            <span>© 2026 Atomik Growth. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <a href={`${BASE}/privacy`} target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: 'var(--text-muted)' }}>Privacy Policy</a>
              <a href={`${BASE}/terms`} target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: 'var(--text-muted)' }}>Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
