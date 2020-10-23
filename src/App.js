import React from "react";
import { signInWithGoogle, auth } from "./firebase.utils";
import Characters from "./Components/Characters";
import Sessions from "./Components/Sessions";
import Links from "./Components/Links";
import Rules from "./Components/Rules";
import NextAdventure from "./Components/NextAdventure";
import DeploymentDate from "./Components/DeploymentDate";
import Facilities from "./Components/Facilities";
import Data from "./Data/Data";
import "./App.scss";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <>
        {this.state.currentUser ? (
          <>
            <h1>Into The West Campaign Tracker</h1>
            <button className="sign-out-button" onClick={() => auth.signOut()}>
              Sign Out
            </button>
            <NextAdventure sessions={Data.sessions} players={Data.players} />
            <div className="info">
              <Links linkGroups={Data["link-groups"]} />
              <Rules />
              <Facilities
                facilities={Data.facilities}
                downtimeActivities={Data["downtime-activities"]}
              />
            </div>
            <Characters
              sessions={Data.sessions}
              characters={Data.characters}
              players={Data.players}
            />
            <Sessions
              sessions={Data.sessions}
              players={Data.players}
              characters={Data.characters}
            />

            {/* TODO: Graveyard */}
            {/* TODO: Player shop */}
            <DeploymentDate />
          </>
        ) : (
          <button onClick={signInWithGoogle}>SIGN IN WITH GOOGLE</button>
        )}
      </>
    );
  }
}

export default App;
