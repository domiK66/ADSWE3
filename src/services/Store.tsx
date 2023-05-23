import { applyMiddleware, createStore } from "redux";

import thunk from "redux-thunk";
import rootReducer from "./reducers/Index";

const Store = createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatch = typeof Store.dispatch;
export default Store;
