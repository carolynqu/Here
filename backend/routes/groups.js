const express = require("express");
const db = require("../db.js");
const fbApp = require("../firebase.js");
const fs = require("firebase-admin");

const router = express.Router();

// Create a group
/**
 * @param
 * group name
 * creator
 * picture
 * 
 * @logic
 * add group to user's groups list
 * 
 * @returns
 * {
 *  id
 *  name
 *  picture (empty)
 *  members [userId]
 * }
 * 
 */
router.post("/create-group", async (req, res) => {

    const user = req.body.id;
    const name = req.body.groupName;
    const picture = req.body.picture;

    // Create new group
    const collection = db.collection("groups");
    collection.add({
        name: name,
        picture: picture,
        members: Array.of(user)
    }).then((docRef) => {

        const currUser = db.collection("users").doc(user);

        currUser.get()
            .then((doc) => {
                const userData = doc.data();
                currUser.update({
                    groups: [...userData.groups, docRef.id]
                }).catch(e => {
                    res.send(e.code);
                });
            });

        docRef.get().then((doc) => {
            res.send(doc.data());
        }).catch(e => {
            res.send(e.code);
        });
    }).catch(e => {
        res.send(e.code);
    });
});

// Leave a group
/**
 * @param
 * group id
 * id
 * 
 * @logic
 * remove group from user's groups list
 * 
 * @returns
 * User object
 * 
 */

/**
router.post("/leave", async (req, res) => {

    const user = req.body.id;
    const group = req.body.groupId;

    // Create new group
    const collection = db.collection("groups");
    collection.doc(group).get()
        .then((docRef) => {

        })
});
 */


// Invite someone to group
/**
 * @param
 * group id
 * array of member email
 * 
 * @logic
 * search each member email, if they are there, then add their id to array
 * else add them to a send-to list (TBD)
 * 
 * @returns
 * {
 *  id
 *  name
 *  picture (empty)
 *  members [all members]
 * }
 * 
 */
router.post("/add", (req, res) => {

    const group = req.body.group;
    const id = req.body.id;
    const members = req.body.members;

    const groupRef = db.collection("groups").doc(group);

    members.forEach((member) => {
        console.log(member);

        db.collection("users").doc(member).update({
            groups: fs.firestore.FieldValue.arrayUnion(group)
        }).catch(e => {
            res.send(e.code);
        })
    });

    groupRef.update({
        members: [...members, id]
    }).then(() => {
        groupRef.get().then((doc) => {
            const data = doc.data();
            res.send(data);
        });
    });
})

// Get groups
/**
 * 
 * @param
 * id in header
 * 
 * @logic
 * pull user.groups
 * get each group
 * add to array
 * 
 * @returns
 * array of group objects
 * 
 */

module.exports = router;