import * as React from "react";
import preval from "preval.macro";

function DeploymentDate() {
  const options = `{
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }`;

  return (
    <div className="App">
      <header className="App-header" style={{ textAlign: "center" }}>
        <p>
          <b>Build Date:</b>{" "}
          {preval`module.exports = new Date().toLocaleDateString('en-GB', ${options});`}
          {` | `}Data last updated on this date
        </p>
      </header>
    </div>
  );
}

export default DeploymentDate;
