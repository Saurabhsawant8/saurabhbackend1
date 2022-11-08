const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");



// You now have to move this similar code in all the three apis in a suitable middleware
const midd1=async function(req,res,next){
    try{
    const Token=req.headers["x-auth-token"]
    if(!Token) return res.status(400).send({status:false,msg:"mandatory header is missing"})

    const decodedToken=jwt.verify(Token,"saurabh-secret-key")
    if(!decodedToken) return res.status(401).send({status:false,msg:"invalid Token"})

    const USERid=req.params.userId
    if(decodedToken._id != USERid) return res.status(403).send({status:false,msg:"not authorised"})
    
    let user=await userModel.findById(USERid)
    if(!user) return res.status(404).send({status:false,msg:"user not found"})
   
   next()

  } catch(error){
  res.status(500).send({status:false,msg:error.message})
}
}


  module.exports.midd1=midd1