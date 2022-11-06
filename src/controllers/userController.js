
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
    let token=jwt.sign({firstName:useris.firstName,password:useris.password},"saurabh-secret-key")
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
              let userdata=await userModel.findOne({_id:userID})
                if(userdata){
                    return res.send({userdata})
                     }
            return res.send("user not found")    // no user in db
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





/*
  Read all the comments multiple times to understand why we are doing what we are doing in login api and getUserData api
*/
// const createUse= async function (abcd, xyz) {
//   //You can name the req, res objects anything.
//   //but the first parameter is always the request 
//   //the second parameter is always the response
//   let data = abcd.body;
//   let savedData = await userModel.create(data);
//   console.log(abcd.newAtribute);
//   xyz.send({ msg: savedData });
// };


//   let userName = req.body.emailId;
//   let password = req.body.password;

//   let user = await userModel.findOne({ emailId: userName, password: password });
//   if (!user)
//     return res.send({
//       status: false,
//       msg: "username or the password is not corerct",
//     });

//   // Once the login is successful, create the jwt token with sign function
//   // Sign function has 2 inputs:
//   // Input 1 is the payload or the object containing data to be set in token
//   // The decision about what data to put in token depends on the business requirement
//   // Input 2 is the secret (This is basically a fixed value only set at the server. This value should be hard to guess)
//   // The same secret will be used to decode tokens 
// //   let token = jwt.sign(
// //     {
// //       userId: user._id.toString(),
// //       batch: "thorium",
// //       organisation: "FunctionUp",
// //     },
// //     "functionup-plutonium-very-very-secret-key"
// //   );
// //   res.setHeader("x-auth-token", token);
// //   res.send({ status: true, token: token });
// // };

// // const getUserData = async function (req, res) {
// //   let token = req.headers["x-Auth-token"];
// //   if (!token) token = req.headers["x-auth-token"];

//   //If no token is present in the request header return error. This means the user is not logged in.
//   if (!toke) return res.send({ status: false, msg: "token must be present" });

//   console.log(token);

//   // If a token is present then decode the token with verify function
//   // verify takes two inputs:
//   // Input 1 is the token to be decoded
//   // Input 2 is the same secret with which the token was generated
//   // Check the value of the decoded token yourself

//   // Decoding requires the secret again. 
//   // A token can only be decoded successfully if the same secret was used to create(sign) that token.
//   // And because this token is only known to the server, it can be assumed that if a token is decoded at server then this token must have been issued by the same server in past.
//   let decodedToken = jwt.verify(token, "functionup-plutonium-very-very-secret-key");
//   if (!decodedToken)
//     return res.send({ status: false, msg: "token is invalid" });

//   let userId = req.params.userId;
//   let userDetails = await userModel.findById(userId);
//   if (!userDetails)
//     return res.send({ status: false, msg: "No such user exists" });

//   res.send({ status: true, data: userDetails });
//   // Note: Try to see what happens if we change the secret while decoding the token
// };

// const updateUser = async function (req, res) {
//   // Do the same steps here:
//   // Check if the token is present
//   // Check if the token present is a valid token
//   // Return a different error message in both these cases

//   let userId = req.params.userId;
//   let user = await userModel.findById(userId);
//   //Return an error if no user with the given id exists in the db
//   if (!user) {
//     return res.send("No such user exists");
//   }

//   let userData = req.body;
//   let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
//   res.send({ status: updatedUser, data: updatedUser });
// };

