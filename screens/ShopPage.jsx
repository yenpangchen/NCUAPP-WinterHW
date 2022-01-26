import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ShopPage = () => (
  <View styles={styles.container}>
    <Text>This is ShopPage</Text>
  </View>
);

export default ShopPage;
