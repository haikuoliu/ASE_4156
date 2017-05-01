import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ClientProfileGeneralAction from './action'
import * as PersistentActions from 'SRC/action'

import { Row, Col, Menu, Card, Modal, Icon } from 'antd'
import { RegisterForm } from 'SRC/components/form'

import moment from 'moment'

const BASIC_HEIGHT = '360px'

const menus = [
  { name: 'History', path: '/main/profile/history' },
  // { name: 'Pets', path: '/main/profile/pets' },
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
  constructor(props) {
    super(props)
    this.state = {
      profileEditModalVisible: false
    }
    this._openProfileEditModal = this._openProfileEditModal.bind(this)
    this._closeProfileEditModal = this._closeProfileEditModal.bind(this)
    this.editUserProfile = this.editUserProfile.bind(this)
  }
  componentWillMount() {
    const query = this.props.location.query
    const { username } = this.props.persistentStore
    this.props.actions.loadBasicInfo(username, query.username || username)
    // this.props.actions.loadPetsInfo(query.username || username)
    this.props.actions.loadCentersInfo(query.username || username)
    this.props.actions.loadOrdersInfo(query.username || username)
    // this.props.actions.getPostsOfUser(query.uid || userId, userId)
    // this.props.actions.getUsersFollowedBy(query.uid || userId)
  }
  componentWillReceiveProps(nextProps) {
    const query = this.props.location.query
    const nextQuery = nextProps.location.query
    if (query.username !== nextQuery.username) {
      const { username } = this.props.persistentStore
      this.props.actions.loadBasicInfo(username, nextQuery.username || username)
      // this.props.actions.loadPetsInfo(nextQuery.username || username)
      this.props.actions.loadCentersInfo(nextQuery.username || username)
      // this.props.actions.getPostsOfUser(nextQuery.uid || userId, userId)
      // this.props.actions.getUsersFollowedBy(nextQuery.uid || userId)
    }
  }
  _openProfileEditModal() {
    this.setState({ profileEditModalVisible: true })
  }
  _closeProfileEditModal() {
    this.setState({ profileEditModalVisible: false })
  }
  editUserProfile() {
    const { username } = this.props.persistentStore
    this.props.actions.loadBasicInfo(username, username)
    this._closeProfileEditModal()
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
                  title={<h1>Basic Info</h1>}
                  extra={<div className="pointer">
                    <span onClick={this._openProfileEditModal} style={{ marginRight: '15px' }}>
                      <Icon type="edit" className="fs20" />
                    </span>
                  </div>}
                  bordered
                  style={{ height: '100%' }}
                  >
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
        <Modal
          title={"Edit User Profile"}
          closable={false}
          visible={this.state.profileEditModalVisible}
          footer={null}
          >
          {
            !this.state.profileEditModalVisible ? null :
              <RegisterForm
                onSubmit={this.editUserProfile}
                isEdit
                initialValue={{
                  ...this.props.userInfo,
                  username: this.props.userInfo.userName,
                  gender: this.props.userInfo.gender === 'Male' ? 'male' : 'female'
                }}
                />
          }
        </Modal>
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
