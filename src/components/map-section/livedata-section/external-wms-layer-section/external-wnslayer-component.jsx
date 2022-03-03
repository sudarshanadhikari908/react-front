import React from "react";
import { connect } from "react-redux";
import { WMSTileLayer } from "react-leaflet";
import { selectLivedataSources, selectActiveSource  } from "../../../../redux/livedata/livedata.selectors";


class ExternalWMSLayer extends React.Component {

  
  render() {
  const {livedata} = this.props
  const source = JSON.parse(livedata.source)
  
  return (
        <>
       
      <WMSTileLayer url={source.url} crc={source.crs} format={source.format} transparent={source.transparent} layers={source.layers} vaersion={source.version} opacity={source.opacity}/>
      </>
    )
}
    }


const mapStateToProps = (state, props) => ({
  livedataSources: selectLivedataSources(props.livedata.id)(state),
  activeSource: selectActiveSource(state)
})

export default connect(mapStateToProps)(ExternalWMSLayer)