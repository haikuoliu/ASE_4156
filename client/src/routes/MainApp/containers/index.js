import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AdsGeneralAction from './action'

import { Menu, Row, Col, Icon } from 'antd'

class AdsApp extends Component {
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
  render() {
    const pathname = this.props.location.pathname.split('/')[2]
    return (
      <Row style={{ height: window.innerHeight }}>
        <div className="fix-top-row-wrapper" style={{ paddingTop: '80px' }}>
          <div className="fix-top-row" style={{ height: '80px' }}>
            <Row className="full-height">
              <Col span={4} className="full-height">
                <h1
                  className="text-center fc-white"
                  style={{ height: '80px', lineHeight: '80px', background: '#404040' }}
                  >
                  Pets Master
                </h1>
              </Col>
              <Col span={16}>
                <Menu
                  selectedKeys={[pathname]}
                  className="fs20"
                  style={{ height: '80px', lineHeight: '80px' }}
                  theme="dark"
                  mode="horizontal"
                  >
                  <Menu.Item key="ads_list">
                    <Link to="/main/ads_list"><Icon type="appstore" />Advertisemnts</Link>
                  </Menu.Item>
                  <Menu.Item key="user_sets">
                    <Link to="/main/user_sets"><Icon type="mail" />User Sets</Link>
                  </Menu.Item>
                  <Menu.Item key="push">
                    <Link to="/main/push"><Icon type="cloud-upload" />Push</Link>
                  </Menu.Item>
                </Menu>
              </Col>
              <Col span={4} className="full-height">
                <Link to="/main/profile">
                  <h1
                    className="text-center fc-white"
                    style={{ height: '80px', lineHeight: '80px', background: '#404040' }}
                    >
                    <Icon type="user" style={{ marginRight: '10px' }} />
                    {`Hi, ${this.props.sponsorInfo.name}`}
                  </h1>
                </Link>
              </Col>
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
  location: React.PropTypes.object,
  sponsorInfo: React.PropTypes.object,
  persistentStore: React.PropTypes.object,
  actions: React.PropTypes.object
}

function mapState(state) {
  return {
    persistentStore: state.persistentStore.toJS(),
    sponsorInfo: state.main.general.get('sponsor').toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(AdsGeneralAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(AdsApp)
