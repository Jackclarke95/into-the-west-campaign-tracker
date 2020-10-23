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
            <div className="user-menu">
              <div className="user-info">
                Signed in as: {this.state.currentUser.displayName}
                <div className="spacer">|</div>
                <div className="sign-out-button" onClick={() => auth.signOut()}>
                  Sign Out
                </div>
              </div>
              <img src={this.state.currentUser.photoURL} />
            </div>
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
          <>
            <h1>Into the West Campaign Tracker</h1>
            <div className="sign-in-container">
              <div className="sign-in-dialog">
                <div>
                  Welcome to the Campaign Tracker. Please sign in to continue:
                </div>
                <div className="button-container">
                  <button onClick={signInWithGoogle}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1004px-Google_%22G%22_Logo.svg.png" />
                    <div className="google-sign-in-button">
                      Sign In with Google
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}

export default App;
