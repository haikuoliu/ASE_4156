import React, { Component } from 'react'
import { Form, Input, Button, Row, Col } from 'antd'
const FormItem = Form.Item

class OrderForm extends Component {
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
    const { getFieldDecorator } = this.props.form
    const centersInfo = this.props.centersInfo
    return (
      <Form onSubmit={this.handleSubmit}>
        <h2 className="margB15">{centersInfo.title}</h2>
        <p className="fs12 margB15"><i>{`${centersInfo.location.street}, ${centersInfo.location.city}, ${centersInfo.location.state}, ${centersInfo.location.zip}`}</i></p>
        <Row className="margB15 fs20">
          <Col span={3} className="text-right">Capacity:</Col>
          <Col span={8} offset={1}>{centersInfo.size}</Col>
          <Col span={3} className="text-right">Price:</Col>
          <Col span={8} offset={1}>{centersInfo.price}</Col>
        </Row>
        <p className="margB15" style={{ maxHeight: '200px', overflow: 'auto' }}>{centersInfo.content}</p>
        <FormItem>
          {getFieldDecorator('msg', {
            rules: [{ required: true, message: 'Please input your mesage!' }]
          })(
            <Input className="fs16" type="textarea" rows={4} placeholder="Write a message..." />
          )}
        </FormItem>
        <FormItem className="text-right">
          <Button type="primary" htmlType="submit">
            Order
          </Button>
        </FormItem>
      </Form>
    )
  }
}

OrderForm.propTypes = {
  form: React.PropTypes.object,
  centersInfo: React.PropTypes.object,
  onSubmit: React.PropTypes.func
}

OrderForm.defaultProps = {
  centerInfo: {
    cid: '', // '575ac7b6-0f29-4aa2-bb0d-f93e86433c7e',
    title: '', // 'string',
    size: 0, // 23,
    price: 0, // 100,
    content: 0, // 'string',
    location: {
      city: 'New York',
      lat: 28.380689,
      lng: -81.3595259,
      state: 'NY',
      street: '8333 Meadow Ridge Circle',
      zip: 32824
    }
  },
  onSubmit: () => {}
}

export default Form.create()(OrderForm)
