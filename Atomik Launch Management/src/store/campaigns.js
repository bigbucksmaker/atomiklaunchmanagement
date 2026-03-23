import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

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
  }
}

const SEED_CAMPAIGNS = [
  createCampaign('HydraDB', 5, null, 'Context graph database, founded by Nishkarsh'),
  createCampaign('Lica', 1, null, 'AI brand-aware visual model'),
  createCampaign('Superblocks', 1, null, 'Clark 2.0 launch'),
  createCampaign('Composio', 1, null, 'Composio 2.0, contact: Quinn Donohue'),
]

// Migrate old localStorage data to new schema
function migrateState(state) {
  return {
    ...state,
    campaigns: state.campaigns.map(c => ({
      ...c,
      campaignInfluencers: c.campaignInfluencers || [],
      videos: c.videos.map(v => ({
        ...v,
        stages: migrateVideoStages(v.stages),
      })),
      influencer: migrateInfluencerStages(c.influencer),
    })),
  }
}

function migrateVideoStages(stages) {
  const migrated = { ...stages }
  for (const key of Object.keys(migrated)) {
    const s = migrated[key]
    if (s && typeof s === 'object' && !Array.isArray(s)) {
      if ('assignee' in s && !('assignees' in s)) {
        migrated[key] = { ...s, assignees: s.assignee ? [s.assignee] : [] }
        delete migrated[key].assignee
      }
      if ('frameLink' in s && !('frameLinks' in s)) {
        migrated[key] = { ...migrated[key], frameLinks: s.frameLink ? [{ url: s.frameLink, label: '' }] : [] }
        delete migrated[key].frameLink
      }
    }
  }
  return migrated
}

function migrateInfluencerStages(inf) {
  const migrated = { ...inf }
  for (const key of Object.keys(migrated)) {
    const s = migrated[key]
    if (s && typeof s === 'object' && !Array.isArray(s)) {
      if ('assignee' in s && !('assignees' in s)) {
        migrated[key] = { ...s, assignees: s.assignee ? [s.assignee] : [] }
        delete migrated[key].assignee
      }
    }
  }
  return migrated
}

function loadState() {
  try {
    const saved = localStorage.getItem('atomik-campaigns')
    if (saved) return migrateState(JSON.parse(saved))
  } catch (e) {
    console.error('Failed to load state:', e)
  }
  return { campaigns: SEED_CAMPAIGNS }
}

function saveState(state) {
  try {
    localStorage.setItem('atomik-campaigns', JSON.stringify({ campaigns: state.campaigns }))
  } catch (e) {
    console.error('Failed to save state:', e)
  }
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
  const done = items.filter(isStageComplete).length
  return { done, total: items.length }
}

function calculateInfluencerProgress(inf) {
  const items = [
    inf.listCreation, inf.listSentToClient, inf.listApproved,
    inf.copiesWritten, inf.copiesSentToClient, inf.copiesApproved,
    inf.warmupTextsSent, inf.quoteTweetsSent, inf.launchDayLinkSent,
  ]
  const done = items.filter(isStageComplete).length
  return { done, total: items.length }
}

function calculateCampaignProgress(campaign) {
  let totalDone = 0
  let totalItems = 0
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
  'Ideation & Moodboard',
  'Scripting',
  'AI Animation (Karan)',
  'Motion Design (Khushal)',
  'Client Review',
  'Influencer Outreach',
  'Ready to Launch',
  'Launched',
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
  const infOutreachStarted = inf.warmupTextsSent.status !== 'not_started' ||
    inf.quoteTweetsSent.status !== 'not_started'

  if (allVideoApproved && inf.copiesApproved) return 'Ready to Launch'
  if (infOutreachStarted) return 'Influencer Outreach'
  if (allSentToClient || (allMotionDone && !allVideoApproved)) return 'Client Review'
  if (anyMotionInProgress || allAiDone) return 'Motion Design (Khushal)'
  if (anyAiInProgress || allScriptFinalized) return 'AI Animation (Karan)'
  if (anyScriptInProgress) return 'Scripting'
  return 'Ideation & Moodboard'
}

const useCampaignStore = create((set, get) => {
  const initial = loadState()
  return {
    campaigns: initial.campaigns,

    addCampaign: (companyName, numberOfVideos, launchDate, notes) => {
      set(state => {
        const newState = {
          campaigns: [...state.campaigns, createCampaign(companyName, numberOfVideos, launchDate, notes)]
        }
        saveState(newState)
        return newState
      })
    },

    deleteCampaign: (campaignId) => {
      set(state => {
        const newState = { campaigns: state.campaigns.filter(c => c.id !== campaignId) }
        saveState(newState)
        return newState
      })
    },

    updateCampaign: (campaignId, updates) => {
      set(state => {
        const newState = {
          campaigns: state.campaigns.map(c =>
            c.id === campaignId ? { ...c, ...updates } : c
          )
        }
        saveState(newState)
        return newState
      })
    },

    updateVideoStage: (campaignId, videoId, stageName, value) => {
      set(state => {
        const newState = {
          campaigns: state.campaigns.map(c => {
            if (c.id !== campaignId) return c
            return {
              ...c,
              videos: c.videos.map(v => {
                if (v.id !== videoId) return v
                return {
                  ...v,
                  stages: { ...v.stages, [stageName]: value }
                }
              })
            }
          })
        }
        saveState(newState)
        return newState
      })
    },

    updateInfluencerStage: (campaignId, stageName, value) => {
      set(state => {
        const newState = {
          campaigns: state.campaigns.map(c => {
            if (c.id !== campaignId) return c
            return {
              ...c,
              influencer: { ...c.influencer, [stageName]: value }
            }
          })
        }
        saveState(newState)
        return newState
      })
    },

    // Campaign influencer list management
    setCampaignInfluencers: (campaignId, influencers) => {
      set(state => {
        const newState = {
          campaigns: state.campaigns.map(c =>
            c.id === campaignId ? { ...c, campaignInfluencers: influencers } : c
          )
        }
        saveState(newState)
        return newState
      })
    },

    removeCampaignInfluencer: (campaignId, username) => {
      set(state => {
        const newState = {
          campaigns: state.campaigns.map(c => {
            if (c.id !== campaignId) return c
            return {
              ...c,
              campaignInfluencers: c.campaignInfluencers.filter(i => i.username !== username)
            }
          })
        }
        saveState(newState)
        return newState
      })
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
