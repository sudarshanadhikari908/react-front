import { BaseMapActionType } from "./base-map.types";

const INITIAL_STATE = {
  baseMapList : []
}

const baseMapReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BaseMapActionType.SET_BASE_MAP:
      return {
        ...state,
        baseMapList: action.payload.baseMap
      }
    case BaseMapActionType.UPDATE_BASE_MAP:
      return {
        ...state,
        baseMapList: state.baseMapList.map(baseMap => {
          if (baseMap.id === action.payload.id)
            baseMap.isDefault = true
          else
            baseMap.isDefault = false
          return baseMap
        })
      }
    default:
      return state;

  }
}

export default baseMapReducer;