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

});

const ProductPage = ({ route }) => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    items.getItemById(route.key).then((res) => {
      setProduct(res);
    }).catch((err) => {
      throw err;
    });
  }, [items]);
  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={styles.phone}>
      <View style={styles.itemsContainer}>
        <Text>{`商品名稱: ${route.params.ProductName}`}</Text>
        <Image
          source={{ uri: route.params.ImageURL }}
          style={{ width: '90%', aspectRatio: 1 }}
        />
        <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{`${route.params.ProductName}`}</Text>
        <Text>{`NT$${route.params.Price}   ${route.params.Status}  ${route.params.Username}`}</Text>
      </View>

    </ScrollView>
  );
};

export default ProductPage;
