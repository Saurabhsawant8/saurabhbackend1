const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");



// You now have to move this similar code in all the three apis in a suitable middleware
const midd1=async function(req,res,next){
    const Token=req.headers["x-auth-token"]
    if(!Token) return res.send("mandatory header is missing")

    const decodedToken=jwt.verify(Token,"saurabh-secret-key")
    if(!decodedToken) return res.send("invalid Token")

    const USERid=req.params.userId
    if(decodedToken._id != USERid) return res.send("not authorised")
    
    let user=await userModel.findById(USERid)
    if(!user) return res.send("user not found")
   
   next()
  }


  module.exports.midd1=midd1