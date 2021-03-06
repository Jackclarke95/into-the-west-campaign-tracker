import * as React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "../Style/Characters.scss";

const Characters = (props) => {
  const players = props.players;
  const sessions = props.sessions;

  const characters = props.characters
    .filter((c) => !c.retirement)
    .sort((a, b) => {
      const aNameToCompare = a.nickname ?? a.name;
      const bNameToCompare = b.nickname ?? b.name;

      return aNameToCompare < bNameToCompare
        ? -1
        : aNameToCompare > bNameToCompare
        ? 1
        : 0;
    });

  return (
    <span className="panel characters-panel">
      <div className="header-and-button">
        <h2>Character Progression</h2>
        <div className="button-container">
          <button>Create Character</button>
        </div>
      </div>
      {players && sessions && characters ? (
        <Table>
          <Thead key="thead">
            <Tr>
              <Th className="column name">Name</Th>
              <Th className="column race">Race</Th>
              <Th className="column class">Class</Th>
              <Th className="column current-level">Current Level</Th>
              <Th className="column starting-level">Starting Level</Th>
              <Th className="column session-count">Sessions Attended</Th>
              <Th className="column sessions-to-level-up">
                Sessions Until Level Up
              </Th>
              <Th className="column next-session">Next Session</Th>
              <Th className="column test-date">Player</Th>
            </Tr>
          </Thead>
          <Tbody>
            {characters.map((character) => {
              return (
                <Tr
                  key={character.id}
                  data-id={character.id}
                  title={character.name}
                >
                  <Td className="column name">
                    <a
                      className="avatar-link"
                      rel="noopener noreferrer"
                      target="_blank"
                      href={`https://www.dndbeyond.com/avatars/${character["avatar-link"]}`}
                    >
                      <img
                        src={`https://www.dndbeyond.com/avatars/${character["avatar-link"]}`}
                      />
                    </a>
                    <a
                      className="character-name"
                      rel="noopener noreferrer"
                      target="_blank"
                      href={`https://www.dndbeyond.com/profile/${character["player-dndbeyond-name"]}/characters/${character.id}`}
                    >
                      {character.nickname ? character.nickname : character.name}
                    </a>
                  </Td>
                  <Td className="column race">
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href={`https://www.dndbeyond.com/races/${character.race}`}
                    >{`${character.race}${
                      character.subrace ? ` (${character.subrace})` : ""
                    }`}</a>
                  </Td>
                  <Td className="column class">
                    {formatClasses(character.classes)}
                  </Td>
                  <Td className="column current-level">
                    {calculateLevelFromSessions(
                      character["starting-level"],
                      countSessionsAttended(character, sessions)
                    )}
                  </Td>
                  <Td className="column starting-level">
                    {character["starting-level"]}
                  </Td>
                  <Td className="column session-count">
                    {countSessionsAttended(character, sessions)}
                  </Td>
                  <Td className="column sessions-to-level-up">
                    {calculateRemainingSessionsForLevelUp(
                      character["starting-level"],
                      countSessionsAttended(character, sessions)
                    )}
                  </Td>
                  <Td className="column next-session">
                    {determineNextSession(character, sessions)}
                  </Td>
                  <Td className="column test-data">
                    {players.map((player) => {
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
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      ) : (
        <div>Loading...</div>
      )}
    </span>
  );
};

function determineNextSession(character, sessions) {
  let matchingSessions = [];

  sessions.map((session) => {
    if (
      session.characters &&
      session.characters.includes(character.id) &&
      new Date(session["scheduled-date"]) > new Date()
    ) {
      matchingSessions.push(session);
    }
  });

  matchingSessions
    .filter(
      (x) =>
        new Date(x["scheduled-date"]) > new Date() ||
        x["scheduled-date"] === undefined
    )
    .sort((a, b) => {
      if (a["scheduled-date"] ? !b["scheduled-date"] : b["scheduled-date"])
        return 1;

      return (
        new Date(a["scheduled-date"]).getTime() -
        new Date(b["scheduled-date"]).getTime()
      );
    });

  return matchingSessions.length > 0
    ? `${matchingSessions[0].name}\r\n${new Date(
        matchingSessions[0]["scheduled-date"]
      ).toLocaleDateString()}`
    : "N/A";
}

function countSessionsAttended(character, sessions) {
  let matchingSessions = [];

  sessions.map((session) => {
    if (
      session.characters &&
      session.characters.includes(character.id) &&
      new Date(session["scheduled-date"]) < new Date()
    ) {
      matchingSessions.push(session);
    }
  });

  return matchingSessions.length;
}

/**
 * Formats the classes a character has based on the array of its classes
 *
 * @param {{string, number}[]} classes Array of the character's classes
 *
 * @returns {string} A formatted list of the character's classes
 */
function formatClasses(classes) {
  let formattedClasses = `${classes[0].class} (${classes[0].level})`;

  let i;

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
  let currentLevel = calculateLevelFromSessions(startingLevel, sessionCount);

  let sessionsRequiredForNext = calculateOffsetSessionsRequiredForLevel(
    currentLevel + 1
  );

  let offsetCurrentSessions =
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
  let currentLevel = startingLevel;
  let remainingSessions = sessionCount;
  let sessionsToLevel = calculateTotalSessionsToNextLevel(currentLevel + 1);

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
  let minimumSessions = 0;
  let currentLevel = 1;

  while (currentLevel < level) {
    currentLevel++;
    minimumSessions += calculateTotalSessionsToNextLevel(currentLevel);
  }

  return minimumSessions;
}

export default Characters;
