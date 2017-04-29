import hostname from 'SRC/utils/host'

const rest = {
  login: `${hostname()}/login`,
  register: `${hostname()}/register`,
  basicInfo_get: (username) => `${hostname()}/basicInfo?username=${username}`,
  basicInfo_put: `${hostname()}/basicInfo`
}

export default rest
