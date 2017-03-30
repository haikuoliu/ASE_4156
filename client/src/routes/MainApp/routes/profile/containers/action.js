import fetchPro from 'SRC/utils/fetchPro'
import { CLIENT_PROFILE_USER_INFO, CLIENT_TOPICS, CLIENT_EVENTS } from 'SRC/constants/action_const'
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

export function loadUserInfo(myId, otherId) {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    otherId = otherId || myId // eslint-disable-line no-param-reassign
    return fetchPro(api('users:getUserInfo', myId, otherId))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('users:getUserInfo', myId, otherId), json.result.msg)
          return
        }
        // dispatch(PersistentActions.persistentSet('username', json.result.name))
        dispatch({
          type: CLIENT_PROFILE_USER_INFO.LOAD,
          status: json.status,
          result: { ...json.result, isSelf: myId === otherId }
        })
      })
  }
}

export function getTopicsOfUser(myId) {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('topics:getTopicsOfUser', myId))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('topics:getTopicsOfUser', myId), json.result.msg)
          return
        }
        // dispatch(PersistentActions.persistentSet('username', json.result.name))
        dispatch({
          type: CLIENT_TOPICS.LOAD_USER_TOPICS,
          status: json.status,
          result: json.result
        })
      })
  )
}

export function getPostsOfUser(uid, myId) {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('events:getPostsOfUser', uid, myId))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('topics:getTopicsOfUser', uid, myId), json.result.msg)
          return
        }
        // dispatch(PersistentActions.persistentSet('username', json.result.name))
        dispatch({
          type: CLIENT_EVENTS.LOAD_USER_POSTS,
          status: json.status,
          result: json.result.sort((a, b) => b.eid - a.eid)
        })
      })
  )
}

export function getUsersFollowedBy(uid) {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('users:getUsersFollowedBy', uid))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('users:getUsersFollowedBy', uid), json.result.msg)
          return
        }
        // dispatch(PersistentActions.persistentSet('username', json.result.name))
        dispatch({
          type: CLIENT_PROFILE_USER_INFO.LOAD_USERS_FOLLOWED_BY,
          result: json.result
        })
      })
  )
}

export function switchFollow(myId, otherId, type = 'follow') {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('users:switchFollow', myId, otherId, type === 'follow' ? 1 : 0))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('users:switchFollow', myId, otherId, type === 'follow' ? 1 : 0), json.result.msg)
          return
        }
        // dispatch(PersistentActions.persistentSet('username', json.result.name))
        // dispatch(profileUserInfoUpdate('isFollow', type === 'follow'))
        dispatch(loadUserInfo(myId, otherId))
      })
  )
}
