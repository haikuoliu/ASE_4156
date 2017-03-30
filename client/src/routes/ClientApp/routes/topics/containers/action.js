import fetchPro from 'SRC/utils/fetchPro'
import { CLIENT_TOPICS } from 'SRC/constants/action_const'
import api from 'SRC/apis'
import logger from 'SRC/utils/logger'

/**

  Async Actions

*/

export function loadAllTopics(myId) {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    Promise.all([
      fetchPro(api('topics:getAllTopics'))
        .then(response => response.json()),
      fetchPro(api('topics:getTopicsOfUser', myId))
        .then(response => response.json())
    ]).catch(() => ([{ status: 'fail', result: { msg: 'Network Unavailable!' } }, null]))
      .then(jsons => {
        const [allTopics, myTopics] = jsons
        if (allTopics.status === 'fail') {
          logger.error(api('topics:getAllTopics'), allTopics.result.msg)
          return
        }
        if (myTopics.status === 'fail') {
          logger.error(api('topics:getTopicsOfUser'), myTopics.result.msg)
          return
        }
        const myTopicSet = new Set(myTopics.result.map(topic => topic.topic_name))
        dispatch({
          type: CLIENT_TOPICS.LOAD_TOPIC_LIST,
          result: allTopics.result
                    .sort((a, b) => b.count - a.count)
                    .map(topic => ({
                      ...topic,
                      isSubscribed: myTopicSet.has(topic.topic_name)
                    }))
        })
      })
  )
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

export function loadAllEventsOfTopics(topic, myid) {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('topics:getAllEventsOfTopic', topic, myid))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('topics:getAllEventsOfTopic', topic, myid), json.result.msg)
          return
        }
        // dispatch(PersistentActions.persistentSet('username', json.result.name))
        dispatch({
          type: CLIENT_TOPICS.LOAD_EVENT_LIST,
          status: json.status,
          result: {
            topic,
            eventsList: json.result.sort((a, b) => b.likes - a.likes)
          }
        })
      })
  )
}
