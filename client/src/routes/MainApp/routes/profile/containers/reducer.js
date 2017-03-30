// import { combineReducers } from 'redux'
import Immutable from 'immutable'

// import { CLIENT_USER } from 'SRC/constants/action_const'

const initialState = Immutable.fromJS({
  basicInfo: {
    userName: 'Unkown',
    sex: 'Male',
    birth: 1478236926748,
    email: 'example@gmail.com'
  },
  history: [{
    id: 123,
    title: 'Order',
    date: 1478236926748
  }],
  petsList: [{
    name: 'pets name',
    type: 'dog'
  }],
  centersList: [{
    name: 'center name',
    location: 'New York'
  }]
})

/* eslint-disable arrow-body-style, no-unused-vars*/
const reducerMap = {
  // [CLIENT_USER.LOAD]: (state, action) => {
  //   return state.merge(Immutable.Map({
  //     userName: action.result.name,
  //     sex: action.result.sex ? 'Male' : 'Female',
  //     birth: action.result.birth,
  //     email: action.result.email,
  //     followerNum: action.result.follows
  //   }))
  // },
  // [CLIENT_USER.UPDATE]: (state, action) => {
  //   return state
  // }
}

function userProfile(state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}

export default userProfile
