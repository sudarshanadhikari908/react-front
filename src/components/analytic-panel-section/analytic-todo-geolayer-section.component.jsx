import React from "react";
import { GeoJSON } from "react-leaflet";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAnalyticsTodoList } from "../../redux/analytics-panel/analytics-panel.selectors";

class AnalyticTodoLayer extends React.Component {
  onEachFeature = (feature, layer) => {
    let style = {
      color: "#c203fc",
      fill: true,
      fillColor: "#c203fc",
      fillOpacity: 0.05,
      opacity: 1,
      weight: 1
    };
    if (feature.type === "LineString") {
      style.fill = false;
      style.weight = 3;
    }
    layer.setStyle(style)
  }


  render() {
    const { analyticsTodoList } = this.props
    return (<>
      {analyticsTodoList.map(source => {
        if (source.isChecked) {
          return (<GeoJSON key={source.id} data={source.geojson} onEachFeature={this.onEachFeature}/>)
        }
      }
      )}
    </>)
  }
}

const mapStateToProps = createStructuredSelector({
  analyticsTodoList: selectAnalyticsTodoList
})

export default connect(mapStateToProps)(AnalyticTodoLayer)