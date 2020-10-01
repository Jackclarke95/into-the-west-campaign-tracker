import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import Characters from "./Components/Characters";
import Sessions from "./Components/Sessions";
import Links from "./Components/Links";
import Rules from "./Components/Rules";
import NextAdventure from "./Components/NextAdventure";

ReactDOM.render(
  <React.StrictMode>
    <h1>Into The West Campaign Tracker</h1>
    <NextAdventure />
    <div className="info">
      <Links />
      <Rules />
    </div>
    <Characters />
    <Sessions />
    {/* TODO: Graveyard */}
    {/* TODO: Player shop */}
  </React.StrictMode>,
  document.getElementById("root")
);
