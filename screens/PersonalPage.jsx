import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View, Button, Image, SafeAreaView,ScrollView
} from 'react-native';
import firebase from '../firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';
import items from '../items';
import {
  Card,
} from 'react-native-paper';

const { auth } = firebase;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    
  },
  button: {
    backgroundColor: '#CACCDB',
    width: 100,
    height: 30,
    borderRadius: 10,
    marginBottom:30,
    alignItems:'center'
  },
  buttonText: {
    color: '#454545',
    fontWeight: '700',
    fontSize: 16,
    marginTop:5
  },
  heart: {
    width: 28,
    height: 25,
    top: 22,
    //marginLeft: 150,
  },
  message: {
    width: 28,
    height: 25,
    top: 22,
    //marginLeft: 20,
  },
});

const PersonalPage = () => {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        // navigation.replace('Login');
        console.log('user signed out');
      })
      .catch((error) => alert(error.message));
  };

  const [userproduct, setuserProduct] = useState([]);

  useEffect(() => {
    items.getUserItem().then((res) => {
      setuserProduct(res);
    }).catch((err) => {
      throw err;
    });
  }, [items]);

  function UserItemsCards() {
    return (
      userproduct.map(({
        id, productName, price, status, username, imageURL, type
      }) => (
        <Card key={id} style={{ flex: 1, padding: 20, margin: 20, width:220, height:250}}>
          <Card.Content>
            <Image
              source={{ uri: imageURL }}
              style={{ width: 100, height: 100, margin: 10 }}
            />
            <Text style={{ marginBottom: 5, fontWeight: 'bold', fontSize:14 }}>{`${productName}`}</Text>
            <View>
              <Text style={{ marginBottom: 5}}>{`NT$${price}  ${type}  ${status}`}</Text>
            </View>
            
            <Text>{`${username}`}</Text>
          </Card.Content>
        </Card>
      ))
    );
  }

  return(  
  <SafeAreaView style={styles.container} behavior="padding">  
    <View style={{flex:1,flexDirection:'row',alignItems:'flex-start'}}>
        <Icon name="cog" color="#454545" size={25} style={{marginLeft:30}} />
        <Icon name="heart" color="red" size={25} style={{marginLeft:210,marginRight:20}} />
        <Icon name="comment" color="#C4C4C4" size={25} />
    </View>
    <View style={{flex:1,alignItems:'center'}}>
      <Image
        style={{ width: 80, height: 80, margin: 10, borderRadius: 40, bottom:50}}
        source={{ uri: auth.currentUser?.photoURL }}
      />
      <Text style={{fontWeight:'bold', fontSize: 18, textAlign:'center',marginBottom: 20, bottom:50}}>
      {`${auth.currentUser.displayName}`}
      </Text>  
    </View>
    <View style={{flex:1, flexDirection:'column', alignItems:'flex-start', marginLeft:40, top:10}}>
      <View style={{flex:0.3, flexDirection:'row'}}>
        <Icon name="info-circle" color="#454545" size={15} />
        <Text style={{fontWeight:'600'}}>  Email: </Text>
        <Text style={{color:'black'}}>
        {`${auth.currentUser.email}`}
        </Text>    
      </View>
      <View style={{flex:0.3, flexDirection:'row'}}>
        <Icon name="envelope" color="#454545" size={13} />
        <Text style={{fontWeight:'600'}}>  ID: </Text>
        <Text style={{color:'black'}}>
        {`${auth.currentUser.uid}`}
        </Text>
      </View>
    </View>
    <View style={{flex:1, flexDirection:'column',alignContent:'center',}}>
      <Divider />
      <Text style={{fontWeight:'bold', fontSize: 18, textAlign:'center', marginVertical:15}}>Listings</Text>
    </View>
    <View style={{flex:4, alignItems:'center'}}>
      <ScrollView style={{flex:1,bottom:50}}>
        <UserItemsCards/>
        <View style={{flex:1, alignItems:'center'}}>
          <TouchableOpacity
          onPress={handleSignOut}
          style={styles.button}>
          <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView> 
    </View>
  </SafeAreaView>
  );
  };
  
export default PersonalPage;
