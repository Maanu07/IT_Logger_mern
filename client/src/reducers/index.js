import { combineReducers } from "redux";
import logReducer from "./logReducer";
import techReducer from "./techReducer";

// combining the different reducers together and passing it to the store
const rootReducer = combineReducers({
  log: logReducer,
  tech: techReducer,
});

export default rootReducer;
