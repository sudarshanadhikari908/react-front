import React from "react";
import { connect } from 'react-redux'
import { MapContainer, ZoomControl, useMap } from 'react-leaflet';
import { createStructuredSelector } from "reselect";
import { selectCenter, selectZoom } from "../../redux/about-app/about-app.selectors";
import BaseMap from './base-map-section.component';
import DatasetSection from './dataset-section/dataset-section.component'
import LivedataSection from './livedata-section/livedata-section.component';

import './map-section.styles.scss';


function ChangeMapView({ coords, zoom }) {
  const map = useMap();
  map.setView(coords, zoom);
  return null;
}

const MapSection = ({center, zoom}) => {
  return (
    <div className="map__section" id="map">
      <MapContainer className="leaflet_map" center={center} zoom={zoom} scrollWheelZoom={true} zoomControl={false}>
        <ZoomControl position="bottomright" />
        <ChangeMapView coords={center} zoom={zoom} />
        <BaseMap />
        <DatasetSection />
        <LivedataSection/>
        
      </MapContainer>
    </div >
  )
}

const mapStateToProps = createStructuredSelector({
  center: selectCenter,
  zoom: selectZoom
})

export default connect(mapStateToProps)(MapSection)