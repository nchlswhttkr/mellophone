import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import App from "./App";
import "./index.css";
import rootReducer from "./ducks";

if (process.env.NODE_ENV === "production") {
  console.log("Built from commit " + process.env.REACT_APP_COMMIT_SHA || "-");
}

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
