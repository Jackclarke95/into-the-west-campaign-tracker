import React from "react";
import characterData from "../Data/CharacterData.json";
import "./Characters.scss";

function Characters() {
  return (
    <div className="panel characters-panel">
    <table>
      <thead key="thead">
        <tr>
          <th className="column name">Name</th>
          <th className="column level">Level</th>
          <th className="column race">Race</th>
          <th className="column class">Class</th>
          <th className="column session-count">Session Count</th>
          <th className="column sessions-to-level-up">Session to Level Up</th>
          <th className="column next-session">Next Session</th>
        </tr>
      </thead>
      <tbody>
        {characterData.characters.map((character, i) => {
          return (
            <tr key={i}>
              <td className="column name">{character.name}</td>
              <td className="column level">{character.level}</td>
              <td className="column race">{character.race}</td>
              <td className="column class">{character.class}</td>
              <td className="column session-count">{character["session-count"]}</td>
              <td className="column sessions-to-level-up">{character["sessions-to-level-up"]}</td>
              <td className="column next-session">{character["next-session"] ? character["next-session"] : "N/A"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
}

export default Characters;
