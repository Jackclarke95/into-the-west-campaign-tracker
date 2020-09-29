import React from "react";
import sessionData from "../Data/SessionData.json";
import "./Sessions.scss";

function Sessions() {
  return (
    <div className="panel sessions-panel">
      <button>
        <span>+</span>
        <div>Suggest Adventure</div>
      </button>
      <table>
        <thead key="thead">
          <tr>
            <th className="column name">Name</th>
            <th className="column dungeon-master">Dungeon Master</th>
            <th className="column suggestd-by">Suggested By</th>
            <th className="column date">Date</th>
            <th className="column players">Players/Characters</th>
            <th className="column player-count">Player Count</th>
            <th className="column discord-channel">Discord Channel</th>
          </tr>
        </thead>
        <tbody>
          {sessionData.sessions.map((session, i) => {
            return (
              <tr key={i}>
                <td className="column name">{session.name}</td>
                <td className="column dungeon-master">
                  {session["dungeon-master"]}
                </td>
                <td className="column suggestd-by">
                  {session["suggested-by"]}
                </td>
                <td className="column date">{session.date}</td>
                <td className="column players">{session.players}</td>
                <td className="column player-count">
                  {session["player-count"]}
                </td>
                <td className="column discord-channel">
                  {session["discord-channel"]}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Sessions;
