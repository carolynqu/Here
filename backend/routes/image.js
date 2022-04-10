const express = require('express');
const multer = require('multer');
const router = express.Router();
const firebase = require("firebase/app");
require("firebase/storage"); // must be required for this to work
const firestore = require('../db');  // reference to our db 

const fireBaseStorage = firebase.storage().ref(); // create a reference to storage
global.XMLHttpRequest = require("xhr2"); // must be used to avoid bug

// Setting up multer as a middleware to grab photo uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');

// POST - Add Image to Cloud Storage
router.post('/upload', upload, async (req, res) => {
    try {
        // Grab the file
        const file = req.file;
        const id = req.body.id;

        // Format the filename
        const timestamp = Date.now();
        const name = file.originalname.split(".")[0];
        const type = file.originalname.split(".")[1];
        const fileName = `${id}_${timestamp}`;
        
        // Step 1. Create reference for file name in cloud storage 
        const imageRef = fireBaseStorage.child(fileName);
        // Step 2. Upload the file in the bucket storage
        const snapshot = await imageRef.put(file.buffer);
        // Step 3. Grab the public url
        const downloadURL = await snapshot.ref.getDownloadURL();
        
        res.send(downloadURL);
     }  catch (error) {
        console.log (error)
        res.status(400).send(error.message);
    }
});

module.exports = router;