import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBWETzEDwTMezlKBJkRq98GTp4zkKU9mYk',
  authDomain: 'ncuapp-winterhw.firebaseapp.com',
  projectId: 'ncuapp-winterhw',
  storageBucket: 'ncuapp-winterhw.appspot.com',
  messagingSenderId: '730523483451',
  appId: '1:730523483451:web:84d6366104f02518c9cb1e',
  measurementId: 'G-TVJ1F2VFPE',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export default { auth, provider, storage };
