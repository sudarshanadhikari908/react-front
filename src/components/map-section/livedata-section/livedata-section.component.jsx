import React from "react";
import { connect } from 'react-redux'
import { createStructuredSelector } from "reselect";
import { selectLivedata } from "../../../redux/livedata/livedata.selectors";
import InternalGeojsonLayerComponent from "./internal-geojson-layer-section/internal-geojson-layer.component";
import ExternalGeoJsonlayer from "./external-geojson-layer-section/external-geojson-component";
import ExternalTilelayer from "./external-tile-layer-section/external-tilelayer-component";
import ExternalWMSLayer from './external-wms-layer-section/external-wnslayer-component';

const LivedataSection = ({ livedata }) => {

  return (
    <div>
      {
        livedata.map(({...livedata }) => {

          
          if (livedata.isChecked && livedata.dataType==='geojson' && livedata.type === "internal") {
            return(<InternalGeojsonLayerComponent  key={`livedata-internal-geojsonlayer-${livedata.id}`} livedata={livedata}/> )
            }
          if(livedata.isChecked && livedata.dataType==='geojson' && livedata.type === "external"){
            return(<ExternalGeoJsonlayer key={`livedata-external-geojsonlayer-${livedata.id}`} livedata={livedata}/> )
          }
          if(livedata.isChecked && livedata.dataType==='tile-layer' && livedata.type === "external"){
            return(<ExternalTilelayer key={`livedata-external-tile-layer-${livedata.id}`} livedata={livedata}/> )
          }
          if(livedata.isChecked && livedata.dataType==='wms' && livedata.type === "external"){
            return(<ExternalWMSLayer key={`livedata-external-tile-layer-${livedata.id}`} livedata={livedata}/> )
          }
    
        })
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  livedata:  selectLivedata
})
export default connect(mapStateToProps)(LivedataSection);
