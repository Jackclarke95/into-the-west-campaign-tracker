import React from "react";
import preval from "preval.macro";

function DeploymentDate() {
  return (
    <div className="App">
      <header className="App-header" style={{ textAlign: "center" }}>
        <p>
          Build Date:{" "}
          {preval`module.exports = new Date().toLocaleDateString('de-DE', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });`}
          {` | `}Data last updated on this date
        </p>
      </header>
    </div>
  );
}

export default DeploymentDate;
