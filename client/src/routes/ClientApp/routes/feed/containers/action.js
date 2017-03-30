import fetchPro from 'SRC/utils/fetchPro'
import { CLIENT_FEEDS } from 'SRC/constants/action_const'
import api from 'SRC/apis'
import logger from 'SRC/utils/logger'

export function resetFeeds() {
  return {
    type: CLIENT_FEEDS.RESET_FEEDS
  }
}

export function loadFeeds(myid, offset, count, timestamp) {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('feeds:loadFeeds', myid, offset, count, timestamp))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('feeds:loadFeeds', myid, offset, count, timestamp), json.result.msg)
          return
        }
        dispatch({
          type: CLIENT_FEEDS.LOAD_FEEDS,
          result: json.result
        })
      })
  )
}

export function loadAds(myid, count) {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('feeds:loadAds', myid, count))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('feeds:loadAds', myid, count), json.result.msg)
          return
        }
        dispatch({
          type: CLIENT_FEEDS.LOAD_ADS,
          result: json.result
        })
      })
  )
}
