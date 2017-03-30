export default {
  path: '/demo',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./containers/').default)
    }, 'demo')
  }
}
