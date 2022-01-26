import * as Google from 'expo-google-app-auth';
// import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import firebase from '../firebase';

const { auth, provider } = firebase;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
});

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // navigation.replace('Home');
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const { user } = userCredentials;
        console.log('Registered with:', user.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const { user } = userCredentials;
        console.log('Logged in with:', user.email);
      })
      .catch((error) => alert(error.message));
  };

  // const googleSignin = () => {
  //   auth
  //     .getRedirectResult()
  //     .then((result) => {
  //       if (result.credential) {
  //         // This gives you a Google Access Token.
  //         const token = result.credential.accessToken;
  //         console.log('token', token);
  //       }
  //       const { user } = result;
  //       console.log('Logged in with:', user);
  //     });

  //   provider.addScope('profile');
  //   provider.addScope('email');
  //   auth.signInWithRedirect(provider);
  // };

  function isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
      const { providerData } = firebaseUser;
      for (let i = 0; i < providerData.length; i += 1) {
        if (providerData[i].providerId === provider.PROVIDER_ID
            && providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  function onSignIn(googleUser) {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        const credential = provider.credential(
          // googleUser.getAuthResponse().id_token,
          googleUser.idToken,
          googleUser.accessToken,
        );

        // Sign in with credential from the Google user.
        auth.signInWithCredential(credential)
          .then(() => { console.log('user signed in'); })
          .catch((error) => {
          // Handle Errors here.
            const errorCode = error.code;
            console.log('errorCode', errorCode);
            const errorMessage = error.message;
            console.log('errorMessage', errorMessage);
          // The email of the user's account used.
          // const { email } = error;
          // console.log(email);
          // The credential that was used.
          // const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
          });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  }

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        // androidClientId: YOUR_CLIENT_ID_HERE,
        behavior: 'web',
        iosClientId: '730523483451-u9had7g6o5kg1o1fboemhnek3eh53cup.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        onSignIn(result);
        return result.accessToken;
      }
      return { cancelled: true };
    } catch (e) {
      return { error: true };
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={signInWithGoogleAsync}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;
