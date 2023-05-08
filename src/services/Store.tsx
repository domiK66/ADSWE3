import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/Index";
import thunk from "redux-thunk";

const Store = createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatch = typeof Store.dispatch;
export default Store;
