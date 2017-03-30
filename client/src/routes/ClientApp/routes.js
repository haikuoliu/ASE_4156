import { injectReducer } from 'SRC/reducer.js' // eslint-disable-line no-unused-vars

export default (store) => ({
  path: 'client',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      // Asyn Injection Of Reducers
      const reducer = require('./containers/reducer').default
      injectReducer(store, { key: 'clientGeneral', reducer })
      cb(null, require('./containers/').default)
    }, 'client')
  },
  childRoutes: [
    // require('./routes/home/routes.js').default,
    require('./routes/blog/routes.js').default(store),
    require('./routes/feed/routes.js').default(store),
    require('./routes/profile/routes.js').default(store),
    require('./routes/topics/routes.js').default(store)
  ]
})
