import { injectReducer } from 'SRC/reducer.js' // eslint-disable-line no-unused-vars

export default (store) => ({ // eslint-disable-line no-unused-vars
  path: 'profile',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      // Asyn Injection Of Reducers
      const reducer = require('./containers/reducer').default
      injectReducer(store, { key: 'clientProfile', reducer })
      cb(null, require('./containers/').default)
    }, 'profile')
  },
  childRoutes: [
    // require('./routes/home/routes.js').default,
    require('./routes/info/routes.js').default(store),
    require('./routes/follow/routes.js').default(store),
    require('./routes/posts/routes.js').default(store),
    require('./routes/subscribe/routes.js').default(store)
  ]
})
