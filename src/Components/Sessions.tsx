import * as React from "react";
import * as ReactDOM from "react-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "../Style/Sessions.scss";
import SuggestAdventurePopup from "./SuggestAdventurePopup";
import SignUpForSessionPopup from "./SignUpForSessionPopup";

const Sessions = (props) => {
  const players = props.players;
  const characters = props.characters;

  const sessions = props.sessions
    // Remove sessions in the past
    .filter(
      (x) =>
        new Date(x["scheduled-date"]) > new Date() ||
        x["scheduled-date"] === undefined
    )
    // Order by suggested date
    .sort((a, b) => {
      return (
        new Date(a["suggested-date"]).getTime() -
        new Date(b["suggested-date"]).getTime()
      );
    })
    // Then order by scheduled date, retaining order by suggested date for unscheduled sessions
    .sort((a, b) => {
      if (a["scheduled-date"] ? !b["scheduled-date"] : b["scheduled-date"])
        return 1;

      return (
        new Date(a["scheduled-date"]).getTime() -
        new Date(b["scheduled-date"]).getTime()
      );
    });

  return (
    <span className="panel sessions-panel">
      <div className="header-and-button">
        <h2>Planned Adventures</h2>
        <div className="button-container">
          <button onClick={() => launchSuggestAdventurePopup(players)}>
            Suggest Adventure
          </button>
        </div>
      </div>
      {players && characters && sessions ? (
        <Table>
          <Thead key="thead">
            <Tr>
              <Th className="column name">Name</Th>
              <Th className="column dungeon-master">Dungeon Master</Th>
              <Th className="column suggested-by">Suggested By</Th>
              <Th className="column suggested-date">First Suggested</Th>
              <Th className="column scheduled-date">Scheduled Date</Th>
              <Th className="column players">Players/Characters</Th>
              <Th className="column player-count">Player Count</Th>
              <Th className="column discord-channel">Discord Channel</Th>
              <Th className="column status">Sign Up</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sessions.map((session, i) => {
              const spaceAvailable = session.characters
                ? session.characters.length === session["max-players"]
                : session.players.length === session["max-players"];
              const sessionPlanned = !!session["scheduled-date"];

              return (
                <Tr
                  key={i}
                  data-session-planned={sessionPlanned}
                  data-space-available={spaceAvailable}
                >
                  <Td className="column name">{session.name}</Td>
                  <Td className="column dungeon-master">
                    {players.map((player) => {
                      if (
                        player["dndbeyond-name"] === session["dungeon-master"]
                      ) {
                        return player["screen-name"]
                          ? player["screen-name"]
                          : player["name"];
                      }

                      return null;
                    })}
                  </Td>
                  <Td className="column suggested-by">
                    {players.map((player) => {
                      if (
                        player["dndbeyond-name"] === session["suggested-by"]
                      ) {
                        return player["screen-name"]
                          ? player["screen-name"]
                          : player["name"];
                      }

                      return null;
                    })}
                  </Td>
                  <Td className="column suggested-date">
                    {session["suggested-date"]
                      ? new Date(session["suggested-date"]).toLocaleDateString(
                          "en-GB"
                        )
                      : "N/A"}
                  </Td>
                  <Td className="column date">
                    {session["scheduled-date"]
                      ? new Date(session["scheduled-date"]).toLocaleDateString(
                          "en-GB"
                        )
                      : "TBD"}
                  </Td>
                  <Td className="column players">
                    {session.characters
                      ? getCharactersFromSession(session.characters, characters)
                      : getPlayersFromSession(session.players, players)}
                  </Td>
                  <Td className="column player-count">
                    {session.characters
                      ? session.characters.length
                      : session.players.length}
                    /{session["max-players"]}
                  </Td>
                  <Td className="column discord-channel">
                    {session["discord-channel"]
                      ? session["discord-channel"]
                      : "TBD"}
                  </Td>
                  <Td className="column sign-up">
                    <button
                      className="button sign-up"
                      disabled={spaceAvailable}
                      title={
                        spaceAvailable ? "Sorry, this session is full" : ""
                      }
                      onClick={() => launchSignUpForSessionPopup()}
                    >
                      Sign Up
                    </button>
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

function getCharacterNameFromId(id: number, allCharacters) {
  let matchinCharacter = allCharacters.find((p) => p.id === id);

  let name = matchinCharacter.nickname
    ? matchinCharacter.nickname
    : matchinCharacter.name;

  return name;
}

function getPlayerNameFromDndBeyondName(dndBeyondName: string, allPlayers) {
  let matchingPlayer = allPlayers.find(
    (p) => p["dndbeyond-name"] === dndBeyondName
  );

  let name = matchingPlayer["screen-name"]
    ? matchingPlayer["screen-name"]
    : matchingPlayer.name;

  return name;
}

function getCharactersFromSession(characterIds, allCharacters) {
  let characterList = [];

  characterIds.map((id) => {
    characterList.push(getCharacterNameFromId(id, allCharacters));
  });

  return characterList.sort().join(", ");
}

function getPlayersFromSession(playerDndBeyondNames, allPlayers) {
  let playerList = [];

  playerDndBeyondNames.map((n) => {
    playerList.push(getPlayerNameFromDndBeyondName(n, allPlayers));
  });

  return playerList.sort().join(", ");
}

function launchSuggestAdventurePopup(players) {
  ReactDOM.render(
    <SuggestAdventurePopup players={players} />,
    document.getElementById("popup-root")
  );
}

function launchSignUpForSessionPopup() {
  ReactDOM.render(
    <SignUpForSessionPopup />,
    document.getElementById("popup-root")
  );
}

export default Sessions;
