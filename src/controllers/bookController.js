const publisherModel= require("../models/publisher")
const authorModel= require("../models/authorModel")
const bookModel= require("../models/bookModel")
const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId



//1. Write a POST api that creates a publisher from the details in the request body
const createPublisher= async function (req, res) {
    let data1 = req.body
    let publisherCreated = await publisherModel.create(data1)
    res.send({data: publisherCreated})
}  

//2. Write a POST api that creates an author from the details in request body
const createAuthor= async function (req, res) {
    let data2 = req.body
    let authorCreated = await authorModel.create(data2)
    res.send({data: authorCreated})
}


// 3. Write a POST api that creates a book from the details in the request body. The api takes both the author and publisher from the request body. 
// In this api, you have to write a logic that validates the following :
//a)  The authorId is present in the request body. If absent send an error message that this detail is required
//b)  If present, make sure the authorId is a valid ObjectId in the author collection. If not then send an error message that the author is not present.
//c)  The publisherId is present in the request body. If absent send an error message that this detail is required
//d)  If present, make sure the publisherId is a valid ObjectId in the publisher collection. If not then send an error message that the publisher is not present.

const createBook= async function (req, res) {
    let book = req.body
    let { author_id , publisher_id }=book

    if (!author_id) return res.send("Please enter Author_id")
    if (!publisher_id) return res.send("Please enter Publisher_Id")

    let checkAuthor= await authorModel.findById(book.author_id)
    if(!checkAuthor) return res.send ("the author is not present")

    let checkPublisher = await publisherModel.findById(book.publisher_id)
    if(!checkPublisher) return res.send ("the publisher is not present")

    let saveData= await bookModel.create(book)
    res.send({msg:saveData})
}




//4. Write a GET api that fetches all the books along with their author details (you have to populate for this)
// as well the publisher details (you have to populate for this) 

const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate(['author_id','publisher_id'])
    res.send({data: specificBook})

}



//5.Create a new PUT api /books and perform the nfollowing two operations
//  a) Add a new boolean attribute in the book schema called isHardCover with a default false value. 
//For the books published by 'Penguin' and 'HarperCollins', update this key to true.

const putAuthorData=async function(req,res){

    const publisherId=await publisherModel.find({Name:{$in:["Penguin","HarperCollins"]}}).select("_id:1")
    const changeCover=await bookModel.updateMany({publisher_id:{$in: publisherId}},{$set : {isHardCover : true}})
    res.send(changeCover)
}



//b) For the books written by authors having a rating greater than 3.5,
// update the books price by 10 (For eg if old price for such a book is 50, new will be 60) 


const priceIncrease=async function(req,res){

    const authors=await authorModel.find({rating:{$gt:3.5}}).select("_id:1")
    const updatebooks=await bookModel.updateMany({author_id:{$in:authors}},{$inc:10})
    res.send(updatebooks)

}

module.exports.createPublisher=createPublisher
module.exports.createAuthor=createAuthor
module.exports.createBook=createBook
module.exports.getBooksWithAuthorDetails=getBooksWithAuthorDetails
module.exports.putAuthorData=putAuthorData
module.exports.priceIncrease=priceIncrease

