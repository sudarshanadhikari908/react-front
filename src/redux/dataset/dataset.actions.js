import { DatasetActiontypes } from "./dataset.types";

export const setDataset = dataset => ({
  type: DatasetActiontypes.SET_DATASET,
  payload:dataset
})

export const updateDatasetChecked = dataset => ({
  type: DatasetActiontypes.UPDATA_DATASET_CHECKED,
  payload:dataset
})

export const setDatasetSources = dataset => ({
  type: DatasetActiontypes.SET_DATASET_SOURCES,
  payload: dataset
})

export const changeStyleFilter = dataset => ({
  type: DatasetActiontypes.CHANGE_STYLE_FILTER,
  payload: dataset
})

export const updateDatasetFilter = dataset => ({
  type: DatasetActiontypes.UPDATE_DATASET_FILTER,
  payload: dataset
})

export const resetDatasetFilter = dataset => ({
  type: DatasetActiontypes.RESET_DATASET_FILTER,
  payload: dataset
})

export const setDatasetSourceChecked = dataset => ({
  type: DatasetActiontypes.SET_DATASET_SOURCE_CHECKED,
  payload: dataset
})