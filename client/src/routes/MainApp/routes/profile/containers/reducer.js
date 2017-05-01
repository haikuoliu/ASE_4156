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
  history: [
    // {
    //     "oid": "59054404f839cd1af1eb67fa",
    //     "cid": "20170429",
    //     "types": "Owner",
    //     "timestamp": 1493517316293,
    //     "_id": "59054404f839cd1af1eb67fb",
    //     "center": {
    //         "title": "Carer Post",
    //         "price": 100,
    //         "size": 50,
    //         "location": {
    //             "state": "NY",
    //             "city": "New York",
    //             "lng": -73.9625727,
    //             "lat": 40.8075355,
    //             "zip": 10027,
    //             "street": "Columbia University"
    //         }
    //     },
    //     "contact": {
    //         "username": "carer",
    //         "email": "carer@gmail.com",
    //         "phone": "5424210266"
    //     }
    // }
  ],
  petsList: [
    // {
    //   species: 'dog',
    //   birth: 1900
    // }
  ],
  centersList: [
    // {
    //   cid: '9c33d1dd-e6f0-4fed-9ef9-7a7bf9c98682',
    //   title: 'software',
    //   content: 'Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    //   size: 186,
    //   timestamp: 20178115,
    //   location: {
    //     street: '301 Elmside Drive',
    //     zip: 77042,
    //     city: 'New York',
    //     state: 'NY',
    //     lat: 29.7328935,
    //     lng: -95.5431595
    //   }
    // }
  ]
})

/* eslint-disable arrow-body-style, no-unused-vars*/
const reducerMap = {
  [PROFILE.LOAD_BASIC_INFO]: (state, action) => {
    return state.update('basicInfo', oldValue => (
      oldValue.merge(Immutable.Map({
        userName: action.result.username,
        gender: action.result.gender === 'male' ? 'Male' : 'Female',
        birth: action.result.birth,
        email: action.result.email,
        phone: action.result.phone
      }))
    ))
  },
  [PROFILE.LOAD_ORDERS_INFO]: (state, action) => {
    return state.set('history', Immutable.fromJS(action.result.ordersInfo))
  },
  [PROFILE.LOAD_PETS_INFO]: (state, action) => {
    return state.set('petsList', Immutable.fromJS(action.result.petsInfo))
  },
  [PROFILE.LOAD_CENTERS_INFO]: (state, action) => {
    return state.set('centersList', Immutable.fromJS(action.result.centersInfo))
  }
}

function userProfile(state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}

export default userProfile
