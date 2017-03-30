import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ClientGlobalActions from 'SRC/routes/ClientApp/containers/action'
import * as ClientFeedsActions from './action'

import { BlogCard, ImgCard, AdCard } from 'SRC/components/event-card'

class Feeds extends Component {
  constructor(props) {
    super(props)
    this.switchLike = this.switchLike.bind(this)
  }
  componentWillMount() {
    const { userId } = this.props.persistentStore
    this.props.actions.resetFeeds()
    this.props.actions.loadFeeds(userId, 0, 20, this.props.store.timestamp)
    this.props.actions.loadAds(userId, 2)
  }
  switchLike(eid, type = 'like') {
    const uid = this.props.persistentStore.userId
    this.props.globalActions.switchLike(uid, eid, type)
  }
  render() {
    const { feedsList, adsList } = this.props.store
    return (
      <div className="full-height">
        <div className="fix-top-row-wrapper" style={{ paddingTop: '80px' }}>
          <div className="fix-top-row" style={{ height: '80px' }}>
            <div>
              <h1
                className="fc-white fs30"
                style={{ paddingLeft: '5%', lineHeight: '80px', background: '#0272A2' }}
                >
                Feeds
              </h1>
            </div>
          </div>
          <div className="full-height" style={{ background: '#ECECEC', overflow: 'auto' }}>
            {
              (feedsList || []).map((event, i) => (
                <div key={`${event.eid}`}>
                  {
                    i < 3 || i % 3 !== 0 || adsList.length === 0 ? null :
                      <AdCard event={adsList.pop()} />
                  }
                  {
                    event.event_type === 'blog' ?
                      <BlogCard
                        event={event}
                        onLike={this.switchLike.bind(null, event.eid, 'like')}
                        onCancelLike={this.switchLike.bind(null, event.eid, 'cancel_like')}
                        /> :
                      <ImgCard
                        event={event}
                        onLike={this.switchLike.bind(null, event.eid, 'like')}
                        onCancelLike={this.switchLike.bind(null, event.eid, 'cancel_like')}
                        />
                  }
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

Feeds.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ]),
  location: React.PropTypes.object,
  store: React.PropTypes.object,
  persistentStore: React.PropTypes.object,
  globalActions: React.PropTypes.object,
  actions: React.PropTypes.object
}

function mapState(state) {
  return {
    persistentStore: state.persistentStore.toJS(),
    store: state.clientFeeds.toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    globalActions: bindActionCreators(ClientGlobalActions, dispatch),
    actions: bindActionCreators(ClientFeedsActions, dispatch)
  }
}

export default connect(mapState, mapDispatch)(Feeds)
