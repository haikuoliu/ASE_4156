import React, { Component } from 'react'
import { Link } from 'react-router'
import { Card, Icon, Row, Col, Tag } from 'antd'
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
        <div>
          <Link className="fc-dark" style={{ display: 'block' }} to={{ pathname: '/client/blog/view', query: { eid: event.eid } }}>
            <img alt="example" width="100%" src={event.url} />
          </Link>
        </div>
        <div className="fs12 margB15">
          <Link className="fc-dark" to={{ pathname: '/client/profile/info', query: { uid: event.uid } }}>
            {`@ ${event.user_name}`}
          </Link>
        </div>
        <p className="margB15">{event.description}</p>
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
