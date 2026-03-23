import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

const CRM_STATUSES = [
  '1. Lead',
  '2. Call booked',
  '3. Second call booked',
  '4. Call done',
  '5. Proposal sent',
  '6. MSA sent',
  '7. Closed',
  '8. Rejected',
]

const CRM_TIERS = ['1M', '2M', '2.5M', '3M', '5M']
const CRM_VENDORS = ['Atomik', 'Other vendor', 'Unknown']
const CRM_OWNERS = ['Subah', 'Arthur', 'Vihaan', 'Hannaan']
const CRM_SOURCES = [
  'X', 'Referral', 'We emailed them', 'Podcasting days', 'Subah reels',
  'Booked call from X', 'X article', 'X Post',
]

function createLead(data = {}) {
  return {
    id: uuidv4(),
    name: data.name || '',
    amplificationTier: data.amplificationTier || '',
    budgetInputted: data.budgetInputted || '',
    closedAmount: data.closedAmount || '',
    companyOneLiner: data.companyOneLiner || '',
    firefliesLinks: data.firefliesLinks || [],
    funding: data.funding || '',
    launchDate: data.launchDate || '',
    launchVideoVendor: data.launchVideoVendor || '',
    owner: data.owner || '',
    prospectPOC: data.prospectPOC || '',
    source: data.source || '',
    status: data.status || '1. Lead',
    website: data.website || '',
    notes: data.notes || [],
    createdAt: data.createdAt || new Date().toISOString(),
  }
}

