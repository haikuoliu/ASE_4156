import React, { Component } from 'react'
// import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ClientTopicsAction from '../../../containers/action'
import * as ClientActions from 'SRC/routes/ClientApp/containers/action'
// import * as PersistentActions from 'SRC/action'

import { BlogCard, ImgCard } from 'SRC/components/event-card'

class TopicEventsList extends Component {
  constructor(props) {
    super(props)
    this.switchLike = this.switchLike.bind(this)
  }
  componentWillMount() {
    const query = this.props.location.query
    if (!this.props.topicsStore.eventsList[query.topic]) {
      this.props.actions.loadAllEventsOfTopics(query.topic, this.props.persistentStore.userId)
    }
  }
  switchLike(eid, type = 'like') {
    const uid = this.props.persistentStore.userId
    if (uid > 0) this.props.globalActions.switchLike(uid, eid, type)
  }
  render() {
    const topicsStore = this.props.topicsStore
    const topic = this.props.location.query.topic || ''
    return (
      <div className="full-height" style={{ background: '#ECECEC', overflow: 'auto' }}>
        {
          (topicsStore.eventsList[topic] || []).map(event => (
            event.event_type === 'blog' ?
              <BlogCard
                key={`${event.eid}`}
                event={event}
                onLike={this.switchLike.bind(null, event.eid, 'like')}
                onCancelLike={this.switchLike.bind(null, event.eid, 'cancel_like')}
                /> :
              <ImgCard
                key={`${event.eid}`}
                event={event}
                onLike={this.switchLike.bind(null, event.eid, 'like')}
                onCancelLike={this.switchLike.bind(null, event.eid, 'cancel_like')}
                />
          ))
        }
      </div>
    )
  }
}
TopicEventsList.propTypes = {
  location: React.PropTypes.object,
  topicsStore: React.PropTypes.object,
  persistentStore: React.PropTypes.object,
  persistentActions: React.PropTypes.object,
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
    actions: bindActionCreators(ClientTopicsAction, dispatch),
    globalActions: bindActionCreators(ClientActions, dispatch)
  }
}

export default connect(mapState, mapDispatch)(TopicEventsList)
