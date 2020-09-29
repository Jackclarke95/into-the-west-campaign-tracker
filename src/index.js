import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import Characters from "./Components/Characters";
import Sessions from "./Components/Sessions";

ReactDOM.render(
  <React.StrictMode>
    <Characters />
    <Sessions />
  </React.StrictMode>,
  document.getElementById("root")
);
