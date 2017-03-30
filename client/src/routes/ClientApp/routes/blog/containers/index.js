import React, { Component } from 'react'
// import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ClientBlogAction from './action'

// import { DatePicker } from 'antd'

class BlogBase extends Component {
  render() {
    return (
      <div className="full-height">
        <div className="fix-top-row-wrapper" style={{ paddingTop: '80px' }}>
          <div className="fix-top-row" style={{ height: '80px', background: '#0272A2' }}>
            <h1 className="fc-white capitalize" style={{ fontSize: '30px', lineHeight: '80px', marginLeft: '5%' }}>
              Post
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

BlogBase.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ]),
  location: React.PropTypes.object,
  // topicsStore: React.PropTypes.object,
  actions: React.PropTypes.object
}

function mapState(state) { // eslint-disable-line no-unused-vars
  return {
    // topicsStore: state.clientBlog.toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(ClientBlogAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(BlogBase)
