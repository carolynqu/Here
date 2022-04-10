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
router.post("/create-session",async(req,res)=>{
    const user=req.body.id;
    const sessionName=req.body.sessionName;
    const groupInvites=req.body.groupInvites;
    const friendInvites=req.body.friendInvites;
    const start=req.body.start;
    const end=req.body.end;
    const isStudy=req.body.isStudy;
    const isPrivate=req.body.isPrivate;
    const location=req.body.location;

    const sessionTable=db.collection("sessions");

    const sessionRef = await sessionTable.add({
        name: sessionName,
        organizer: user,
        groupInvites: groupInvites,
        friendInvites: friendInvites,
        start: start,
        end: end,
        isStudy: isStudy,
        isPrivate: isPrivate,
        location: location,
    })

    const combinedSet=new Set();
    for(let i=0;i<groupInvites.length;i++){
        const groupRef= await db.collection("groups").doc(groupInvites[i]).get();
        const data= groupRef.data();
        for(let j=0;j<data.members.length;j++){
            combinedSet.add(data.members[j]);
        }
    }
    friendInvites.forEach((friend)=>{
        combinedSet.add(friend);
    })

    for(let item of combinedSet){
        const userRef=await db.collection("users").doc(item).get();
        const data= userRef.data();
        data.availableSessions.push(sessionRef.id);
    }

    const data = (await sessionRef.get()).data();
    data.id=sessionRef.id;
    data.name=sessionName;
    data.organizer=user;
    data.groupInvites=groupInvites;
    data.friendInvites=friendInvites;
    data.start=start;
    data.end=end;
    data.isStudy=isStudy;
    data.isPrivate=isPrivate;
    data.location=location;
    res.send(data);
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
 router.get("get-sessions",async(req,res)=>{
    const user=req.body.id;
    const userRef=await db.collection("users").doc(user).get();
    const data=userRef.data();
    let sessionsArray=[];
    data.id=userRef.id;
    for(let i=0;i<data.availableSessions.length;i++){
        let currSession = await db.collection("sessions").doc(data.availableSessions[i]).get();
        let stuff=currSession.data();
        sessionsArray[i]={
            id:stuff.id,
            name:stuff.name,
            organizer:stuff.organizer,
            groupInvites:stuff.groupInvites,
            friendInvites:stuff.friendInvites,
            start:stuff.start,
            end:stuff.end,
            isStudy:stuff.isStudy,
            isPrivate:stuff.isPrivate,
            location:stuff.location,
        };
    }
    data.availableSessions=sessionsArray;
    res.send(data);
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