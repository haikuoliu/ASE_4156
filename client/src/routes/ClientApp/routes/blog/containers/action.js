import fetchPro from 'SRC/utils/fetchPro'
import { CLIENT_EVENTS } from 'SRC/constants/action_const'
import api from 'SRC/apis'
import logger from 'SRC/utils/logger'
import { hashHistory } from 'react-router'

import * as ClientTopicActions from '../../topics/containers/action'
// import * as PersistentActions from 'SRC/action'

export function updateEventFields(event) {
  return {
    type: CLIENT_EVENTS.UPDATE_EVENT_FIELDS,
    event
  }
}

/**

  Async Actions

*/

export function loadSingleEvent(eid, myid) {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('events:getSingleEvent', eid, myid))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('events:getSingleEvent', eid, myid), json.result.msg)
          return
        }
        // dispatch(PersistentActions.persistentSet('username', json.result.name))
        dispatch({
          type: CLIENT_EVENTS.LOAD_SINGLE_EVENT,
          status: json.status,
          result: json.result
        })
      })
  )
}

export function loadComments(eid) {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('events:getComments', eid))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('events:getComments', eid), json.result.msg)
          return
        }
        // dispatch(PersistentActions.persistentSet('username', json.result.name))
        dispatch({
          type: CLIENT_EVENTS.LOAD_COMENTS,
          status: json.status,
          result: json.result.sort((a, b) => (a.timestamp - b.timestamp))
        })
      })
  )
}

export function makeComments(uid, eid, content) {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    const formData = new FormData()
    formData.append('content', content)
    formData.append('eid', eid)
    formData.append('uid', uid)
    return fetchPro(api('events:createComments'), {
      method: 'post',
      body: formData
    }).then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('events:createComments'), json.result.msg)
          return
        }
        dispatch(loadComments(eid))
      })
  }
}

export function deleteEvent(uid, eid) {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    const formData = new FormData()
    formData.append('uid', uid)
    formData.append('eid', eid)
    return fetchPro(api('events:deleteEvent'), {
      method: 'post',
      body: formData
    }).then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('events:deleteEvent'), json.result.msg)
          return
        }
        hashHistory.push({
          pathname: '/client/profile/posts',
          query: { uid }
        })
      })
  }
}

export function updateEventContent(uid, eid, event) {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    const formData = new FormData()
    formData.append('eid', eid)
    formData.append('uid', uid)
    formData.append('content', event.content)
    formData.append('title', event.title)
    formData.append('description', event.description)
    formData.append('topics', event.topics)
    formData.append('url', event.url)
    formData.append('event_type', event.event_type)
    return fetchPro(api('events:editEvent'), {
      method: 'post',
      body: formData
    }).then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('events:editEvent'), json.result.msg)
          return
        }
        hashHistory.push({
          pathname: '/client/blog/view',
          query: { eid: json.result.eid }
        })
      })
  }
}

export const loadAllTopics = ClientTopicActions.loadAllTopics
/**
  loadAllTopics() =>
  dispatch({
    type: CLIENT_TOPICS.LOAD_TOPIC_LIST,
    status: json.status,
    result: json.result.sort((a, b) => b.count - a.count)
  })
*/
