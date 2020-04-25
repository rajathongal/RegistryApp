import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCMiri0pD_6IVLVQG8OJSnCjPdvSughEUg",
    authDomain: "register-35d84.firebaseapp.com",
    databaseURL: "https://register-35d84.firebaseio.com",
    projectId: "register-35d84",
    storageBucket: "register-35d84.appspot.com",
    messagingSenderId: "733287796283",
    appId: "1:733287796283:web:a7ab21d70a71cc850e961e"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;