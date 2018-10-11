import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import main from "./reducers/mainReducer";

export default createStore(
    combineReducers({
        main,
    }),
    applyMiddleware(logger)
);