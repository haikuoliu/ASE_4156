import React, { Component } from 'react'
// import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import * as AdsGeneralAction from '../../../containers/action'
import * as SearchActions from './action'

import GoogleMap from 'SRC/components/map/GoogleMap'
import { SearchBar } from 'SRC/components/form'

import { Row, Col, Card } from 'antd'
// import { NewAdForm } from 'SRC/components/form'


class Search extends Component {
  constructor(props) {
    super(props)
    this.handleSearchBarSubmit = this.handleSearchBarSubmit.bind(this)
    this.onMapClick = this.onMapClick.bind(this)
  }
  componentWillMount() {
    // const center = this.props.store.centerLocation
    // this.props.actions.loadNeighCenters({
    //   lat: center.lat,
    //   lng: center.lng
    // })
  }
  componentWillReceiveProps(nextProps) {
    // const center = this.props.store.centerLocation
    // const nextCenter = nextProps.store.centerLocation
    // if (nextCenter.lng !== center.lng || nextCenter.lat !== center.lat) {
    //   this.props.actions.loadNeighCenters({
    //     lat: nextCenter.lat,
    //     lng: nextCenter.lng
    //   })
    // }
  }
  onMapClick(loc) {
    this.props.actions.changeSearchCenter(loc)
    this.props.actions.loadNeighCenters(loc)
  }
  handleSearchBarSubmit(args) {
    this.props.actions.searchAddress(`${args.address}, ${args.city}, ${args.state}`)
  }
  render() {
    const markers = this.props.store.centersList.map((r) => (
      { lat: r.location.lat, lng: r.location.lng, description: r.content, title: r.title }
    ))
    return (
      <div className="full-height">
        <div className="fix-top-row-wrapper" style={{ paddingTop: '100px' }}>
          <div className="fix-top-row" style={{ height: '100px', padding: '20px' }}>
            <div className="card-style">
              <SearchBar onSubmit={this.handleSearchBarSubmit} />
            </div>
          </div>
          <div className="full-height" style={{ background: '#ECECEC', overflow: 'auto', padding: '20px' }}>
            <div className="card-style full-height">
              <Row style={{ height: '100%' }}>
                <Col span={6} className="full-height">
                  <div className="full" style={{ overflow: 'auto' }}>
                    {
                      this.props.store.centersList.map((r, i) => (
                        <div key={r.cid} style={{ margin: '15px 0' }}>
                          <h3>{r.title}</h3>
                          <p className="fs10"><i>{r.location.street}</i></p>
                          <p className="fs10"><i>{`${r.location.city}, ${r.location.state}, ${r.location.zip}`}</i></p>
                        </div>
                      ))
                    }
                  </div>
                </Col>
                <Col span={18} className="full-height">
                  <div className="full" style={{ padding: '10px' }} >
                    <GoogleMap
                      zoom={10}
                      markers={markers}
                      onSearch={this.onMapClick}
                      />
                  </div>
                </Col>
              </Row>
            </div>
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
