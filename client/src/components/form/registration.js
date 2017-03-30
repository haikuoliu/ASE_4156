import React, { Component } from 'react'
import { Form, Radio, Input, Button, DatePicker } from 'antd'
const FormItem = Form.Item
const RadioGroup = Radio.Group

import moment from 'moment'

import { userRegister } from 'SRC/utils/login'

class RegistrationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emailValid: { status: null, msg: null },
      passwordDirty: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePasswordBlur = this.handlePasswordBlur.bind(this)
    this.checkPassowrd = this.checkPassowrd.bind(this)
    this.checkConfirm = this.checkConfirm.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        userRegister(values)
          .then(json => {
            if (json.status === 'fail') {
              this.setState({
                emailValid: { status: 'error', msg: json.result.msg }
              })
            } else {
              this.props.onSubmit(json.result.uid)
            }
          })
      }
    })
  }
  handlePasswordBlur(e) {
    const value = e.target.value
    this.setState({ passwordDirty: this.state.passwordDirty || !!value })
  }
  checkPassowrd(rule, value, callback) {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }
  checkConfirm(rule, value, callback) {
    const form = this.props.form
    if (value && this.state.passwordDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }
  checkBirthDate(current) {
    // can not select days before today and today
    return current && current.valueOf() > moment().subtract(1, 'days').valueOf()
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    }
    return (
      <Form horizontal onSubmit={this.handleSubmit} className="login-form">
        <FormItem
          {...formItemLayout}
          label="E-mail"
          hasFeedback
          >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!'
            }, {
              required: true, message: 'Please input your E-mail!'
            }]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Password"
          hasFeedback
          >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!'
            }, {
              validator: this.checkConfirm
            }]
          })(
            <Input type="password" onBlur={this.handlePasswordBlur} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Confirm Password"
          hasFeedback
          >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!'
            }, {
              validator: this.checkPassowrd
            }]
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Nickname"
          hasFeedback
          >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please input your nickname!' }]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Sex"
          >
          {getFieldDecorator('sex', {
            initialValue: 'male',
            rules: [
              { required: true, message: 'Please select Sex!' }
            ]
          })(
            <RadioGroup>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Birthday"
          >
          {getFieldDecorator('birth', {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }]
          })(
            <DatePicker disabledDate={this.checkBirthDate} />
          )}
        </FormItem>
        <FormItem
          validateStatus={this.state.emailValid.status}
          help={this.state.emailValid.msg}
          >
          <div className="text-center">
            <Button type="primary" htmlType="submit" className="login-form-button">
              Register
            </Button>
          </div>
        </FormItem>
      </Form>
    )
  }
}

RegistrationForm.propTypes = {
  form: React.PropTypes.object,
  onSubmit: React.PropTypes.func
}

RegistrationForm.defaultProps = {
  onSubmit: console.log // eslint-disable-line no-console
}

export default Form.create()(RegistrationForm)
