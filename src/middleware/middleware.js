const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");



const midd1=async function(req,res,next){
    const Token=req.headers["x-auth-token"]
    if(!Token) return res.send("mandatory header is missing")

    const decodedToken=jwt.verify(Token,"saurabh-secret-key")
    if(!decodedToken) return res.send("invalid Token")

    const USERid=req.params.userId
    let user=await userModel.findById(userId)
     if(!user) return res.send("user not found")
    console.log(decodedToken)
   
   if(decodedToken._id!=USERid) return res.send("not authorised")
   next()
  }


  module.exports.midd1=midd1