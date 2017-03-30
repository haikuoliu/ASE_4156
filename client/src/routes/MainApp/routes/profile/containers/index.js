import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ClientProfileGeneralAction from './action'
import * as PersistentActions from 'SRC/action'

import { Row, Col, Menu, Card } from 'antd'
import moment from 'moment'

const BASIC_HEIGHT = '360px'

const menus = [
  { name: 'History', path: '/main/profile/history' },
  { name: 'Pets', path: '/main/profile/pets' },
  { name: 'Centers', path: '/main/profile/centers' }
]

const infoList = [
  ['User Name', 'userName'],
  ['Gender', 'gender'],
  ['Birth Day', 'birth', (timestamp) => moment(timestamp).format('YYYY-MM-DD')],
  ['Email', 'email'],
  ['Phone', 'phone']
]

class Profile extends Component {
  componentWillMount() {
    const query = this.props.location.query
    const { username } = this.props.persistentStore
    this.props.actions.loadBasicInfo(username, query.username || username)
    this.props.actions.loadPetsInfo(query.username || username)
    // this.props.actions.getPostsOfUser(query.uid || userId, userId)
    // this.props.actions.getUsersFollowedBy(query.uid || userId)
  }
  componentWillReceiveProps(nextProps) {
    const query = this.props.location.query
    const nextQuery = nextProps.location.query
    if (query.username !== nextQuery.username) {
      const { username } = this.props.persistentStore
      this.props.actions.loadBasicInfo(username, nextQuery.username || username)
      this.props.actions.loadPetsInfo(nextQuery.username || username)
      // this.props.actions.getPostsOfUser(nextQuery.uid || userId, userId)
      // this.props.actions.getUsersFollowedBy(nextQuery.uid || userId)
    }
  }
  render() {
    const pathname = this.props.location.pathname
    const userInfo = this.props.userInfo
    return (
      <div className="full-height">
        <div className="fix-top-row-wrapper" style={{ paddingTop: BASIC_HEIGHT }}>
          <div className="fix-top-row" style={{ height: BASIC_HEIGHT }}>
            <div>
              <h1
                className="fc-black fs30"
                style={{ padding: '20px 5%', height: BASIC_HEIGHT }}
                >
                <Card
                  bordered
                  style={{ height: '100%' }}
                  >
                  <h1>Basic Info</h1>
                  {
                    infoList.map((args) => (
                      <Row key={args[0]} className="fs16" style={{ marginBottom: '24px' }}>
                        <Col span={8}><h4 className="text-right fc-dark">{`${args[0]}:`}</h4></Col>
                        {
                          args[2] ?
                            <Col span={8} offset={2}>{args[2](userInfo[args[1]])}</Col> :
                            <Col span={8} offset={2}>{userInfo[args[1]]}</Col>
                        }
                      </Row>
                    ))
                  }
                </Card>
              </h1>
            </div>
          </div>
          <div className="full-height">
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
    userInfo: state.main.userProfile.get('basicInfo').toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    persistentActions: bindActionCreators(PersistentActions, dispatch),
    actions: bindActionCreators(ClientProfileGeneralAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(Profile)
