import { injectReducer } from 'SRC/reducer.js' // eslint-disable-line no-unused-vars

export default (store) => ({ // eslint-disable-line no-unused-vars
  path: 'profile',
  indexRoute: {
    onEnter: (nextState, replace) => replace('/main/profile/history')
  },
  getComponent(location, cb) {
    require.ensure([], (require) => {
      // Asyn Injection Of Reducers
      // const reducer = require('./containers/reducer').default
      // injectReducer(store, { key: 'clientProfile', reducer })
      cb(null, require('./containers/').default)
    }, 'profile')
  },
  childRoutes: [
    // require('./routes/home/routes.js').default,
    require('./routes/history/routes.js').default(store),
    require('./routes/centers/routes.js').default(store),
    require('./routes/pets/routes.js').default(store)
  ]
})
