import { UserActionTypes } from "./user.types";

export const setAuthUser = user => ({
  type: UserActionTypes.SET_AUTH_USER,
  payload: user
})

export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});

export const setAboutApp = user => ({
  type: UserActionTypes.SET_ABOUT_APP,
  payload: user
})