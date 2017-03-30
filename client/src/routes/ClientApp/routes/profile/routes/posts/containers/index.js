import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ClientActions from 'SRC/routes/ClientApp/containers/action'

import { BlogCard, ImgCard } from 'SRC/components/event-card'
// import { DatePicker } from 'antd'

class ProfilePosts extends Component {
  constructor(props) {
    super(props)
    this.switchLike = this.switchLike.bind(this)
  }
  switchLike(eid, type = 'like') {
    const uid = this.props.persistentStore.userId
    if (uid > 0) this.props.actions.switchLike(uid, eid, type)
  }
  render() {
    return (
      <div className="full-height" style={{ background: '#ECECEC', overflow: 'auto' }}>
        {
          (this.props.userPostsList || []).map(event => (
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

ProfilePosts.propTypes = {
  location: React.PropTypes.object,
  actions: React.PropTypes.object,
  persistentStore: React.PropTypes.object,
  userPostsList: React.PropTypes.array
}

function mapState(state) {
  return {
    persistentStore: state.persistentStore.toJS(),
    userPostsList: state.clientProfile.userPosts.get('eventsList').toJS()
  }
}

function mapDispatch(dispatch) { // eslint-disable-line
  return {
    actions: bindActionCreators(ClientActions, dispatch)
  }
}

export default connect(mapState, mapDispatch)(ProfilePosts)
