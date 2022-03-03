import { DatasetActiontypes } from "./dataset.types";
import {
  addDatasetSources,
  updateStyleFilter,
  updateDatasetFilter,
  resetDatasetFilter
} from "./dataset.utils";

const INITIAL_STATE = {
  datasetCategories: [],
  dataset: [],
  datasetSources: [],
  checkedDatasetSource: null
}

const datasetReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DatasetActiontypes.SET_DATASET:
      return {
        ...state,
        datasetCategories: action.payload.datasetCategories,
        dataset: action.payload.dataset
      }
    case DatasetActiontypes.UPDATA_DATASET_CHECKED:
      return {
        ...state,
        datasetCategories: state.datasetCategories.map(category => {
          category.dataset.map(dataset => {
            if (dataset.id === action.payload)
              dataset.isChecked = !dataset.isChecked
            return dataset
          })
          return category
        }),
        dataset: state.dataset.map(dataset => {
          if (dataset.id === action.payload)
            dataset.isChecked = !dataset.isChecked
          return dataset
        })
      }
    case DatasetActiontypes.SET_DATASET_SOURCES:
      return {
        ...state,
        datasetSources: addDatasetSources(state.datasetSources, action.payload.datasetSources)
      }
    case DatasetActiontypes.CHANGE_STYLE_FILTER:
      return {
        ...state,
        dataset: updateStyleFilter(state.dataset, action.payload)
      }
    case DatasetActiontypes.UPDATE_DATASET_FILTER:
      return {
        ...state,
        dataset: updateDatasetFilter(state.dataset, action.payload)
      }

    case DatasetActiontypes.RESET_DATASET_FILTER:
      return {
        ...state,
        dataset: resetDatasetFilter(state.dataset, action.payload)
      }
    case DatasetActiontypes.SET_DATASET_SOURCE_CHECKED:
      return {
        ...state,
        checkedDatasetSource: action.payload
       }
    default:
      return state
  }

}

export default datasetReducer