const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.post("/createPublisher", bookController.createPublisher )

router.post("/createAuthor",bookController.createAuthor )

router.post("/createBook",bookController.createBook )

router.get("/getBooksWithAuthorDetails",bookController.getBooksWithAuthorDetails)

router.put("/putAuthorData",bookController.putAuthorData)

router.put("/priceIncrease",bookController.priceIncrease)


module.exports = router;