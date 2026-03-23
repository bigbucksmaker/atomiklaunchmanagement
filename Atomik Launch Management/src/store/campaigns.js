import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import { supabase } from '../lib/supabase'

const TEAM_MEMBERS = ['Hannaan', 'Subah', 'Vihaan', 'Karan', 'Khushal', 'Khushi', 'Arthur']

const STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  IN_REVISION: 'in_revision',
  SENT_TO_CLIENT: 'sent_to_client',
  APPROVED: 'approved',
  DONE: 'done',
}

const STATUS_CYCLE = [
  STATUS.NOT_STARTED,
  STATUS.IN_PROGRESS,
  STATUS.SENT_TO_CLIENT,
  STATUS.APPROVED,
]

const REVISION_STATUS_CYCLE = [
  STATUS.NOT_STARTED,
  STATUS.IN_PROGRESS,
  STATUS.IN_REVISION,
  STATUS.SENT_TO_CLIENT,
  STATUS.APPROVED,
]

function createVideoStages() {
  return {
    ideation: { status: STATUS.NOT_STARTED, assignees: [] },
    moodboard: { status: STATUS.NOT_STARTED, assignees: [] },
    scriptOptions: { status: STATUS.NOT_STARTED, assignees: [] },
    scriptFinalized: false,
    aiAnimation: { status: STATUS.NOT_STARTED, assignees: ['Karan'], frameLinks: [] },
    motionDesign: { status: STATUS.NOT_STARTED, assignees: ['Khushal'], frameLinks: [] },
    sentToClient: false,
    videoApproved: false,
  }
}

function createVideo(index) {
  return {
    id: uuidv4(),
    label: `Video ${index + 1}`,
    stages: createVideoStages(),
  }
}

function createInfluencerTrack() {
  return {
    listCreation: { status: STATUS.NOT_STARTED, assignees: [] },
    listSentToClient: false,
    listApproved: false,
    copiesWritten: { status: STATUS.NOT_STARTED, assignees: ['Khushi'] },
    copiesSentToClient: false,
    copiesApproved: false,
    warmupTextsSent: { status: STATUS.NOT_STARTED, assignees: [] },
    quoteTweetsSent: { status: STATUS.NOT_STARTED, assignees: [] },
    launchDayLinkSent: { status: STATUS.NOT_STARTED, assignees: [] },
  }
}

function createCampaign(companyName, numberOfVideos = 1, launchDate = null, notes = '') {
  return {
    id: uuidv4(),
    companyName,
    launchDate,
    numberOfVideos,
    notes,
    createdAt: new Date().toISOString(),
    videos: Array.from({ length: numberOfVideos }, (_, i) => createVideo(i)),
    influencer: createInfluencerTrack(),
    campaignInfluencers: [],
    videoPreviews: [],
  }
}

const SEED_CAMPAIGNS = [
  createCampaign('HydraDB', 5, null, 'Context graph database, founded by Nishkarsh'),
  createCampaign('Lica', 1, null, 'AI brand-aware visual model'),
  createCampaign('Superblocks', 1, null, 'Clark 2.0 launch'),
  createCampaign('Composio', 1, null, 'Composio 2.0, contact: Quinn Donohue'),
]

// Supabase sync helpers
async function loadFromSupabase() {
  try {
    const { data, error } = await supabase.from('campaigns').select('id, data')
    if (error) throw error
    if (data && data.length > 0) {
      return data.map(row => row.data)
    }
  } catch (e) {
    console.error('Supabase load failed, using local:', e)
  }
  return null
}

async function saveCampaignToSupabase(campaign) {
  try {
    await supabase.from('campaigns').upsert({ id: campaign.id, data: campaign, updated_at: new Date().toISOString() })
  } catch (e) {
    console.error('Supabase save failed:', e)
  }
}

async function deleteCampaignFromSupabase(id) {
  try {
    await supabase.from('campaigns').delete().eq('id', id)
  } catch (e) {
    console.error('Supabase delete failed:', e)
  }
}

async function syncAllToSupabase(campaigns) {
  try {
    const rows = campaigns.map(c => ({ id: c.id, data: c, updated_at: new Date().toISOString() }))
    await supabase.from('campaigns').upsert(rows)
  } catch (e) {
    console.error('Supabase sync failed:', e)
  }
}

