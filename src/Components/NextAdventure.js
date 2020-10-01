import React from "react";
import data from "../Data/Data.json";
import "./NextAdventure.scss";

function NextAdventure() {
  const sessions = data.sessions
    .sort((a, b) => {
      const aDate = new Date(a["suggested-date"]);
      const bDate = new Date(b["suggested-date"]);
      return aDate - bDate;
    })
    .sort((a, b) => {
      if (
        (a["scheduled-date"] && !b["scheduled-date"]) ||
        (b["scheduled-date"] && !a["scheduled-date"])
      ) {
        return -1;
      }

      return (
        new Date(a["scheduled-date"] ? a["scheduled-date"] : 0) -
        new Date(b["scheduled-date"] ? b["scheduled-date"] : 0)
      );
    });

  const nextSession = sessions[0];
  var message;

  if (nextSession["scheduled-date"]) {
    message = `${nextSession.name} | Scheduled: ${new Date(
      nextSession["scheduled-date"]
    ).toLocaleDateString("en-GB")}`;
  } else {
    message = "None scheduled";
  }

  debugger;

  return (
    <span className="panel next-adventure">
      <b>Next Adventure: </b>
      {message}
    </span>
  );
}

export default NextAdventure;
