import { createSelector } from "reselect";

const selectBaseMap = state => state.baseMap

export const selectBaseMapList = createSelector(
  [selectBaseMap],
  baseMap => baseMap.baseMapList
)

export const selectActiveBasemap = createSelector(
  [selectBaseMapList],
  baseMap => baseMap.find(bm => bm.isDefault)
)