import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ClientProfileAction from '../../../containers/action'
// import * as PersistentActions from 'SRC/action'

import { Card } from 'antd'

import moment from 'moment'
// import { throttle } from 'SRC/utils/utils'

class ProfileInfo extends Component {
  constructor(props) {
    super(props)
    // this.switchFollowStatus = throttle(this.switchFollowStatus, 5000).bind(this)
  }
  render() {
    const { history } = this.props
    return (
      <div style={{ padding: '30px' }}>
        {
          history.slice(0, 10).map((order) => (
            <Card
              key={order.oid}
              bordered
              style={{ height: '100%', marginBottom: '15px' }}
              >
              <h4 className="margB10">{`${moment(order.timestamp).format('YYYY-MM-DD')} -`}<span className="fc-grey">{`#${order.oid}`}</span></h4>
              {
                order.types === 'Carer' ? null :
                  <p className="fs20 margB5">{`${order.center.title}`}</p>
              }
              <p className="margB5"><strong>Username: </strong> {order.contact.username} <strong>Email: </strong> {order.contact.email} <strong>Phone: </strong> {order.contact.phone}</p>
                {
                  order.types === 'Carer' ? null :
                    <p><i>{`${order.center.location.street}, ${order.center.location.city}, ${order.center.location.state}, ${order.center.location.zip}`}</i></p>
                }
            </Card>
          ))
        }
      </div>
    )
  }
}

ProfileInfo.propTypes = {
  location: React.PropTypes.object,
  history: React.PropTypes.array,
  persistentStore: React.PropTypes.object,
  persistentActions: React.PropTypes.object,
  actions: React.PropTypes.object
}

function mapState(state) {
  return {
    persistentStore: state.persistentStore.toJS(),
    history: state.main.userProfile.get('history').toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(ClientProfileAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(ProfileInfo)
