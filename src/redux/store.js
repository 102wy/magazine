import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import magazine from "./modules/magazine";
import user from "./modules/user";

const middlewares = [thunk];
const rootReducer = combineReducers({ magazine, user });
const enhancer = applyMiddleware(...middlewares);
const store = createStore(rootReducer, enhancer);

export default store;
