import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View, Button, Image, ScrollView,
} from 'react-native';
import {
  Card,
} from 'react-native-paper';
import firebase from '../firebase';
import items from '../items';

const { auth } = firebase;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});

const HomePage = () => {
  const [product, setProduct] = useState([]);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    items.getAllItems().then((res) => {
      setProduct(res);
    }).catch((err) => {
      throw err;
    });
  }, [items]);

  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => alert(error.message));
  };

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
        <Text>
          {`Email: ${auth.currentUser.email} Username: ${auth.currentUser.displayName} ID: ${auth.currentUser.uid}`}
        </Text>
        <Image
          style={{ width: 100, height: 100, margin: 10 }}
          source={{ uri: auth.currentUser?.photoURL }}
        />
        <TouchableOpacity
          onPress={handleSignOut}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
        <Button onPress={items.getItem} title="get product" color="#007FFF" />
        <Text>{'\n'}</Text>
        <Button onPress={() => { items.getAllItems().then(() => setPressed(!pressed)); }} title="get all products" color="#0000FF" />
        <Text>{'\n'}</Text>
        <Button onPress={items.addItem} title="add product" color="#00FF00" />
        <Text>{'\n'}</Text>
      </View>
    </ScrollView>
  );
};

export default HomePage;
