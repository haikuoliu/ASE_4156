import React, { Component } from 'react'
import { Link } from 'react-router'
import { Card, Icon, Tag, Row, Col } from 'antd'
import { throttle } from 'SRC/utils/utils'

class BlogCard extends Component {
  constructor(props) {
    super(props)
    this.onLike = throttle(this.props.onLike, 5000).bind(this)
    this.onCancelLike = throttle(this.props.onCancelLike, 5000).bind(this)
  }
  render() {
    const { event } = this.props
    return (
      <Card
        bordered
        style={{ margin: '30px 10%' }}
        >
        <div className="fs14 margB15">
          <h2 className="captialize fc-dark">
            <Link className="fc-dark" to={{ pathname: '/client/blog/view', query: { eid: event.eid } }}>
              {event.title}
            </Link>
          </h2>
          <div className="fs12 margB15">
            <Link className="fc-dark" to={{ pathname: '/client/profile/info', query: { uid: event.uid } }}>
              {`@ ${event.user_name}`}
            </Link>
          </div>
          <p>{event.description}</p>
        </div>
        <Row>
          <Col span={2}>
            {
              event.islike ?
                <div className="fc-blue fs16 pointer">
                  <Icon type="like" onClick={this.onCancelLike} /> {event.likes}
                </div> :
                <div className="fs16 pointer">
                  <Icon type="like" onClick={this.onLike} /> {event.likes}
                </div>
            }
          </Col>
          <Col span={22}>
            {
              event.topics.map(topic => (
                <Tag key={topic}>
                  <Link to={{ pathname: '/client/topics/topic', query: { topic } }}>
                    {topic}
                  </Link>
                </Tag>
              ))
            }
          </Col>
        </Row>
      </Card>
    )
  }
}

BlogCard.propTypes = {
  event: React.PropTypes.object,
  onLike: React.PropTypes.func,
  onCancelLike: React.PropTypes.func
}

BlogCard.defaultProps = {
  event: {},
  onLike: () => {},
  onCancelLike: () => {}
}

export default BlogCard
