import React from "react";
import { connect } from 'react-redux'
import { createStructuredSelector } from "reselect";
import { selectDataset } from "../../../../redux/dataset/dataset.selectors";
import { setLeftPanel } from "../../../../redux/about-app/about-app.actions";
import StyleFilter from "./dataset-filter-style.component";
import DropdownFilter from "./dataset-filter-dropdown.component";
import RangeFilter from "./dataset-filter-range.component";
import CheckboxFilter from "./dataset-filter-checkbox.component";
import "./dataset-filter-section.styles.scss";

const DatasetFilter = ({ datasetList, setLeftPanel }) => {
  return (
    <div className="filter__section" >
      <div className="back-button" onClick={() => setLeftPanel('dataset-list')}> &lt;&lt; Back </div>
      {
        datasetList.map(({ ...dataset }) => {
          if (dataset.isChecked && (dataset.style.length > 1 || dataset.filter.length >= 1))
            return (
              <div className="inner-filter-block" key={`dataset-style-${dataset.id}`}>
                <h3>{dataset.name}</h3>
                {(dataset.style.length > 1) && (<StyleFilter key={`style-${dataset.id}`} dataset={dataset} />)}
                {(dataset.filter.length > 1) && (<div>
                  {
                    dataset.filter.map((filter) => {
                      return (<div key={`top-dataset-${dataset.id}-${filter.slug}`}>
                        {(filter.type === "dropdown") && (<DropdownFilter key={`dataset-${dataset.id}-${filter.slug}`} dataset={dataset} filter={filter} />)}
                        {(filter.type === "range") && (<RangeFilter key={`dataset-${dataset.id}-${filter.slug}`} dataset={dataset} filter={filter} />)}
                        {(filter.type === "checkbox") && (<CheckboxFilter key={`dataset-${dataset.id}-${filter.slug}`} dataset={dataset} filter={filter} />)}
                      </div>)
                    })
                  }
                </div>)}
              </div>
            )
        })
      }
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setLeftPanel: aboutApp => dispatch(setLeftPanel(aboutApp))
})

const mapStateToProps = createStructuredSelector({
  datasetList: selectDataset
});
export default connect(mapStateToProps, mapDispatchToProps)(DatasetFilter)