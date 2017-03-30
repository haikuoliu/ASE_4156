import React, { Component } from 'react'

// import { DatePicker } from 'antd'

class Topics extends Component {
  render() {
    const query = this.props.location.query
    return (
      <div className="full-height">
        <div className="fix-top-row-wrapper" style={{ paddingTop: '80px' }}>
          <div className="fix-top-row" style={{ height: '80px', background: '#0272A2' }}>
            <h1 className="fc-white capitalize" style={{ fontSize: '30px', lineHeight: '80px', marginLeft: '5%' }}>
              {`Topics${query.topic ? ` - ${query.topic}` : ''}`}
            </h1>
          </div>
          <div className="full-height">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

Topics.propTypes = {
  location: React.PropTypes.object,
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ])
}

export default Topics
