const userModel = require("../models/userModel");


//Please note that you have to also write the logic for authorisation now so that a logged in user can modify 
//or fetch ONLY their own data.

// q.1) fetch user details
const checkAuthorisation=async function(req,res){
  
     const USERid=req.params.userId
     let useris=await userModel.findById({_id:USERid})
     res.send({useris})
 
}


// q.2) update user
const updateUser=async function(req,res){
  const USERid=req.params.userId
  let data2=req.body
  let updatedata=await userModel.findByIdAndUpdate({_id:USERid},{$set:data2},{new:true})
  res.send({updatedata})
}



// q.3) delete user apis
const deletUser=async function(req,res){
  const USERid=req.params.userId
  let deletdata=await userModel.findByIdAndUpdate({_id:USERid},{$set:{isDeleted:true}},{new:true})
  res.send({deletdata})

}




module.exports.checkAuthorisation = checkAuthorisation;
module.exports.updateUser = updateUser;
module.exports.deletUser = deletUser;




