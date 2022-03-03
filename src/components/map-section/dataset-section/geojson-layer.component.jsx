import React from "react";
import { connect } from "react-redux";
import { GeoJSON } from "react-leaflet";
import { camelize } from "../../../utils/util";
import L from 'leaflet';
import { setLeftPanel } from "../../../redux/about-app/about-app.actions";
import { setDatasetSources, setDatasetSourceChecked } from "../../../redux/dataset/dataset.actions";
import { selectDatasetSources, selectActiveSource  } from "../../../redux/dataset/dataset.selectors";
import agent from "../../../agent";

class GeojsonLayer extends React.Component {
  async componentDidMount() {
    const { dataset, setDatasetSources, datasetSources } = this.props
    if (!datasetSources.length) {
      setDatasetSources(await agent.pnData.getDatasetSources(dataset.id));
    }
  }


  onEachFeature = (feature, layer) => {

   

    const { dataset, setDatasetSourceChecked, setLeftPanel } = this.props
    const activeStyle = dataset.style.find(style => style.columnName === dataset.defaultStyleColumn)
    let baseActiveStyle = { ...activeStyle.style }
    if (activeStyle.type === "group") {
      let color = activeStyle.styleGroup.find(color => color.name === feature.properties[camelize(activeStyle.columnName)].toString());
      if (color)
        baseActiveStyle.fillColor = color ? color.color : baseActiveStyle.fillColor
    } else if (activeStyle.type === "range") {
      let color = activeStyle.styleGroup.find(color => {
        const rangeValue = color.name.split("-")
        const value = Number(feature.properties[camelize(activeStyle.columnName)])
        if (rangeValue[0] <= value &&
          ((activeStyle.styleGroup.at(-1).name === color.name && rangeValue[1] <= value) || value < rangeValue[1]))
          return color
      });
      baseActiveStyle.fillColor = color ? color.color : baseActiveStyle.fillColor
    }
    layer.setStyle(baseActiveStyle)
    layer.on({
      click: (e) => {
        setDatasetSourceChecked({datasetId: dataset.id, sourceId: e.target.feature.geometry.baseId, properties: e.target.feature.geometry.properties})
        setLeftPanel('dataset-detail')
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
    const { datasetSources } = this.props;
    
    return (<>
        {datasetSources.map(source =>
          (<GeoJSON key={source.geojson.baseId} data={source.geojson} onEachFeature={this.onEachFeature} pointToLayer={this.pointToLayer} />)
        )}
      </>)
  }
}
const mapDispatchToProps = dispatch => ({
  setDatasetSources: dataset => dispatch(setDatasetSources(dataset)),
  setDatasetSourceChecked: dataset => dispatch(setDatasetSourceChecked(dataset)),
  setLeftPanel: aboutApp => dispatch(setLeftPanel(aboutApp))
})

const mapStateToProps = (state, props) => ({
  datasetSources: selectDatasetSources(props.dataset.id)(state),
  activeSource: selectActiveSource(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(GeojsonLayer)
