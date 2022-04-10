const express = require("express");
const db = require("../db.js");
const fbApp = require("../firebase.js");

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
router.post("/create-group", (req,res)=>{
    
});

// Leave a group
/**
 * @param
 * group id
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