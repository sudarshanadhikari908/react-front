import { LivedataActiontypes } from "./livedata.types";

export const setLivedata = livedata => ({
  type: LivedataActiontypes.SET_LIVEDATA,
  payload:livedata
})

export const updateLivedataChecked = livedata => ({
  type: LivedataActiontypes.UPDATA_LIVEDATA_CHECKED,
  payload:livedata
})

export const setLivedataSources = livedata => ({
  type: LivedataActiontypes.SET_LIVEDATA_SOURCES,
  payload: livedata
})


export const setLivedataSourceChecked = livedata => ({
  type: LivedataActiontypes.SET_LIVEDATA_SOURCE_CHECKED,
  payload: livedata
})