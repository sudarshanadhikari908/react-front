import React from "react";
import { connect } from "react-redux";
import { changeStyleFilter } from "../../../../redux/dataset/dataset.actions";

class StyleFilter extends React.Component {

  styleChange = (e) => {
    const { dataset, changeStyleFilter } = this.props;
    changeStyleFilter({id: dataset.id, colName: e.target.value})
  }
  render() {
    const { dataset } = this.props;
    return (
      <div className="choose-catg-block">
        <div className="form-group m-0 custom-group">
          <h4>Style for {dataset.name}</h4>
          <div className="select-wrap">
            <select className="form-control" value={dataset.defaultStyleColumn} onChange={this.styleChange}>
              {dataset.style.map((style, i) => {
                return (<option key={`${dataset.tblName}-${style.columnName}`} value={style.columnName}>{style.name}</option>)
              }
              )}
            </select>
          </div>
        </div>
      </div >
    )
  }
}

const mapDispatchToProps = dispatch => ({
  changeStyleFilter: dataset => dispatch(changeStyleFilter(dataset))
})


export default connect(null, mapDispatchToProps)(StyleFilter)