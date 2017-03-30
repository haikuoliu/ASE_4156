import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ClientProfileAction from '../../../containers/action'
import * as PersistentActions from 'SRC/action'

import { Row, Col, Button, Card } from 'antd'

import moment from 'moment'
import { throttle } from 'SRC/utils/utils'

class CentersList extends Component {
  constructor(props) {
    super(props)
    // this.switchFollowStatus = throttle(this.switchFollowStatus, 5000).bind(this)
  }
  render() {
    const { centersList } = this.props
    return (
      <div style={{ padding: '30px' }}>
        {
          centersList.map((center) => (
            <Card
              bordered
              style={{ height: '100%' }}
              >
              {`name: ${center.name}, location: ${center.location}`}
            </Card>
          )) 
        }
      </div>
    )
  }
}

CentersList.propTypes = {
  location: React.PropTypes.object,
  centersList: React.PropTypes.object,
  persistentStore: React.PropTypes.object,
  persistentActions: React.PropTypes.object,
  actions: React.PropTypes.object
}

function mapState(state) {
  return {
    persistentStore: state.persistentStore.toJS(),
    centersList: state.main.userProfile.get('centersList').toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(ClientProfileAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(CentersList)
