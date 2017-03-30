// import { combineReducers } from 'redux'
import Immutable from 'immutable'

import { CLIENT_EVENTS, CLIENT_TOPICS } from 'SRC/constants/action_const'

// import blogList from '../routes/list/containers/BlogListReducer'
// import blogContent from '../routes/content/containers/reducer'

const initialState = Immutable.fromJS({
  event: {
    eid: -1,
    content: null,
    islike: false,
    likes: 0,
    url: null,
    title: null,
    uid: 0,
    description: null,
    user_name: null,
    event_type: 'blog',
    topics: []
  },
  topicsList: [],
  comments: []
})

/* eslint-disable arrow-body-style, no-unused-vars*/
const reducerMap = {
  [CLIENT_EVENTS.LOAD_SINGLE_EVENT]: (state, action) => {
    return state.update('event', old => (
      old.merge(Immutable.fromJS(action.result))
    ))
  },
  [CLIENT_EVENTS.LOAD_COMENTS]: (state, action) => {
    return state.set('comments', Immutable.fromJS(action.result))
  },
  [CLIENT_EVENTS.SWITCH_LIKE]: (state, action) => {
    if (parseInt(action.eid) !== parseInt(state.get('event').get('eid'))) return state
    return state.update('event', oldEvent => (
      oldEvent.merge(Immutable.fromJS({
        islike: action.isLike,
        likes: oldEvent.get('likes') + (action.isLike ? 1 : -1)
      }))
    ))
  },
  [CLIENT_EVENTS.UPDATE_EVENT_FIELDS]: (state, action) => {
    if (typeof action.event === 'string') {
      return state.update('event', oldDict => (
        oldDict.merge(initialState.get('event'))
      ))
    }
    return state.update('event', oldDict => (
      oldDict.merge(Immutable.fromJS(action.event))
    ))
  },
  [CLIENT_TOPICS.LOAD_TOPIC_LIST]: (state, action) => {
    return state.set('topicsList', action.result.map(r => r.topic_name))
  }
}

function clientEvent(state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}

export default clientEvent
