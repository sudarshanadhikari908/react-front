import { LivedataActiontypes } from "./livedata.types";

import { addLivedataSources } from './livedata.utils'

const INITIAL_STATE = {
    livedataCategory: [],
    livedata: [],
    livedataSources: [],
    checkedLivedataSource: null
  }

  
const livedataReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case LivedataActiontypes.SET_LIVEDATA:
        return {
          ...state,
          livedataCategory: action.payload.livedataCategory,
          livedata: action.payload.livedata
        }
      case LivedataActiontypes.UPDATA_LIVEDATA_CHECKED:
        return {
          ...state,
          livedataCategory: state.livedataCategory.map(category => {
            category.livedata.map(livedata => {
              if (livedata.id === action.payload)
                livedata.isChecked = !livedata.isChecked
              return livedata
            })
            return category
          }),
          livedata: state.livedata.map(livedata => {
            if (livedata.id === action.payload)
              livedata.isChecked = !livedata.isChecked
            return livedata
          })
        }
    case LivedataActiontypes.SET_LIVEDATA_SOURCES:
        return {
          ...state,
          livedataSources:addLivedataSources(state.livedataSources, action.payload.livedataSources)
        }

    case LivedataActiontypes.SET_LIVEDATA_SOURCE_CHECKED:
      return {
        ...state,
        checkedLivedataSource: action.payload
       }
    default:
      return state
  }

}

export default livedataReducer