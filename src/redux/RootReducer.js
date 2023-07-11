// Create a new file: reducers.js

import { combineReducers } from "redux";
import { selectedItemsReducer } from "./Reducer";

const rootReducer = combineReducers({
  selectedItems: selectedItemsReducer,
  // other reducers...
});

export default rootReducer;
