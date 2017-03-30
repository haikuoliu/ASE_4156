import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
const FormItem = Form.Item

class NormalLoginForm extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values.comment)
        this.props.form.resetFields()
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('comment', {
            rules: [{ required: true, message: 'Please input your comment!' }]
          })(
            <Input className="fs16" type="textarea" rows={4} placeholder="Write a comment..." />
          )}
        </FormItem>
        <FormItem className="text-right">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      </Form>
    )
  }
}

NormalLoginForm.propTypes = {
  form: React.PropTypes.object,
  onSubmit: React.PropTypes.func
}

NormalLoginForm.defaultProps = {
  onSubmit: () => {}
}

export default Form.create()(NormalLoginForm)
