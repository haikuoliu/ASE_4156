import fetchPro from 'SRC/utils/fetchPro'
import { CLIENT_USER, CLIENT_EVENTS, CLIENT_TOPICS } from 'SRC/constants/action_const'
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

export function loadMyInfo(userId) {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('users:getUserInfo', userId, userId))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('users:getUserInfo', userId, userId), json.result.msg)
          return
        }
        // dispatch(PersistentActions.persistentSet('username', json.result.name))
        dispatch({
          type: CLIENT_USER.LOAD,
          status: json.status,
          result: json.result
        })
      })
  )
}

export function switchLike(myId, eid, type = 'like') {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('events:switchLikeStatus', myId, eid, type === 'like' ? 1 : 0))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('events:switchLikeStatus', myId, eid, type === 'like' ? 1 : 0), json.result.msg)
          return
        }
        // dispatch(PersistentActions.persistentSet('username', json.result.name))
        // dispatch(profileUserInfoUpdate('isFollow', type === 'follow'))
        dispatch({
          type: CLIENT_EVENTS.SWITCH_LIKE,
          uid: myId,
          eid,
          isLike: type === 'like'
        })
      })
  )
}

export function switchSubscribe(myId, topic, type = 'subscribe') {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('topics:switchSubscribe', myId, topic, type === 'subscribe' ? 1 : 0))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('topics:switchSubscribe', myId, topic, type === 'subscribe' ? 1 : 0), json.result.msg)
          return
        }
        dispatch({
          type: CLIENT_TOPICS.SWITCH_SUBSCRIBE,
          uid: myId,
          topic,
          isSubscribed: type === 'subscribe'
        })
      })
  )
}
