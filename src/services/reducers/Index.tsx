import { combineReducers } from "@reduxjs/toolkit";
import { user } from "./Users";
import { formBuilderReducer } from "../utils/FormBuilder";

const rootReducer = combineReducers({
  user,
  formBuilder: formBuilderReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
