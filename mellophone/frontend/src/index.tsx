import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./index.css";

import configureMobx from "./utils/configureMobx";
configureMobx();

ReactDOM.render(<App />, document.getElementById("root"));
