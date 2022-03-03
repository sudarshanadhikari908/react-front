import React from "react";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import { connect } from "react-redux";
import { updateDatasetFilter, resetDatasetFilter } from "../../../../redux/dataset/dataset.actions";

class RangeFilter extends React.Component {
  datasetFilterChange = (range) => {
    const { dataset, filter, updateDatasetFilter } = this.props;
    updateDatasetFilter({ id: dataset.id, filter: filter.slug, value: range })
  }

  resetFilter = () => {
    const { dataset, filter, resetDatasetFilter } = this.props;
    resetDatasetFilter({ id: dataset.id, filter: filter.slug })
  }

  render() {
    const { filter } = this.props;
    return (
      <div className="item-boundary">
        <div className="boundary-head">
          <h4>{filter.name}</h4>
          <div className="reset-block">
            <div className="reset-status">
              <span className="span-sqr"><i className="fas fa-chevron-left"></i></span>
              <span className="span-rect active" onClick={() => this.resetFilter()}><i className="fas fa-arrow-left"></i><i className="fas fa-arrow-right"></i></span>
              <span className="span-sqr"><i className="fas fa-chevron-right"></i></span>
            </div>
          </div>
        </div>
        <div className="boundary-slide">
          <div className="demo-output">
            <Nouislider range={filter.filterData} start={filter.selectedRange} connect tooltips animate step={1} onChange={this.datasetFilterChange}/>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateDatasetFilter: dataset => dispatch(updateDatasetFilter(dataset)),
  resetDatasetFilter: dataset => dispatch(resetDatasetFilter(dataset))
})

export default connect(null, mapDispatchToProps)(RangeFilter)