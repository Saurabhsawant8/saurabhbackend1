const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const jwt = require("jsonwebtoken");
const commonMW=require("../middleware/middleware")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

const midd1=async function(req,res,next){
    const Token=req.headers["x-auth-token"]
    if(!Token) return res.send("mandatory header is missing")

    const decodedToken=jwt.verify(Token,"saurabh-secret-key")
    if(!decodedToken) return res.send("invalid Token")

    let userId=req.params.userId
    let user=await userModel.findById(userId)
     if(!user) return res.send("user not found")

  let jak=decodedToken
  console.log(jak)
   const USERid=req.params.userId
   if(decodedToken._id!=USERid) return res.send("not authorised")
   next()
}






router.get("/checkAuthorisation/:userId", commonMW.midd1, userController.checkAuthorisation)
router.put("/updateUser/:userId", commonMW.midd1, userController.updateUser)
router.delete("/deletUser/:userId", commonMW.midd1, userController.deletUser)

module.exports = router;