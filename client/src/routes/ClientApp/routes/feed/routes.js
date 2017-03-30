import { injectReducer } from 'SRC/reducer.js' // eslint-disable-line no-unused-vars

export default (store) => ({ // eslint-disable-line no-unused-vars
  path: 'feed',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      // Asyn Injection Of Reducers
      const reducer = require('./containers/reducer').default
      injectReducer(store, { key: 'clientFeeds', reducer })
      cb(null, require('./containers/').default)
    }, 'client')
  },
  childRoutes: [
    // require('./routes/home/routes.js').default,
    // require('./routes/blog/routes.js').default(store)
  ]
})
