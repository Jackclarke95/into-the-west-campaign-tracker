import React from "react";
import JsonTable from "react-json-table";
import "./App.scss";

function App() {
  const characters = {
    characters: [
      {
        name: "Big Percy",
        level: 8,
        race: "Half-orc",
        class: "Fighter",
        "session-count": 13,
        "sessions-to-level-up": 3,
      },
      {
        name: "Babel",
        level: 7,
        race: "Kenku",
        class: "Artificer",
        "session-count": 12,
        "sessions-to-level-up": 1,
      },
    ],
  };

  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;
