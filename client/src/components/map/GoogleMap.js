import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

import googleAPIKey, { getCurrentLocation } from 'SRC/utils/googleAPI'
import { Icon, Popover, Button } from 'antd'

// import logger from 'SRC/utils/logger'

/* eslint-disable react/no-multi-comp */

class MapMaker extends Component {
  render() {
    return (
      <div style={{ position: 'absolute', top: '-24px', left: '5px' }}>
        <div className="text-center" style={{ fontSize: '24px', color: this.props.color }}>
          <Popover content={this.props.description} title="Title">
            <Icon type="environment" />
          </Popover>
        </div>
      </div>
    )
  }
}

MapMaker.propTypes = {
  description: React.PropTypes.string,
  color: React.PropTypes.string
}

MapMaker.defaultProps = {
  description: '',
  color: '#ff2700'
}

class CenterMarker extends Component {
  render() {
    return (
      <div style={{ position: 'absolute', top: '-24px', left: '5px' }}>
        <div className="text-center" style={{ fontSize: '24px', color: 'rgb(0, 31, 125)' }}>
          <Icon type="environment" />
        </div>
      </div>
    )
  }
}

/* eslint-disable react/no-multi-comp */
class GoogleMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentlocation: { lat: 40.809322, lng: -73.9612294 }, // { lat: 59.95, lng: 30.33 }
      searchCenterLocation: { lat: 40.809322, lng: -73.9612294 }
    }
    this._onSearch = this._onSearch.bind(this)
    this._onChange = this._onChange.bind(this)
  }
  componentWillMount() {
    // Set Current Location
    getCurrentLocation()
      .then((pos) => {
        this.setState({
          currentlocation: pos,
          searchCenterLocation: pos
        })
      })
  }
  _onChange(args) {
    this.setState({
      currentlocation: args.center
    })
  }
  _onSearch() {
    // logger.log(args)
    this.setState({
      searchCenterLocation: this.state.currentlocation
    })
    this.props.onSearch(this.state.searchCenterLocation)
  }
  render() {
    return (
      <div className="full" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: '0px', right: '0px', zIndex: '1', background: '#fbdecc' }} >
          <Button onClick={this._onSearch} type="danger" ghost>
            {"Redo Search In Map"}
          </Button>
        </div>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: googleAPIKey
          }}
          center={this.state.currentlocation}
          defaultZoom={this.props.zoom}
          onChange={this._onChange}
          >
          {
            this.props.markers.map((r) => (
              <MapMaker
                key={r.description}
                lat={r.lat}
                lng={r.lng}
                description={r.description}
                />
            ))
          }
          <CenterMarker
            lat={this.state.searchCenterLocation.lat}
            lng={this.state.searchCenterLocation.lng}
            />
        </GoogleMapReact>
      </div>
    )
  }
}

GoogleMap.propTypes = {
  // state: React.PropTypes.object,
  zoom: React.PropTypes.number,
  markers: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      lat: React.PropTypes.number,
      lng: React.PropTypes.number,
      description: React.PropTypes.string
    })
  ),
  onSearch: React.PropTypes.func
}

GoogleMap.defaultProps = {
  zoom: 14,
  markers: [
    { lat: 40.809322, lng: -73.9612294, description: 'Center1' },
    { lat: 40.810877, lng: -73.957235, description: 'Center2' }
  ],
  onSearch: () => {}
}

export default GoogleMap
