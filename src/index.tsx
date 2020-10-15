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
import * as DataHelper from "./Data/DataHelper";

let liveData = DataHelper.fetchAllData();
let characters = DataHelper.fetchCharacters();
let sessions = DataHelper.fetchSessions();
let players = DataHelper.fetchPlayers();
let links = DataHelper.fetchLinks();

// console.log(Data.sessions);
// console.log(sessions);

ReactDOM.render(
  <React.StrictMode>
    <h1>Into The West Campaign Tracker</h1>
    <NextAdventure sessions={Data.sessions} players={Data.players} />
    <div className="info">
      <Links linkGroups={Data["link-groups"]} />
      <Rules />
    </div>
    <Characters
      sessions={Data.sessions}
      characters={Data.characters}
      players={Data.players}
    />
    <Sessions
      sessions={Data.sessions}
      players={Data.players}
      characters={Data.characters}
    />
    {/* TODO: Graveyard */}
    {/* TODO: Player shop */}
    <DeploymentDate />
  </React.StrictMode>,
  document.getElementById("root")
);
