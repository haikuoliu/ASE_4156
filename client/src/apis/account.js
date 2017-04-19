import hostname from 'SRC/utils/host'

const account = {
  login: `${hostname()}/user/login`,
  register: `${hostname()}/user/register`,
  getBasicInfo: (username) => `${hostname()}/user/getBasicInfo?username=${username}`,
  getPetsInfo: (username) => `${hostname()}/getPetsInfo?username=${username}`,
  getCentersInfo: (username) => `${hostname()}/getCentersInfo?username=${username}`
}

export default account
