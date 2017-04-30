import hostname from 'SRC/utils/host'

const rest = {
  login: `${hostname()}/login`,
  register: `${hostname()}/register`,
  basicInfo_get: (username) => `${hostname()}/basicInfo?username=${username}`,
  basicInfo_put: `${hostname()}/basicInfo`,
  centersInfo_user_get: (username) => `${hostname()}/centersInfoUser?username=${username}`,
  centersInfo_get: (cid) => `${hostname()}/centersInfoSpec?cid=${cid}`,
  centersInfo: `${hostname()}/centersInfo`
}

export default rest
