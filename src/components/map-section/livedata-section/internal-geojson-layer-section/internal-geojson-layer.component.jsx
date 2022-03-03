import React from "react";
import { connect } from "react-redux";
import { GeoJSON } from "react-leaflet";
import { setLeftPanel } from "../../../../redux/about-app/about-app.actions";
import L from 'leaflet';
import { setLivedataSources, setLivedataSourceChecked } from "../../../../redux/livedata/livedata.actions";
import { selectLivedataSources, selectActiveSource  } from "../../../../redux/livedata/livedata.selectors";
import agent from "../../../../agent";


class InternalGeojsonLayer extends React.Component {
 
  async componentDidMount() {
    const { livedata, setLivedataSources, livedataSources } = this.props

  

    if (!livedataSources.length) {
      setLivedataSources(await agent.pnData.getLivedataSources(livedata.id));
     
    }
  }

  onEachFeature = (feature, layer) => {
    

   

    const { livedata, setLivedataSourceChecked, setLeftPanel } = this.props

    layer.on({
      click: (e) => {
     
        setLivedataSourceChecked({livedataId: livedata.id, sourceId: e.target.feature.geometry.baseId, properties: e.target.feature.geometry.properties})
        setLeftPanel('livedata-detail')
      }
    })
  }
  pointToLayer = (feature, latlng) => {
    if (latlng) {
      return L.circleMarker(latlng, {
        radius: 7
      })
    }
  }


  render() {
    const { livedataSources } = this.props;
 
    
    return (<>
    
        {
        
        livedataSources.map(source =>
          (<GeoJSON key={source.geojson.baseId} data={source.geojson} onEachFeature={this.onEachFeature}  pointToLayer={this.pointToLayer}/>)
        )}
      </>)
  }
}
const mapDispatchToProps = dispatch => ({
  setLivedataSources: livedata => dispatch(setLivedataSources(livedata)),
  setLivedataSourceChecked: livedata => dispatch(setLivedataSourceChecked(livedata)),
  setLeftPanel: aboutApp => dispatch(setLeftPanel(aboutApp))
})

const mapStateToProps = (state, props) => ({
  livedataSources: selectLivedataSources(props.livedata.id)(state),
  activeSource: selectActiveSource(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(InternalGeojsonLayer)