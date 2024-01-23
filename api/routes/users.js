import express from "express";
import {  deleteuser,updateuser,getuser,getusers } from "../controllers/usersControllers.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
// import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router()
     
router.get("/checkauthentication", verifyToken, (req, res, next) => {
    res.send("hello user you are logged in")
})
// update
router.put("/:id", verifyUser, updateuser)
// // delete
router.delete("/:id", verifyUser, deleteuser)
 // get
router.get("/:id", verifyUser, getuser)

// getall

router.get("/", verifyAdmin, getusers)
 
            
               
export default router; 