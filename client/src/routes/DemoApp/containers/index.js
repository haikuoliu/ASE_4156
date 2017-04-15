import React, { Component } from 'react'
// import fetchPro from 'SRC/utils/fetchPro'
import { Button } from 'antd'
import GoogleMap from 'SRC/components/map/GoogleMap'
// import api from 'SRC/apis'

class DemoApp extends Component {
  render() {
    return (
      <div style={{ width: '100%', height: '400px' }} >
        <GoogleMap />
      </div>
    )
  }
}

export default DemoApp
