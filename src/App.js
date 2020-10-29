import React from "react";
import { signInWithGoogle, auth } from "./firebase.utils";
import Characters from "./Components/Characters";
import Graveyard from "./Components/Graveyard";
import Sessions from "./Components/Sessions";
import NextAdventure from "./Components/NextAdventure";
import DeploymentDate from "./Components/DeploymentDate";
import Facilities from "./Components/Facilities";
import "./App.scss";

class App extends React.Component {
  state = {
    currentUser: null,
    liveData: undefined,
  };

  constructor() {
    super();
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    fetch("https://into-the-west-campaign-t-e3d32.firebaseio.com/.json")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ liveData: data });
      })
      .catch(console.error);

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
            {!this.state.liveData ? (
              <div>Loading...</div>
            ) : (
              <>
                <div className="top-banner">
                  <div className="character-info">
                    {determineActiveCharacterName(
                      this.state.currentUser.email,
                      this.state.liveData.characters,
                      this.state.liveData.players
                    )}
                  </div>
                  <h1>Into The West Campaign Tracker</h1>
                  <div className="user-menu">
                    <div className="user-info">
                      Signed in as: {this.state.currentUser.displayName}
                      <div className="spacer">|</div>
                      <div
                        className="sign-out-button"
                        onClick={() => auth.signOut()}
                      >
                        Sign Out
                      </div>
                    </div>
                    <img
                      alt="User Profile Picture"
                      src={this.state.currentUser.photoURL}
                    />
                  </div>
                </div>
                <span className="row next-adventure-row">
                  <NextAdventure
                    sessions={this.state.liveData.sessions}
                    players={this.state.liveData.players}
                  />
                </span>
                <span className="row character-row">
                  <Characters
                    sessions={this.state.liveData.sessions}
                    characters={this.state.liveData.characters}
                    players={this.state.liveData.players}
                  />
                  <Graveyard
                    sessions={this.state.liveData.sessions}
                    characters={this.state.liveData.characters}
                    players={this.state.liveData.players}
                  />
                </span>
                <span className="row session-and-facilities-row">
                  <Sessions
                    sessions={this.state.liveData.sessions}
                    players={this.state.liveData.players}
                    characters={this.state.liveData.characters}
                  />
                  <Facilities
                    facilities={this.state.liveData.facilities}
                    downtimeActivities={
                      this.state.liveData["downtime-activities"]
                    }
                  />
                </span>
              </>
            )}
            {/* TODO: Better Links */}
            {/* TODO: Player shop */}
            {/* TODO: Mobile Styling */}
            <div className="bottom-banner">
              <DeploymentDate />
            </div>
          </>
        ) : (
          <>
            <h1>Into the West Campaign Tracker</h1>
            <div className="sign-in-container">
              <div className="sign-in-dialog">
                <div>
                  Welcome to the Campaign Tracker. Please sign in to continue:
                </div>
                <p>Login with Email/Password coming soon...</p>
                {/* TODO: Email/Password Sign In */}
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

function determineActiveCharacterName(emailAddress, characters, players) {
  let matchingPlayer = players.find((p) => p.email === emailAddress);

  let matchingCharacters = characters.filter((c) => {
    return (
      c["player-dndbeyond-name"] === matchingPlayer["dndbeyond-name"] &&
      !c.retirement
    );
  });

  return (
    <>
      <div>Active Characters:</div>
      {matchingCharacters.map((m) => {
        return (
          <a
            className="character-name"
            rel="noopener noreferrer"
            target="_blank"
            href={`https://www.dndbeyond.com/profile/${m["player-dndbeyond-name"]}/characters/${m.id}`}
          >
            {m.nickname ? m.nickname : m.name}
          </a>
        );
      })}
    </>
  );
}

export default App;
