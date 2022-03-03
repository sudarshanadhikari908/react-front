import React from "react";
import { connect } from 'react-redux'
import { MapContainer, ZoomControl, useMap } from 'react-leaflet';
import { createStructuredSelector } from "reselect";
import { selectCenter, selectZoom } from "../../redux/about-app/about-app.selectors";
import BaseMap from '../map-section/base-map-section.component';
import DatasetSection from '../map-section/dataset-section/dataset-section.component';
import LivedataSection from '../map-section/livedata-section/livedata-section.component';
import AnalyticTodoLayer from './analytic-todo-geolayer-section.component'
import AnalyticPanelDetailSection from "./analytic-panel-detail-section/analysis-panel-detail-section.compnent";

import '../map-section/map-section.styles.scss';

function ChangeMapView({ coords, zoom }) {
  const map = useMap();
  map.setView(coords, zoom);
  return null;
}

const AnalyticPanelSection = ({ center, zoom }) => {
  return (
    <>
      <div className="map__section" id="map">
        <MapContainer className="leaflet_map" center={center} zoom={zoom} scrollWheelZoom={true} zoomControl={false}>
          <ZoomControl position="bottomright" />
          <ChangeMapView coords={center} zoom={zoom} />
          <BaseMap />
          <DatasetSection />
          <LivedataSection/>
          <AnalyticTodoLayer />
        </MapContainer>
      </div >
      <AnalyticPanelDetailSection />
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  center: selectCenter,
  zoom: selectZoom
})

export default connect(mapStateToProps)(AnalyticPanelSection)