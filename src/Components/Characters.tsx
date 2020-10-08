import * as React from "react";
import * as data from "../Data/Data.json";
import "../Style/Characters.scss";

function Characters() {
  const characters = data.characters.sort((a, b) => {
    const aNameToCompare = a.nickname ?? a.name;
    const bNameToCompare = b.nickname ?? b.name;

    return aNameToCompare < bNameToCompare
      ? -1
      : aNameToCompare > bNameToCompare
      ? 1
      : 0;
  });

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
            <th className="column current-level">Current Level</th>
            <th className="column starting-level">Starting Level</th>
            <th className="column session-count">Sessions Attended</th>
            <th className="column sessions-to-level-up">
              Sessions Until Level Up
            </th>
            <th className="column next-session">Next Session</th>
            <th className="column test-date">Player</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character) => {
            return (
              <tr
                key={character.id}
                data-id={character.id}
                title={character.name}
              >
                <td className="column name">
                  <img
                    src={`https://www.dndbeyond.com/avatars/${character["avatar-link"]}`}
                    alt={character.nickname + " avatar"}
                  />
                  <a
                    className="character-name"
                    rel="noopener noreferrer"
                    target="_blank"
                    href={`https://www.dndbeyond.com/profile/${character["player-dndbeyond-name"]}/characters/${character.id}`}
                  >
                    {character.nickname ? character.nickname : character.name}
                  </a>
                </td>
                <td className="column race">
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={`https://www.dndbeyond.com/races/${character.race}`}
                  >{`${character.race}${
                    character.subrace ? ` (${character.subrace})` : ""
                  }`}</a>
                </td>
                <td className="column class">
                  {formatClasses(character.classes)}
                </td>
                <td className="column current-level">
                  {calculateLevelFromSessions(
                    character["starting-level"],
                    character["session-count"]
                  )}
                </td>
                <td className="column starting-level">
                  {character["starting-level"]}
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
                <td className="column test-data">
                  {data.players.map((player) => {
                    if (
                      player["dndbeyond-name"] ===
                      character["player-dndbeyond-name"]
                    ) {
                      return (
                        <a
                          key={player["dndbeyond-name"]}
                          rel="noopener noreferrer"
                          target="_blank"
                          href={`https://www.dndbeyond.com/members/${character["player-dndbeyond-name"]}`}
                        >
                          {player["dndbeyond-name"]}
                        </a>
                      );
                    }
                    return null;
                  })}
                </td>
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
 * Calculates the remaining number of sessions a character must attend before levelling up
 *
 * @param {number} startingLevel The level that at which the character was created
 * @param {number} sessionCount The total number of sessions the character has attended
 *
 * @returns {number} The remaining number of sessions a character must attend in order to gain a level
 */
function calculateRemainingSessionsForLevelUp(startingLevel, sessionCount) {
  var currentLevel = calculateLevelFromSessions(startingLevel, sessionCount);

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
function calculateTotalSessionsToNextLevel(level: number) {
  return Math.trunc(level / 6 + 2);
}

/**
 * Calculates the character's current level from its starting level and session count
 *
 * @param {number} startingLevel The level that at which the character was created
 * @param {number} sessionCount The total number of sessions the character has attended
 *
 * @returns {number} The character's level
 */
function calculateLevelFromSessions(startingLevel, sessionCount) {
  var currentLevel = startingLevel;
  var remainingSessions = sessionCount;
  var sessionsToLevel = calculateTotalSessionsToNextLevel(currentLevel + 1);

  while (remainingSessions >= sessionsToLevel) {
    remainingSessions -= sessionsToLevel;
    currentLevel++;
    sessionsToLevel = calculateTotalSessionsToNextLevel(currentLevel + 1);
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
    currentLevel++;
    minimumSessions += calculateTotalSessionsToNextLevel(currentLevel);
  }

  return minimumSessions;
}

export default Characters;