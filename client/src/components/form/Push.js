import React, { Component } from 'react'
import { Form, Select, Button, Row, Col } from 'antd'
const FormItem = Form.Item
const Option = Select.Option

class PushForm extends Component {
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
    const { userSetsList, adsList } = this.props
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <Row>
          <Col span={10}>
            <FormItem
              label="Select"
              >
              {getFieldDecorator('userSet', {
                rules: [
                  { required: true, message: 'Please select the user set!' }
                ]
              })(
                <Select style={{ width: '200px' }} placeholder="Please select a user set">
                  {
                    userSetsList.map(r => (
                      <Option
                        key={r.set_id}
                        value={`${r.set_id}`}
                        style={{ whiteSpace: 'normal' }}
                        >
                        {`${r.set_id} - ${r.description}`}
                      </Option>
                    ))
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={10}>
            <FormItem
              label="Select"
              >
              {getFieldDecorator('ad', {
                rules: [
                  { required: true, message: 'Please select the ad!' }
                ]
              })(
                <Select style={{ width: '200px' }} placeholder="Please select an ad">
                  {
                    adsList.map(r => (
                      <Option
                        style={{ whiteSpace: 'normal' }}
                        key={r.aid}
                        value={`${r.aid}`}
                        >
                        {`${r.aid} - ${r.description}`}
                      </Option>
                    ))
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={4}>
            <FormItem className="text-right">
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

PushForm.propTypes = {
  form: React.PropTypes.object,
  userSetsList: React.PropTypes.array,
  adsList: React.PropTypes.array,
  onSubmit: React.PropTypes.func
}

PushForm.defaultProps = {
  onSubmit: () => {},
  userSetList: [],
  adsList: []
}

export default Form.create()(PushForm)
