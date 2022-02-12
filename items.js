import firebase from 'firebase';
const { auth } = firebase;
// Functions
function toDateString(time) {
  const date = new Date(time.seconds * 1000);
  const dateString = `${date.getFullYear().toString()}/${
    (date.getMonth() + 1).toString().padStart(2, '0')}/${
    date.getDate().toString().padStart(2, '0')}  ${
    date.getHours().toString().padStart(2, '0')}:${
    date.getMinutes().toString().padStart(2, '0')}:${
    date.getSeconds().toString().padStart(2, '0')}`;

  return dateString;
}

async function getNewItem() {
  const itemsArray = [];
  const db = firebase.firestore();
  const itemRef = db.collection('products');
  const querySnapshot = await itemRef.where('status', '==', '全新').get();
  querySnapshot.forEach((doc) => {
    itemsArray.push({ createAt: toDateString(doc.data().createAt), ...doc.data(), id: doc.id });
  });
  console.log(itemsArray);
  return itemsArray;
}

async function getSecondhandItem() {
  const itemsArray = [];
  const db = firebase.firestore();
  const itemRef = db.collection('products');
  const querySnapshot = await itemRef.where('status', '==', '二手').get();
  querySnapshot.forEach((doc) => {
    itemsArray.push({ createAt: toDateString(doc.data().createAt), ...doc.data(), id: doc.id });
  });
  console.log(itemsArray);
  return itemsArray;
}


async function getUserItem() {
  const itemsArray = [];
  const db = firebase.firestore();
  const itemRef = db.collection('products');
  const user = firebase.auth().currentUser;
  const querySnapshot = await itemRef.where('user_uid', '==', user.uid).get();
  
  querySnapshot.forEach((doc) => {
    itemsArray.push({ createAt: toDateString(doc.data().createAt), ...doc.data(), id: doc.id });
  });
  console.log(itemsArray);
  return itemsArray;
}

async function getAllItems() {
  const itemsArray = [];
  const db = firebase.firestore();
  const itemsRef = db.collection('products');
  const querySnapshot = await itemsRef.orderBy('createAt', 'desc').get();
  querySnapshot.forEach((doc) => {
    itemsArray.push({ createAt: toDateString(doc.data().createAt), ...doc.data(), id: doc.id });
  });
  console.log(itemsArray);
  return itemsArray;
}

async function addItem(product) {
  const db = firebase.firestore();
  const ItemsRef = db.collection('products');
  const currentTime = new Date();
  const {
    description, imageURL, price, productName, status, userPhotoURL, userId, username,
  } = product;
  const item = {
    createAt: currentTime,
    description,
    imageURL,
    price,
    productName,
    status,
    userPhotoURL,
    user_uid: userId,
    username,
  };
  // const item = {
  //   createAt: currentTime,
  //   description: 'add item',
  //   imageURL: 'https://i.imgur.com/RVTvLTG.png',
  //   price: 120,
  //   productName: 'iphone12',
  //   status: '全新',
  //   userPhotoURL: '',
  //   user_uid: '',
  //   username: 'abc123',
  // };
  ItemsRef.add(item);
  const querySnapshot = await ItemsRef.get();
  querySnapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
  });
  /* 請使用 add() */
}

export default {
  getNewItem,
  getSecondhandItem,
  getAllItems,
  getUserItem,
  addItem,
};
