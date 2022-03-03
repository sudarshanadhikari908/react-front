import { createSelector } from "reselect";
import { selectLivedataSourcesData } from "./livedata.utils";

const selectLivedatas = state => state.livedata;

export const selectLivedataCategory = createSelector(
  [selectLivedatas],
  livedata => livedata.livedataCategory
)

export const selectLivedata = createSelector(
  [selectLivedatas],
  livedata => livedata.livedata
)

export const selectActiveSource = createSelector(
  [selectLivedatas],
  livedata => livedata.checkedLivedataSource
)

export const selectLivedataById = id => createSelector(
  [selectLivedata],
  livedata => livedata.find(ld => ld.id === id)
)

export const selectLivedataSourcesByDataset = id => createSelector(
  [selectLivedatas],
  livedata => livedata.datasetSources.filter(source => {
    if (source.livedata.id === id) 
    return source
  })
)

export const selectLivedataSources = id => createSelector(
  [selectLivedatas],
  livedata => selectLivedataSourcesData(livedata, id)
)
