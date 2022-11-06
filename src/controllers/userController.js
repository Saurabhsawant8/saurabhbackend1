
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");



// q.1)  Write a **POST api /users** to register a user from the user details in request body. 

const createUser= async function (req,res) {
  let data1=req.body
  let userDATA=await userModel.create(data1)
  res.send({msg:userDATA})
}

// q.2)  Write a ***POST api /login** to login a user that takes user details - email and password from the request body.
// If the credentials don't match with any user's data return a suitable error.
// On successful login, generate a JWT token and return it in response body.

const loginUser=async function (req,res){

  let email=req.body.emailId
  let passWord=req.body.password
  let useris=await userModel.findOne({emailId:email,password:passWord})
  if(!useris) {
    return res.send("Invalid username or password")
  }else{
    let token=jwt.sign({_id:"636795e3a3026ed51cdf934c",firstName:useris.firstName,password:useris.password},"saurabh-secret-key")
    return res.send({status:true,Token:token})
  }
}


// q.3) Write a **GET api /users/:userId** to fetch user details. Pass the userId as path param in the url. 
//Check that request must contain **x-auth-token** header. If absent, return a suitable error.
//If present, check that the token is valid.
const verifyUser=async function(req,res){
    let Token=req.headers["x-auth-token"]
    let decodedtoken=jwt.verify(Token,"saurabh-secret-key")
    let userID=req.params.userId


    if(decodedtoken){
      if(decodedtoken._id==userID){
              let userdata=await userModel.findOne({_id:userID})
                if(userdata){
                    return res.send({userdata})
                     }
                  return res.send("user not found")      // no user in db
                       }   
             return res.send("not authorised")         //no login or diff. user 
    }
    return res.send("invalid Token")   //wrong token
  }
      



// q.4) Write a **PUT api /users/:userId** to update user details. Pass the userId as path param in the url and update the attributes 
//received in the request body. Check that request must contain **x-auth-token** header. If absent, return a suitable error.

const updateUser=async function(req,res){
  let userId=req.params.userId
  let user=await userModel.findById(userId)

   if(!user) return res.send("user not found")
    
  let data2=req.body
  let updatedata=await userModel.findByIdAndUpdate({_id:userId},{$set:data2},{new:true})
  res.send({updatedata})

}


// q.5) Write a **DELETE api /users/:userId** that takes the userId in the path params and marks the isDeleted attribute 
//for a user as true. Check that request must contain **x-auth-token** header. If absent, return a suitable error.

const deletUser=async function(req,res){
  let userId=req.params.userId
  let user=await userModel.findById(userId)

   if(!user) return res.send("user not found")
    
  let deletdata=await userModel.findByIdAndUpdate({_id:userId},{$set:{isDeleted:true}},{new:true})
  res.send({deletdata})

}


module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.verifyUser = verifyUser;
module.exports.updateUser = updateUser;
module.exports.deletUser =deletUser ;





