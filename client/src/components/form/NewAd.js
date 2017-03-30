import React, { Component } from 'react'
import { Form, InputNumber, Button, Radio, Row, Col, Input } from 'antd'
const FormItem = Form.Item
const RadioGroup = Radio.Group

class NewAd extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values)
        this.props.form.resetFields()
      }
    })
  }
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row className="margB15">
          <Col span={4} className="text-right">
            <h3 style={{ height: '34px', lineHeight: '34px' }}>URL:</h3>
          </Col>
          <Col span={16} offset={2} className="text-left">
            <FormItem style={{ width: '100%' }}>
              {getFieldDecorator('url', {
                initialValue: '',
                rules: [
                  { required: true, message: 'Please provide a url of the Ads!' }
                ]
              })(
                <Input style={{ width: '100%' }} type="textarea" rows={4} placeholder="Write the url..." />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row className="margB15">
          <Col span={4} className="text-right">
            <h3 style={{ height: '34px', lineHeight: '34px' }}>Description:</h3>
          </Col>
          <Col span={16} offset={2} className="text-left">
            <FormItem style={{ width: '100%' }}>
              {getFieldDecorator('description', {
                initialValue: '',
                rules: [
                  { required: true, message: 'Please provide a description!' }
                ]
              })(
                <Input style={{ width: '100%' }} type="textarea" rows={4} placeholder="Write the description..." />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row className="margB15">
          <Col span={18} offset={6} className="text-left">
            <FormItem>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </FormItem>
          </Col>
        </Row>
        <Row className="text-center">
          {
            !getFieldValue('url') ? null :
              <img
                alt="URL Invalid!"
                width="100%"
                src={getFieldValue('url')}
                />
          }
        </Row>
      </Form>
    )
  }
}

NewAd.propTypes = {
  form: React.PropTypes.object,
  onSubmit: React.PropTypes.func
}

NewAd.defaultProps = {
  onSubmit: () => {}
}

export default Form.create()(NewAd)
