import * as firebase from "firebase";

function fetchAllData() {
  return fetchData();
}

function fetchCharacters() {
  return fetchData("characters");
}

function fetchSessions() {
  return fetchData("sessions");
}

function fetchPlayers() {
  return fetchData("players");
}

function fetchLinks() {
  return fetchData("link-groups");
}

function fetchData(element = undefined) {
  const config = {
    apiKey: "AIzaSyA12TmuiAqOIbS9Z0_eyLdlFD8I0NCUYIU",
    authDomain: "into-the-west-campaign-t-e3d32.firebaseapp.com",
    databaseURL: "https://into-the-west-campaign-t-e3d32.firebaseio.com/",
    projectId: "into-the-west-campaign-t-e3d32",
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  let data = [];

  firebase
    .database()
    .ref(element)
    .on("value", (snapshot) => {
      snapshot.forEach((snap) => {
        //console.log(`data: `, snap.val());
        data.push(snap.val());
      });
    });

  return data;
}

export {
  fetchAllData,
  fetchCharacters,
  fetchSessions,
  fetchLinks,
  fetchPlayers,
};
