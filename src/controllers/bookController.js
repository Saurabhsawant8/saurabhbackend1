const AuthorModel= require("../models/authorModel")
const BookModel= require("../models/bookModel")


//Write create APIs for both books and authors ---> If author_id is not available
// then do not accept the entry(in neither the author collection nor the books collection)
const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}


//List out the books written by "Chetan Bhagat" ( this will need 2 DB queries one after another-
// first query will find the author_id for "Chetan Bhagat”. Then next query will get the list of books with that author_id )
const bookList= async function (req, res) {
let author= await AuthorModel.findOne({author_name:"Chetan Bhagat"})
let authorId= author.author_id
let bookl= await BookModel.find({author_id:authorId})
    res.send({msg: bookl})
}


//find the author of “Two states” and update the book price to 100;  Send back the author_name and updated price in response.
//( This will also need 2  queries- 1st will be a findOneAndUpdate. The second will be a find query aith author_id from previous query)
const bookLi= async function (req, res) {
    let authoris= await BookModel.findOneAndUpdate({name:"Two states"},{$set:{price:100}},{new:true})
    let authorId= authoris.author_id
    let tInfo=await AuthorModel.findOne({author_id:authorId})
        res.send({name_is:tInfo.author_name,price_is:authoris.price})
    }


//Find the books which costs between 50-100(50,100 inclusive) and respond back with the author names of respective books.. 
const authorNames= async function (req, res) {
        let allbooks= await BookModel.find( { price : { $gte: 50, $lte: 100} } ).select({ author_id :1,_id:0})
        let authorsId=allbooks.map(x=>x.author_id)
        let authorsName=await AuthorModel.find({author_id:{$in:authorsId}}).select({author_name:1, _id:0})
    res.send({msg:authorsName}) 
        }   






module.exports.bookList= bookList
module.exports.createBook= createBook
module.exports.bookLi= bookLi
module.exports.authorNames= authorNames







// const getBooksData= async function (req, res) {
//     let allBooks= await BookModel.find( {authorName : "HO" } )
//     console.log(allBooks)
//     if (allBooks.length > 0 )  res.send({msg: allBooks, condition: true})
//     else res.send({msg: "No books found" , condition: false})
// }


// const updateBooks= async function (req, res) {
//     let data = req.body // {sales: "1200"}
//     // let allBooks= await BookModel.updateMany( 
//     //     { author: "SK"} , //condition
//     //     { $set: data } //update in data
//     //  )
//     let allBooks= await BookModel.findOneAndUpdate( 
//         { authorName: "ABC"} , //condition
//         { $set: data }, //update in data
//         { new: true , upsert: true} ,// new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
//      )
     
//      res.send( { msg: allBooks})
// }

// const deleteBooks= async function (req, res) {
//     // let data = req.body 
//     let allBooks= await BookModel.updateMany( 
//         { authorName: "FI"} , //condition
//         { $set: {isDeleted: true} }, //update in data
//         { new: true } ,
//      )
     
//      res.send( { msg: allBooks})
// }




// CRUD OPERATIONS:
// CREATE
// READ
// UPDATE
// DELETE


