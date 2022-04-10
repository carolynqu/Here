const express = require("express");
const db = require("../db.js");
const router = express.Router();

router.get("/", (req,res)=>{
    db.collection("groups").get().then((user) => {
        user.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    });
    res.send("Users")
})

router.get("/namelist",(req,res)=>{
    res.send("Users Name List")
})

router.get("/new",(req,res)=>{
    res.render("users/new")
})

router.post("/",(req,res)=>{
    const isValid=false
    if(isValid){
        users.push({firstName: req.body.firstName})
        res.redirect(`/users/${users.length-1}`)
    }else{
        console.log("Errors")
        res.render("users/new",{firstName: req.body.firstName})
    }
})

router
    .route("/:id")
    .get((req,res)=>{
        //console.log(req.user)
        res.send(`Get users with ID ${req.params.id}`)
    })
    .put((req,res)=>{
        res.send(`Update User with ID ${req.params.id}`)
    })
    .delete((req,res)=>{
        res.send(`Delete User with ID ${req.params.id}`)
    })

const users=[{name:"Kyle"}, {name:"Sally"}]
router.param("id",(req,res,next,id)=>{
    req.user=users[id]
    next()
})



module.exports=router