import users from './users'
import topics from './topics'
import events from './events'
import feeds from './feeds'
import ads from './ads'
import account from './account'

const dirs = {
  users,
  topics,
  events,
  feeds,
  ads,
  account
}

function api(rawPath, ...args) {
  const [dir, path] = rawPath.split(':')
  if (typeof dirs[dir][path] === 'function') {
    return dirs[dir][path](...args)
  } else {
    return dirs[dir][path]
  }
}

export default api
