import React from "react";
import data from "../Data/Data.json";
import "./Sessions.scss";

function Sessions() {
  return (
    <span className="panel sessions-panel">
      <h2>Planned Adventures</h2>
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
              <tr key={i}>
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
                <td className="column players">{session.players}</td>
                <td className="column player-count">
                  {session["player-count"]}
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
      <div className="button-container">
        <button>Suggest Adventure</button>
      </div>
    </span>
  );
}

export default Sessions;
