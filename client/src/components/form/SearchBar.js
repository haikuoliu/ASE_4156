import React, { Component } from 'react'
import { Form, InputNumber, Button, Select, Row, Col, Input } from 'antd'
const FormItem = Form.Item
const Option = Select.Option

const US_STATES = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY']

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values)
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row className="margB15">
          <Col span={8} className="text-left">
            <FormItem
              style={{ display: 'inline-block', width: '100%', padding: '0 5px' }}
              >
              {getFieldDecorator('address', {
                initialValue: '',
                rules: [
                  { required: true, message: ' ' }
                ]
              })(
                <Input style={{ width: '100%' }} placeholder="Address" />
              )}
            </FormItem>
          </Col>
          <Col span={4}>
            <FormItem
              style={{ display: 'inline-block', padding: '0 5px' }}
              >
              {getFieldDecorator('city', {
                initialValue: ''
              })(
                <Input style={{ width: '100%' }} placeholder="City" />
              )}
            </FormItem>
          </Col>
          <Col span={4}>
            <FormItem style={{ width: '100%', padding: '0 5px' }}>
              {getFieldDecorator('state', {
                initialValue: 'NY',
                rules: [
                  { required: true, message: 'Please select the state!' }
                ]
              })(
                <Select style={{ width: '100%' }} placeholder="State">
                  {
                    US_STATES.map(s => (
                      <Option key={s} value={s}>{s}</Option>
                    ))
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={4}>
            <FormItem style={{ width: '100%', padding: '0 5px' }}>
              {getFieldDecorator('size', {
                initialValue: 0,
                rules: [
                  { required: true, message: 'Please enter the Capacity of center!' }
                ]
              })(
                <InputNumber style={{ width: '100%' }} />
              )}
            </FormItem>
          </Col>
          <Col span={4}>
            <FormItem>
              <Button type="primary" htmlType="submit" style={{ marginRight: '20px', width: '100px', height: '32px' }}>
                Search
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

SearchBar.propTypes = {
  form: React.PropTypes.object,
  onSubmit: React.PropTypes.func
}

SearchBar.defaultProps = {
  onSubmit: () => {}
}

export default Form.create()(SearchBar)
