const { doc } = require("@firebase/firestore");
const { group } = require("console");
const express = require("express");
const db = require("../db.js");
const fbApp = require("../firebase.js");
const fs = require("firebase-admin");

const router = express.Router();

/**
 * @param
 * who's creating a session
 * array of people to be invited (friends)
 * array of groups to be invited
 * name of the session
 * start time
 * end time
 * isstudy
 * isprivate
 * location
 *
 * @logic
 * create new session
 *
 * @returns
 * new session
 *
 */
router.post("/create-session",(req,res)=>{
    const user=req.body.id;
    const sessionName=req.body.sessionName;
    const groupInvites=req.body.groupInvites;
    const friendInvites=req.body.friendInvites;
    const start=req.body.start;
    const end=req.body.end;
    const isStudy=req.body.isStudy;
    const isPrivate=req.body.isPrivate;
    const location=req.body.location;


    const collection=db.collection("sessions");
    collection.add({
        name: sessionName,
        organizer: user,
        groupInvites: groupInvites, //this doesn't seem right...
        friendInvites: friendInvites,
        start: start,
        end: end,
        isStudy: isStudy,
        isPrivate: isPrivate,
        location: location,
    }).then((docRef) => {

        const userDb=db.collection("users");
        userDb.doc(availableSessions).update({
            availableSessions: fs.firestore.FieldValue.arrayUnion(availableSessions)
        })
        docRef.get().then((doc) => {
            res.send(doc.data());
        }).catch(e => {
            res.send(e.code);
        });
    }).catch(e => {
        res.send(e.code);
    });
});
/**
 * @param
 * session ID
 *
 * @logic
 * end study session
 *
 * @returns
 * return user object
 */
 router.delete("end-session",(req,res)=>{
    const sessionid = req.body.sessionid;

    const currSession=db.collection("sessions").doc(sessionid);

    const currOrganizer=currSession.organizer;
    currOrganizer.get().then((doc)=>{
        currOrganizer.availableSessions.splice(sessionid,1);
    })

    for(let i=0;i<currSession.friendInvites.length;i++){
        const currUser=db.collection("users").doc(currSession.friendInvites[i]);
        currUser.get().then((doc)=>{
            currUser.availableSessions.splice(sessionid,1);
        })
        const currGroup=db.collection("groups").doc(currSession.groupInvites[i]);
        currGroup.get().then((doc)=>{
            for(let j=0;j<currGroup.length;j++){
                currUser=db.collection("users").doc(currGroup.members[j]);
                currUser.availableSessions.splice(sessionid,1);
            }
        })

    }

    return
})

/**
 * @param
 * user id
 *
 * @logic
 * get available sessions
 *
 * @returns
 * array of available sessions
 */
 router.get("get-session",(req,res)=>{

})

/**
 * @param
 * group id/list of invites
 *
 * @logic
 * invite people to study session
 *
 * @returns
 * study session
 */
 router.post("invite-session",(req,res)=>{

})


module.exports = router;