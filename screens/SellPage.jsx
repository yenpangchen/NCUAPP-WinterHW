import {
  StyleSheet, Text,  KeyboardAvoidingView, View, Image, ScrollView, TextInput,ImageBackground, SafeAreaView
} from 'react-native';
import React from 'react';

import { CheckBox, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBoxIcon from 'react-native-elements/dist/checkbox/CheckBoxIcon';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  addcontainer: {
    flex: 1,
    alignItems:'center',
    flexDirection: 'row',
    bottom: 20,
  },
  add: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: "rgba(69,69,69,1)",
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
    flexDirection:'column',
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
  priceAndstatus: {
    flex: 1,
    flexDirection:'row',
    justifyContent:'center',
  },
});



const SellPage = () => { 
  const [Name, setName] = React.useState("");
  const [Description, setDescription] = React.useState("");
  const [Dollar, setDollar] = React.useState(0);
  const [checkNew, setCheckNew] = React.useState(false);
  const [checkSecond, setCheckSecond] = React.useState(false);

  const NewStatus = () =>{
    setCheckNew(true);
    setCheckSecond(false);
  }
  const SecondStatus = () =>{
    setCheckSecond(true);
    setCheckNew(false);
  }

  return(
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.addcontainer}>      
        <View style={styles.add}>
          <Text style={styles.addtext}>+ 新增照片</Text>
        </View> 
        <View style={styles.photo}/>
      </View>  

      <View style={styles.NAMEcontainer}>
        <View style={styles.nameContainer}>    
            <Icon name='bullhorn' color={'#454545'} size={20}/>
            <Text style={{color:'#454545', fontSize: 14, fontWeight: '300', marginLeft: 5}}>商品名稱</Text>
        </View>           
          <TextInput style={styles.input} onChangeText={setName} value={Name} placeholder="請輸入商品名稱"/>
        <View style={styles.nameContainer}>    
            <Icon name='info-circle' color={'#454545'} size={20}/>
            <Text style={{color:'#454545', fontSize: 14, fontWeight: '300', marginLeft: 5}}>商品描述</Text>
        </View>   
         <TextInput style={styles.input1} onChangeText={setDescription} value={Description} placeholder="請輸入商品敘述"/>
         
            <View style={styles.nameContainer}>    
              <Icon name='dollar' color={'#454545'} size={20}/>
              <Text style={{color:'#454545', fontSize: 14, fontWeight: '300', marginLeft: 5}}>價格NT$</Text>
            </View> 
            <TextInput style={styles.input2} onChangeText={setDollar} value={Dollar} placeholder="0" keyboardType='number-pad' returnKeyType="done" />
          
        
         <View style={styles.nameContainer}>    
           <Icon name='history' color={'#454545'} size={20}/>
           <Text style={{color:'#454545', fontSize: 14, fontWeight: '300', marginLeft: 5}}>商品狀態</Text>
         </View>
         <CheckBox 
         center
         title= "全新" 
         checked={ checkNew } 
         checkedIcon="dot-circle-o" 
         uncheckedIcon="circle-o"
         onPress={NewStatus}
         />
         <CheckBox 
         center
         title= "二手" 
         checked={ checkSecond } 
         checkedIcon="dot-circle-o" 
         uncheckedIcon="circle-o"
         onPress={SecondStatus}/> 
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
