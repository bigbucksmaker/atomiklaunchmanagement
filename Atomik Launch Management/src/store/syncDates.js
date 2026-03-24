// Deferred sync to avoid circular imports between campaign and CRM stores
// Both stores register themselves, then sync functions can access either

let campaignStore = null
let crmStore = null

export function registerCampaignStore(store) { campaignStore = store }
export function registerCrmStore(store) { crmStore = store }

export function syncLaunchDateToCampaign(companyName, launchDate) {
  if (!campaignStore) return
  const campaigns = campaignStore.getState().campaigns
  const match = campaigns.find(c => c.companyName.toLowerCase() === companyName.toLowerCase())
  if (match && match.launchDate !== launchDate) {
    campaignStore.getState().updateCampaign(match.id, { launchDate }, true)
  }
}

export function syncLaunchDateToCrm(companyName, launchDate) {
  if (!crmStore) return
  const leads = crmStore.getState().leads
  const match = leads.find(l => l.name.toLowerCase() === companyName.toLowerCase())
  if (match && match.launchDate !== launchDate) {
    crmStore.getState().updateLead(match.id, { launchDate }, true)
  }
}

export function syncAllLaunchDates() {
  if (!campaignStore || !crmStore) return
  const leads = crmStore.getState().leads
  const campaigns = campaignStore.getState().campaigns

  leads.forEach(lead => {
    if (!lead.launchDate || !lead.name) return
    const match = campaigns.find(c => c.companyName.toLowerCase() === lead.name.toLowerCase())
    if (match && !match.launchDate) {
      campaignStore.getState().updateCampaign(match.id, { launchDate: lead.launchDate }, true)
    }
  })
}
