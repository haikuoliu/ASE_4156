import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import makeRootReducer from '../reducer.js'

export default function configureStore(history, initialState) {
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(thunk, routerMiddleware(history)),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
  store.asyncReducers = {}
  if (module.hot) {
    module.hot.accept('../reducer.js', () =>
      store.replaceReducer(require('../reducer.js').default)
    )
  }

  return store
}
