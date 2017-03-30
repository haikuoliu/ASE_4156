import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ClientProfileGeneralAction from './action'
import * as PersistentActions from 'SRC/action'

import { Menu } from 'antd'

// <div>
//   <Link to="/client/profile/info">Info </Link>
//   <Link to="/client/profile/posts">Posts </Link>
//   <Link to="/client/profile/follow">Follow </Link>
//   <Link to="/client/profile/subscribe">Subscribe </Link>
// </div>

const menus = [
  { name: 'Info', path: '/client/profile/info' },
  { name: 'Posts', path: '/client/profile/posts' },
  { name: 'Follow', path: '/client/profile/follow' },
  { name: 'Subscribe', path: '/client/profile/subscribe' }
]

class Profile extends Component {
  componentWillMount() {
    const query = this.props.location.query
    const { userId } = this.props.persistentStore
    this.props.actions.loadUserInfo(userId, query.uid || userId)
    this.props.actions.getTopicsOfUser(query.uid || userId)
    this.props.actions.getPostsOfUser(query.uid || userId, userId)
    this.props.actions.getUsersFollowedBy(query.uid || userId)
  }
  componentWillReceiveProps(nextProps) {
    const query = this.props.location.query
    const nextQuery = nextProps.location.query
    if (query.uid !== nextQuery.uid) {
      const { userId } = this.props.persistentStore
      this.props.actions.loadUserInfo(userId, nextQuery.uid || userId)
      this.props.actions.getTopicsOfUser(nextQuery.uid || userId)
      this.props.actions.getPostsOfUser(nextQuery.uid || userId, userId)
      this.props.actions.getUsersFollowedBy(nextQuery.uid || userId)
    }
  }
  render() {
    const pathname = this.props.location.pathname
    const userInfo = this.props.userInfo
    return (
      <div className="full-height">
        <div className="fix-top-row-wrapper" style={{ paddingTop: '130px' }}>
          <div className="fix-top-row" style={{ height: '130px' }}>
            <div>
              <h1
                className="fc-white fs30"
                style={{ paddingLeft: '5%', lineHeight: '80px', background: '#0272A2' }}
                >
                {`User Profile - ${userInfo.userName}`}
              </h1>
              <Menu mode="horizontal" className="fs16" selectedKeys={[pathname]}>
                {
                  menus.map(item => (
                    <Menu.Item key={item.path}>
                      <Link to={{ pathname: item.path, query: { uid: userInfo.uid } }}>
                        {item.name}
                      </Link>
                    </Menu.Item>
                  ))
                }
              </Menu>
            </div>
          </div>
          <div className="full-height">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  location: React.PropTypes.object,
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ]),
  userInfo: React.PropTypes.object,
  persistentStore: React.PropTypes.object,
  persistentActions: React.PropTypes.object,
  actions: React.PropTypes.object
}

function mapState(state) {
  return {
    persistentStore: state.persistentStore.toJS(),
    userInfo: state.clientProfile.userInfo.toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    persistentActions: bindActionCreators(PersistentActions, dispatch),
    actions: bindActionCreators(ClientProfileGeneralAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(Profile)
