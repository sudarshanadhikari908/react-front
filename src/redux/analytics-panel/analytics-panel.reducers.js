import { AnalyitcsPanelActiontypes } from "./analytics-panel.types";
import {
  addAnalyitcsTodo,
  deleteAnalyitcsTodo,
  updateAnalyitcsTodo,
  updateAnalysisDataShow
} from "./analytics-panel.utils";

const INITIAL_STATE = {
  analyticsPanelCategories: [],
  analyticsPanel: [],
  analyticsTodo: [],
  analysisData: [],
}

const analyticsPanelReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AnalyitcsPanelActiontypes.SET_ANALYTICS_PANEL:
      return {
        ...state,
        analyticsPanelCategories: action.payload.analyticsPanelCategories,
        analyticsPanel: action.payload.analyticsPanel
      }
    case AnalyitcsPanelActiontypes.SET_ANALYTICS_TODO:
      return {
        ...state,
        analyticsTodo: action.payload.analyticsTodo
      }

    case AnalyitcsPanelActiontypes.UPDATA_ANALYTICS_PANEL_CATEGORY_CHECKED:
      return {
        ...state,
        analyticsPanelCategories: state.analyticsPanelCategories.map(category => {
          if (category.id === action.payload) {
            category.isChecked = !category.isChecked;
            if (!category.isChecked) {
              category.analysisPanel.map(analysisPanel => {
                analysisPanel.isChecked = false;
                state.analyticsPanel.map(analytics => {
                  if (analysisPanel.id === analytics.id)
                    analytics.isChecked = false;
                  return analytics
                })
                return analysisPanel
              })
            }
          }
          return category
        })
      }

    case AnalyitcsPanelActiontypes.UPDATE_ANALYTICS_PANEL_CHECKED:
      return {
        ...state,
        analyticsPanelCategories: state.analyticsPanelCategories.map(category => {
          category.analysisPanel.map(analysisPanel => {
            if (analysisPanel.id === action.payload)
              analysisPanel.isChecked = !analysisPanel.isChecked
            return analysisPanel
          })
          return category
        }),
        analyticsPanel: state.analyticsPanel.map(analyticsPanel => {
          if (analyticsPanel.id === action.payload)
            analyticsPanel.isChecked = !analyticsPanel.isChecked
          return analyticsPanel
        })
      }
    case AnalyitcsPanelActiontypes.ADD_ANALYTICS_TODO:
      return {
        ...state,
        analyticsTodo: addAnalyitcsTodo(state.analyticsTodo, action.payload)
      }
    case AnalyitcsPanelActiontypes.UPDATE_ANALYTICS_TODO:
      return {
        ...state,
        analyticsTodo: updateAnalyitcsTodo(state.analyticsTodo, action.payload)
      }
    case AnalyitcsPanelActiontypes.DELETE_ANALYTICS_TODO:
      return {
        ...state,
        analyticsTodo: deleteAnalyitcsTodo(state.analyticsTodo, action.payload)
      }
    case AnalyitcsPanelActiontypes.SET_ANALYSIS_DATA:
      return {
        ...state,
        analysisData: action.payload
      }
    case AnalyitcsPanelActiontypes.UPDATE_ANALYSIS_DATA_SHOW:
      return {
        ...state,
        analysisData: updateAnalysisDataShow(state.analysisData, action.payload)
      }
    default:
      return state
  }
}

export default analyticsPanelReducer