import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}
