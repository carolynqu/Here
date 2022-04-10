const express = require("express");
const db = require("../db.js");
const fbApp = require("../firebase.js");
const fs = require("firebase-admin");

const router = express.Router();

router.get('/', (req, res) => {

})

/**
 * ADD FRIENDS
 * 
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
    docRef.forEach(doc => {
        friendId = doc.id;
        friend = doc.data();
    })

    db.collection("users").doc(id).update({
        following: fs.firestore.FieldValue.arrayUnion(friendId)
    })

    res.send({
        id: friendId,
        firstName: friend.firstName,
        lastName: friend.lastName,
    });
    
});

/**
 * GET ALL FRIENDS NICELY FORMATTED
 * 
 * @params
 * id
 * 
 * @returns
 * [friend objects with id, firstName, and lastName]
 */
router.post("/", async (req, res) => {

    const id = req.body.id;

    const docRef = await db.collection("users").doc(id).get();
    const user = docRef.data();
    const friends = user.following;
    const friendList = [];

    for (let i = 0; i < friends.length; i++) {
        console.log(friends);
        const friendRef = await db.collection("users").doc(friends[i]).get();
        const friendData = friendRef.data();
        console.log(friendData);
        
        friendList[i] = {
            id: friendRef.id,
            firstName: friendData.firstName,
            lastName: friendData.lastName,
        }
    }

    res.send(friendList);
})

module.exports = router;