const SEED_LEADS = [
  createLead({ name: 'Neuralace', amplificationTier: '5M', budgetInputted: '$100,000', closedAmount: '$135,000.00', companyOneLiner: 'Personal brain computer interfaces', firefliesLinks: ['https://app.fireflies.ai/view/Akshaj-Jain-and-Arthur-Zargaryan-Subah-Wadhwani::01KKSM7Y0H3DGFT6R2QQ51SQRH', 'https://app.fireflies.ai/view/Akshaj-Jain-and-Arthur-Zargaryan-Subah-Wadhwani::01KKWDPGB1AMPM9TVNZ9B3MS95'], funding: '$100M+', launchDate: 'March 31, 2026', launchVideoVendor: 'Other vendor', owner: 'Subah', prospectPOC: 'Akshaj Jain', source: 'Rahul Tarak?', status: '6. MSA sent', website: 'https://www.neuralace.co/' }),
  createLead({ name: 'Lica', amplificationTier: '1M', budgetInputted: '$8,000', closedAmount: '$50,000.00', companyOneLiner: 'Foundational AI model for ecommerce', firefliesLinks: ['https://app.fireflies.ai/view/Onboarding-Call-Lica-x-Atomik::01KK79KT8QH0PFP0W8C0G2VYQ1', 'https://app.fireflies.ai/view/Lica-World-Atomik-Growth::01KM5WDM8NC6YGDV2EYHMH6CJ9'], funding: '$4M Seed', launchDate: 'March 26, 2026', launchVideoVendor: 'Atomik', status: '7. Closed', website: 'https://lica.world' }),
  createLead({ name: 'HydraDB', amplificationTier: '1M', closedAmount: '$45,000.00', companyOneLiner: 'Context for AI', firefliesLinks: ['https://app.fireflies.ai/view/Kartik-Chauhan-and-Arthur-Zargaryan-Subah-Wadhwani::01KJNKGRWEJQWD3AW6244G2GCA', 'https://app.fireflies.ai/view/Cortex-Atomik-Kickoff::01KJZQP7XX1JM74X4SR0A1P95F', 'https://app.fireflies.ai/view/HydraDB-Atomik-Growth::01KKN6KZ8XVXJTJRWQDZ70GAHC'], funding: '$6.5M Seed', launchDate: 'March 13, 2026', launchVideoVendor: 'Atomik', owner: 'Vihaan', source: 'Subah reels', status: '7. Closed', website: 'https://hydradb.com' }),
  createLead({ name: 'Mave Health', amplificationTier: '1M', closedAmount: '$22,200.00', companyOneLiner: 'Healthtech wearable', firefliesLinks: ['https://app.fireflies.ai/view/Mave-Health-Atomik-Growth::01KKTGZ4SWFCKP4N3VN6S9Y6PC', 'https://app.fireflies.ai/view/Mave-Health-Atomik-Growth::01KKYHQ08JBHY9RRFX8D7C0PW7', 'https://app.fireflies.ai/view/Mave-Atomik::01KM3JA9H35YA89EPN1ZCR49SW'], funding: '$2.1M Seed', launchDate: 'March 18, 2026', launchVideoVendor: 'Unknown', status: '7. Closed', website: 'https://www.mavehealth.com/' }),
  createLead({ name: 'HydraDB 5 Video Series', amplificationTier: '2.5M', closedAmount: '$105,500.00', companyOneLiner: 'Context for AI', funding: '$6.5M Seed', launchDate: 'March 25, 2026', launchVideoVendor: 'Atomik', owner: 'Vihaan', prospectPOC: 'Nishkarsh Srivastava', source: 'Subah reels', status: '7. Closed', website: 'https://hydradb.com' }),
  createLead({ name: 'Superblocks', amplificationTier: '5M', companyOneLiner: 'Enterprise AI app builder', firefliesLinks: ['https://app.fireflies.ai/view/Atomik-Superblocks::01KJVDX404FV5AMA49AHSK1EHE', 'https://app.fireflies.ai/view/Superblocks-Atomik::01KK2HS5W8KX19KGVWYK4CPBSS', 'https://app.fireflies.ai/view/Superblocks-Atomik::01KK7723JRRAX1XYW0QQCN93NR', 'https://app.fireflies.ai/view/Superblocks-Atomik::01KKCAJ30NQMXVPCZWY3BSQNQB', 'https://app.fireflies.ai/view/Superblocks-Atomik::01KKHG25PKZMEH1T231CT5AEP0'], funding: '$60M Series A', launchDate: 'April 14, 2026', launchVideoVendor: 'Atomik', status: '7. Closed', website: 'https://www.superblocks.com/' }),
  createLead({ name: 'DigitalLocke (VSC Ref)', companyOneLiner: 'A Permanent Listening Layer Between the Public and Power', firefliesLinks: ['https://app.fireflies.ai/view/Chris-Vijay-Subah-Arthur-Maggie::01KKFT38NMGA38J486XE3BT2V1'], funding: '$5M Seed', owner: 'Arthur', prospectPOC: 'Chris Ganan', source: 'Vijay Chattha', status: '5. Proposal sent', website: 'https://digitallocke.ai' }),
  createLead({ name: 'EnrichLabs', amplificationTier: '1M', budgetInputted: '$30,000', closedAmount: '$30,000.00', companyOneLiner: 'AI marketing agent', firefliesLinks: ['https://app.fireflies.ai/view/Seijin-Jung-and-Arthur-Zargaryan-Subah-Wadhwani::01KKA8QPMTJSPVREY852B052R5', 'https://app.fireflies.ai/view/Seijin-Jung-and-Arthur-Zargaryan-Subah-Wadhwani::01KM453WP80F4EJ4W492PVNH70'], funding: '$1.7M Pre Seed', launchDate: 'March 31, 2026', launchVideoVendor: 'Unknown', status: '7. Closed', website: 'https://enrichlabs.ai/' }),
  createLead({ name: 'DeepTrace', companyOneLiner: 'Identifies and fixes alerts in production', funding: '$5M', launchDate: 'June 15, 2026', status: '8. Rejected', website: 'https://deeptrace.com/' }),
  createLead({ name: 'GameRamp', budgetInputted: '$200,000', companyOneLiner: 'Faster decisions for teams using AI', firefliesLinks: ['https://app.fireflies.ai/view/Vivek-Ramachandran-and-Arthur-Zargaryan-Subah-Wadhwani::01KKMHJ70BE0SBFQ3NM4Y49819'], funding: '$5.5M Pre-seed', launchDate: 'April 28, 2026', launchVideoVendor: 'Unknown', owner: 'Subah', prospectPOC: 'Vivek Ramachandran', source: 'Prateek Metha (SPC)', status: '3. Second call booked', website: 'https://gameramp.com' }),
  createLead({ name: 'Mayfield', companyOneLiner: 'First institutional investor for early stage AI startups', firefliesLinks: ['https://app.fireflies.ai/view/Atomik-Mayfield::01KM61A7CWTFHH56BKF12SFHK6'], funding: '$1.8B', owner: 'Subah', prospectPOC: 'Shivani Gupta - Marketing', source: 'Podcasting days', status: '5. Proposal sent', website: 'https://www.mayfield.com/' }),
  createLead({ name: 'Sim AI', amplificationTier: '2M', companyOneLiner: 'Sim is the AI Workspace for Agent Builders.', firefliesLinks: ['https://app.fireflies.ai/view/Atomik-Growth-Sim-ai::01KM6XJ7639PM7FNYHTB9R6ZJF'], funding: '$7M Series A', launchDate: 'March 24, 2026', launchVideoVendor: 'Other vendor', source: 'We emailed them', status: '5. Proposal sent', website: 'https://sim.ai' }),
  createLead({ name: 'Topify AI', budgetInputted: '$10K for 1 video', companyOneLiner: 'GEO Platform for marketing teams', funding: '$1.5M', source: 'Referral (Nishkarsh)', status: '2. Call booked', website: 'https://www.topify.ai/' }),
  createLead({ name: 'Champ AI', companyOneLiner: 'Champ is building AI Agents to automate your SOPs.', source: 'Referral from Rashad (Redpoint Ventures)', status: '4. Call done', website: 'https://www.champ.ai/' }),
  createLead({ name: 'Tano AI', budgetInputted: '$20,000', companyOneLiner: 'Tano helps DTC brands scale their influencer and affiliate programs by using AI agents', funding: '£3.7M Series A', source: 'Booked call from X', status: '2. Call booked', website: 'https://www.tano.ai/' }),
  createLead({ name: 'Tryloop AI', companyOneLiner: 'AI agents to drive profitable growth for restaurant & retail', funding: '$14M Series A', status: '3. Second call booked', website: 'https://www.loopai.com/' }),
  createLead({ name: 'Sedona Health', budgetInputted: '$20,000/month', companyOneLiner: 'Stealth Mode health company', funding: 'Stealth Mode', source: 'X', status: '2. Call booked' }),
  createLead({ name: 'Smallest AI', budgetInputted: '$25,000', companyOneLiner: 'AGI under 10B parameters', funding: '$8M Seed', source: 'Referral (HydraDB)', status: '2. Call booked', website: 'https://smallest.ai/' }),
  createLead({ name: 'Pantio IO', budgetInputted: '$30,000/month', companyOneLiner: 'Pantio is an AI platform that lets you create a digital persona', funding: 'N/A', source: 'X', status: '2. Call booked', website: 'https://pantio.io/' }),
  createLead({ name: 'CrowdReply.net', budgetInputted: '$15,000', companyOneLiner: 'CrowdReply is the AI search visibility platform that goes beyond analytics.', funding: 'N/A', source: 'Referral', status: '2. Call booked', website: 'https://crowdreply.io/' }),
  createLead({ name: 'Edison Scientific', budgetInputted: 'Not defined, but well-funded', companyOneLiner: 'The AI platform for scientific R&D.', funding: '$70M Seed Round', source: 'Referral', status: '2. Call booked', website: 'https://edisonscientific.com/' }),
  createLead({ name: 'Delphi', companyOneLiner: 'Create digital minds for anyone', funding: '$16M Series A', status: '8. Rejected', website: 'https://delphi.ai' }),
  createLead({ name: 'Skild AI', companyOneLiner: 'Bringing AI into the physical world', firefliesLinks: ['https://app.fireflies.ai/view/ZOOM-Call-Deepak-Atomik-Growth::01KJE95M1WSS16EN4YXWQ4WNFT'], funding: '$1.81B', owner: 'Subah', prospectPOC: 'Deepak Pathak - CEO', source: 'Shikhar - Friend', status: '5. Proposal sent', website: 'https://www.skild.ai/' }),
  createLead({ name: 'Altitude (sqds.io)', companyOneLiner: 'Squads Protocol', funding: '$5.7M', source: 'We emailed them (Found on X)', status: '2. Call booked', website: 'https://squads.xyz/' }),
  createLead({ name: 'Ecomrads', budgetInputted: 'Yet to decide', companyOneLiner: 'Product photos to studio quality ads in minutes.', funding: 'Bootstrapped', source: 'X article', status: '2. Call booked', website: 'https://ecomrads.com/' }),
  createLead({ name: 'Composio', amplificationTier: '3M', budgetInputted: '$100,000', closedAmount: '$107,000.00', companyOneLiner: 'AI agent infrastructure platform that provides production-ready tool.', funding: '$29M total', launchDate: 'March 27, 2026', launchVideoVendor: 'Atomik', source: 'X', status: '6. MSA sent', website: 'https://composio.dev/' }),
  createLead({ name: 'CodeRabbit', budgetInputted: '$50,000', companyOneLiner: 'AI Powered code review', funding: '$88M total ($60M Series B)', source: 'Referral (HydraDB)', status: '2. Call booked', website: 'https://www.coderabbit.ai/' }),
  createLead({ name: 'Natura AI', companyOneLiner: 'Hardware+software AI lab', funding: 'Crowdfunding', source: 'We emailed them', status: '2. Call booked', website: 'https://naturaumana.ai/' }),
  createLead({ name: 'Cognition', budgetInputted: 'Discuss live', companyOneLiner: 'The AI software engineer', funding: '$696M total ($400M latest)', source: 'Referral', status: '2. Call booked', website: 'https://cognition.ai/' }),
  createLead({ name: 'Super AI', budgetInputted: '$300K total', companyOneLiner: "The world's largest AI event (Event Company)", source: 'X Post', status: '2. Call booked', website: 'https://www.superai.com/' }),
  createLead({ name: 'Bilt Rewards', budgetInputted: 'N/A but huge company', companyOneLiner: 'Earn points on rent and mortgage.', funding: '$250M at $10B+ Valuation', source: 'We emailed them', status: '2. Call booked', website: 'https://www.bilt.com/' }),
]

function loadCrm() {
  try {
    const saved = localStorage.getItem('atomik-crm')
    if (saved) return JSON.parse(saved)
  } catch (e) {
    console.error('Failed to load CRM:', e)
  }
  return { leads: SEED_LEADS }
}

function saveCrm(state) {
  try {
    localStorage.setItem('atomik-crm', JSON.stringify({ leads: state.leads }))
  } catch (e) {
    console.error('Failed to save CRM:', e)
  }
}

const useCrmStore = create((set, get) => {
  const initial = loadCrm()
  return {
    leads: initial.leads,

    addLead: (data) => {
      set(state => {
        const newState = { leads: [...state.leads, createLead(data)] }
        saveCrm(newState)
        return newState
      })
    },

    updateLead: (id, updates) => {
      set(state => {
        const newState = { leads: state.leads.map(l => l.id === id ? { ...l, ...updates } : l) }
        saveCrm(newState)
        return newState
      })
    },

    deleteLead: (id) => {
      set(state => {
        const newState = { leads: state.leads.filter(l => l.id !== id) }
        saveCrm(newState)
        return newState
      })
    },
  }
})

export { useCrmStore, CRM_STATUSES, CRM_TIERS, CRM_VENDORS, CRM_OWNERS, CRM_SOURCES }
