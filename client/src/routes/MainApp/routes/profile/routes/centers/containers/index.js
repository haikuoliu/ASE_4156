import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ClientProfileAction from '../../../containers/action'
// import * as PersistentActions from 'SRC/action'

import { Card, Icon } from 'antd'
//
// import moment from 'moment'
// import { throttle } from 'SRC/utils/utils'

class CentersList extends Component {
  // constructor(props) {
  //   super(props)
  //   // this.switchFollowStatus = throttle(this.switchFollowStatus, 5000).bind(this)
  // }
  render() {
    const { centersList } = this.props
    return (
      <div style={{ padding: '30px' }}>
        {
          centersList.map((center) => (
            <Card
              title={<h3>{center.title}</h3>}
              extra={<Icon type="edit" />}
              bordered
              style={{ height: '100%', marginBottom: '20px' }}
              >
              <p className="fs14" style={{ marginBottom: '10px' }}>{`${center.content}`}</p>
              <p><i>{`${center.location.street} ${center.location.zip}`}</i></p>
            </Card>
          ))
        }
      </div>
    )
  }
}
// title: 'software',
// content: 'Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
// size: 186,
// timestamp: 20178115,
// location: {
//   street: '301 Elmside Drive',
//   zip: 77042,
//   lat: 29.7328935,
//   lng: -95.5431595
// }
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
