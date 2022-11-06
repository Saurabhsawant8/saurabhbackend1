const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


const middle1= function (req,res,next) {                    
    let Token=req.headers["x-auth-token"]
    if(!Token)  return res.send("mandatory header is missing")
    next()
};



router.post("/createUser",userController.createUser  )

router.post("/loginUser",userController.loginUser )

router.get("/verifyUser/:userId",middle1,userController.verifyUser )

router.put("/updateUser/:userId",middle1,userController.updateUser )

router.delete("/deletUser/:userId",middle1,userController.deletUser )

module.exports=router
