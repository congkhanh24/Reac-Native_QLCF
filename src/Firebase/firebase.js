import * as firebase from 'firebase';
const Config = {
    apiKey: "AIzaSyAfa8be0mZrUpz6gI5KUFqLwQeqt6QbGsA",
  authDomain: "quanlycafe-8c05e.firebaseapp.com",
  databaseURL: "https://quanlycafe-8c05e-default-rtdb.firebaseio.com",
  projectId: "quanlycafe-8c05e",
  storageBucket: "quanlycafe-8c05e.appspot.com",
  messagingSenderId: "278105374447",
  appId: "1:278105374447:web:6a03d03b3dcd7597a0e51a",
  measurementId: "G-SY3HPP8M5X"
  };
export default (firebaseConfig = firebase.initializeApp(Config));