import { AboutAppActionTypes } from "./about-app.types";

export const setAboutApp = aboutApp => ({
  type: AboutAppActionTypes.SET_ABOUT_APP,
  payload: aboutApp
})

export const setCenter = aboutApp => ({
  type: AboutAppActionTypes.SET_CENTER,
  payload: aboutApp
})

export const setZoom = aboutApp => ({
  type: AboutAppActionTypes.SET_ZOOM,
  payload: aboutApp
})

export const setLeftPanel = aboutApp => ({
  type: AboutAppActionTypes.SET_LEFT_PANEL,
  payload: aboutApp
})

export const toggleLeftPanel = aboutApp => ({
  type: AboutAppActionTypes.TOGGLE_LEFT_PANEL,
  payload: aboutApp
})