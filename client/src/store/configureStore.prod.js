import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import makeRootReducer from '../reducer.js'
import { routerMiddleware } from 'react-router-redux'

export default function configureStore(history, initialState) {
  let store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(thunk, routerMiddleware(history)),
      // window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
  store.asyncReducers = {}
  return store
}
