import hostname from 'SRC/utils/host'

const rest = {
  login: `${hostname()}/login`,
  register: `${hostname()}/register`,
  getBasicInfo: (username) => `${hostname()}/user/getBasicInfo?username=${username}`,
  getPetsInfo: (username) => `${hostname()}/getPetsInfo?username=${username}`,
  getCentersInfo: (username) => `${hostname()}/getCentersInfo?username=${username}`
}

export default rest
