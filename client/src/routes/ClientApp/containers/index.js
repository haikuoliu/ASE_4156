import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ClientGeneralAction from './action'
import * as PersistentActions from 'SRC/action'

import { Col, Row, Menu } from 'antd'
const SubMenu = Menu.SubMenu

// import CSSModules from 'react-css-modules'
// import styles from './style.hcss'

class ClientApp extends Component {
  componentWillMount() {
    const { userId } = this.props.persistentStore
    if (userId > 0) this.props.actions.loadMyInfo(userId)
  }
  componentWillReceiveProps(nextProps) { // eslint-disable-line no-unused-vars
    const { userId } = this.props.persistentStore
    const userInfo = this.props.userInfo
    if (userId != userInfo.userId) { // eslint-disable-line eqeqeq
      // this.props.actions.loadMyInfo(userId)
    }
  }
  render() {
    let pathname = this.props.location.pathname.replace('/client/', '')
    if (pathname === 'topics/topic') pathname = 'topics/list'
    const { userId } = this.props.persistentStore
    const isVisitor = !userId || parseInt(userId) <= 0
    const userInfo = this.props.userInfo
    return (
      <Row style={{ height: window.innerHeight }}>
        <Col span={4} className="full-height" style={{ background: '#404040' }}>
          <h1
            className="text-center fc-white text-single-line"
            style={{ height: '80px', lineHeight: '80px', overflow: 'hidden' }}
            >
            Hi, {userInfo.userName}
          </h1>
          <Menu
            theme="dark"
            style={{ width: '100%' }}
            defaultOpenKeys={['topics', 'blog', 'profile']}
            selectedKeys={[pathname]}
            mode="inline"
            >
            <Menu.Item key="feed" disabled={isVisitor}><Link to="/client/feed">News Feed</Link></Menu.Item>
            <SubMenu key="topics" title="Topics">
              <Menu.Item key="profile/subscribe" disabled={isVisitor}>
                <Link to={{ pathname: '/client/profile/subscribe', query: { uid: userId } }}>
                  My Topics
                </Link>
              </Menu.Item>
              <Menu.Item key="topics/list"><Link to="/client/topics/list">More Topics</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="blog" title="Blog">
              <Menu.Item key="profile/posts" disabled={isVisitor}>
                <Link to={{ pathname: '/client/profile/posts', query: { uid: userId } }}>
                  My Posts
                </Link>
              </Menu.Item>
              <Menu.Item key="blog/edit" disabled={isVisitor}>
                <Link to={{ pathname: '/client/blog/edit', query: { eid: -1 } }}>
                  Create Blog
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="profile" title="Profile">
              <Menu.Item key="profile/info" disabled={isVisitor}>
                <Link to={{ pathname: '/client/profile/info', query: { uid: userId } }}>
                  My Profile
                </Link>
              </Menu.Item>
              <Menu.Item key="profile/follow" disabled={isVisitor}>
                <Link to={{ pathname: '/client/profile/follow', query: { uid: userId } }}>
                  My Follows
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Col>
        <Col span={20} className="full-height">
          {this.props.children}
        </Col>
      </Row>
    )
  }
}

ClientApp.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ]),
  location: React.PropTypes.object,
  userInfo: React.PropTypes.object,
  persistentStore: React.PropTypes.object,
  persistentActions: React.PropTypes.object,
  actions: React.PropTypes.object
}

function mapState(state) {
  return {
    persistentStore: state.persistentStore.toJS(),
    userInfo: state.clientGeneral.userInfo.toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    persistentActions: bindActionCreators(PersistentActions, dispatch),
    actions: bindActionCreators(ClientGeneralAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(ClientApp)
