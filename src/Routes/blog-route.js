const express = require("express")
const middleWare = require('../MiddleWare/Project-MiddleWare')
const authorController = require("../Controller/Author-controller")
const blogController = require("../Controller/blog-controller")
const router = express.Router()



router.get('/test-me' , (req,res)=>{
    res.send('this is our first Project on blog-site')
})

// FIRST DAY OF PROJECT ---->     1_st  Phase

router.post('/authors' , middleWare.middleWare1 , authorController.createAuthor)
router.post('/blogs' , middleWare.middleware2 , middleWare.authentication , blogController.createBlog)
router.get('/blogs' ,middleWare.authentication ,  blogController.getBlogs)

// SECOND DAY OF PROJECT ---->

router.put('/blogs/:blogId',blogController.updateBlogs)
router.delete('/blogs/:blogId',blogController.deleteBlog)
router.delete("/blogs",blogController.deleteblogs) 

//  THIRD DAY OF THE PROJECT    2ND  Phase OF THE PROJECT 

router.post('/login' , authorController.loginAuthor)

module.exports = router
