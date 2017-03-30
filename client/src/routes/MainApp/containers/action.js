import fetchPro from 'SRC/utils/fetchPro'
import { ADS } from 'SRC/constants/action_const'
import api from 'SRC/apis'
import logger from 'SRC/utils/logger'

// import * as PersistentActions from 'SRC/action'

// export function deleteBlogListItem(id) {
//   return {
//     type: 'BLOG@BLOG_CONTENT@DELETE_ITEM',
//     id
//   }
// }

/**

  Async Actions

*/

export function loadMySponsorInfo(sponsorId) {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('ads:getSponsors', sponsorId))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('ads:getSponsors', sponsorId), json.result.msg)
          return
        }
        dispatch({
          type: ADS.LOAD_SPONSOR_INFO,
          result: json.result.filter(r => parseInt(r.sid) === parseInt(sponsorId))[0]
        })
      })
  )
}

export function loadAdsOfSponsor(sponsorId) {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('ads:getAdsOfSponsor', sponsorId))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('ads:getAdsOfSponsor', sponsorId), json.result.msg)
          return
        }
        dispatch({
          type: ADS.LOAD_ADS,
          result: json.result
        })
      })
  )
}

export function loadUserSetsOfSponsor(sponsorId) {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('ads:getUserSetsOfSponsor', sponsorId))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('ads:getUserSetsOfSponsor', sponsorId), json.result.msg)
          return
        }
        dispatch({
          type: ADS.LOAD_USER_SETS,
          result: json.result
        })
      })
  )
}

export function loadPushesOfSponsor(sponsorId) {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('ads:getPushesOfSponsor', sponsorId))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('ads:getPushesOfSponsor', sponsorId), json.result.msg)
          return
        }
        dispatch({
          type: ADS.LOAD_PUSHES,
          result: json.result.sort((a, b) => b.time - a.time)
        })
      })
  )
}

export function makePushes(args) {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    const formData = new FormData()
    formData.append('sid', args.sid)
    formData.append('aid', args.aid)
    formData.append('set_id', args.set_id)
    return fetchPro(api('ads:makePush'), {
      method: 'post',
      body: formData
    }).then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('ads:makePush'), json.result.msg)
          return
        }
        dispatch(loadPushesOfSponsor(args.sid))
      })
  }
}

export function createUserSet(args) {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    const formData = new FormData()
    formData.append('sid', args.sid)
    formData.append('filters', args.filters)
    formData.append('description', args.description)
    return fetchPro(api('ads:createUserSet'), {
      method: 'post',
      body: formData
    }).then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('ads:createUserSet'), json.result.msg)
          return
        }
        dispatch(loadUserSetsOfSponsor(args.sid))
      })
  }
}

export function createNewAd(args) {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    const formData = new FormData()
    formData.append('sid', args.sid)
    formData.append('url', args.url)
    formData.append('description', args.description)
    return fetchPro(api('ads:createNewAd'), {
      method: 'post',
      body: formData
    }).then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('ads:createNewAd'), json.result.msg)
          return
        }
        dispatch(loadAdsOfSponsor(args.sid))
      })
  }
}

export function deleteUserSet(args) {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    const url = api('ads:deleteUserSet', args.set_id)
    return fetchPro(url)
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(url, json.result.msg)
          return
        }
        dispatch(loadUserSetsOfSponsor(args.sid))
      })
  }
}
