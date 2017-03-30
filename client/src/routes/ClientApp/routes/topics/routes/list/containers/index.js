import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ClientGlobalActions from 'SRC/routes/ClientApp/containers/action'
import * as ClientTopicsAction from '../../../containers/action'

import { Row, Col, Card, Button } from 'antd'

class TopicsList extends Component {
  constructor(props) {
    super(props)
    this.switchSubscribeStatus = this.switchSubscribeStatus.bind(this)
  }
  componentWillMount() {
    this.props.actions.loadAllTopics(this.props.persistentStore.userId)
  }
  switchSubscribeStatus(topic, isSubscribed) {
    const myId = this.props.persistentStore.userId
    if (isSubscribed) { // Cancel Subscribe
      this.props.globalActions.switchSubscribe(myId, topic, 'cancel subscribe')
    } else { // Subscribe
      this.props.globalActions.switchSubscribe(myId, topic, 'subscribe')
    }
  }
  render() {
    const topicsStore = this.props.topicsStore
    const isVisitor = parseInt(this.props.persistentStore.userId) === 0
    return (
      <div className="full-height" style={{ background: '#ECECEC', padding: '5%', overflow: 'auto' }}>
        <Row>
          {
            topicsStore.topicsList.map(topic => (
              <Col key={topic.topic_name} span={12} style={{ height: '200px' }}>
                <Card
                  title={
                    <h3 className="capitalize">
                      <Link to={{ pathname: '/client/topics/topic', query: { topic: topic.topic_name } }}>
                        {topic.topic_name}
                      </Link>
                    </h3>
                  }
                  bordered
                  extra={
                    <div>
                      {
                        isVisitor ? null :
                          <Button
                            type={topic.isSubscribed ? 'primary' : 'default'}
                            size="small"
                            style={{ width: '80px' }}
                            onClick={this.switchSubscribeStatus.bind(null, topic.topic_name, topic.isSubscribed)}
                            >
                            {topic.isSubscribed ? 'Cancel' : 'Subscribe'}
                          </Button>
                      }
                    </div>
                  }
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
TopicsList.propTypes = {
  location: React.PropTypes.object,
  topicsStore: React.PropTypes.object,
  persistentStore: React.PropTypes.object,
  globalActions: React.PropTypes.object,
  actions: React.PropTypes.object
}

function mapState(state) {
  return {
    persistentStore: state.persistentStore.toJS(),
    topicsStore: state.clientTopics.toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    globalActions: bindActionCreators(ClientGlobalActions, dispatch),
    actions: bindActionCreators(ClientTopicsAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(TopicsList)
