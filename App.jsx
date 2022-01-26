import React, { useState } from 'react';
import { View } from 'react-native';
// import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginPage from './screens/LoginPage';
import HomePage from './screens/HomePage';
import RentPage from './screens/RentPage';
import SellPage from './screens/SellPage';
import ShopPage from './screens/ShopPage';
import PersonalPage from './screens/PersonalPage';
import firebase from './firebase';

const { auth } = firebase;

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="首頁"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            const rn = route.name;

            if (rn === '首頁') {
              iconName = focused ? 'home' : 'home';
            } else if (rn === '收購/租借') {
              iconName = focused ? 'shopping-bag' : 'shopping-bag';
            } else if (rn === '賣') {
              iconName = focused ? 'plus' : 'plus';
            } else if (rn === '購買') {
              iconName = focused ? 'shopping-cart' : 'shopping-cart';
            } else if (rn === '個人') {
              iconName = focused ? 'user' : 'user';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          activeTintColor: '#E0E0E0',
          inactiveTintColor: '#454545',
          labelStyle: { paddingBottom: 10, fontSize: 13 },
          style: { padding: 10, height: 60 }
          ,
        })}
      >

        <Tab.Screen options={{ headerShown: false }} name="首頁" component={HomePage} />
        <Tab.Screen options={{ headerShown: false }} name="收購/租借" component={RentPage} />
        <Tab.Screen options={{ headerShown: false }} name="賣" component={SellPage} />
        <Tab.Screen options={{ headerShown: false }} name="購買" component={ShopPage} />
        <Tab.Screen options={{ headerShown: false }} name="個人" component={PersonalPage} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [currentUser, setcurrentUser] = useState();
  auth.onAuthStateChanged((user) => {
    setcurrentUser(user);
  });

  if (currentUser === undefined) {
    return (<View />);
  }

  return (
    <PaperProvider>
      { currentUser ? <MainApp /> : <LoginPage />}
    </PaperProvider>
  // <NavigationContainer>
  //   <Stack.Navigator>
  //     <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginPage} />
  //     <Stack.Screen name="Home" component={HomePage} />
  //   </Stack.Navigator>
  // </NavigationContainer>
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
