import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

import { Row, Col, Card, Badge } from 'antd'

class ProfileFollow extends Component {
  render() {
    const userFollows = this.props.userFollows
    return (
      <div className="full-height" style={{ background: '#ECECEC', padding: '5%', overflow: 'auto' }}>
        <Row>
          {
            userFollows.followsList.map(user => (
              <Col key={user.uid} span={12} style={{ height: '200px' }}>
                <Card
                  title={
                    <h3 className="captialize">
                      <Link to={{ pathname: '/client/profile/info', query: { uid: user.uid } }}>
                        {user.name}
                      </Link>
                    </h3>
                  }
                  bordered
                  style={{ width: '90%' }}
                  >
                  <p>{user.email}</p>
                </Card>
              </Col>
            ))
          }
        </Row>
      </div>
    )
  }
}
ProfileFollow.propTypes = {
  location: React.PropTypes.object,
  userInfo: React.PropTypes.object,
  userFollows: React.PropTypes.object,
  persistentStore: React.PropTypes.object
}

function mapState(state) {
  return {
    persistentStore: state.persistentStore.toJS(),
    userInfo: state.clientProfile.userInfo.toJS(),
    userFollows: state.clientProfile.userFollows.toJS()
  }
}

function mapDispatch(dispatch) { // eslint-disable-line no-unused-vars
  return {
    // persistentActions: bindActionCreators(PersistentActions, dispatch)
  }
}

export default connect(mapState, mapDispatch)(ProfileFollow)
