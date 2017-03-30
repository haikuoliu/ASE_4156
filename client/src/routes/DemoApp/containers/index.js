import React, { Component } from 'react'
// import fetchPro from 'SRC/utils/fetchPro'
import { Button } from 'antd'
import LoginForm from 'SRC/components/form/Comment'
// import api from 'SRC/apis'

class DemoApp extends Component {
  postData() {
    // const formData = new FormData()
    // formData.append('content', 'This is a test comment!')
    // formData.append('eid', '1')
    // formData.append('uid', '2')
    // fetchPro(api('events:createComments'), {
    //   method: 'post',
    //   body: formData
    // })
    //   .then(response => response.json())
    //   .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
    //   .then(json => {
    //     console.log(json)
    //   })
  }
  render() {
    return (
      <div>
        <div> Demo </div>
        <Button onClick={this.postData}>AAAA</Button>
        <LoginForm />
      </div>
    )
  }
}

export default DemoApp
