import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDx42XAZirzX5bDfdvq_KXaLvORRV-1rKY",
  authDomain: "whatsapp-link-generator-5376e.firebaseapp.com",
  databaseURL: "https://whatsapp-link-generator-5376e.firebaseio.com",
  projectId: "whatsapp-link-generator-5376e",
  storageBucket: "whatsapp-link-generator-5376e.appspot.com",
  messagingSenderId: "126870058992",
  appId: "1:126870058992:web:217d70e57ce93341568f35",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
