import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import baseMapReducer from "./base-map/base-map.reducer";
import aboutAppReducer from "./about-app/about-app.reducers";
import datasetReducer from "./dataset/dataset.reducers";
import livedataReducer from './livedata/livedata.reducers';
import analyticsPanelReducer from "./analytics-panel/analytics-panel.reducers";

export default combineReducers({
  user: userReducer,
  baseMap: baseMapReducer,
  aboutApp: aboutAppReducer,
  dataset: datasetReducer,
  livedata: livedataReducer,
  analyticsPanel: analyticsPanelReducer
});