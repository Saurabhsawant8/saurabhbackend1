const express = require('express');
const router = express.Router();
const UserModel= require("../models/authorModel.js")
const AuthorController= require("../controllers/authorController")
const BookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.post("/createBook1", BookController.createBook)

router.post("/createAuthor", AuthorController.createAuthor)

router.get("/getBookList", BookController.bookList)

router.get("/bookLi", BookController.bookLi)

router.get("/authorNames", BookController.authorNames)








module.exports = router;






//Moment.js
// const moment = require('moment');
// router.get("/dateManipulations", function (req, res) {
    
//     // const today = moment();
//     // let x= today.add(10, "days")

//     // let validOrNot= moment("29-02-1991", "DD-MM-YYYY").isValid()
//     // console.log(validOrNot)
    
//     const dateA = moment('01-01-1900', 'DD-MM-YYYY');
//     const dateB = moment('01-01-2000', 'DD-MM-YYYY');

//     let x= dateB.diff(dateA, "days")
//     console.log(x)

//     res.send({ msg: "all good"})
// })

