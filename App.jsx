import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, Button, View, Image, ScrollView,
} from 'react-native';
import firebase from 'firebase';
import {
  Card,
} from 'react-native-paper';
import items from './items';

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
  const [product, setProduct] = useState([]);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    items.getAllItems().then((res) => {
      setProduct(res);
    }).catch((err) => {
      throw err;
    });
  }, [items]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {pressed && product.map(({
          id, productName, price, status, username, imageURL,
        }) => (
          <Card key={id} style={{ flex: 1, padding: 20, margin: 20 }}>
            <Card.Content>
              <Image
                source={{ uri: imageURL }}
                style={{ width: 200, height: 200, margin: 10 }}
              />
              <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{`${productName}`}</Text>
              <Text>{`NT$${price}   ${status}  ${username}`}</Text>
            </Card.Content>
          </Card>
        ))}
        <Button onPress={items.getItem} title="get product" color="#007FFF" />
        <Text>{'\n'}</Text>
        <Button onPress={() => { items.getAllItems().then(() => setPressed(!pressed)); }} title="get all products" color="#0000FF" />
        <Text>{'\n'}</Text>
        <Button onPress={items.addItem} title="add product" color="#00FF00" />
        <Text>{'\n'}</Text>
      </View>
    </ScrollView>
  );
}
