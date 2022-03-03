import React from "react";
import i18n from "i18next";
import { isEmpty } from "lodash";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { createStructuredSelector } from "reselect";
import { selectAnalyticsTodoList } from "../../redux/analytics-panel/analytics-panel.selectors";
import {
  setAnalyticsTodo,
  updateAnalyitcsTodo,
  deleteAnalyitcsTodo
} from "../../redux/analytics-panel/analytics-panel.actions";
import { setCenter, setZoom } from "../../redux/about-app/about-app.actions";
import agent from "../../agent";

class AnalysisPanel extends React.Component {

  async syncAnalyticTodo() {
    const { setAnalyticsTodo } = this.props;
    setAnalyticsTodo({ analyticsTodo: await agent.pnData.getAnalyticsTodo() });
  }

  toggleAnalyticDelete = (todo) => {
    const { updateAnalyitcsTodo } = this.props;
    todo.isDeleteBlocked = !todo.isDeleteBlocked;
    updateAnalyitcsTodo(todo);
  };

  async checkedAnalyticTodo(todo) {
    const { setCenter, setZoom, updateAnalyitcsTodo } = this.props;
    todo.isChecked = !todo.isChecked;
    if (todo.isChecked) {
      if (todo.centroid !== undefined) {
        setCenter({
          lat: Number(todo.centroid.lat),
          lng: Number(todo.centroid.lng),
        });
        setZoom({ zoom: 13 });
      }
      if (todo.geojson === null) {
        let todoCheck = await agent.pnData.getAnalyticsTodoGeojson(todo.id);
        todo.geojson = todoCheck.data["todo-data"].geojson;
      }
    }
    updateAnalyitcsTodo(todo);
  }

  async deleteAnalyticTodo(todo) {
    const { deleteAnalyitcsTodo } = this.props;
    if (!todo.isDeleteBlocked) {
      let todoDelete = await agent.pnData.deleteAnalyticsTodo(todo.id);
      if (todoDelete.data !== undefined) deleteAnalyitcsTodo(todo);
      else if (todoDelete.errors !== undefined) {
      }
    }
  }

  render() {
    const { t } = i18n;
    const { analyticsTodoList } = this.props;

    return (
      <div className="right__body__section">
        <div className="right-header">
          {t("analyze.analyze-list")}
          <span className="pull-right">
            <i className="fas fa-sync"></i>
          </span>
        </div>
        <div className="right-contain">
          {!isEmpty(analyticsTodoList) ? (
            <div>
              {analyticsTodoList.map(({ ...analyticsTodo }) => {
                return (
                  <div
                    className="contain-list todo-list"
                    key={`analyticsTodo-${analyticsTodo.id}`}
                  >
                    <div
                      className="contain-btn"
                      onClick={() => this.toggleAnalyticDelete(analyticsTodo)}
                    >
                      <img
                        className="left-img"
                        src={`/images/icons/analize-remove${
                          analyticsTodo.isDeleteBlocked ? "-act" : ""
                        }.png`}
                        alt=""
                      />
                    </div>
                    <div
                      className={`contain-name ${
                        analyticsTodo.isChecked ? "active" : ""
                      }`}
                      onClick={() => this.checkedAnalyticTodo(analyticsTodo)}
                    >
                      {analyticsTodo.name}
                    </div>
                    <div
                      className="contain-btn"
                      onClick={() => {
                        analyticsTodo.isDeleteBlocked
                          ? this.checkedAnalyticTodo(analyticsTodo)
                          : this.deleteAnalyticTodo(analyticsTodo);
                      }}
                    >
                      <img
                        className="right-img"
                        src={`/images/icons/${
                          analyticsTodo.isDeleteBlocked
                            ? "analize-check-act"
                            : "analize-cross"
                        }.png`}
                        alt=""
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="contain-list">
              <div className="contain-name">{t("analyze.no-list")}</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  analyticsTodoList: selectAnalyticsTodoList,
});

const mapDispatchToProps = dispatch => ({
  setCenter: aboutApp => dispatch(setCenter(aboutApp)),
  setZoom: aboutApp => dispatch(setZoom(aboutApp)),
  setAnalyticsTodo: (analyticsPanel) =>  dispatch(setAnalyticsTodo(analyticsPanel)),
  updateAnalyitcsTodo: analyticsPanel => dispatch(updateAnalyitcsTodo(analyticsPanel)),
  deleteAnalyitcsTodo: analyticsPanel => dispatch(deleteAnalyitcsTodo(analyticsPanel)),
})

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(AnalysisPanel)
);
