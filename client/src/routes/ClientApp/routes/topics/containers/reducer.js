// import { combineReducers } from 'redux'
import Immutable from 'immutable'

import { CLIENT_TOPICS, CLIENT_EVENTS } from 'SRC/constants/action_const'
// import userInfo from '../routes/info/containers/reducer'

const initialState = Immutable.fromJS({
  topicsList: [],
  eventsList: {}
})

/* eslint-disable arrow-body-style, no-unused-vars*/
const reducerMap = {
  [CLIENT_TOPICS.LOAD_TOPIC_LIST]: (state, action) => {
    return state.set('topicsList', Immutable.fromJS(action.result))
  },
  [CLIENT_TOPICS.LOAD_EVENT_LIST]: (state, action) => {
    return state.update('eventsList', oldDict => (
      oldDict.set(action.result.topic, Immutable.fromJS(action.result.eventsList))
    ))
  },
  [CLIENT_TOPICS.SWITCH_SUBSCRIBE]: (state, action) => {
    const index = state.get('topicsList').findIndex(
      Value => Value.get('topic_name') === action.topic
    )
    if (index < 0) return state
    return state.update('topicsList', oldList => (
      oldList.update(index, V =>
        V.merge(Immutable.fromJS({
          isSubscribed: action.isSubscribed
        }))
      )
    ))
  },
  [CLIENT_EVENTS.SWITCH_LIKE]: (state, action) => {
    return state.update('eventsList', oldDict => oldDict.map(array => {
      const index = array.findIndex(
        Value => Value.get('eid') === action.eid
      )
      if (index < 0) return array
      return array.update(index, V =>
        V.merge(Immutable.fromJS({
          islike: action.isLike,
          likes: V.get('likes') + (action.isLike ? 1 : -1)
        }))
      )
    }))
  }
}

export default function clientTopics(state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}
