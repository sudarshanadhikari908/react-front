import React from "react";
import { connect } from "react-redux";
import { updateDatasetFilter } from "../../../../redux/dataset/dataset.actions";

class DropdownFilter extends React.Component {

  datasetFilterChange = (e) => {
    const { dataset, filter, updateDatasetFilter } = this.props;
    updateDatasetFilter({id: dataset.id, filter: filter.slug,  value: e.target.value})
  }
  render() {
    const { dataset, filter } = this.props;

    return (
      <div className="choose-catg-block">
        <div className="form-group m-0 custom-group">
          <h4>{filter.name}</h4>
          <div className="select-wrap">
            <select className="form-control" onChange={this.datasetFilterChange}>
            <option key={`${dataset.tblName}-${filter.slug}-all`} value="All">All</option>
              {Object.values(filter.filterData).map((value, i) => {
                return (<option key={`${dataset.tblName}-${filter.slug}-${i}`} value={value}>{value}</option>)
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
  updateDatasetFilter: aboutApp => dispatch(updateDatasetFilter(aboutApp))
})


export default connect(null, mapDispatchToProps)(DropdownFilter)