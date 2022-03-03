import { BaseMapActionType } from "./base-map.types";

export const setBaseMap = baseMap => ({
  type: BaseMapActionType.SET_BASE_MAP,
  payload: baseMap
})

export const updateActiveMap = baseMap => ({
  type: BaseMapActionType.UPDATE_BASE_MAP,
  payload: baseMap
})
