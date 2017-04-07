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
    fetchPro(api('account:getBasicInfo', username))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('account:getBasicInfo', username), json.result.msg)
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
    fetchPro(api('account:getCentersInfo', username))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('account:getCentersInfo', username), json.result.msg)
          return
        }
        dispatch({
          type: PROFILE.LOAD_CENTERS_INFO,
          result: json.result
        })
      })
  )
}
