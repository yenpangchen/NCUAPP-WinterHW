import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  View,
  Image, TextInput, TouchableOpacity, Alert,
} from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
// import {
//   getStorage, ref, uploadBytes, getDownloadURL,
// } from 'firebase/storage';
import { CheckBox, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import uuid from 'react-native-uuid';
import firebase from '../firebase';
// import CheckBoxIcon from 'react-native-elements/dist/checkbox/CheckBoxIcon';

const { storage } = firebase;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  addcontainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    bottom: 20,
  },
  add: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(69,69,69,1)',
    width: 94,
    height: 90,
    borderRadius: 15,
    marginRight: 20,
  },
  addtext: {
    fontSize: 14,
    fontWeight: '300',
    color: 'black',
    marginLeft: 12,
    marginTop: 33,
  },
  photo: {
    width: 180,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#C4C4C4',
  },
  NAMEcontainer: {
    flex: 1,
    flexDirection: 'column',
    bottom: 100,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderColor: 'white',
    borderRadius: 15,
    // bottom: 65,
  },
  input1: {
    width: 300,
    height: 80,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderColor: 'white',
    borderRadius: 15,
    // bottom: 65,
  },
  input2: {
    width: 300,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderColor: 'white',
    borderRadius: 15,
    // bottom: 65,
  },
  // priceAndstatus: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  // },
});

const SellPage = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [Name, setName] = useState('');
  const [Description, setDescription] = useState('');
  const [Dollar, setDollar] = useState(0);
  const [checkNew, setCheckNew] = useState(false);
  const [checkSecond, setCheckSecond] = useState(false);

  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const ref = storage
      .ref()
      .child(uuid.v4());
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    return snapshot.ref.getDownloadURL();
  }

  const handleImagePicked = async (pickerResult) => {
    try {
      setUploading(true);

      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        setImage(uploadUrl);
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Upload failed, sorry :(');
    } finally {
      setUploading(false);
    }
  };

  const pickImage = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log('pickerResult', pickerResult);
    handleImagePicked(pickerResult);
  };

  // another method
  // const uploadImage = async (uri, imageName) => {
  //   const response = await fetch(uri);
  //   const blob = await response.blob();

  //   const ref = storage.ref().child(`images/${imageName}`);
  //   return ref.put(blob);
  // };

  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log(result);

  //   if (!result.cancelled) {
  //     setImage(result.uri);
  //     uploadImage(result.uri, 'test-image')
  //       .then(() => {
  //         console.log('Upload Success');
  //       })
  //       .catch((error) => {
  //         Alert.alert('Upload Failed');
  //         console.log(error);
  //       });
  //   }
  // };

  const NewStatus = () => {
    setCheckNew(true);
    setCheckSecond(false);
  };
  const SecondStatus = () => {
    setCheckSecond(true);
    setCheckNew(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.addcontainer}>
        <View style={styles.add}>
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.addtext}>+ 新增照片</Text>
          </TouchableOpacity>
        </View>
        {image
          ? <Image source={{ uri: image }} style={styles.photo} />
          : <Image style={styles.photo} />}
      </View>

      <View style={styles.NAMEcontainer}>
        <View style={styles.nameContainer}>
          <Icon name="bullhorn" color="#454545" size={20} />
          <Text style={{
            color: '#454545', fontSize: 14, fontWeight: '300', marginLeft: 5,
          }}
          >
            商品名稱
          </Text>
        </View>
        <TextInput style={styles.input} onChangeText={setName} value={Name} placeholder="請輸入商品名稱" />
        <View style={styles.nameContainer}>
          <Icon name="info-circle" color="#454545" size={20} />
          <Text style={{
            color: '#454545', fontSize: 14, fontWeight: '300', marginLeft: 5,
          }}
          >
            商品描述
          </Text>
        </View>
        <TextInput style={styles.input1} onChangeText={setDescription} value={Description} placeholder="請輸入商品敘述" />

        <View style={styles.nameContainer}>
          <Icon name="dollar" color="#454545" size={20} />
          <Text style={{
            color: '#454545', fontSize: 14, fontWeight: '300', marginLeft: 5,
          }}
          >
            價格NT$
          </Text>
        </View>
        <TextInput style={styles.input2} onChangeText={setDollar} value={Dollar} placeholder="0" keyboardType="number-pad" returnKeyType="done" />

        <View style={styles.nameContainer}>
          <Icon name="history" color="#454545" size={20} />
          <Text style={{
            color: '#454545', fontSize: 14, fontWeight: '300', marginLeft: 5,
          }}
          >
            商品狀態
          </Text>
        </View>
        <CheckBox
          center
          title="全新"
          checked={checkNew}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          onPress={NewStatus}
        />
        <CheckBox
          center
          title="二手"
          checked={checkSecond}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          onPress={SecondStatus}
        />
      </View>
      <Button
        title="發佈"
        loading={false}
        loadingProps={{ size: 'small', color: 'white' }}
        buttonStyle={{
          backgroundColor: '#777B9A',
          borderRadius: 15,
        }}
        titleStyle={{ fontWeight: 'bold', fontSize: 20 }}
        containerStyle={{
          marginHorizontal: 40,
          height: 50,
          width: 100,
          marginVertical: 10,
        }}
        onPress={() => console.log('aye')}
        //  style={{bottom:10}}
      />
    </KeyboardAvoidingView>
  );
};

export default SellPage;
