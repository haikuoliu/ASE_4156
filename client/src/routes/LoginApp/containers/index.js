import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as PersistentActions from 'SRC/action'

import { Card, Modal, Tabs, Col, Row } from 'antd'
const TabPane = Tabs.TabPane
import { LoginForm, RegisterForm } from 'SRC/components/form'

import CSSModules from 'react-css-modules'
import styles from './style.hcss'

class LoginApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: true
    }
    this.login = this.login.bind(this)
    this.clientLogin = this.clientLogin.bind(this)
    this.switchLoginPanel = this.switchLoginPanel.bind(this)
  }
  componentWillMount() {
    this.props.persistentActions.persistentClear()
  }
  login(type) {
    if (type === 'client') {
      this.props.persistentActions.persistentSet('userId', 2)
      this.props.router.push('/client/feed')
    } else { // type === 'ads'
      this.props.persistentActions.persistentSet('sponsorId', 1)
      this.props.router.push('/ads/ads_list')
    }
  }
  switchLoginPanel() {
    // this.setState({ isLogin: !this.state.isLogin })
  }
  clientLogin(username) {
    // Login as Normal User
    this.props.persistentActions.persistentSet('username', username)
    this.props.router.push('/main')
  }
  render() {
    return (
      <div>
        {
        //   <div className="absolute-center-container" style={{ height: '98vh', width: '100%' }}>
        //   <div className="absolute-center" style={{ width: '100%', height: '40%' }}>
        //     <Row style={{ height: '100%' }}>
        //       <Col span={8} offset={3} className="full-height pointer">
        //         <Card
        //           className="full"
        //           style={{ height: '95%' }}
        //           bodyStyle={{ padding: 0, height: '100%' }}
        //           onClick={this.switchLoginPanel}
        //           >
        //           <div styleName="custom-image1" />
        //           <div styleName="custom-card">
        //             <h1 style={{ color: '#2db7f5' }}>Client</h1>
        //             <p className="fs16">www.instagram.com</p>
        //           </div>
        //         </Card>
        //       </Col>
        //       <Col span={8} offset={1} className="full-height pointer">
        //         <Card
        //           className="full"
        //           style={{ height: '95%' }}
        //           bodyStyle={{ padding: 0, height: '100%' }}
        //           onClick={this.login.bind(null, 'ads')}
        //           >
        //           <div styleName="custom-image2" />
        //           <div styleName="custom-card">
        //             <h1><Link to="/ads">Ads</Link></h1>
        //             <p className="fs16">www.instagram.com</p>
        //           </div>
        //         </Card>
        //       </Col>
        //     </Row>
        //   </div>
        // </div>
        }
        <div>
          <Modal
            closable={false}
            onClose={this.switchLoginPanel}
            visible={this.state.isLogin}
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
  // state: React.PropTypes.object,
  persistentActions: React.PropTypes.object
}

function mapState(state) { // eslint-disable-line
  return {
    // state: state.blog.BlogContent
  }
}

function mapDispatch(dispatch) {
  return {
    persistentActions: bindActionCreators(PersistentActions, dispatch)
  }
}

export default connect(mapState, mapDispatch)(CSSModules(LoginApp, styles))
