import firebase from 'firebase/app';
import {
  GoogleAuthProvider, getAuth, getRedirectResult, signInWithRedirect, signOut,
} from 'firebase/auth';

const auth = getAuth();
const provider = new GoogleAuthProvider();

async function logIn() {
  signInWithRedirect(auth, provider);
  getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(`token ${token}`);
      // The signed-in user info.
      const { user } = result;
      console.log(`user ${user}`);
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
      // The email of the user's account used.
      const { email } = error;
      console.log(email);
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(credential);
      // ...
    });
}

function logOut() {
  // sign out
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
    console.log(error);
  });
}

function toggleSignIn() {
  if (!firebase.auth().currentUser) {
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    logIn();
  } else {
    logOut();
  }
}

function handleSignUp(email, password) {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      const { user } = userCredentials;
      console.log('Registered with:', user.email);
    })
    .catch((error) => alert(error.message));
}

function handleLogin(email, password) {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      const { user } = userCredentials;
      console.log('Logged in with:', user.email);
    })
    .catch((error) => alert(error.message));
}

function handleSignOut(navigation) {
  auth
    .signOut()
    .then(() => {
      navigation.replace('Login');
    })
    .catch((error) => alert(error.message));
}

export default {
  logIn, logOut, toggleSignIn, handleSignUp, handleLogin, handleSignOut,
};
