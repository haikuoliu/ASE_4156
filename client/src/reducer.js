import { combineReducers } from 'redux'
import { routerReducer as routing, LOCATION_CHANGE } from 'react-router-redux'
import Immutable from 'immutable'


const initialState = Immutable.Map()

/* eslint-disable no-param-reassign, arrow-body-style, no-unused-vars*/
const reducerMap = {
  [LOCATION_CHANGE]: (state, action) => {
    Object.keys(sessionStorage).forEach(key => (
      state = state.set(key, Immutable.fromJS(sessionStorage.getItem(key)))
    ))
    return state
  },
  'PERSISTENT@SET': (state, action) => {
    sessionStorage.setItem(action.key, action.value)
    return state.set(action.key, Immutable.fromJS(`${action.value}`))
  },
  'PERSISTENT@REMOVE': (state, action) => {
    sessionStorage.removeItem(action.key)
    return state.delete(action.key)
  },
  'PERSISTENT@CLEAR': (state, action) => {
    sessionStorage.clear()
    return state.clear()
  }
}

function persistentStore(state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}

export const makeRootReducer = (asyncReducers) => (
  combineReducers({
    // Add sync reducers here
    routing,
    persistentStore,
    ...asyncReducers
  })
)

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer // eslint-disable-line no-param-reassign
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
