import Immutable from 'immutable'

import { CLIENT_PROFILE_USER_INFO } from 'SRC/constants/action_const'

const initialState = Immutable.fromJS({
  followsList: []
})

/* eslint-disable arrow-body-style, no-unused-vars*/
const reducerMap = {
  [CLIENT_PROFILE_USER_INFO.LOAD_USERS_FOLLOWED_BY]: (state, action) => {
    return state.set('followsList', Immutable.fromJS(action.result))
  }
}

export default function userInfo(state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}
