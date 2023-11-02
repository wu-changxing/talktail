import firebase from "firebase/app";
import "firebase/firestore"; // If you plan to use Firestore
import "firebase/auth"; // If you plan to use Firebase Authentication

// pls use your own config to replace this
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export default firebase;
