const { initializeApp } = require("firebase/app");

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDnhAIHBkO_Tt-3CzPiOAR_mvRb7gBq7yo",
  authDomain: "hereapp-ecbb4.firebaseapp.com",
  projectId: "hereapp-ecbb4",
  storageBucket: "hereapp-ecbb4.appspot.com",
  messagingSenderId: "536607192071",
  appId: "1:536607192071:web:42c40bc56c033b7ceea6a2",
  measurementId: "G-12Q4X6B2N5"
};

// Initialize Firebase
const fbApp = initializeApp(firebaseConfig);

module.exports=fbApp;