import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ClientProfileAction from '../../../containers/action'
import * as PersistentActions from 'SRC/action'

import { Row, Col, Button, Card } from 'antd'

import moment from 'moment'
import { throttle } from 'SRC/utils/utils'

class PetsList extends Component {
  constructor(props) {
    super(props)
    // this.switchFollowStatus = throttle(this.switchFollowStatus, 5000).bind(this)
  }
  render() {
    const { petsList } = this.props
    return (
      <div style={{ padding: '30px' }}>
        {
          petsList.map((pet) => (
            <Card
              bordered
              style={{ height: '100%' }}
              >
              {`name: ${pet.name}, type: ${pet.type}`}
            </Card>
          )) 
        }
      </div>
    )
  }
}

PetsList.propTypes = {
  location: React.PropTypes.object,
  history: React.PropTypes.object,
  persistentStore: React.PropTypes.object,
  persistentActions: React.PropTypes.object,
  actions: React.PropTypes.object
}

function mapState(state) {
  return {
    persistentStore: state.persistentStore.toJS(),
    petsList: state.main.userProfile.get('petsList').toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(ClientProfileAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(PetsList)
