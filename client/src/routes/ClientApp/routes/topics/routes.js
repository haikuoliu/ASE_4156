import { injectReducer } from 'SRC/reducer.js' // eslint-disable-line no-unused-vars

export default (store) => ({ // eslint-disable-line no-unused-vars
  path: 'topics',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      // Asyn Injection Of Reducers
      const reducer = require('./containers/reducer').default
      injectReducer(store, { key: 'clientTopics', reducer })
      cb(null, require('./containers/').default)
    }, 'topics')
  },
  childRoutes: [
    // require('./routes/home/routes.js').default,
    require('./routes/list/routes.js').default(store),
    require('./routes/topic/routes.js').default(store)
  ]
})
