import { combineReducers } from "@reduxjs/toolkit";
import { user } from "./Users";
import { formBuilderReducer } from "../utils/FormBuilder";

import { items } from "./items";

const rootReducer = combineReducers({
  user,
  items,
  formBuilder: formBuilderReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
