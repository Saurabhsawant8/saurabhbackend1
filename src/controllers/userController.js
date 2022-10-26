const UserModel= require("../models/userModel")



//to create a new entry..use this api to create 11+ entries in your collection
const createUser= async function (req, res) {
    let data= req.body
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})
}


// gives all the books- their bookName and authorName only 
const getUsersData= async function (req, res) {
    let allUsers= await UserModel.find().select( {  bookname: 1, autherName: 1, _id: 0})
    res.send({msg: allUsers})
}


// takes year as input in post request and gives list of all books published that year
const getYear= async function (req, res) {
    let Y=req.body.year
    let result= await UserModel.find({year:{$eq:Y}})
    res.send({msg: result})
}


// take any input and use it as a condition to fetch books that satisfy that condition
// e.g if body had { name: “hi”} then you would fetch the books with this name
const getName= async function (req, res) {
    let bname=req.body.bookname
    let resul= await UserModel.find({bookname:{$eq:bname}})
    res.send({msg: resul})
}


// take any input and use it as a condition to fetch books that satisfy that condition
// e.g if body had { year: 2020} then you would fetch the books in this year
const getY= async function (req, res) {
    let yr=req.body.year
    let re= await UserModel.find({year:{$eq:yr}})
    res.send({msg: re})
}


// request to return all books who have an Indian price tag of “100INR” or “200INR” or “500INR”
const pricee= async function (req, res) {
    let R= await UserModel.find({"price.indianPrice":{$in:["100INR","200INR","500INR"]}})
    res.send({msg: R})
}


//returns books that are available in stock or have more than 500 pages
const random= async function (req, res) {
    let ress= await UserModel.find({$or:[{stockAvailable:true},{totalPages:{$gt:500}}]})
    res.send({msg: ress})
}



module.exports.createBook= createUser
module.exports.bookList= getUsersData
module.exports.getBooksInYear=getYear
module.exports.getParticularBooksName=getName
module.exports.getParticularBooksYear=getY
module.exports.getXINRBooks=pricee
module.exports.getRandomBooks=random