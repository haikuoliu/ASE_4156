import React, { Component } from 'react'
// import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import * as AdsGeneralAction from '../../../containers/action'
import * as SearchActions from './action'

import GoogleMap from 'SRC/components/map/GoogleMap'

import { Row, Col } from 'antd'
// import { NewAdForm } from 'SRC/components/form'


class Search extends Component {
  constructor(props) {
    super(props)
    this.onMapClick = this.onMapClick.bind(this)
  }
  componentWillMount() {
    this.props.actions.loadNeighCenters()
  }
  componentWillReceiveProps(nextProps) {
    const center = this.props.store.centerLocation
    const nextCenter = nextProps.store.centerLocation
    if (nextCenter.lng !== center.lng || nextCenter.lat !== center.lat) {
      this.props.actions.loadNeighCenters()
    }
  }
  onMapClick(loc) {
    this.props.actions.changeSearchCenter(loc)
    this.props.actions.loadNeighCenters()
  }
  render() {
    const markers = this.props.store.centersList.map((r) => (
      { lat: r.location.lat, lng: r.location.lng, description: r.description }
    ))
    return (
      <div className="full-height">
        <div className="fix-top-row-wrapper" style={{ paddingTop: '200px' }}>
          <div className="fix-top-row" style={{ height: '200px' }}>
            Search Panel
          </div>
          <div className="full-height" style={{ background: '#ECECEC', overflow: 'auto' }}>
            <Row style={{ height: '100%' }}>
              <Col span={6} className="full-height">
                <div className="full">
                  {markers.map((r, i) => (
                    <div key={r.description + i} style={{ height: '40px' }}>{r.description}</div>
                  ))}
                </div>
              </Col>
              <Col span={18} className="full-height">
                <div className="full" style={{ padding: '10px' }} >
                  <GoogleMap
                    markers={markers}
                    onSearch={this.onMapClick}
                    />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ]),
  location: React.PropTypes.object,
  store: React.PropTypes.object,
  persistentStore: React.PropTypes.object,
  actions: React.PropTypes.object
}

function mapState(state) {
  return {
    persistentStore: state.persistentStore.toJS(),
    store: state.main.search.toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(SearchActions, dispatch)
  }
}

export default connect(mapState, mapDispatch)(Search)
