import fetch from 'isomorphic-fetch'
import logger from 'SRC/utils/logger'

export const FETCH_TIMEOUT = 'fetch timeout'

let mockAPIConfig
if (process.env.NODE_ENV === 'production') {
  mockAPIConfig = { rules: [] }
} else {
  mockAPIConfig = require('./mockAPIConfig').default
}

const defaultConfig = {

}

/**
  fetch Timeout API:

  fetchPro(url, { timeout: 1000 })

*/

export const fetchPro = (url, config = {}) => {
  /*
    调试模式
    如果url在mockAPIConfig注册过, 并且enabled, 则跳过fetch请求, 直接返回promise结果
   */
  if (mockAPIConfig.enabled) {
    for (const rule of mockAPIConfig.rules) {
      if (rule.enabled && rule.url.test(url)) {
        return new Promise((resolve, reject) => { // eslint-disable-line no-loop-func
          logger.warn(`${url} has been redirected to customized results`)
          let delay = parseInt(rule.delay) || 100
          if (typeof rule.delay === 'function') {
            delay = rule.delay(url, config)
          }
          setTimeout(() => {
            if (rule.type === 'error') {
              let error
              if (typeof rule.error === 'function') {
                error = rule.error(url, config)
              } else {
                error = rule.error || 'unknown error'
              }
              reject(new Error(error))
            } else {
              resolve({
                json: () => {
                  if (typeof rule.response === 'function') {
                    return rule.response(url, config)
                  }
                  return rule.response || {}
                }
              })
            }
          }, delay || 100)
        })
      }
    }
  }
  /*
   * 正常模式
   * 向服务端发送真实Ajax请求
   */
  // eslint-disable-next-line no-param-reassign
  config = Object.assign({}, defaultConfig, config)

  // Implement Fetch Timeout Feature
  if (typeof config.timeout === 'number') {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        logger.error('Request timed out', url)
        reject(new Error(FETCH_TIMEOUT))
      }, config.timeout)

      fetch(url, config)
        .then(response => {
          clearTimeout(timeout)
          resolve(response)
        })
        .catch(error => {
          clearTimeout(timeout)
          reject(error)
        })
    })
  }

  // Normal Fetch Method
  return fetch(url, config)
}

export default fetchPro
