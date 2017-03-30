import React from 'react'
import ReactDOM from 'react-dom'
import { hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import App from './app'
import configureStore from './store/configureStore'

import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'

const store = configureStore(hashHistory)
const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
  <LocaleProvider locale={enUS}>
    <App store={store} history={history} />
  </LocaleProvider>,
  document.getElementById('container')
)
