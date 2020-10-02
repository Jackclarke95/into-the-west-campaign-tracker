import React from "react";
import ReactDOM from "react-dom";
import data from "../Data/Data.json";
import Popup from "./SuggestAdventurePopup.js";
import "./Style/Sessions.scss";

function Sessions() {
  const sessions = data.sessions
    // Remove sessions in the past
    .filter(
      (x) =>
        new Date(x["scheduled-date"]) > new Date() ||
        x["scheduled-date"] === undefined
    )
    // Order by suggested date
    .sort((a, b) => {
      return new Date(a["suggested-date"]) - new Date(b["suggested-date"]);
    })
    // Then order by scheduled date, retaining order by suggested date for unscheduled sessions
    .sort((a, b) => {
      if (a["scheduled-date"] ? !b["scheduled-date"] : b["scheduled-date"])
        return -1;

      return new Date(a["scheduled-date"]) - new Date(b["scheduled-date"]);
    });

  return (
    <span className="panel sessions-panel">
      <div className="header-and-button">
        <h2>Planned Adventures</h2>
        <div className="button-container">
          <button onClick={() => launchSuggestAdventurePopup()}>
            Suggest Adventure
          </button>
        </div>
      </div>
      <table>
        <thead key="thead">
          <tr>
            <th className="column name">Name</th>
            <th className="column dungeon-master">Dungeon Master</th>
            <th className="column suggested-by">Suggested By</th>
            <th className="column suggested-date">First Suggested</th>
            <th className="column scheduled-date">Scheduled Date</th>
            <th className="column players">Players/Characters</th>
            <th className="column player-count">Player Count</th>
            <th className="column discord-channel">Discord Channel</th>
            <th className="column status">Status</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session, i) => {
            const sessionStatus =
              session.players.length === session["max-players"] &&
              session["scheduled-date"]
                ? "full-scheduled"
                : session.players.length === session["max-players"] &&
                  !session["scheduled-date"]
                ? "full-planning"
                : session.players.length < session["max-players"] &&
                  session["scheduled-date"]
                ? "space-available-scheduled"
                : "planning";

            const sessionAvailability =
              session.players.length === session["max-players"];

            console.log("space available: " + sessionAvailability);

            const sessionPlanned = !!session["scheduled-date"];

            console.log("planned: " + sessionPlanned);

            return (
              <tr key={i} data-session-planned={sessionPlanned}>
                <td className="column name">{session.name}</td>
                <td className="column dungeon-master">
                  {data.players.map((player) => {
                    if (
                      player["dndbeyond-name"] === session["dungeon-master"]
                    ) {
                      return player["screen-name"]
                        ? player["screen-name"]
                        : player["name"];
                    }

                    return null;
                  })}
                </td>
                <td className="column suggested-by">
                  {session["suggested-by"]}
                </td>
                <td className="column suggested-date">
                  {new Date(session["suggested-date"]).toLocaleDateString(
                    "en-GB"
                  )}
                </td>
                <td className="column date">
                  {session["scheduled-date"]
                    ? new Date(session["scheduled-date"]).toLocaleDateString(
                        "en-GB"
                      )
                    : "TBD"}
                </td>
                <td className="column players">{session.players.join(", ")}</td>
                <td className="column player-count">
                  {session.players.length}/{session["max-players"]}
                </td>
                <td className="column discord-channel">
                  {session["discord-channel"]
                    ? session["discord-channel"]
                    : "TBD"}
                </td>
                <td className="column session-status">
                  {sessionStatus.replace(/-/g, " ").toTitleCase()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </span>
  );
}

function launchSuggestAdventurePopup() {
  ReactDOM.render(<Popup />, document.getElementById("popup-root"));
}

String.prototype.toTitleCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export default Sessions;
