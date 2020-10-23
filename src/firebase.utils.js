import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA12TmuiAqOIbS9Z0_eyLdlFD8I0NCUYIU",
  authDomain: "into-the-west-campaign-t-e3d32.firebaseapp.com",
  databaseURL: "https://into-the-west-campaign-t-e3d32.firebaseio.com/",
  projectId: "into-the-west-campaign-t-e3d32",
};

firebase.initializeApp(config);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
