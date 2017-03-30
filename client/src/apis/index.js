import users from './users'
import topics from './topics'
import events from './events'
import feeds from './feeds'
import ads from './ads'

const dirs = {
  users,
  topics,
  events,
  feeds,
  ads
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
