const express = require("express");
const db = require("../db.js");
const fbApp = require("../firebase.js");

const router = express.Router();

router.get("/", (req,res)=>{
    res.send("Groups");
})

module.exports = router;