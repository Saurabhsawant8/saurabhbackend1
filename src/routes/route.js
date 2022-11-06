const { Router } = require('express');
const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const commonMW=require("../middleware/middleware")




router.get("/checkAuthorisation/:userId", commonMW.midd1, userController.checkAuthorisation)
router.put("/updateUser/:userId", commonMW.midd1, userController.updateUser)
router.delete("/deletUser/:userId", commonMW.midd1, userController.deletUser)


module.exports = router;