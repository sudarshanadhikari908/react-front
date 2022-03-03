import { createSelector } from "reselect";
import { selectDatasetSourcesData } from "./dataset.utils";

const selectDatasets = state => state.dataset;

export const selectDatasetCategories = createSelector(
  [selectDatasets],
  dataset => dataset.datasetCategories
)

export const selectDataset = createSelector(
  [selectDatasets],
  dataset => dataset.dataset
)

export const selectActiveSource = createSelector(
  [selectDatasets],
  dataset => dataset.checkedDatasetSource
)

export const selectDatasetById = id => createSelector(
  [selectDataset],
  dataset => dataset.find(ds => ds.id === id)
)

export const selectDatasetSourcesByDataset = id => createSelector(
  [selectDatasets],
  dataset => dataset.datasetSources.filter(source => {
    if (source.dataset.id === id) return source
  })
)

export const selectDatasetSources = id => createSelector(
  [selectDatasets],
  dataset => selectDatasetSourcesData(dataset, id)
)
