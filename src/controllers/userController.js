const userModel = require("../models/userModel");


//Please note that you have to also write the logic for authorisation now so that a logged in user can modify 
//or fetch ONLY their own data.

// q.1) fetch user details
const checkAuthorisation=async function(req,res){
  try{
     const USERid=req.params.userId
     let useris=await userModel.findById({_id:USERid})
     res.status(200).send({status:true,data:useris})
    } catch(error){
      res.status(500).send({status:false,msg:error.message})
    }
}


// q.2) update user
const updateUser=async function(req,res){
  try{
  const USERid=req.params.userId
  let data2=req.body
  let updatedata=await userModel.findByIdAndUpdate({_id:USERid},{$set:data2},{new:true})
  res.status(201).send({status:true,data:updatedata})
} catch(error){
  res.status(500).send({status:false,msg:error.message})
}
}



// q.3) delete user apis
const deletUser=async function(req,res){
  try{
  const USERid=req.params.userId
  let deletdata=await userModel.findByIdAndUpdate({_id:USERid},{$set:{isDeleted:true}},{new:true})
  res.status(201).send({status:true,data:deletdata})
} catch(error){
  res.status(500).send({status:false,msg:error.message})
}

}




module.exports.checkAuthorisation = checkAuthorisation;
module.exports.updateUser = updateUser;
module.exports.deletUser = deletUser;




