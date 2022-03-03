import { createSelector } from "reselect";
import { activeAnalyticsFilterPanel } from "./analytics-panel.utils";

const analyticsPanel = state => state.analyticsPanel;

export const selectAnalyticsPanelCategories = createSelector(
  [analyticsPanel],
  analyticsPanel => analyticsPanel.analyticsPanelCategories
)

export const selectActiveAnalyticsPanelCategories = createSelector(
  [analyticsPanel],
  analyticsPanel => analyticsPanel.analyticsPanelCategories.filter(catogory => catogory.isChecked === true)
)

export const selectActiveAnalyticsFilterPanel = createSelector(
  [analyticsPanel],
  analyticsPanel => activeAnalyticsFilterPanel(analyticsPanel.analyticsPanelCategories)
)

export const selectAnalyticsPanel = createSelector(
  [analyticsPanel],
  analyticsPanel => analyticsPanel.analyticsPanel
)

export const selectAnalyticsTodoList = createSelector(
  [analyticsPanel],
  analyticsPanel => analyticsPanel.analyticsTodo
)

export const selectActiveAnalyticsTodo = createSelector(
  [analyticsPanel],
  analyticsPanel => analyticsPanel.analyticsTodo.find(analyticsTodo => analyticsTodo.isChecked === true)
)

export const selectAnalysisData = createSelector(
  [analyticsPanel],
  analyticsPanel => analyticsPanel.analysisData
)

