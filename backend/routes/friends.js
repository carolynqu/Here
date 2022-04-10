const express = require("express");
const db = require("../db.js");
const fbApp = require("../firebase.js");
const fs = require("firebase-admin");

const router = express.Router();

router.get('/', (req, res) => {

})

/**
 * @params
 * friend email
 * my id
 * 
 * @return
 * friend {
 *  id
 *  firstName
 *  lastName
 * }
 * 
 */
router.post('/add', async (req, res) => {

    const email = req.body.email;
    const id = req.body.id;

    const docRef = await db.collection("users").where("email", "==", email).get();
    let friend;
    let friendId;
    console.log(docRef);
    docRef.forEach(doc => {
        friendId = doc.id;
        friend = doc.data();
    })

    db.collection("users").doc(id).update({
        following: fs.firestore.FieldValue.arrayUnion(id)
    })

    res.send({
        id: friendId,
        firstName: friend.firstName,
        lastName: friend.lastName,
    });
    
})

module.exports = router;