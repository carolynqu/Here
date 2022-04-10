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


// Invite someone to group
/**
 * @param
 * group id
 * id
 * array of member ids
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
router.post("/add", async (req, res) => {

    const group = req.body.group;
    const id = req.body.id;
    const members = req.body.members;

    const userDb = db.collection("users");

    const groupRef = db.collection("groups").doc(group);

    members.forEach((member) => {
        console.log(member);

        userDb.doc(member).update({
            groups: fs.firestore.FieldValue.arrayUnion(group)
        });
    });

    let membersArray = [];

    groupRef.update({
        members: [...members, id]
    })

    const groupDoc = await groupRef.get();
    const data = groupDoc.data();

    data.id = groupDoc.id;
    for (let i = 0; i < members.length; i++) {
        let currMember = await userDb.doc(members[i]).get();
        let stuff = currMember.data();

        membersArray[i] = {
            id: members[i],
            firstName: stuff.firstName,
            lastName: stuff.lastName
        };
    }

    data.members = membersArray;

    res.send(data);
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

router.post("/", async (req, res) => {
    const id = req.body.id;

    const docRef = await db.collection("users").doc(id).get();
    const data = docRef.data();
    const groups = data.groups;

    let arr = [];

    for (let i = 0; i < groups.length; i++) {
        let currGroup = await db.collection("groups").doc(groups[i]).get();
        let stuff = currGroup.data();

        // Now modify the members
        let membersArray = [];
        let members = stuff.members;

        stuff.id = groups[i];

        for (let i = 0; i < members.length; i++) {
            let currMember = await db.collection("users").doc(members[i]).get();
            let memberStuff = currMember.data();

            membersArray[i] = {
                id: members[i],
                firstName: memberStuff.firstName,
                lastName: memberStuff.lastName
            };
        }

        stuff.members = membersArray;


        arr[i] = stuff;
    }

    res.send(arr);
})

module.exports = router;
