import React from "react";
import { connect } from "react-redux";
import "./input-checkbox.styles.scss";
import { updateDatasetChecked } from "../../../redux/dataset/dataset.actions";
import { updateLivedataChecked } from "../../../redux/livedata/livedata.actions";
import { updateAnalyticPanelChecked } from "../../../redux/analytics-panel/analytics-panel.actions";
import { Form } from "react-bootstrap";
class InputCheckboxSection extends React.Component {
  render() {
    const { dataset, analysisPanel, datasetChecked, analyticPanelChecked,livedata, livedataChecked } =
      this.props;

    return (
      <>
        {dataset !== undefined && (
          <div className="input__checkbox">
            <Form.Check
              type="checkbox"
              checked={dataset.isChecked}
              id={`dataset-${dataset.id}`}
              label={dataset.name}
              onChange={() => datasetChecked(dataset.id)}
            />
            <div className="check-icon">
              {dataset?.filter?.length >= 2 &&
                dataset?.style.length > 1 &&
                dataset?.style[0]?.type !== "default" && (
                  <img src={"./images/icons/filter-sm.png"} alt="filter" />
                )}
            </div>
          </div>
        )}

        {livedata !== undefined && (
          <div className="input__checkbox">
            <Form.Check
              type="checkbox"
              checked={livedata.isChecked}
              id={`livedata-${livedata.id}`}
              label={livedata.name}
              onChange={() => livedataChecked(livedata.id)}
            />
          </div>
        )}
        {analysisPanel !== undefined && (
          <div>
            <Form.Check
              type="checkbox"
              checked={analysisPanel.isChecked}
              id={`analysisPanel-${analysisPanel.id}`}
              label={analysisPanel.name}
              onChange={() => analyticPanelChecked(analysisPanel.id)}
            />
          </div>
        )}

 
     
    </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  datasetChecked: (dataset) => dispatch(updateDatasetChecked(dataset)),
  livedataChecked: (livedata)=> dispatch(updateLivedataChecked(livedata)),
  analyticPanelChecked: (analysisPanel) =>
    dispatch(updateAnalyticPanelChecked(analysisPanel)),
});

export default connect(null, mapDispatchToProps)(InputCheckboxSection);
