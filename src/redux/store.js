import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { promiseMiddleware, localStorageMiddleware } from '../middleware';

import rootReducer from "./root-reducer";

const middlewares = [logger, promiseMiddleware, localStorageMiddleware];
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;