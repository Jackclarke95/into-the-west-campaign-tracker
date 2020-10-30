import * as React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "../Style/Graveyard.scss";

const Graveyard = (props) => {
  const players = props.players;
  const sessions = props.sessions;

  if (!players || !sessions || !props.characters) {
    return <span className="panel graveyard-panel">Loading...</span>;
  }

  const characters = props.characters
    .filter((c) => c.retirement)
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
    <span className="panel graveyard-panel">
      <div className="header-and-button">
        <h2>Hero Graveyard</h2>
      </div>
      {players && characters && sessions ? (
        <Table>
          <Thead key="thead">
            <Tr>
              <Th className="column name">Name</Th>
              <Th className="column level">Level Attained</Th>
              <Th className="column cause">Cause</Th>
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
                  <Td className="column level">
                    {calculateLevelFromSessions(
                      character,
                      character["starting-level"],
                      countSessionsAttended(character, sessions)
                    )}
                  </Td>
                  <Td className="column cause">{character.retirement.cause}</Td>
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
function calculateLevelFromSessions(character, startingLevel, sessionCount) {
  // Last session does not count toward level up since the character died on that session
  if (character.retirement.dead === true) {
    sessionCount--;
  }

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

export default Graveyard;
