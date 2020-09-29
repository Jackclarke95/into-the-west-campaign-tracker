import React from "react";
import data from "../Data/Data.json";
import "./Sessions.scss";

function Sessions() {
  return (
    <span className="panel sessions-panel">
      <div className="header-and-button">
        <h2>Planned Adventures</h2>
        <div className="button-container">
          <button>Suggest Adventure</button>
        </div>
      </div>
      <table>
        <thead key="thead">
          <tr>
            <th className="column name">Name</th>
            <th className="column dungeon-master">Dungeon Master</th>
            <th className="column suggested-by">Suggested By</th>
            <th className="column date">Date</th>
            <th className="column players">Players/Characters</th>
            <th className="column player-count">Player Count</th>
            <th className="column discord-channel">Discord Channel</th>
          </tr>
        </thead>
        <tbody>
          {data.sessions.map((session, i) => {
            return (
              <tr
                key={i}
                data-space-available={
                  session.players.length === session["max-players"] &&
                  session.date
                    ? "full-scheduled"
                    : session.players.length === session["max-players"] &&
                      !session.date
                    ? "full-planning"
                    : session.players.length < session["max-players"] &&
                      session.date
                    ? "space-available-scheduled"
                    : "planning"
                }
              >
                <td className="column name">{session.name}</td>
                <td className="column dungeon-master">
                  {session["dungeon-master"]}
                </td>
                <td className="column suggested-by">
                  {session["suggested-by"]}
                </td>
                <td className="column date">
                  {session.date ? session.date : "TBD"}
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
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="table-key">
        <div
          className="key-item full-scheduled"
          title="A session which is both full and has been scheduled"
        >
          <div className="key-colour-block"></div>
          <div>Full - Scheduled</div>
        </div>
        <div
          className="key-item full-planning"
          title="A session which is both full but has not yet been scheduled"
        >
          <div className="key-colour-block"></div>
          <div>Full - Scheduled</div>
        </div>
        <div
          className="key-item space-available-scheduled"
          title="A session which is not yet full but has been scheduled"
        >
          <div className="key-colour-block"></div>
          <div>Spaces Available - Planning</div>
        </div>
        <div
          className="key-item planning"
          title="A session which is neither full nor has been scheduled"
        >
          <div className="key-colour-block"></div>
          <div>Spaces Available - Planning</div>
        </div>
      </div>
    </span>
  );
}

export default Sessions;
