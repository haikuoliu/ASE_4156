import { combineReducers } from 'redux'
import Immutable from 'immutable'

import { CLIENT_USER } from 'SRC/constants/action_const'

// import blogList from '../routes/list/containers/BlogListReducer'
// import blogContent from '../routes/content/containers/reducer'

const initialState = Immutable.fromJS({
  userName: 'Visitor',
  sex: 'Male',
  birth: 1478236926748,
  email: '',
  followerNum: 12,
  userId: 0
})

/* eslint-disable arrow-body-style, no-unused-vars*/
const reducerMap = {
  [CLIENT_USER.LOAD]: (state, action) => {
    return state.merge(Immutable.Map({
      userName: action.result.name,
      sex: action.result.sex ? 'Male' : 'Female',
      birth: action.result.birth,
      email: action.result.email,
      followerNum: action.result.follows,
      userId: action.result.uid
    }))
  },
  [CLIENT_USER.UPDATE]: (state, action) => {
    return state
  }
}

function userInfo(state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}

export default combineReducers({
  userInfo
  // blogList,
  // blogContent
})
