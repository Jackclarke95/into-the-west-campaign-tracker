import React from "react";
import preval from "preval.macro";

function DeploymentDate() {
  return (
    <div className="App">
      <header className="App-header" style={{ textAlign: "center" }}>
        <p>
          Build Date: {preval`module.exports = new Date().toLocaleString();`}.
          Data is accurate up to this date.
        </p>
      </header>
    </div>
  );
}

export default DeploymentDate;
