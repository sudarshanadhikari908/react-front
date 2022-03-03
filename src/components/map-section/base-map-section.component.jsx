import React from "react";
import { connect } from 'react-redux';
import { TileLayer } from "react-leaflet";
import { createStructuredSelector } from "reselect";
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import { selectActiveBasemap } from "../../redux/base-map/base-map.selectors";
import { selectAttribuation } from "../../redux/about-app/about-app.selectors";

const BaseMap = ({ activeMap, attr }) => {
  return (
    <div>
      {(activeMap !== undefined) && (
        (activeMap.provider === "OpenStreetMap") && (
          <TileLayer
            attribution={attr}
            url={activeMap.url}
          />
        )
      )}
      {(activeMap !== undefined) && (
        (activeMap.provider === "Google") && (
          (activeMap.type === "") ?
            (<TileLayer
              attribution={attr}
              url={activeMap.url}
            />) : (
              <ReactLeafletGoogleLayer apiKey={activeMap.apiKey} type={'terrain'} />
            )
        )
      )}
    </div>
  )
}
const mapStateToProps = createStructuredSelector({
  activeMap: selectActiveBasemap,
  attr: selectAttribuation
})

export default connect(mapStateToProps)(BaseMap);