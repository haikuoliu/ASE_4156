import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
const FormItem = Form.Item

import { userLogin } from 'SRC/utils/login'

class NormalLoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loginStatus: { status: null, msg: null }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.loginAsVisitor = this.loginAsVisitor.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // this.props.onSubmit({
        //   userName: values.userName.trim(),
        //   password: values.password.trim()
        // })
        userLogin({
          email: values.userName.trim(),
          password: values.password.trim()
        }).then(res => {
          if (res.status === 'fail') {
            this.setState({
              loginStatus: { status: 'error', msg: res.result.msg }
            })
          } else {
            this.props.onSubmit(res.result.uid)
          }
        })
        // this.props.form.resetFields()
      }
    })
  }
  loginAsVisitor() {
    this.props.onSubmit(null)
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{
              required: true,
              type: 'email',
              message: 'Invalid Username!',
              transform(value) {
                return value.toLowerCase()
              }
              // pattern: /^\w[\w\s]+\w$/,
              // message: 'Invalid Username! Letters or Digits only!',
              // transform: (value) => value.trim()
            }]
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="Email" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{
              type: 'string',
              required: true,
              message: 'Please input your Password!'
              // pattern: /^[^\s]{4,}$/,
              // message: 'Please input your Password! No space! At least 4 character!'
            }]
          })(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem
          validateStatus={this.state.loginStatus.status}
          help={this.state.loginStatus.msg}
          >
          <div className="text-center">
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            <span style={{ margin: '0 20px' }}>Or</span>
            <span className="fc-blue pointer" onClick={this.loginAsVisitor}>Visitor</span>
          </div>
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
  onSubmit: console.log // eslint-disable-line no-console
}

export default Form.create()(NormalLoginForm)
