import firebase from "firebase";
const config = {
  apiKey: "AIzaSyAtqETfy0VP6mnm-UaPOJohRIs62sKYvbg",
  authDomain: "platescanner-835aa.firebaseapp.com", 
  databaseURL: "https://platescanner-835aa.firebaseio.com",
  projectId: "platescanner-835aa", 
  storageBucket: "platescanner-835aa.appspot.com",
  messagingSenderId: "853976785702",
  appId: "1:853976785702:web:8f9390dfb9313aa2c357e7",
  measurementId: "G-982XDXL04B"
};

firebase.initializeApp(config);

export const auth = firebase.auth;
