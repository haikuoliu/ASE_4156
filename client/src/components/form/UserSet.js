import React, { Component } from 'react'
import { Form, InputNumber, Button, Radio, Row, Col, Input } from 'antd'
const FormItem = Form.Item
const RadioGroup = Radio.Group

class UserSetForm extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit({
          filters: {
            age: [values.minAge, values.maxAge],
            sex: values.sex === 'both' ? '' : values.sex
          },
          description: values.description
        })
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
            <h3 style={{ height: '34px', lineHeight: '34px' }}>Age:</h3>
          </Col>
          <Col span={18} offset={2} className="text-left">
            <FormItem
              style={{ display: 'inline-block' }}
              >
              {getFieldDecorator('minAge', {
                initialValue: 0,
                rules: [
                  { type: 'integer', required: true, message: 'Invalid Age!' }
                ]
              })(
                <InputNumber min={0} max={getFieldValue('maxAge')} />
              )}
              <span className="ant-form-text"> to </span>
            </FormItem>
            <FormItem
              style={{ display: 'inline-block' }}
              >
              {getFieldDecorator('maxAge', {
                initialValue: 100,
                rules: [
                  { type: 'integer', required: true, message: 'Invalid Age!' }
                ]
              })(
                <InputNumber min={getFieldValue('minAge')} max={100} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row className="margB15">
          <Col span={4} className="text-right">
            <h3 style={{ height: '34px', lineHeight: '34px' }}>Sex:</h3>
          </Col>
          <Col span={18} offset={2} className="text-left">
            <FormItem>
              {getFieldDecorator('sex', {
                initialValue: 'both',
                rules: [
                  { required: true, message: 'Please select!' }
                ]
              })(
                <RadioGroup>
                  <Radio value="both">Both</Radio>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </RadioGroup>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row className="margB15">
          <Col span={4} className="text-right">
            <h3 style={{ height: '34px', lineHeight: '34px' }}>Description:</h3>
          </Col>
          <Col span={18} offset={2} className="text-left">
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
      </Form>
    )
  }
}
// <FormItem
//   {...formItemLayout}
//   label="Radio.Group"
//   >
//   {getFieldDecorator('radio-group')(
//     <RadioGroup>
//       <RadioButton value="a">item 1</RadioButton>
//       <RadioButton value="b">item 2</RadioButton>
//       <RadioButton value="c">item 3</RadioButton>
//     </RadioGroup>
//   )}
// </FormItem>

UserSetForm.propTypes = {
  form: React.PropTypes.object,
  onSubmit: React.PropTypes.func
}

UserSetForm.defaultProps = {
  onSubmit: () => {}
}

export default Form.create()(UserSetForm)
