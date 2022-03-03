import { createSelector } from "reselect";

const selectUser = state => state.user;

export const checkIsLoggedIn = createSelector(
  [selectUser],
  user => user.isLoggedIn
)

export const selectUserInfo = createSelector(
  [selectUser],
  user => user.userInfo
)

export const selectAboutApp = createSelector(
  [selectUser],
  user => user.aboutApp
);