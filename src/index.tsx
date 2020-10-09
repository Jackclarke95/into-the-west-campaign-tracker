import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.scss";
import Characters from "./Components/Characters";
import Sessions from "./Components/Sessions";
import Links from "./Components/Links";
import Rules from "./Components/Rules";
import NextAdventure from "./Components/NextAdventure";
import DeploymentDate from "./Components/DeploymentDate";
import Data from "./Data/Data";

ReactDOM.render(
  <React.StrictMode>
    <h1>Into The West Campaign Tracker</h1>
    <NextAdventure sessions={Data.sessions} />
    <div className="info">
      <Links linkGroups={Data["link-groups"]} />
      <Rules />
    </div>
    <Characters characters={Data.characters} players={Data.players} />
    <Sessions sessions={Data.sessions} players={Data.players} />
    {/* TODO: Graveyard */}
    {/* TODO: Player shop */}
    <DeploymentDate />
  </React.StrictMode>,
  document.getElementById("root")
);