// Local storage fallback
function loadLocal() {
  try {
    const saved = localStorage.getItem('atomik-campaigns')
    if (saved) return JSON.parse(saved).campaigns
  } catch (e) {}
  return null
}

function saveLocal(campaigns) {
  try {
    localStorage.setItem('atomik-campaigns', JSON.stringify({ campaigns }))
  } catch (e) {}
}

// Progress calculation helpers
function isStageComplete(stage) {
  if (typeof stage === 'boolean') return stage
  if (stage && typeof stage === 'object') {
    return stage.status === STATUS.APPROVED || stage.status === STATUS.DONE
  }
  return false
}

function calculateVideoProgress(video) {
  const stages = video.stages
  const items = [
    stages.ideation, stages.moodboard, stages.scriptOptions,
    stages.scriptFinalized, stages.aiAnimation, stages.motionDesign,
    stages.sentToClient, stages.videoApproved,
  ]
  return { done: items.filter(isStageComplete).length, total: items.length }
}

function calculateInfluencerProgress(inf) {
  const items = [
    inf.listCreation, inf.listSentToClient, inf.listApproved,
    inf.copiesWritten, inf.copiesSentToClient, inf.copiesApproved,
    inf.warmupTextsSent, inf.quoteTweetsSent, inf.launchDayLinkSent,
  ]
  return { done: items.filter(isStageComplete).length, total: items.length }
}

function calculateCampaignProgress(campaign) {
  let totalDone = 0, totalItems = 0
  campaign.videos.forEach(v => {
    const p = calculateVideoProgress(v)
    totalDone += p.done
    totalItems += p.total
  })
  const inf = calculateInfluencerProgress(campaign.influencer)
  totalDone += inf.done
  totalItems += inf.total
  return totalItems === 0 ? 0 : Math.round((totalDone / totalItems) * 100)
}

function calculateTrackProgress(campaign, track) {
  if (track === 'video') {
    let totalDone = 0, totalItems = 0
    campaign.videos.forEach(v => {
      const p = calculateVideoProgress(v)
      totalDone += p.done
      totalItems += p.total
    })
    return totalItems === 0 ? 0 : Math.round((totalDone / totalItems) * 100)
  }
  const inf = calculateInfluencerProgress(campaign.influencer)
  return inf.total === 0 ? 0 : Math.round((inf.done / inf.total) * 100)
}

const HIGH_LEVEL_STAGES = [
  'Ideation & Moodboard', 'Scripting', 'AI Animation (Karan)',
  'Motion Design (Khushal)', 'Client Review', 'Influencer Outreach',
  'Ready to Launch', 'Launched',
]

function getCampaignStage(campaign) {
  const progress = calculateCampaignProgress(campaign)
  if (progress === 100) return 'Launched'
  const allVideos = campaign.videos
  const allVideoApproved = allVideos.every(v => v.stages.videoApproved)
  const allSentToClient = allVideos.every(v => v.stages.sentToClient)
  const allMotionDone = allVideos.every(v => isStageComplete(v.stages.motionDesign))
  const allAiDone = allVideos.every(v => isStageComplete(v.stages.aiAnimation))
  const allScriptFinalized = allVideos.every(v => v.stages.scriptFinalized)
  const anyScriptInProgress = allVideos.some(v => v.stages.scriptOptions.status !== 'not_started')
  const anyAiInProgress = allVideos.some(v => v.stages.aiAnimation.status !== 'not_started')
  const anyMotionInProgress = allVideos.some(v => v.stages.motionDesign.status !== 'not_started')
  const inf = campaign.influencer
  const infOutreachStarted = inf.warmupTextsSent.status !== 'not_started' || inf.quoteTweetsSent.status !== 'not_started'
  if (allVideoApproved && inf.copiesApproved) return 'Ready to Launch'
  if (infOutreachStarted) return 'Influencer Outreach'
  if (allSentToClient || (allMotionDone && !allVideoApproved)) return 'Client Review'
  if (anyMotionInProgress || allAiDone) return 'Motion Design (Khushal)'
  if (anyAiInProgress || allScriptFinalized) return 'AI Animation (Karan)'
  if (anyScriptInProgress) return 'Scripting'
  return 'Ideation & Moodboard'
}

