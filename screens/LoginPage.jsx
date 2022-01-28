import * as Google from 'expo-google-app-auth';
// import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../firebase';

const { auth, provider } = firebase;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    marginTop: 10,
    top: 200,
    width: 300,
  },
  buttonContainer: {
    width: '60%',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    top: 100,
  },
  button: {
    backgroundColor: '#CACCDB',
    width: 200,
    height: 50,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',

  },
  buttonOutline: {
    backgroundColor: '#CACCDB',
    borderColor: '#454545',
    borderWidth: 2,
  },
  // buttonText: {
  //   color: '#454545',
  //   fontWeight: '700',
  //   fontSize: 16,
  // },
  buttonOutlineText: {
    color: '#454545',
    fontWeight: '700',
    fontSize: 16,
    height: 50,
  },
  buy: {
    backgroundColor: 'rgba(196, 196, 196, 1)',
    width: 184,
    height: 44,
    borderRadius: 30,
    top: 230,
    marginLeft: 20,
  },
  buypic: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  cart: {
    marginTop: 10,
    marginBottom: 50,
    top: 220,
  },
  tri: {
    width: 0,
    height: 0,
    borderBottomColor: 'rgba(196, 196, 196, 1)',
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '180deg' }],
    top: 230,
  },
  buytext: {
    fontFamily: 'Paytone One',
    fontWeight: '400',
    fontSize: 14,
    color: 'rgba(69,69,69,1)',
    marginTop: 12,
    marginLeft: 20,
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
      <View style={styles.buypic}>
        <View style={styles.buy}>
          <Text style={styles.buytext}>Buy Something Here</Text>
        </View>
        <View style={styles.tri} />
        <Icon name="shopping-cart" size={65} color="#454545" style={styles.cart} />
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
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogin}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Login</Text>
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
