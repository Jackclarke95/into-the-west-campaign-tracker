import React from "react";
import data from "../Data/Data.json";
import "./Characters.scss";

function Links() {
  return (
    <div className="panel characters-panel">
      <div className="header-and-button">
        <h2>Character Progression</h2>
        <div className="button-container">
          <button>Create Character</button>
        </div>
      </div>
      <table>
        <thead key="thead">
          <tr>
            <th className="column name">Name</th>
            <th className="column race">Race</th>
            <th className="column class">Class</th>
            <th className="column level">Total Level</th>
            <th className="column session-count">Session Count</th>
            <th className="column sessions-to-level-up">
              Sessions to Level Up
            </th>
            <th className="column next-session">Next Session</th>
          </tr>
        </thead>
        <tbody>
          {data.characters.map((character, i) => {
            return (
              <tr key={i}>
                <td className="column name">
                  <img
                    src={character["avatar-link"]}
                    alt={character.name + " avatar"}
                  />
                  <div className="character-name">{character.name}</div>
                </td>
                <td className="column race">{character.race}</td>
                <td className="column class">
                  {formatClasses(character.classes)}
                </td>
                <td className="column level">
                  {calculateLevel(character.classes)}
                </td>
                <td className="column session-count">
                  {
                    //TODO: Calculate this automatically
                    character["session-count"]
                  }
                </td>
                <td className="column sessions-to-level-up">
                  {
                    //TODO: Calculate this automatically
                    character["sessions-to-level-up"]
                  }
                </td>
                <td className="column next-session">
                  {character["next-session"]
                    ? character["next-session"]
                    : "N/A"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function formatClasses(classes) {
  var formattedClasses = `${classes[0].class} (${classes[0].level})`;

  var i;
  for (i = 1; i < classes.length; i++) {
    formattedClasses += `, ${classes[i].class} (${classes[i].level})`;
  }

  return formattedClasses;
}

function calculateLevel(classes) {
  var totalLevel = 0;

  classes.forEach((c) => {
    totalLevel += c.level;
  });

  return totalLevel;
}

function calculateSessionToLevelUp(startingLevel, currentLevel, sessionCount) {
  //TODO: this code

  switch (startingLevel) {
    case 3:
      if (currentLevel < 4) {
      }
      break;
    case 4:
      break;
    case 5:
      break;
    case 6:
      break;
    case 7:
      break;
    case 8:
      break;
    case 9:
      break;
    case 10:
      break;
  }
}

export default Links;