const useCampaignStore = create((set, get) => {
  // Load local first for instant display, then sync from Supabase
  const localCampaigns = loadLocal() || SEED_CAMPAIGNS

  // Async load from Supabase
  loadFromSupabase().then(remote => {
    if (remote && remote.length > 0) {
      set({ campaigns: remote })
      saveLocal(remote)
    } else {
      // First time: push seed data to Supabase
      syncAllToSupabase(localCampaigns)
    }
  })

  return {
    campaigns: localCampaigns,

    addCampaign: (companyName, numberOfVideos, launchDate, notes) => {
      const newCampaign = createCampaign(companyName, numberOfVideos, launchDate, notes)
      set(state => {
        const updated = [...state.campaigns, newCampaign]
        saveLocal(updated)
        saveCampaignToSupabase(newCampaign)
        return { campaigns: updated }
      })
    },

    deleteCampaign: (campaignId) => {
      set(state => {
        const updated = state.campaigns.filter(c => c.id !== campaignId)
        saveLocal(updated)
        deleteCampaignFromSupabase(campaignId)
        return { campaigns: updated }
      })
    },

    updateCampaign: (campaignId, updates) => {
      set(state => {
        const updated = state.campaigns.map(c => c.id === campaignId ? { ...c, ...updates } : c)
        saveLocal(updated)
        const campaign = updated.find(c => c.id === campaignId)
        if (campaign) {
          saveCampaignToSupabase(campaign)
          // Sync launch date to matching CRM lead
          if ('launchDate' in updates) {
            try {
              const { useCrmStore } = require('./crm')
              const leads = useCrmStore.getState().leads
              const match = leads.find(l => l.name.toLowerCase() === campaign.companyName.toLowerCase())
              if (match) useCrmStore.getState().updateLead(match.id, { launchDate: updates.launchDate })
            } catch (e) {}
          }
        }
        return { campaigns: updated }
      })
    },

    updateVideoStage: (campaignId, videoId, stageName, value) => {
      set(state => {
        const updated = state.campaigns.map(c => {
          if (c.id !== campaignId) return c
          return { ...c, videos: c.videos.map(v => v.id !== videoId ? v : { ...v, stages: { ...v.stages, [stageName]: value } }) }
        })
        saveLocal(updated)
        const campaign = updated.find(c => c.id === campaignId)
        if (campaign) saveCampaignToSupabase(campaign)
        return { campaigns: updated }
      })
    },

    updateInfluencerStage: (campaignId, stageName, value) => {
      set(state => {
        const updated = state.campaigns.map(c => {
          if (c.id !== campaignId) return c
          return { ...c, influencer: { ...c.influencer, [stageName]: value } }
        })
        saveLocal(updated)
        const campaign = updated.find(c => c.id === campaignId)
        if (campaign) saveCampaignToSupabase(campaign)
        return { campaigns: updated }
      })
    },

    setCampaignInfluencers: (campaignId, influencers) => {
      set(state => {
        const updated = state.campaigns.map(c => c.id === campaignId ? { ...c, campaignInfluencers: influencers } : c)
        saveLocal(updated)
        const campaign = updated.find(c => c.id === campaignId)
        if (campaign) saveCampaignToSupabase(campaign)
        return { campaigns: updated }
      })
    },

    removeCampaignInfluencer: (campaignId, username) => {
      set(state => {
        const updated = state.campaigns.map(c => {
          if (c.id !== campaignId) return c
          return { ...c, campaignInfluencers: c.campaignInfluencers.filter(i => i.username !== username) }
        })
        saveLocal(updated)
        const campaign = updated.find(c => c.id === campaignId)
        if (campaign) saveCampaignToSupabase(campaign)
        return { campaigns: updated }
      })
    },

    // Refresh from Supabase
    refreshFromSupabase: async () => {
      const remote = await loadFromSupabase()
      if (remote && remote.length > 0) {
        set({ campaigns: remote })
        saveLocal(remote)
      }
    },

    getCampaign: (id) => get().campaigns.find(c => c.id === id),
  }
})

export {
  useCampaignStore,
  TEAM_MEMBERS,
  STATUS,
  STATUS_CYCLE,
  REVISION_STATUS_CYCLE,
  HIGH_LEVEL_STAGES,
  calculateCampaignProgress,
  calculateTrackProgress,
  getCampaignStage,
  isStageComplete,
}
