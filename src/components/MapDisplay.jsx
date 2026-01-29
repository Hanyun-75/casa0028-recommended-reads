import * as React from 'react'
import Map from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'

function MapDisplay() {
  return (
    <Map
      initialViewState={{
        longitude: -0.1276,
        latitude: 51.5074,
        zoom: 14
      }}
      style={{ width: 600, height: 400 }}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    />
  )
}

export default MapDisplay
