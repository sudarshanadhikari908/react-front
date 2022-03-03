import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  authToken: null,
  isLoggedIn: false,
  userInfo: null,
  aboutApp: null,
}
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_AUTH_USER:
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        authToken: action.payload.authToken,
      }
    case UserActionTypes.SET_CURRENT_USER:
    return {
        ...state,
        userInfo: action.payload.userInfo
    }
    case UserActionTypes.SET_ABOUT_APP:
      return {
        ...state,
        aboutApp: action.payload.aboutApp
      }
    default:
      return state;
  }
}

export default userReducer;