import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ClientProfileAction from '../../../containers/action'
// import * as PersistentActions from 'SRC/action'

import { Modal, Card, Icon, Popconfirm } from 'antd'
import { CenterForm } from 'SRC/components/form'

// import moment from 'moment'
// import { throttle } from 'SRC/utils/utils'

const initialEditCenterInfo = {
  content: '',
  title: '',
  street: '',
  city: '',
  state: 'NY',
  size: 0
}

class CentersList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false,
      editCid: null,
      editCenterInfo: initialEditCenterInfo
    }
    // this.enterEditModel = throttle(this.enterEditModel, 5000).bind(this)
    this.enterEditModel = this.enterEditModel.bind(this)
    this.closeEditModal = this.closeEditModal.bind(this)
    this.onCenterInfoSubmit = this.onCenterInfoSubmit.bind(this)
    this.handleCenterDeletion = this.handleCenterDeletion.bind(this)
  }
  onCenterInfoSubmit(centerInfo) {
    if (centerInfo) {
      const args = {
        ...centerInfo,
        username: this.props.persistentStore.username,
        cid: this.state.editCid,
        timestamp: new Date().valueOf()
      }
      this.props.actions.updateCenterInfo(args)
    }
    this.closeEditModal()
  }
  handleCenterDeletion(cid) {
    this.props.actions.deleteCenterInfo({
      username: this.props.persistentStore.username,
      cid
    })
  }
  enterEditModel(center) {
    this.setState({
      isVisible: true,
      editCid: center ? center.cid : null,
      editCenterInfo: !center ? initialEditCenterInfo : {
        content: center.content,
        title: center.title,
        street: center.location.street,
        city: center.location.city,
        state: center.location.state,
        size: center.size
      }
    })
  }
  closeEditModal() {
    this.setState({ isVisible: false, editCid: null, editCenterInfo: initialEditCenterInfo })
  }
  render() {
    const { centersList } = this.props
    return (
      <div>
        <div style={{ padding: '30px' }}>
          <Card style={{ marginBottom: '15px', height: '40px' }}>
            <div
              className="pointer text-center"
              onClick={this.enterEditModel.bind(this, null)}
              style={{ position: 'absolute', top: '11px', width: '100%' }}
              >
              <strong>CREATE NEW CENTER</strong>
            </div>
          </Card>
          {
            centersList.map((center) => (
              <Card
                title={<h3>{center.title}</h3>}
                extra={<div className="pointer">
                  <span onClick={this.enterEditModel.bind(this, center)} style={{ marginRight: '15px' }}>
                    <Icon type="edit" className="fs20" />
                  </span>
                  <span>
                    <Popconfirm
                      title="Are you sure delete this center?"
                      onConfirm={this.handleCenterDeletion.bind(this, center.cid)}
                      okText="Yes"
                      cancelText="No"
                      >
                      <Icon type="delete" className="fs20" />
                    </Popconfirm>
                  </span>
                </div>}
                bordered
                style={{ height: '100%', marginBottom: '15px' }}
                >
                <p className="fs14" style={{ marginBottom: '10px' }}>{`${center.content}`}</p>
                <p><i>{`${center.location.street}, ${center.location.city}, ${center.location.state}, ${center.location.zip}`}</i></p>
              </Card>
            ))
          }
        </div>
        <Modal
          title={`${this.state.editCid ? 'Edit Center Info' : 'Create New Center'}`}
          closable={false}
          maskClosable={false}
          onClose={this.closeEditModal}
          visible={this.state.isVisible}
          footer={null}
          >
          <CenterForm
            initialValue={this.state.editCenterInfo}
            onSubmit={this.onCenterInfoSubmit}
            />
        </Modal>
      </div>
    )
  }
}

CentersList.propTypes = {
  location: React.PropTypes.object,
  centersList: React.PropTypes.array,
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
