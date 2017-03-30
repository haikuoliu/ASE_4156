import Immutable from 'immutable'

import { CLIENT_TOPICS } from 'SRC/constants/action_const'

// import blogList from '../routes/list/containers/BlogListReducer'
// import blogContent from '../routes/content/containers/reducer'

const initialState = Immutable.fromJS({
  topicsList: []
})

/* eslint-disable arrow-body-style, no-unused-vars*/
const reducerMap = {
  [CLIENT_TOPICS.LOAD_USER_TOPICS]: (state, action) => {
    return state.set('topicsList', Immutable.fromJS(action.result))
  }
}

export default function userInfo(state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}
