import * as React from "react";
import * as firebase from "firebase";
import "../Style/Rules.scss";

function Rules() {
  fetchData();

  return (
    <span className="panel rules-panel">
      <h2>Rules</h2>
      <p>Check back later...</p>
    </span>
  );
}

function fetchData() {
  const config = {
    apiKey: "AIzaSyA12TmuiAqOIbS9Z0_eyLdlFD8I0NCUYIU",
    authDomain: "into-the-west-campaign-t-e3d32.firebaseapp.com",
    databaseURL: "https://into-the-west-campaign-t-e3d32.firebaseio.com/",
    projectId: "into-the-west-campaign-t-e3d32",
  };

  firebase.initializeApp(config);

  firebase
    .database()
    .ref()
    .on("value", (snapshot) => {
      snapshot.forEach((snap) => {
        console.log(snap.val());
      });
    });
}

export default Rules;
