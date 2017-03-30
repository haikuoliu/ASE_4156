import React, { Component } from 'react'

import { debounce, throttle } from 'SRC/utils/utils' // eslint-disable-line no-unused-vars

class Wrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentActiveSection: ''
    }
    // offsetTopMap 需要wait utill all children DOM is ready，所以必须在componentDidUpdate中设置
    // 实在想不出来了，放在state里面会无限trigger update，需要精细调整shouldComponentUpdate
    // So， 直接放在了this下面，修改不会tirgger新的render()
    this.sectionNameArray = []
    this.offsetTopArray = []
    this.handleScroll = this.handleScroll.bind(this)
    this.handleScrollHelper = throttle(this.handleScrollHelper.bind(this), 200)
    this.updateOffsetTopMap = this.updateOffsetTopMap.bind(this)
    this.scrollToTop = this.scrollToTop.bind(this)
    this.scrollTo = this.scrollTo.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    const children = this.props.children
    const nextChildren = nextProps.children
    // 判断是否有新加载的Section
    if (nextChildren.map(x => (x.props.loading ? 0 : 1)).join('') !== children.map(x => (x.props.loading ? 0 : 1)).join('')) {
      this.updateOffsetTopMap(nextChildren)
    }
  }
  shouldComponentUpdate(nextProps) {
    const children = this.props.children.map(x => (x.props.loading ? 0 : 1)).join('')
    const nextChildren = nextProps.children.map(x => (x.props.loading ? 0 : 1)).join('')
    return nextChildren !== children
  }
  componentDidUpdate() {
    if (this.offsetTopArray.length === 0) {
      this.updateOffsetTopMap(this.props.children)
    }
  }
  updateOffsetTopMap(children) {
    this.sectionNameArray = []
    this.offsetTopArray = []
    for (const dom of [...this.refs.wrapper.childNodes]) {
      this.offsetTopArray.push(dom.offsetTop)
    }
    children.forEach((item) => {
      this.sectionNameArray.push(item.props.name)
    })
    // console.log(this.offsetTopArray.reduce((a, b) => a + b, 0))
  }
  scrollToTop() {
    this.refs.wrapper.scrollTop = 0
  }
  scrollTo(name) {
    const topPos = document.getElementById(encodeName(name)).offsetTop
    this.refs.wrapper.scrollTop = topPos
  }
  handleScroll(e) {
    this.handleScrollHelper(e.target)
  }
  handleScrollHelper(target) {
    // 决定当前active的section |a-(--|b-)--| 50%处分界
    function find(list, h) {
      for (let i = 0; i < list.length; i++) {
        if (list[i] === h) return i
        if (list[i] > h) {
          if (h - list[i - 1] >= list[i] - h) {
            return i
          }
          return i - 1
        }
      }
      return -1
    }
    // notify the outer space when a new section is reached
    // console.log(target.scrollTop)
    const index = find(this.offsetTopArray, target.scrollTop)
    if (index >= 0) {
      const currentActiveSection = this.sectionNameArray[index]
      if (currentActiveSection !== this.state.currentActiveSection) {
        this.setState({
          currentActiveSection
        })
        this.props.onScroll(currentActiveSection)
      }
    }
  }
  render() {
    const { name, style, height } = this.props
    return (
      <section style={Object.assign(style, { height })}>
        <div className="full-height" onScroll={this.handleScroll} style={{ overflow: 'auto', position: 'relative' }}>
          {this.props.children}
        </div>
      </section>
    )
  }
}

Wrapper.propTypes = {
  name: React.PropTypes.string,
  onScroll: React.PropTypes.func,
  timeInterval: React.PropTypes.number,
  style: React.PropTypes.object,
  height: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  children: React.PropTypes.arrayOf(
    React.PropTypes.element
  )
}

Wrapper.defaultProps = {
  onScroll: (v) => (v),
  timeInterval: 50,
  height: '100%',
  style: {}
}

export default Wrapper
