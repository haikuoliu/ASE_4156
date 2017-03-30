import React, { Component } from 'react'
// import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AdsGeneralAction from '../../../containers/action'

import { Table, Card, Icon } from 'antd'
import { UserSetForm } from 'SRC/components/form'

class UserSets extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  handleSubmit(args) {
    this.props.actions.createUserSet({
      sid: this.props.store.sponsor.sid,
      filters: JSON.stringify(args.filters),
      description: args.description
    })
  }
  handleDelete(setId) {
    this.props.actions.deleteUserSet({
      sid: this.props.store.sponsor.sid,
      set_id: setId
    })
  }
  render() {
    const columns = [{
      title: 'Set Id',
      dataIndex: 'set_id',
      key: 'set_id',
      sorter: (a, b) => a.set_id - b.set_id,
      width: '100px'
    }, {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      sorter: (a, b) => a.size - b.size,
      width: '100px'
    }, {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '200px'
    }, {
      title: 'Filters',
      dataIndex: 'filters',
      key: 'filters'
    }, {
      title: 'Action',
      dataIndex: 'set_id',
      key: 'action',
      render: (text) => (
        <div
          className="text-left pointer inline-mid"
          onClick={this.handleDelete.bind(null, text)}
          >
          <Icon type="close-circle-o" className="fs20" />
        </div>
      ),
      width: '80px'
    }]
    return (
      <div>
        <Card bordered style={{ margin: '30px 5%' }}>
          <h1 className="margB30"> User Sets List </h1>
          <Table dataSource={this.props.store.userSetsList} columns={columns} />
        </Card>
        <Card bordered style={{ margin: '30px 5%' }}>
          <h1 className="margB30"> Create User Set </h1>
          <UserSetForm
            onSubmit={this.handleSubmit}
            />
        </Card>
      </div>
    )
  }
}

UserSets.propTypes = {
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

export default connect(mapState, mapDispatch)(UserSets)
