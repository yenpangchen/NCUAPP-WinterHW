import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginPage from './screens/LoginPage';
// import HomePage from './screens/HomePage';
import StartShoppingPage from './screens/StartShoppingPage';
import ProductPage from './screens/ProductPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginPage} /> */}
        {/* <Stack.Screen name="Home" component={HomePage} /> */}
        <Stack.Screen name="StartShopping" component={StartShoppingPage} />
        <Stack.Screen name="Product" component={ProductPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
