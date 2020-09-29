import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import Characters from "./Components/Characters";
import Sessions from "./Components/Sessions";
import Links from "./Components/Links";
import Rules from "./Components/Rules";

ReactDOM.render(
  <React.StrictMode>
    <Links />
    <Characters />
    <Sessions />
    <Rules />
  </React.StrictMode>,
  document.getElementById("root")
);
