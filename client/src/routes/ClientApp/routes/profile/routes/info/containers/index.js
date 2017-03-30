import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ClientProfileAction from '../../../containers/action'
import * as PersistentActions from 'SRC/action'

import { Row, Col, Button } from 'antd'

import moment from 'moment'
import { throttle } from 'SRC/utils/utils'

const infoList = [
  ['User Name', 'userName'],
  ['Sex', 'sex'],
  ['Birth Day', 'birth', (timestamp) => moment(timestamp).format('YYYY-MM-DD')],
  ['Email', 'email'],
  ['Followed By', 'followerNum']
]

class ProfileInfo extends Component {
  constructor(props) {
    super(props)
    this.switchFollowStatus = throttle(this.switchFollowStatus, 5000).bind(this)
  }
  switchFollowStatus() {
    const { uid, isFollow } = this.props.userInfo // otherId
    const { userId } = this.props.persistentStore // myId
    this.props.actions.switchFollow(userId, uid, isFollow ? 'cancel' : 'follow')
  }
  render() {
    const { userInfo } = this.props
    const isVisitor = parseInt(this.props.persistentStore.userId) === 0
    return (
      <div style={{ paddingTop: '30px' }}>
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
        {
          isVisitor || userInfo.isSelf ? null :
            <Row className="fs16" style={{ marginBottom: '24px' }}>
              <Col span={8} offset={10}>
                <Button
                  type={userInfo.isFollow ? 'default' : 'primary'}
                  size="large"
                  className="fs16"
                  onClick={this.switchFollowStatus}
                  >
                  {userInfo.isFollow ? 'Cancel Follow' : 'Follow'}
                </Button>
              </Col>
            </Row>
        }
      </div>
    )
  }
}

ProfileInfo.propTypes = {
  location: React.PropTypes.object,
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
    actions: bindActionCreators(ClientProfileAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(ProfileInfo)
