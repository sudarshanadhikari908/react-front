import React from "react";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { setLeftPanel } from "../../../../redux/about-app/about-app.actions";
import { addAnalyicsTodo } from "../../../../redux/analytics-panel/analytics-panel.actions";
import { selectActiveSource } from "../../../../redux/dataset/dataset.selectors";
import Helper from "../../../../utils/helper";
import agent from "../../../../agent";
import i18n from "i18next";
import { withTranslation } from "react-i18next";

import "./dataset-detail-section.styles.scss";

class DatasetDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      message: "",
      variant: "success",
    };
  }

  async AddToAnalyze() {
    const { activeSource, addAnalyicsTodo } = this.props;
    const body = `id=${activeSource.sourceId}&dataset_id=${activeSource.datasetId}`;
    const res = await agent.pnData.postAnalyticsTodo(body);
    if (res.data !== undefined) {
      this.setState({
        show: true,
        message: res.data.message,
        variant: "success",
      });
      addAnalyicsTodo(res.data["todo-data"]);
    } else if (res.errors !== undefined) {
      let error = "";
      res.errors.forEach((err) => {
        error = error === "" ? err.detail : `${error}<br/>${err.detail}`;
        this.setState({
          show: true,
          message: error,
          variant: "danger",
        });
      });
    }
    window.setTimeout(() => {
      this.setState({
        show: false,
      });
    }, 4000);
  }

  render() {
    const { activeSource, setLeftPanel } = this.props;
    const { t } = i18n;
    return (
      <div className="data__detail__section">
        <div className="top-nav">
          <div
            className="back-button"
            onClick={() => setLeftPanel("dataset-list")}
          >
            &lt;&lt; t{"left-section.back"}
          </div>
          <div className="back-button">t{"left-section.clear"}</div>
        </div>
        <Alert show={this.state.show} variant={this.state.variant}>
          {this.state.message}
        </Alert>
        <div className="ward-head">
          <h2>{activeSource.properties.name}</h2>
        </div>
        <div className="ward-body">
          <table>
            <tbody>
              {Object.keys(activeSource.properties).map((key, i) => {
                return (
                  <tr
                    key={`${activeSource.datasetId}-${activeSource.sourceId}-${i}`}
                  >
                    <th>{Helper.camelCaseToTitleCase(key)}</th>
                    <td>{activeSource.properties[key]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="ward-footer-botton">
            <button
              type="button"
              className="btn btn btn-update"
              onClick={() => this.AddToAnalyze()}
            >
              {t("left-section.add-analyze")}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setLeftPanel: (aboutApp) => dispatch(setLeftPanel(aboutApp)),
  addAnalyicsTodo: (analyticsPanel) =>
    dispatch(addAnalyicsTodo(analyticsPanel)),
});

const mapStateToProps = createStructuredSelector({
  activeSource: selectActiveSource,
});

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(DatasetDetail)
);
