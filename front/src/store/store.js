import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

//Reducers
import { clientReducer } from "./reducers/client-reducer";
import { authenticationReducer } from "./reducers/authentication-reducer";
import { alertReducer } from "./reducers/alert-reducer";

const reducers = combineReducers({
  clientState: clientReducer,
  authenticationState: authenticationReducer,
  alertState: alertReducer,
});

const STATE_NAME = "appState";
const localState = localStorage.getItem(STATE_NAME) ? JSON.parse(localStorage.getItem(STATE_NAME)) : {};

const store = createStore(reducers, localState, applyMiddleware(thunk));

store.subscribe(() => {
  localStorage.setItem(STATE_NAME, JSON.stringify(store.getState()));
});

export default store;
