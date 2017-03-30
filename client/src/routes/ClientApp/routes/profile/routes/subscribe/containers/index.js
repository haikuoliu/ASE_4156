import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as PersistentActions from 'SRC/action'

import { Row, Col, Card, Badge } from 'antd'

class ProfileSubscribe extends Component {
  render() {
    const userTopics = this.props.userTopics
    return (
      <div className="full-height" style={{ background: '#ECECEC', padding: '5%', overflow: 'auto' }}>
        <Row>
          {
            userTopics.topicsList.map(topic => (
              <Col key={topic.topic_name} span={12} style={{ height: '200px' }}>
                <Card
                  title={
                    <h3 className="captialize">
                      <Link to={{ pathname: '/client/topics/topic', query: { topic: topic.topic_name } }}>
                        {topic.topic_name}
                      </Link>
                    </h3>
                  }
                  bordered
                  extra={<Badge count={topic.count} style={{ backgroundColor: '#fff', color: '#999', borderColor: '#d9d9d9' }} />}
                  style={{ width: '90%' }}
                  >
                  <p>{topic.description}</p>
                </Card>
              </Col>
            ))
          }
        </Row>
      </div>
    )
  }
}
ProfileSubscribe.propTypes = {
  location: React.PropTypes.object,
  userInfo: React.PropTypes.object,
  userTopics: React.PropTypes.object,
  persistentStore: React.PropTypes.object,
  persistentActions: React.PropTypes.object
}

function mapState(state) {
  return {
    persistentStore: state.persistentStore.toJS(),
    userInfo: state.clientProfile.userInfo.toJS(),
    userTopics: state.clientProfile.userTopics.toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    persistentActions: bindActionCreators(PersistentActions, dispatch)
  }
}

export default connect(mapState, mapDispatch)(ProfileSubscribe)
