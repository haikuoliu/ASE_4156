import React, { Component } from 'react'
// import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AdsGeneralAction from '../../../containers/action'

import { Table, Card } from 'antd'
import { NewAdForm } from 'SRC/components/form'

const columns = [{
  title: 'ID',
  dataIndex: 'aid',
  key: 'aid',
  width: '50px'
}, {
  title: 'Sponsor',
  dataIndex: 'sponsor_name',
  key: 'sponsor_name',
  width: '100px'
}, {
  title: 'Description',
  dataIndex: 'description',
  key: 'description',
  width: '200px'
}, {
  title: 'URL',
  dataIndex: 'url',
  key: 'url'
}]


class AdsList extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(args) {
    this.props.actions.createNewAd({
      sid: this.props.store.sponsor.sid,
      url: args.url,
      description: args.description
    })
  }
  render() {
    return (
      <div>
        <Card bordered style={{ margin: '30px 5%' }}>
          <h1 className="margB30"> Ads List </h1>
          <Table dataSource={this.props.store.adsList} columns={columns} />
        </Card>
        <Card bordered style={{ margin: '30px 5%' }}>
          <h1 className="margB30"> Create New Ad </h1>
          <NewAdForm
            onSubmit={this.handleSubmit}
            />
        </Card>
      </div>
    )
  }
}

AdsList.propTypes = {
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

export default connect(mapState, mapDispatch)(AdsList)
