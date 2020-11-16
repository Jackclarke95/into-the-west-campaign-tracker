import * as React from "react";
import "../Style/NextAdventure.scss";

const NextAdventure = (props) => {
  const players = props.players;
  let message;

  const sessions = props.sessions.filter(
    (x) =>
      new Date(x["scheduled-date"]) >= new Date() &&
      x["scheduled-date"] !== undefined
  );

  if (!sessions || sessions.length === 0) {
    message = "None Scheduled";
  } else {
    // Order by scheduled date
    sessions.sort((a, b) => {
      if (a["scheduled-date"] ? !b["scheduled-date"] : b["scheduled-date"])
        return -1;

      return (
        new Date(a["scheduled-date"]).getTime() -
        new Date(b["scheduled-date"]).getTime()
      );
    });

    const nextSession = sessions[0];
    message = nextSession["scheduled-date"]
      ? `${nextSession.name} | Scheduled: ${new Date(
          nextSession["scheduled-date"]
        ).toLocaleDateString("en-GB")} | Dungeon Master: ${
          players.find(
            (p) => p["dndbeyond-name"] === nextSession["dungeon-master"]
          ).name
        }`
      : "None scheduled";
  }

  return (
    <span className="panel next-adventure-panel">
      <b>Next Adventure: </b>
      {message}
    </span>
  );
};

export default NextAdventure;
