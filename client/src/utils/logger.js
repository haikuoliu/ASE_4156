/* eslint-disable no-console */
export const logger = {
  log: (...msg) => {
    console.log(...msg)
  },
  error: (...msg) => {
    console.error(...msg)
  },
  warn: (...msg) => {
    console.warn(...msg)
  },
  info: (...msg) => {
    console.info(...msg)
  },
  debug: (...msg) => {
    console.debug(...msg)
  }
}
/* eslint-enable no-console */

export default logger
