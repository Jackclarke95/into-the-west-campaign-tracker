import * as React from "react";
import * as data from "../Data/Data.json";
import "../Style/NextAdventure.scss";

function NextAdventure() {
  const sessions = data.sessions
    .filter(
      (x) =>
        new Date(x["scheduled-date"]) > new Date() ||
        x["scheduled-date"] === undefined
    )
    // Order by scheduled date
    .sort((a, b) => {
      if (a["scheduled-date"] ? !b["scheduled-date"] : b["scheduled-date"])
        return -1;

      return (
        new Date(a["scheduled-date"]).getTime() -
        new Date(b["scheduled-date"]).getTime()
      );
    });

  const nextSession = sessions[0];
  var message = nextSession["scheduled-date"]
    ? `${nextSession.name} | Scheduled: ${new Date(
        nextSession["scheduled-date"]
      ).toLocaleDateString("en-GB")}`
    : "None scheduled";

  return (
    <span className="panel next-adventure">
      <b>Next Adventure: </b>
      {message}
    </span>
  );
}

export default NextAdventure;
