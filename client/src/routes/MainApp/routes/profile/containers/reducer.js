// import { combineReducers } from 'redux'
import Immutable from 'immutable'

import { PROFILE } from 'SRC/constants/action_const'

const initialState = Immutable.fromJS({
  basicInfo: {
    userName: 'Unkown',
    gender: 'Male',
    birth: 1478236926748,
    email: 'example@gmail.com',
    phone: '3471345678',
    isSelf: true
  },
  history: [{
    id: 123,
    title: 'Order',
    date: 1478236926748
  }],
  petsList: [{
    name: 'pets name',
    species: 'dog',
    birth: 1900
  }],
  centersList: [{
    name: 'center name',
    location: 'New York'
  }]
})

/* eslint-disable arrow-body-style, no-unused-vars*/
const reducerMap = {
  [PROFILE.LOAD_BASIC_INFO]: (state, action) => {
    return state.update('basicInfo', oldValue => (
      oldValue.merge(Immutable.Map({
        userName: action.result.username,
        gender: action.result.gender === 'male' ? 'Male' : 'Female',
        birth: new Date(action.result.birth).getTime(),
        email: action.result.email,
        phone: action.result.phone
      }))
    ))
  },
  [PROFILE.LOAD_PETS_INFO]: (state, action) => {
    return state.set('petsList', Immutable.fromJS(action.result.petsInfo))
  }
}

function userProfile(state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}

export default userProfile
