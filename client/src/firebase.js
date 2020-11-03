import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBSvMbvihRU1Hmeim6XKA5o2pIe23pEtoI",
  authDomain: "fir-react-c47e1.firebaseapp.com",
  databaseURL: "https://fir-react-c47e1.firebaseio.com",
  projectId: "fir-react-c47e1",
  storageBucket: "fir-react-c47e1.appspot.com",
  messagingSenderId: "425097153685",
  appId: "1:425097153685:web:4830b3043a23b2c6cb1f9c",
};

firebase.initializeApp(config);


export default firebase;