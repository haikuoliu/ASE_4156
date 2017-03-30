import { combineReducers } from 'redux'
// import Immutable from 'immutable'

// import { CLIENT_USER } from 'SRC/constants/action_const'
import userInfo from '../routes/info/containers/reducer'
import userTopics from '../routes/subscribe/containers/reducer'
import userPosts from '../routes/posts/containers/reducer'
import userFollows from '../routes/follow/containers/reducer'
//
// const initialState = Immutable.fromJS({
//   userName: 'Unkown UserName',
//   sex: 'Male',
//   birth: 1478236926748,
//   email: 'example@gmail.com',
//   followerNum: 12
// })
//
// /* eslint-disable arrow-body-style, no-unused-vars*/
// const reducerMap = {
//   [CLIENT_USER.LOAD]: (state, action) => {
//     return state.merge(Immutable.Map({
//       userName: action.result.name,
//       sex: action.result.sex ? 'Male' : 'Female',
//       birth: action.result.birth,
//       email: action.result.email,
//       followerNum: action.result.follows
//     }))
//   },
//   [CLIENT_USER.UPDATE]: (state, action) => {
//     return state
//   }
// }
//
// function userInfo(state = initialState, action) {
//   if (reducerMap[action.type]) {
//     return reducerMap[action.type](state, action)
//   }
//   return state
// }

export default combineReducers({
  userInfo,
  userTopics,
  userPosts,
  userFollows
})
