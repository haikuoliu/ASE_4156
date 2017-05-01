import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AdsGeneralAction from './action'
import * as PersistentActions from 'SRC/action'

import { Menu, Row, Col, Icon, Popconfirm } from 'antd'

class AdsApp extends Component {
  constructor(props) {
    super(props)
    this._onLogout = this._onLogout.bind(this)
  }
  componentWillMount() {
    // const { sponsorId } = this.props.persistentStore
    // this.props.actions.loadMySponsorInfo(sponsorId)
    // this.props.actions.loadAdsOfSponsor(sponsorId)
    // this.props.actions.loadUserSetsOfSponsor(sponsorId)
    // this.props.actions.loadPushesOfSponsor(sponsorId)
  }
  componentWillReceiveProps(nextProps) { // eslint-disable-line no-unused-vars
    // const { userId } = this.props.persistentStore
    // const userInfo = this.props.userInfo
    // if (userId != userInfo.userId) { // eslint-disable-line eqeqeq
    //   // this.props.actions.loadMyInfo(userId)
    // }
  }
  _onLogout() {
    this.props.persistentActions.persistentClear()
    this.props.router.push('/login')
  }
  render() {
    const pathname = this.props.location.pathname.split('/')[2]
    const hasLogin = !!this.props.persistentStore.username
    return (
      <Row style={{ height: window.innerHeight }}>
        <div className="fix-top-row-wrapper" style={{ paddingTop: '80px' }}>
          <div className="fix-top-row" style={{ height: '80px', background: '#404040' }}>
            <Row className="full-height">
              <Col span={4} className="full-height">
                <Link to="/main/search" className="fc-white">
                  <h1
                    className="text-center fc-white"
                    style={{ height: '80px', lineHeight: '80px', background: '#404040' }}
                    >
                    Pets Matter
                  </h1>
                </Link>
              </Col>
              <Col span={12}>
                <Menu
                  selectedKeys={[pathname]}
                  className="fs20"
                  style={{ height: '80px', lineHeight: '80px' }}
                  theme="dark"
                  mode="horizontal"
                  >
                  {
                    // <Menu.Item key="post">
                    //   <Link to="/main/post/edit"><Icon type="appstore" />Post</Link>
                    // </Menu.Item>
                    // <Menu.Item key="search">
                    //   <Link to="/main/search"><Icon type="mail" />Search</Link>
                    // </Menu.Item>
                    // <Menu.Item key="push">
                    //   <Link to="/main/push"><Icon type="cloud-upload" />Push</Link>
                    // </Menu.Item>
                  }
                </Menu>
              </Col>
              {
                hasLogin ?
                  <Col span={8} className="full-height">
                    <Row>
                      <Col span={12}>
                        <div
                          className="text-right fc-white pointer"
                          style={{ height: '80px', lineHeight: '80px', background: '#404040' }}
                          >
                          <Popconfirm placement="bottom" title="Confrim Logout?" onConfirm={this._onLogout} okText="Yes" cancelText="No">
                            Logout
                          </Popconfirm>
                        </div>
                      </Col>
                      <Col span={12}>
                        <Link to="/main/profile">
                          <h1
                            className="text-center fc-white pointer"
                            style={{ height: '80px', lineHeight: '80px', background: '#404040' }}
                            >
                            <Icon type="user" style={{ marginRight: '10px' }} />
                            {`Hi, ${this.props.persistentStore.username}`}
                          </h1>
                        </Link>
                      </Col>
                    </Row>
                  </Col>
                :
                  <Col span={4} offset={4} className="full-height">
                    <Link to="/login">
                      <h1
                        className="text-center fc-white pointer"
                        style={{ height: '80px', lineHeight: '80px', background: '#404040' }}
                        >
                        <Icon type="user" style={{ marginRight: '10px' }} />
                        Login
                      </h1>
                    </Link>
                  </Col>
              }
            </Row>
          </div>
          <div className="full-height" style={{ background: '#ECECEC', overflow: 'auto' }}>
            {this.props.children}
          </div>
        </div>
      </Row>
    )
  }
}

AdsApp.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ]),
  router: React.PropTypes.object,
  location: React.PropTypes.object,
  sponsorInfo: React.PropTypes.object,
  persistentStore: React.PropTypes.object,
  actions: React.PropTypes.object,
  persistentActions: React.PropTypes.object
}

function mapState(state) {
  return {
    persistentStore: state.persistentStore.toJS(),
    sponsorInfo: state.main.general.get('sponsor').toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(AdsGeneralAction, dispatch),
    persistentActions: bindActionCreators(PersistentActions, dispatch)
  }
}

export default connect(mapState, mapDispatch)(AdsApp)
