// import { combineReducers } from 'redux'
import Immutable from 'immutable'

import { CENTERS } from 'SRC/constants/action_const'

const initialState = Immutable.fromJS({
  centersList: [
    // {
    //   cid: '575ac7b6-0f29-4aa2-bb0d-f93e86433c7e',
    //   title: 'string',
    //   size: 23,
    //   price: 100,
    //   content: 'string',
    //   location: {
    //     city: "New York",
    //     lat: 28.380689,
    //     lng: -81.3595259,
    //     state: "NY",
    //     street: "8333 Meadow Ridge Circle",
    //     zip: 32824
    //   }
    // }
  ],
  centerLocation: {
    lat: 40.809322, lng: -73.9612294, zipcode: ''
  }
})

/* eslint-disable arrow-body-style, no-unused-vars*/
const reducerMap = {
  [CENTERS.LOAD_NEIGH_CENTERS]: (state, action) => {
    return state.set('centersList', Immutable.fromJS(action.result.centersInfo))
  },
  [CENTERS.CHANGE_SEARCH_CENTER]: (state, action) => {
    return state.set('centerLocation', Immutable.fromJS(action.result))
  },
  [CENTERS.SEARCH_CENTER_ADDRESS]: (state, action) => {
    return state.set('centerLocation', Immutable.fromJS(action.result))
  }
}

function search(state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}

export default search
