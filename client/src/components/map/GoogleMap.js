import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

import googleAPIKey, { getCurrentLocation } from 'SRC/utils/googleAPI'
import { Icon, Popover } from 'antd'

export class MapMaker extends Component {
  render() {
    return (
      <div style={{ position: 'absolute', top: '-24px', left: '5px' }}>
        <div className="text-center" style={{ fontSize: '24px', color: '#ff2700' }}>
          <Popover content={this.props.description} title="Title">
            <Icon type="environment" />
          </Popover>
        </div>
      </div>
    )
  }
}

MapMaker.propTypes = {
  description: React.PropTypes.string
}


/* eslint-disable react/no-multi-comp */
class GoogleMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentlocation: { lat: 40.809322, lng: -73.9612294 } // { lat: 59.95, lng: 30.33 }
    }
  }
  componentWillMount() {
    // Set Current Location
    getCurrentLocation()
      .then((pos) => {
        this.setState({
          currentlocation: pos
        })
      })
  }
  render() {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{
          key: googleAPIKey
        }}
        center={this.state.currentlocation}
        defaultZoom={this.props.zoom}
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
      </GoogleMapReact>
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
  )
}

GoogleMap.defaultProps = {
  zoom: 14,
  markers: [
    { lat: 40.809322, lng: -73.9612294, description: 'Center1' },
    { lat: 40.810877, lng: -73.957235, description: 'Center2' }
  ]
}

export default GoogleMap
