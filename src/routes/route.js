const express = require('express');
const router = express.Router();
let orderModel=require('../models/orderModel')
const authorController= require("../controllers/authorController");
const userModel = require('../models/userModel');
const productModel = require('../models/productModel');
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})




const midd1=function(req,res,next){
let isFreeAppUser=req.headers.isfreeappuser
if(!isFreeAppUser){
    return res.send("the request is missing a mandatory header")
}else{

     next()
}
}



const midd2=async function(req,res,next){
    let isFreeAppUser=req.headers.isfreeappuser
if(!isFreeAppUser) return res.send("the request is missing a mandatory header")

    let orderData=req.body
    let {userId,productId} = orderData

    if(!userId) return res.send("user does not exist")
    if(!productId) return res.send("product does not exist")

    let checkuser= await userModel.findById(orderData.userId)
    if(!checkuser) return res.send("no user found with this id")

    let checkproduct= await productModel.findById(orderData.productId)
    if(!checkproduct) return res.send("no product found with this id")

    let ISFREEAPPUSER=JSON.parse(isFreeAppUser);
    orderData.isFreeAppUser=ISFREEAPPUSER
    let a= await productModel.findOne().select({price:1,_id:0})
    let b=await userModel.findOne().select({balance:1})
    let c=b.balance-a.price
    
    await orderModel.updateMany({isFreeAppUser:false},{$set:{amount:c}})

    await orderModel.updateMany({isFreeAppUser:true},{$set:{amount:0}})
     

next()
}




//q.4) Update the logic in middleware to set the **isFreeAppUser** attribute in req. 
//Use this attribute in the route handler for setting the isFreeAppUser attributes of User and Order collection.

const midd3=async function(req,res,next){
    let isFreeAppUser=req.headers.isfreeappuser
    let ISFREEAPPUSER=JSON.parse(isFreeAppUser);
    await orderModel.updateMany({$set:{isFreeAppUser:ISFREEAPPUSER}})
    let getUserid= await orderModel.findOne().select({userId:1,_id:0})

    let USERid=getUserid.userId
    let Result= await userModel.updateMany({_id:USERid},{$set:{isFreeAppUser:ISFREEAPPUSER}})
    res.send(Result)

}





router.post('/createProduct',authorController.createProduct)
router.post('/createUser',midd1,authorController.createUser)
router.post('/createOrder',midd2,authorController.createOrder)
router.put('/updateValue',midd3)



module.exports = router;