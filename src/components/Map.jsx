import React, { useEffect } from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import "./Map.css";


const Maps = (props) => {
  const center = props.center;
  const lat = center[0];

  useEffect(() => {}, [lat])
  return (
    <MapContainer className='map' center={center} zoom={13} scrollWheelZoom={true}>
      <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center}>
        <Popup>
          {props.popUpShow} <br/>
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default Maps;