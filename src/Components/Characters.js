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
            <th className="column level">Current Level</th>
            <th className="column session-count">Session Count</th>
            <th className="column sessions-to-level-up">
              Sessions to Level Up
            </th>
            <th className="column next-session">Next Session</th>
            <th className="column test-date">Test Data</th>
          </tr>
        </thead>
        <tbody>
          {data.characters.map((character, i) => {
            console.log(character);
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
                  {calculateLevelFromClasses(character.classes)}
                </td>
                <td className="column session-count">
                  {
                    //TODO: Calculate this automatically
                    character["session-count"]
                  }
                </td>
                <td className="column sessions-to-level-up">
                  {calculateRemainingSessionsForLevelUp(
                    character["starting-level"],
                    character["session-count"]
                  )}
                </td>
                <td className="column next-session">
                  {character["next-session"]
                    ? character["next-session"]
                    : "N/A"}
                </td>
                <td className="column test-data">{`${calculateSessionsToNextLevel(
                  calculateLevelFromClasses(character.classes)
                )} - ${calculateOffsetSessionsRequiredForLevel(
                  calculateLevelFromClasses(character.classes)
                )}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Formats the classes a character has based on the array of its classes
 *
 * @param {{string, number}[]} classes Array of the character's classes
 *
 * @returns {string} A formatted list of the character's classes
 */
function formatClasses(classes) {
  var formattedClasses = `${classes[0].class} (${classes[0].level})`;

  var i;
  for (i = 1; i < classes.length; i++) {
    formattedClasses += `, ${classes[i].class} (${classes[i].level})`;
  }

  return formattedClasses;
}

/**
 * Calculates the character's current level from an array of classes
 *
 * @param {{string, number}[]} classes The classes the character has
 *
 * @returns {number} The character's level
 */
function calculateLevelFromClasses(classes) {
  var totalLevel = 0;

  classes.forEach((c) => {
    totalLevel += c.level;
  });

  return totalLevel;
}

/**
 * Calculates the remaining number of sessions a character must attend before levelling up
 *
 * @param {number} startingLevel The level that at which the character was created
 * @param {number} sessionCount The total number of sessions the character has attended
 *
 * @returns {number} The remaining number of sessions a character must attend in order to gain a level
 */
function calculateRemainingSessionsForLevelUp(startingLevel, sessionCount) {
  var currentLevel = calculateCurrentLevel(startingLevel, sessionCount);
  console.log(currentLevel);

  var sessionsRequiredForNext = calculateOffsetSessionsRequiredForLevel(
    currentLevel + 1
  );

  var offsetCurrentSessions =
    sessionCount + calculateOffsetSessionsRequiredForLevel(startingLevel);

  return sessionsRequiredForNext - offsetCurrentSessions;
}

/**
 * Calculates the number of sessions required for a character to gain a new level from
 * the start of the previous level
 *
 * @param {number} level The level for which to calculate the
 *
 * @returns {number} The number of sessions required for this level
 */
function calculateSessionsToNextLevel(level) {
  return parseInt(level / 6) + 2;
}

/**
 * Calculates the character's current level from its starting level and session count
 *
 * @param {number} startingLevel The level that at which the character was created
 * @param {number} sessionCount The total number of sessions the character has attended
 *
 * @returns {number} The character's level
 */
function calculateCurrentLevel(startingLevel, sessionCount) {
  var currentLevel = startingLevel;
  var remainingSessions = sessionCount;
  var sessionsToLevel = calculateSessionsToNextLevel(currentLevel + 1);

  while (remainingSessions >= sessionsToLevel) {
    remainingSessions -= sessionsToLevel;
    currentLevel++;
    sessionsToLevel = calculateSessionsToNextLevel(currentLevel + 1);
  }

  return currentLevel;
}

/**
 * Calculates the numnber of sessions required for a given level, assuming they were
 * created at 1st level
 *
 * @param {number} level The character's level
 *
 * @returns {number} The number of sessions required for this level
 */
function calculateOffsetSessionsRequiredForLevel(level) {
  var minimumSessions = 0;
  var currentLevel = 1;

  while (currentLevel < level) {
    debugger;
    currentLevel++;
    minimumSessions += calculateSessionsToNextLevel(currentLevel);
    debugger;
  }

  return minimumSessions;
}

export default Links;
