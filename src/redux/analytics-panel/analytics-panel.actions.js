import { AnalyitcsPanelActiontypes } from "./analytics-panel.types";

export const setAnalyticsPanel = analyticsPanel => ({
  type: AnalyitcsPanelActiontypes.SET_ANALYTICS_PANEL,
  payload: analyticsPanel
})

export const setAnalyticsTodo = analyticsPanel => ({
  type: AnalyitcsPanelActiontypes.SET_ANALYTICS_TODO,
  payload: analyticsPanel
})

export const updateAnalyticPanelCategoryChecked = analyticsPanel => ({
  type: AnalyitcsPanelActiontypes.UPDATA_ANALYTICS_PANEL_CATEGORY_CHECKED,
  payload: analyticsPanel
})

export const updateAnalyticPanelChecked = analyticsPanel => ({
  type: AnalyitcsPanelActiontypes.UPDATE_ANALYTICS_PANEL_CHECKED,
  payload: analyticsPanel
})

export const addAnalyicsTodo = analyticsPanel => ({
  type: AnalyitcsPanelActiontypes.ADD_ANALYTICS_TODO,
  payload: analyticsPanel
})

export const updateAnalyitcsTodo = analyticsPanel => ({
  type: AnalyitcsPanelActiontypes.UPDATE_ANALYTICS_TODO,
  payload: analyticsPanel
})

export const deleteAnalyitcsTodo = analyticsPanel => ({
  type: AnalyitcsPanelActiontypes.DELETE_ANALYTICS_TODO,
  payload: analyticsPanel
})

export const setAnalysisData = analyticsPanel => ({
  type: AnalyitcsPanelActiontypes.SET_ANALYSIS_DATA,
  payload: analyticsPanel
})

export const updateAnalysisDataShow = analyticsPanel => ({
  type: AnalyitcsPanelActiontypes.UPDATE_ANALYSIS_DATA_SHOW,
  payload: analyticsPanel
})