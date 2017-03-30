import React, { Component } from 'react'
// import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AdsGeneralAction from '../../../containers/action'

import moment from 'moment'

import { Table, Card } from 'antd'
import { PushForm } from 'SRC/components/form'

const columns = [{
  title: 'User Set ID',
  dataIndex: 'set_id',
  key: 'set_id',
  sorter: (a, b) => a.set_id - b.set_id,
  width: '100px'
}, {
  title: 'Ad ID',
  dataIndex: 'aid',
  key: 'aid',
  sorter: (a, b) => a.aid - b.aid,
  width: '100px'
}, {
  title: 'Size',
  dataIndex: 'size',
  key: 'size',
  sorter: (a, b) => a.size - b.size,
  width: '100px'
}, {
  title: 'Price',
  dataIndex: 'price',
  key: 'price',
  sorter: (a, b) => a.price - b.price,
  render: (text) => text.toFixed(2),
  width: '100px'
}, {
  title: 'Time',
  dataIndex: 'time',
  key: 'time',
  sorter: (a, b) => a.time - b.time,
  render: (text) => moment(text).format('MMM Do YYYY, h:mm:ss a'),
  width: '200px'
}, {
  title: 'Description',
  dataIndex: 'description',
  key: 'description',
  width: '200px'
}]

class Push extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(args) {
    this.props.actions.makePushes({
      sid: this.props.store.sponsor.sid,
      set_id: args.userSet,
      aid: args.ad
    })
  }
  render() {
    const { pushesList, userSetsList, adsList } = this.props.store
    return (
      <div>
        <Card bordered style={{ margin: '30px 5%' }}>
          <PushForm
            userSetsList={userSetsList}
            adsList={adsList}
            onSubmit={this.handleSubmit}
            />
        </Card>
        <Card bordered style={{ margin: '30px 5%' }}>
          <h1 className="margB30"> Pushes List </h1>
          <Table dataSource={pushesList} columns={columns} />
        </Card>
      </div>
    )
  }
}

Push.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ]),
  location: React.PropTypes.object,
  store: React.PropTypes.object,
  persistentStore: React.PropTypes.object,
  actions: React.PropTypes.object
}

function mapState(state) {
  return {
    persistentStore: state.persistentStore.toJS(),
    store: state.ads.toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(AdsGeneralAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(Push)
