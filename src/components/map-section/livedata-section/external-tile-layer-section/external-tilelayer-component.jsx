import React from "react";
import { connect } from "react-redux";
import { TileLayer } from "react-leaflet";
import { selectLivedataSources, selectActiveSource  } from "../../../../redux/livedata/livedata.selectors";

class ExternalTileLayer extends React.Component {

  render() {
  const {livedata} = this.props

    return (
        <>
            <TileLayer url={livedata.source}/>
        </>
        )
}
    }



const mapStateToProps = (state, props) => ({
  livedataSources: selectLivedataSources(props.livedata.id)(state),
  activeSource: selectActiveSource(state)
})

export default connect(mapStateToProps)(ExternalTileLayer)