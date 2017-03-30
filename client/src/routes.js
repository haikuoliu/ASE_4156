const createRootRoutes = (store) => ({
  path: '/',
  component: 'div',
  indexRoute: {
    onEnter: (nextState, replace) => replace('/login')
  },
  childRoutes: [
    (require('SRC/routes/MainApp/routes.js').default)(store),
    // (require('SRC/routes/ClientApp/routes.js').default)(store),
    require('SRC/routes/DemoApp/routes.js').default,
    require('SRC/routes/LoginApp/routes.js').default
  ]
})

export default createRootRoutes
