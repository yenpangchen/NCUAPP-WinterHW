import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Button, ScrollView, Image,
} from 'react-native';
import {
  Card, Searchbar, IconButton,
} from 'react-native-paper';
import firebase from '../firebase';
import items from '../items';

const { auth } = firebase;

const styles = StyleSheet.create({
  itemsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  items: {
    width: '50%',
    aspectRatio: 3 / 4,
  },
  TopBar: {
    margin: '5%',
    width: '90%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    flex: 10,
    borderRadius: 50,
  },
  heart: {
    flex: 1,
    aspectRatio: 1,
    color: 'rgba(255,255,255,1)',
    borderRadius: 50,
  },
});

const StartShoppingPage = () => {
  // Search Bar
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => setSearchQuery(query);

  const [product, setProduct] = useState([]);
  useEffect(() => {
    items.getAllItems().then((res) => {
      setProduct(res);
    }).catch((err) => {
      throw err;
    });
  }, [items]);

  const navigation = useNavigation();

  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={styles.phone}>
      <View style={styles.TopBar}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.search}
        />
        <IconButton
          icon="heart"
          style={styles.heart}
          title=""
          onPress={() => console.log('Pressed')}
        />
        <IconButton
          icon="message-outline"
          style={styles.heart}
          title=""
          onPress={() => console.log('Pressed')}
        />
      </View>
      <View style={styles.itemsContainer}>
        {product.map(({
          id, productName, price, status, username, imageURL,
        }) => (
          <Card
            key={id}
            style={styles.items}
            onPress={() => navigation.navigate('Product', {
              Id: id,
              ProductName: productName,
              Price: price,
              Status: status,
              Username: username,
              ImageURL: imageURL,
            })}
          >
            <Card.Content>
              <Image
                source={{ uri: imageURL }}
                style={{ width: '90%', aspectRatio: 1 }}
              />
              <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{`${productName}`}</Text>
              <Text>{`NT$${price}   ${status}  ${username}`}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>

    </ScrollView>
  );
};

export default StartShoppingPage;
