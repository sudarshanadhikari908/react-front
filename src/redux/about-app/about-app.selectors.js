import { createSelector } from "reselect";

const selectAboutApp = state => state.aboutApp;

export const selectLeftPanel = createSelector(
  [selectAboutApp],
  aboutApp => aboutApp.leftPanel
)

export const selectHideLeftPanel = createSelector(
  [selectAboutApp],
  aboutApp => aboutApp.hideLeftPanel
)

export const selectCenter = createSelector(
  [selectAboutApp],
  aboutApp => aboutApp.center
)

export const selectZoom = createSelector(
  [selectAboutApp],
  aboutApp => aboutApp.zoom
)

export const selectAttribuation = createSelector(
  [selectAboutApp],
  aboutApp => aboutApp.attr
)