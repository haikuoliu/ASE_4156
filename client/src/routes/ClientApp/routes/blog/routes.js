import { injectReducer } from 'SRC/reducer.js' // eslint-disable-line no-unused-vars

export default (store) => ( // eslint-disable-line no-unused-vars
  {
    path: 'blog',
    getComponent(location, cb) {
      require.ensure([], (require) => {
        // Asyn Injection Of Reducers
        const reducer = require('./containers/reducer').default
        injectReducer(store, { key: 'clientEvent', reducer })
        cb(null, require('./containers/').default)
      }, 'blog')
    },
    childRoutes: [
      require('./routes/edit/routes.js').default(store),
      require('./routes/view/routes.js').default(store)
    ]
  }
)
