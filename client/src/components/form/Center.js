import React, { Component } from 'react'
import { Form, InputNumber, Button, Row, Col, Input, Select } from 'antd'
const FormItem = Form.Item
const Option = Select.Option

const US_STATES = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY']

class Center extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
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
  handleCancel() {
    this.props.onSubmit(null)
    this.props.form.resetFields()
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const initialValue = this.props.initialValue
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row className="">
          <Col span={4} className="text-right">
            <h3 style={{ height: '34px', lineHeight: '34px' }}>Title:</h3>
          </Col>
          <Col span={16} offset={2} className="text-left">
            <FormItem style={{ width: '100%' }}>
              {getFieldDecorator('title', {
                initialValue: initialValue.title,
                rules: [
                  { required: true, message: 'Please provide a title for center!' }
                ]
              })(
                <Input style={{ width: '100%' }} placeholder="Write the title..." />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row className="">
          <Col span={4} className="text-right">
            <h3 style={{ height: '34px', lineHeight: '34px' }}>Address:</h3>
          </Col>
          <Col span={16} offset={2} className="text-left">
            <FormItem style={{ width: '100%' }}>
              {getFieldDecorator('street', {
                initialValue: initialValue.street,
                rules: [
                  { required: true, message: 'Please enter the address of center!' }
                ]
              })(
                <Input style={{ width: '100%' }} placeholder="Please enter the address..." />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row className="">
          <Col span={4} className="text-right">
            <h3 style={{ height: '34px', lineHeight: '34px' }}>City:</h3>
          </Col>
          <Col span={16} offset={2} className="text-left">
            <FormItem style={{ width: '100%' }}>
              {getFieldDecorator('city', {
                initialValue: initialValue.city,
                rules: [
                  { required: true, message: 'Please enter the city!' }
                ]
              })(
                <Input style={{ width: '30%' }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row className="">
          <Col span={4} className="text-right">
            <h3 style={{ height: '34px', lineHeight: '34px' }}>State:</h3>
          </Col>
          <Col span={16} offset={2} className="text-left">
            <FormItem style={{ width: '100%' }}>
              {getFieldDecorator('state', {
                initialValue: initialValue.state,
                rules: [
                  { required: true, message: 'Please select the state!' }
                ]
              })(
                <Select style={{ width: '30%' }}>
                  {
                    US_STATES.map(s => (
                      <Option key={s} value={s}>{s}</Option>
                    ))
                  }
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row className="">
          <Col span={4} className="text-right">
            <h3 style={{ height: '34px', lineHeight: '34px' }}>Capacity:</h3>
          </Col>
          <Col span={4} offset={2} className="text-left">
            <FormItem style={{ width: '100%' }}>
              {getFieldDecorator('size', {
                initialValue: initialValue.size,
                rules: [
                  { required: true, message: 'Please enter the Capacity of center!' }
                ]
              })(
                <InputNumber style={{ width: '100%' }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row className="">
          <Col span={4} className="text-right">
            <h3 style={{ height: '34px', lineHeight: '34px' }}>Description:</h3>
          </Col>
          <Col span={16} offset={2} className="text-left">
            <FormItem style={{ width: '100%' }}>
              {getFieldDecorator('content', {
                initialValue: initialValue.content,
                rules: [
                  { required: true, message: 'Please provide a description!' }
                ]
              })(
                <Input style={{ width: '100%' }} type="textarea" rows={4} placeholder="Write the description..." />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row className="">
          <Col span={18} offset={6} className="text-left">
            <FormItem>
              <Button type="primary" htmlType="submit" style={{ marginRight: '20px', width: '100px' }}>
                Ok
              </Button>
              <Button style={{ width: '100px' }} onClick={this.handleCancel}>
                Cancel
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
}

Center.propTypes = {
  form: React.PropTypes.object,
  initialValue: React.PropTypes.object,
  onSubmit: React.PropTypes.func
}

Center.defaultProps = {
  initialValue: {
    content: '',
    title: '',
    street: '',
    city: '',
    state: 'NY',
    size: 0
  },
  onSubmit: () => {}
}

export default Form.create()(Center)
