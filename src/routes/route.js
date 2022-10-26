const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createBook", UserController.createBook)

router.get("/bookList", UserController.bookList)

router.post("/getBooksInYear", UserController.getBooksInYear)

router.post("/getParticularBooksName", UserController.getParticularBooksName)

router.post("/getParticularBooksYear", UserController.getParticularBooksYear)

router.get("/getXINRBooks", UserController.getXINRBooks)

router.get("/getRandomBooks", UserController.getRandomBooks)



module.exports = router;