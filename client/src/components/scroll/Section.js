import React, { Component } from 'react'

class Section extends Component {
  render() {
    const { name, style } = this.props
    return (
      <section style={style}>
        {this.props.children}
      </section>
    )
  }
}

Section.propTypes = {
  name: React.PropTypes.string,
  style: React.PropTypes.object,
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ])
}

Section.defaultProps = {
  style: {}
}

export default Section
