import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View, Image, ScrollView,
  SafeAreaView, TextInput, Alert, RefreshControl,
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
    backgroundColor: 'white',
  },
  searchbar: {
    width: 237,
    height: 44,
    borderRadius: 20,
    backgroundColor: 'rgba(245,245,245,1)',
    marginTop: 11,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  searchtext: {
    fontSize: 16,
    // fontFamily: 'normal',
    color: 'rgba(196,196,196,1)',
    width: 55,
    height: 17,
    marginLeft: 10,
    marginTop: 12,
  },
  searchpic: {
    width: 20,
    height: 20,
    marginLeft: 20,
    marginTop: 12,
  },
  heart: {
    width: 28,
    height: 25,
    marginTop: 12,
    marginLeft: 150,
  },
  message: {
    width: 28,
    height: 25,
    marginTop: 12,
    marginLeft: 20,
  },
  title: {
    fontSize: 20,
    // fontFamily: 'normal',
    fontWeight: '500',
    color: 'rgba(0,0,0,1)',
    width: 200,
    height: 23,
    marginTop: 15,
    marginLeft: 20,
  },
  choose: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  new: {
    fontSize: 16,
    // fontFamily: 'Roboto',
    fontWeight: '500',
    color: 'black',
    top: 8,
  },
  newpress: {
    fontSize: 16,
    // fontFamily: 'Roboto',
    fontWeight: '300',
    color: '#C4C4C4',
    top: 8,
  },
  Line1: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0,0,0,1)',
    transform: [{ rotate: '-90deg' }],
    width: 19.03,
    height: 2,
    backgroundColor: 'rgba(0,0,0,1)',
    marginLeft: 5,
    marginRight: 5,
  },
  second: {
    fontSize: 16,
    // fontFamily: 'Roboto',
    fontWeight: '500',
    color: 'black',
    top: 8,
  },
  secondpress: {
    fontSize: 16,
    // fontFamily: 'Roboto',
    fontWeight: '300',
    color: '#C4C4C4',
    top: 8,
  },
});

const RentPage = () => {
  const [input, setInput] = useState('');
  const [newproduct, setnewProduct] = useState([]);
  const [secondhandproduct, setsecondhandProduct] = useState([]);
  const [pressedNew, setPressedNew] = useState(true);
  const [pressedSecond, setPressedSecond] = useState(false);

  useEffect(() => {
    items.getAcquireItem().then((res) => {
      setnewProduct(res);
    }).catch((err) => {
      throw err;
    });
  }, [items]);

  useEffect(() => {
    items.getRentItem().then((res) => {
      setsecondhandProduct(res);
    }).catch((err) => {
      throw err;
    });
  }, [items]);

  const handleSearch = (text) => {
    setInput(text);
    const search = input.toLowerCase();
    let filteredNames;
    if (pressedNew === true && pressedSecond === false) {
      const newProductName = newproduct.map((product) => (product.productName));
      filteredNames = newProductName.filter((name) => (name.toLowerCase().includes(search)));
      return filteredNames;
    }
    if (pressedSecond === true && pressedNew === false) {
      const secondHandProductName = secondhandproduct.map((product) => (product.productName));
      filteredNames = secondHandProductName
        .filter((name) => (name.toLowerCase().includes(search)));
      return filteredNames;
    }

    console.log('filteredNames', filteredNames);
    return filteredNames;
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        // navigation.replace('Login');
      })
      .catch((error) => Alert.alert(error.message));
  };

  const onPressChoice = () => {
    setPressedNew(!pressedNew);
    setPressedSecond(!pressedSecond);
    if (pressedNew === true && pressedSecond === false) { items.getAcquireItem(); }
    if (pressedSecond === true && pressedNew === false) { items.getRentItem(); }
  };

  function NewItemCards() {
    return (
      newproduct.map(({
        id, productName, price, status, username, imageURL, type,
      }) => (
        <Card key={id} style={{ flex: 1, padding: 20, margin: 20 }}>
          <Card.Content>
            <Image
              source={{ uri: imageURL }}
              style={{ width: 200, height: 200, margin: 10 }}
            />
            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{`${productName}`}</Text>
            <Text>{`NT$${price}  ${type}  ${status}  ${username}`}</Text>
          </Card.Content>
        </Card>
      ))
    );
  }

  function SecondItemsCards() {
    return (
      secondhandproduct.map(({
        id, productName, price, status, username, imageURL,type
      }) => (
        <Card key={id} style={{ flex: 1, padding: 20, margin: 20 }}>
          <Card.Content>
            <Image
              source={{ uri: imageURL }}
              style={{ width: 200, height: 200, margin: 10 }}
            />
            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{`${productName}`}</Text>
            <Text>{`NT$${price}  ${type}  ${status}  ${username}`}</Text>
          </Card.Content>
        </Card>
      ))
    );
  }

  const [Refresh, setRefresh] = useState(false);
  const onRefresh = () => {
    setRefresh(true);
    items.getAllItems().then((res) => {
      setTimeout(() => { setRefresh(false); }, 500);
    });
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={(
          <RefreshControl
            refreshing={Refresh}
            onRefresh={onRefresh}
          />
        )}
      >
        <View style={styles.searchbar}>
          <Image
            style={styles.searchpic}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/7VTRA1LARbhmV9G9egMojJ-19%3A13?alt=media&token=d690711c-33eb-4e04-aac8-946dbb7a47c5',
            }}
          />
          <View style={styles.searchtext}>
            <TextInput style={{ width: 180 }} placeholder="search" onChangeText={handleSearch} value={input} />
          </View>

          <TouchableOpacity>
            <Image
              style={styles.heart}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/7VTRA1LARbhmV9G9egMojJ-19%3A12?alt=media&token=1c1a0478-0c62-4224-8686-5e085bc5b1c4',
              }}
            />
          </TouchableOpacity>

          <Image
            style={styles.message}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/7VTRA1LARbhmV9G9egMojJ-19%3A15?alt=media&token=6675c1c5-91a9-4b65-8dd7-ebb9dd4222a0',
            }}
          />
        </View>
        <View style={styles.choose}>
          <Text style={styles.title}>收購/租借</Text>
          <TouchableOpacity onPress={onPressChoice}>
            <Text style={pressedNew ? styles.new : styles.newpress}>收購</Text>
          </TouchableOpacity>
          <View style={styles.Line1} />
          <TouchableOpacity onPress={onPressChoice}>
            <Text style={pressedSecond ? styles.second : styles.secondpress}>租借</Text>
          </TouchableOpacity>
        </View>
        {pressedNew ? <NewItemCards /> : <View />}
        {pressedSecond ? <SecondItemsCards /> : <View /> }
      </ScrollView>
    </SafeAreaView>
  );
};

export default RentPage;
