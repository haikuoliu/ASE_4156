import hostname from 'SRC/utils/host'

const account = {
  login: `${hostname()}/login`,
  register: `${hostname()}/register`,
  getBasicInfo: (username) => `${hostname()}/getBasicInfo?username=${username}`,
  getPetsInfo: (username) => `${hostname()}/getPetsInfo?username=${username}`
}

export default account
