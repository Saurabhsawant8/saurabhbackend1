const express = require('express');
const router = express.Router();
const BookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})




router.get("/createBook", BookController.createBook  )
router.get("/bookDetails", BookController.bookDetails )
router.get("/updateThis", BookController.updateThis)



module.exports = router;











