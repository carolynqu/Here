const fs = require('firebase-admin');
const { collection, getDocs } = require("firebase/firestore");

const serviceAccount = require('./credentials.json');

fs.initializeApp({
    credential: fs.credential.cert(serviceAccount),
    databaseURL: 'https://hereapp-ecbb4.firebaseio.com'
});

const db = fs.firestore();

module.exports = db;
