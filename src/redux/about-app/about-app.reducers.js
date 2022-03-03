import { AboutAppActionTypes } from "./about-app.types";
import config from '../../config/env_config.json';
const INITIAL_STATE = {
  aboutApp: null,
  center: [config.defaultLat, config.defaultLng],
  lat: config.defaultLat,
  lng: config.defaultLng,
  zoom: config.defaultZoom,
  attr: config.attribuation,
  leftPanel: "dataset-list",
  hideLeftPanel: false
}

const aboutAppReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AboutAppActionTypes.SET_ABOUT_APP:
      return {
        ...state,
        aboutApp: action.payload.aboutApp,
        center: [Number(action.payload.aboutApp.latitude), Number(action.payload.aboutApp.longitude)],
        zoom: action.payload.aboutApp.zoom,
        attr: action.payload.aboutApp.attribution
      }
    case AboutAppActionTypes.SET_CENTER:
      return {
        ...state,
        center: [action.payload.lat, action.payload.lng]
      }
    case AboutAppActionTypes.SET_ZOOM:
      return {
        ...state,
        zoom: action.payload.zoom
      }
    case AboutAppActionTypes.SET_LEFT_PANEL:
      return {
        ...state,
        leftPanel: action.payload
      }
    case AboutAppActionTypes.TOGGLE_LEFT_PANEL:
      return {
        ...state,
        hideLeftPanel: action.payload
      }
    default:
      return state
  }
}

export default aboutAppReducer;