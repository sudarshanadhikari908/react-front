import React from "react";
import { connect } from "react-redux";
import { Accordion } from "react-bootstrap";
import './analytics-category-section.styles.scss';
import Alert from 'react-bootstrap/Alert'
import { createStructuredSelector } from "reselect";
import {
  updateAnalyticPanelCategoryChecked,
  addAnalyicsTodo,
  setAnalysisData
} from "../../../../redux/analytics-panel/analytics-panel.actions";
import {
  selectAnalyticsPanelCategories,
  selectActiveAnalyticsPanelCategories,
  selectActiveAnalyticsFilterPanel,
  selectActiveAnalyticsTodo,
} from "../../../../redux/analytics-panel/analytics-panel.selectors";
import { selectActiveSource } from "../../../../redux/dataset/dataset.selectors";
import InputCheckboxSection from "../../input-checkbox/input-checkbox.component";
import agent from "../../../../agent";
import { keysToCamel } from "../../../../utils/util";

class AnalyticCategory extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      message: "",
      variant: "success"
    };
  }

  async AddToAnalyze() {
    const { activeSource, addAnalyicsTodo } = this.props
    const body = `id=${activeSource.sourceId}&dataset_id=${activeSource.datasetId}`
    const res = await agent.pnData.postAnalyticsTodo(body);
    if (res.data !== undefined) {
      this.setState({
        show: true,
        message: res.data.message,
        variant: "success"
      });
      addAnalyicsTodo(res.data['todo-data'])
    } else if (res.errors !== undefined) {
      let error = "";
      res.errors.forEach(err => {
        error = (error === "") ? err.detail : `${error}<br/>${err.detail}`;
        this.setState({
          show: true,
          message: error,
          variant: "danger"
        });
      });
    }
    window.setTimeout(() => {
      this.setState({
        show: false
      });
    }, 4000);
  }

  async analyzeData() {
    const { activeAnalyticsTodo, activeAnalyticsFilterPanel, setAnalysisData } = this.props
    let currentUrl = activeAnalyticsFilterPanel;
    if (activeAnalyticsTodo !== undefined)
    currentUrl = `${currentUrl}&type=todo&id=${activeAnalyticsTodo.id}`;
    let res = await agent.pnData.getGeoLocaltionAnalysis(currentUrl);
    if (res.data !== undefined) {
      res.data.analysis_list.map(analysis => {
        analysis.filter.map(filter => {
          let data = []
          filter.data.forEach(d => {
            if (d !== null && d !== "") {
              data.push({
                name: d,
                isChecked: false
              })
            }
          });
          filter.data = data
          return filter;
        })
        analysis.isShowData = true;
        return keysToCamel(analysis)
      })
      setAnalysisData(keysToCamel(res.data.analysis_list))

    } else if (res.errors !== undefined) {
      let error = "";
      res.errors.forEach(err => {
        error = (error === "") ? err.detail : `${error}<br/>${err.detail}`;
        this.setState({
          show: true,
          message: error,
          variant: "danger"
        });
      });
      window.setTimeout(() => {
        this.setState({
          show: false
        });
      }, 4000);
      setAnalysisData([]);
    }
  }

  async clearAnalyticsPanel() {

  }
  render() {
    const { analyticsPanelCategories, updateAnalyticPanelCategory,  activeSource } = this.props
    return (
      <div className="analytics_panel__category">
        <Alert show={this.state.show} variant={this.state.variant}>
          {this.state.message}
        </Alert>
        <Accordion alwaysOpen flush>
          {
            analyticsPanelCategories.map(({ ...category }) => {
              if (category.parentId === 0) {
                return (<Accordion.Item key={`dataset-category-${category.id}`} eventKey={category.id}>
                  <Accordion.Header onClick={() => updateAnalyticPanelCategory(category.id)} className={`dataset-category-header-${category.id}`}>{category.name}</Accordion.Header>
                  <Accordion.Body>
                    {/* <DatasetSubCategory key={category.id} {...category} /> */}
                    <div className="checked-sec">
                      {
                        category.analysisPanel.map(({ ...analysisPanel }) =>
                          (<InputCheckboxSection key={analysisPanel.id} analysisPanel={analysisPanel} />)
                        )
                      }
                    </div>
                  </Accordion.Body>
                </Accordion.Item>)
              }
            })
          }
        </Accordion>
        {(activeSource !== null) && (
          <div className='panel-bottom todo-btn'>
            <button type='button' className='btn btn btn-update' onClick={() => this.AddToAnalyze()}>Add To Analyze</button>
          </div>
        )}
        <div className='panel-bottom'>
          <button type='button' className='btn btn btn-update' onClick={()=> this.analyzeData()}>Analyze</button>
          <button type='button' className='btn btn btn-cancel' onClick={()=> this.clearAnalyticsPanel()}>Clear</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  analyticsPanelCategories: selectAnalyticsPanelCategories,
  ativeAnalyticsPanelCategories: selectActiveAnalyticsPanelCategories,
  activeAnalyticsFilterPanel: selectActiveAnalyticsFilterPanel,
  activeSource: selectActiveSource,
  activeAnalyticsTodo: selectActiveAnalyticsTodo

});

const mapDispatchToProps = dispatch => ({
  updateAnalyticPanelCategory: analyticsPanel => dispatch(updateAnalyticPanelCategoryChecked(analyticsPanel)),
  addAnalyicsTodo: analyticsPanel => dispatch(addAnalyicsTodo(analyticsPanel)),
  setAnalysisData: analysisPanel => dispatch(setAnalysisData(analysisPanel))
})

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticCategory)

