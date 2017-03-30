import hostname from 'SRC/utils/host'

const ads = {
  getSponsors: `${hostname()}/api/sponsors`,
  getAdsOfSponsor: (sid) => `${hostname()}/api/sponserposts/sponsor?sid=${sid}`,
  getUserSetsOfSponsor: (sid) => `${hostname()}/api/user_sets/sponsor?sid=${sid}`,
  getPushesOfSponsor: (sid) => `${hostname()}/api/pushes/sponsor?sid=${sid}`,
  makePush: `${hostname()}/api/pushes/create`,
  createUserSet: `${hostname()}/api/user_sets/create`,
  deleteUserSet: (setId) => `${hostname()}/api/user_sets/delete?set_id=${setId}`,
  createNewAd: `${hostname()}/api/sponserposts/create`
}

export default ads
