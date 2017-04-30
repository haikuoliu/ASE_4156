import { injectReducer } from 'SRC/reducer.js' // eslint-disable-line no-unused-vars

export default (store) => ({ // eslint-disable-line no-unused-vars
  path: '/main',
  indexRoute: {
    onEnter: (nextState, replace) => replace('/main/search')
  },
  getComponent(location, cb) {
    require.ensure([], (require) => {
      // Asyn Injection Of Reducers
      const reducer = require('./containers/reducer').default
      injectReducer(store, { key: 'main', reducer })
      cb(null, require('./containers/').default)
    }, 'main')
  },
  childRoutes: [
    // require('./routes/home/routes.js').default,
    // require('./routes/ads_list/routes.js').default(store),
    require('./routes/Search/routes.js').default(store),
    require('./routes/post/routes.js').default(store),
    require('./routes/profile/routes.js').default(store)
  ]
})
