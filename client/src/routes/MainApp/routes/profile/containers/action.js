import fetchPro from 'SRC/utils/fetchPro'
import { PROFILE, CLIENT_PROFILE_USER_INFO } from 'SRC/constants/action_const'
import api from 'SRC/apis'
import logger from 'SRC/utils/logger'

// import * as PersistentActions from 'SRC/action'

export function profileUserInfoUpdate(key, value) {
  return {
    type: CLIENT_PROFILE_USER_INFO.UPDATE,
    key,
    value
  }
}

/**

  Async Actions

*/

export function loadBasicInfo(myUsername, username) {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('rest:basicInfo_get', username))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('rest:basicInfo_get', username), json.result.msg)
          return
        }
        dispatch({
          type: PROFILE.LOAD_BASIC_INFO,
          result: { ...json.result, isSelf: myUsername === username }
        })
      })
  )
}

export function loadPetsInfo(username) {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('account:getPetsInfo', username))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('account:getPetsInfo', username), json.result.msg)
          return
        }
        dispatch({
          type: PROFILE.LOAD_PETS_INFO,
          result: json.result
        })
      })
  )
}

export function loadCentersInfo(username) {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('rest:centersInfo_user_get', username))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('rest:centersInfo_user_get', username), json.result.msg)
          return
        }
        dispatch({
          type: PROFILE.LOAD_CENTERS_INFO,
          result: json.result
        })
      })
  )
}

export function updateCenterInfo(centerInfo) {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    const formData = new FormData()
    if (centerInfo.cid) {
      formData.append('cid', centerInfo.cid)
    }
    formData.append('username', centerInfo.username)
    formData.append('title', centerInfo.title)
    formData.append('content', centerInfo.content)
    formData.append('size', centerInfo.size)
    formData.append('timestamp', centerInfo.timestamp)
    formData.append('street', centerInfo.street)
    formData.append('state', centerInfo.state)
    formData.append('city', centerInfo.city)
    return fetchPro(api('rest:centersInfo'), {
      method: centerInfo.cid ? 'put' : 'post',
      body: formData
    })
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('rest:centersInfo'), json.result.msg)
          return
        }
        loadCentersInfo(centerInfo.username)(dispatch, getState)
      })
  }
}

export function deleteCenterInfo(centerInfo) {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    const formData = new FormData()
    formData.append('cid', centerInfo.cid)
    formData.append('username', centerInfo.username)
    return fetchPro(api('rest:centersInfo'), {
      method: 'delete',
      body: formData
    })
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('rest:centersInfo'), json.result.msg)
          return
        }
        loadCentersInfo(centerInfo.username)(dispatch, getState)
      })
  }
}
