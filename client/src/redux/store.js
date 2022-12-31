// apply y compose para poder usar redux-thunk (asincrono)
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer/reducer";
import thunkMiddleware from "redux-thunk";

// para poder usar redux devtools en el navegador
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// creando el store, pasandole el reducer
const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;
