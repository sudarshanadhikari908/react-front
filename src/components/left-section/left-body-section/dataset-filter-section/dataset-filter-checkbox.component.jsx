import React from "react";
import { connect } from "react-redux";
import { updateDatasetFilter } from "../../../../redux/dataset/dataset.actions";
import { Form } from "react-bootstrap";

class CheckboxFilter extends React.Component {

  datasetFilterChange = (key) => {
    const { dataset, filter, updateDatasetFilter } = this.props;
    updateDatasetFilter({ id: dataset.id, filter: filter.slug, value: key })
  }
  render() {
    const { dataset, filter } = this.props
    return (
      <div className="choose-catg-block">
        <div className="form-group m-0 custom-group">
          <h4>{filter.name}</h4>
          <div className="select-wrap">
            {filter.filterData.map(fd => {
              return (<Form.Check
                key={`${dataset.tblName}-${filter.slug}-${fd.key}`}
                type='checkbox'
                checked={fd.isChecked}
                id={`${dataset.tblName}-${filter.slug}-${fd.key}`}
                label={fd.value}
                onChange={() => this.datasetFilterChange(fd.key)}
              />)
            })
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateDatasetFilter: aboutApp => dispatch(updateDatasetFilter(aboutApp))
})

export default connect(null, mapDispatchToProps)(CheckboxFilter)