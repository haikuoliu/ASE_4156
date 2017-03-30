import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ClientBlogAction from '../../../containers/action'
import * as ClientActions from 'SRC/routes/ClientApp/containers/action'
// import * as PersistentActions from 'SRC/action'

// import moment from 'moment'
import { throttle } from 'SRC/utils/utils'

import { Card, Row, Col, Form, Input, Button, Select, Radio } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class BlogEdit extends Component {
  constructor(props) {
    super(props)
    this.switchLike = throttle(this.switchLike, 5000).bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentWillMount() {
    const eid = this.props.location.query.eid
    const myid = this.props.persistentStore.userId
    this.props.actions.loadAllTopics(myid)
    if (eid > 0) {
      this.props.actions.loadSingleEvent(eid, myid)
    } else {
      this.props.actions.updateEventFields('Reset')
      this.props.actions.updateEventFields({
        uid: myid,
        user_name: this.props.myInfo.userName
      })
    }
  }
  componentWillReceiveProps(nextProps) { // eslint-disable-line no-unused-vars
    const eid = this.props.location.query.eid
    const nextEid = nextProps.location.query.eid
    if (eid != nextEid) { // eslint-disable-line eqeqeq
      if (nextEid > 0) {
        const myid = this.props.persistentStore.userId
        this.props.actions.loadSingleEvent(nextEid, myid)
      } else {
        this.props.actions.updateEventFields('Reset')
      }
    }
    if (nextEid <= 0 && nextProps.store.event.user_name !== nextProps.myInfo.userName) {
      this.props.actions.updateEventFields({
        uid: nextProps.persistentStore.userId,
        user_name: nextProps.myInfo.userName
      })
    }
  }
  switchLike(eid, type = 'like') {
    const uid = this.props.persistentStore.userId
    this.props.globalActions.switchLike(uid, eid, type)
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log(values)
        this.props.actions.updateEventContent(
          this.props.persistentStore.userId,
          this.props.store.event.eid,
          values
        )
        // this.props.onSubmit(values.comment)
        // this.props.form.resetFields()
      }
    })
  }
  handleDelete() {
    this.props.actions.deleteEvent(
      this.props.persistentStore.userId,
      this.props.store.event.eid
    )
  }
  render() {
    const { event, topicsList } = this.props.store
    const { getFieldDecorator, getFieldValue } = this.props.form
    return (
      <div className="full-height" style={{ background: '#ECECEC', padding: '0 5%', overflow: 'auto' }}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Card bordered style={{ margin: '30px 0' }}>
            <div className="fs14">
              <Row type="flex" align="bottom">
                <Col span={24}>
                  <div className="captialize fc-dark">
                    <FormItem>
                      {getFieldDecorator('title', {
                        initialValue: event.title,
                        rules: [{ required: true, message: 'Please input your title!' }]
                      })(
                        <Input addonBefore={<h4>Title</h4>} placeholder="Write your title..." />
                      )}
                    </FormItem>
                  </div>
                </Col>
              </Row>
              <div className="fs12 margB15">
                <Link className="fc-dark" to={{ pathname: '/client/profile/info', query: { uid: event.uid } }}>
                  {`@ ${event.user_name}`}
                </Link>
              </div>
              <h4>Description :</h4>
              <FormItem>
                {getFieldDecorator('description', {
                  initialValue: event.description,
                  rules: [{ required: true, message: 'Please input your title!' }]
                })(
                  <Input type="textarea" rows={4} placeholder="Write your description..." />
                )}
              </FormItem>
              <h4>Topics :</h4>
              <FormItem>
                {getFieldDecorator('topics', {
                  initialValue: event.topics,
                  rules: []
                })(
                  <Select
                    multiple
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    >
                    {topicsList.map(topic => (
                      <Option key={topic} value={topic}>{topic}</Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </div>
            <Row>
              <Col span={12}>
                <FormItem>
                  {getFieldDecorator('event_type', {
                    initialValue: event.event_type,
                    rules: []
                  })(
                    <RadioGroup size="large">
                      <RadioButton value="blog">Blog</RadioButton>
                      <RadioButton value="picture">Image</RadioButton>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem className="text-right">
                  <Button
                    onClick={this.handleDelete}
                    style={{ marginRight: '20px' }}
                    >
                    Delete
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </FormItem>
              </Col>
            </Row>
          </Card>
          <Card
            bordered
            style={{ margin: '30px 0' }}
            title={getFieldValue('event_type') === 'picture' ? 'URL' : 'Content'}
            >
            {
              getFieldValue('event_type') === 'picture' ?
                <div>
                  <FormItem>
                    {getFieldDecorator('url', {
                      initialValue: event.url,
                      rules: [{ required: true, message: 'Please input your title!' }]
                    })(
                      <Input type="textarea" rows={4} placeholder="Specify the url of picture..." />
                    )}
                  </FormItem>
                  <div>
                    <img
                      alt="URL Invalid!"
                      width="100%"
                      src={getFieldValue('url')}
                      />
                  </div>
                </div> :
                <div>
                  <FormItem>
                    {getFieldDecorator('content', {
                      initialValue: event.content,
                      rules: [{ required: true, message: 'Please input your title!' }]
                    })(
                      <Input type="textarea" rows={4} placeholder="Write your content..." />
                    )}
                  </FormItem>
                </div>
            }
          </Card>
        </Form>
      </div>
    )
  }
}

BlogEdit.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ]),
  form: React.PropTypes.object,
  myInfo: React.PropTypes.object,
  location: React.PropTypes.object,
  store: React.PropTypes.object,
  persistentStore: React.PropTypes.object,
  globalActions: React.PropTypes.object,
  actions: React.PropTypes.object
}

function mapState(state) { // eslint-disable-line no-unused-vars
  return {
    myInfo: state.clientGeneral.userInfo.toJS(),
    persistentStore: state.persistentStore.toJS(),
    store: state.clientEvent.toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    globalActions: bindActionCreators(ClientActions, dispatch),
    actions: bindActionCreators(ClientBlogAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(Form.create()(BlogEdit))
