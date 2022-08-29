import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";

const middleware = [thunk];

// creating the redux store to manage the state
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

// subscribing to the store for identifing the state change of our application
/* const unsubscribe = store.subscribe(() => {
  console.log("Updated state : ", store.getState());
}); */

// unsubscribe() 

export default store;


// redux-dev tools were introduced to improve the user experience of writting a lot of boiler code 