import { applyMiddleware, combineReducers, createStore } from "redux";
import userReducer from "./Reducers/UserReducer";
import adminReducer from "./Reducers/AdminReducer";
import thunk from 'redux-thunk';

function saveToLocalStorage(store) {
    try {
      const serializedStore = JSON.stringify(store);
      window.localStorage.setItem("store", serializedStore);
    } catch (e) {
      console.log(e);
    }
  }

  function loadFromLocalStorage() {
    try {
      const serializedStore = window.localStorage.getItem("store");
      if (serializedStore === null) return undefined;
      return JSON.parse(serializedStore);
    } catch (e) {
      console.log(e)
      return undefined;
    }
  }
  const persistedState = loadFromLocalStorage();
  const rootReducer = combineReducers({
    user: userReducer,
    admin: adminReducer
  });
  
  export const store = createStore(rootReducer,persistedState, applyMiddleware(thunk));
  store.subscribe(() => saveToLocalStorage(store.getState()));