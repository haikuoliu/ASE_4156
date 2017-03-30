import React, { Component } from 'react'
// import { Link } from 'react-router'
import { Card } from 'antd'
// import { throttle } from 'SRC/utils/utils'

class AdCard extends Component {
  render() {
    const { event } = this.props
    return (
      <Card
        bordered
        style={{ margin: '30px 10%' }}
        >
        <div>
          <img alt="example" width="100%" src={event.url} />
        </div>
        <div className="fs12 margB15">
          {`@ ${event.sponsor_name}`}
        </div>
        <p className="margB15">{event.description}</p>
      </Card>
    )
  }
}

AdCard.propTypes = {
  event: React.PropTypes.object
}

AdCard.defaultProps = {
  event: {}
}

export default AdCard
