import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);

    this.auth = firebase.auth();
    this.database = firebase.database();

    this.userUid = null;
  }

  setUserUid = (uid) => this.userUid = uid;

  signWithEmail = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  registerWithEmail = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  getUserCardsRef = () => this.database.ref(`/${this.userUid}/cards`);

  getUserCurrentCardRef = (id) => this.database.ref(`/${this.userUid}/cards/${id}`);
}

export default Firebase;