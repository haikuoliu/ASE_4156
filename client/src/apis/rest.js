import hostname from 'SRC/utils/host'

const rest = {
  login: `${hostname()}/login`,
  register: `${hostname()}/register`,
  basicInfo_get: (username) => `${hostname()}/basicInfo?username=${username}`,
  basicInfo_put: `${hostname()}/basicInfo`,
  centersInfo_user_get: (username) => `${hostname()}/centersInfoUser?username=${username}`,
  centersInfo_get: (cid) => `${hostname()}/centersInfoSpec?cid=${cid}`,
  centersInfo: `${hostname()}/centersInfo`,
  searchAddress: (address) => `${hostname()}/addr?location=${encodeURIComponent(address)}`,
  neighCenters_get: (lat, lng, zipcode) => `${hostname()}/near?lat=${lat}&lng=${lng}${zipcode ? `&zipcode=${zipcode}` : ''}`
}

export default rest
