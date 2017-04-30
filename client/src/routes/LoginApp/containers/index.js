import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as PersistentActions from 'SRC/action'

import { Modal, Tabs } from 'antd'
const TabPane = Tabs.TabPane
import { LoginForm, RegisterForm } from 'SRC/components/form'

import CSSModules from 'react-css-modules'
import styles from './style.hcss'

class LoginApp extends Component {
  constructor(props) {
    super(props)
    this.clientLogin = this.clientLogin.bind(this)
  }
  componentWillMount() {
    if (this.props.persistentStore.username) {
      this.props.router.push('/main')
    }
  }
  componentWillReceiveProps(nextProps) {
    // if (this.props.persistentStore.username) {
    //   this.props.router.push('/main')
    // }
  }
  clientLogin(username) {
    // Login as Normal User
    if (username) {
      this.props.persistentActions.persistentSet('username', username)
    }
    this.props.router.push('/main')
  }
  render() {
    return (
      <div>
        <div>
          <Modal
            closable={false}
            visible
            footer={null}
            >
            <Tabs type="card" defaultActiveKey=".$login">
              <TabPane tab="Login" key="login">
                <LoginForm onSubmit={this.clientLogin} />
              </TabPane>
              <TabPane tab="Register" key="register">
                <RegisterForm onSubmit={this.clientLogin} />
              </TabPane>
            </Tabs>
          </Modal>
        </div>
      </div>
    )
  }
}

LoginApp.propTypes = {
  router: React.PropTypes.object,
  persistentStore: React.PropTypes.object,
  persistentActions: React.PropTypes.object
}

function mapState(state) { // eslint-disable-line
  return {
    persistentStore: state.persistentStore.toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    persistentActions: bindActionCreators(PersistentActions, dispatch)
  }
}

export default connect(mapState, mapDispatch)(CSSModules(LoginApp, styles))
