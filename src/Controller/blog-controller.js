const blogModel = require('../models/blogModel')
const authorModel = require('../models/authorModel')
const moment = require('moment')

const createBlog = async function (req, res) {
    try {
        const { authorId } = req.body
        const userExist = await authorModel.findById(authorId)
        if (!userExist) {
            res.status(400).send({ status: false, msg: "Author does not exist" })
        } else {
            const result = await blogModel.create(req.body)
            res.status(201).send({ status: true, data: result })
        }

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}
module.exports.createBlog = createBlog


const getBlogs = async function (req, res) {
    try {
        const { category, subcategory, tags, authorId } = req.query
        if (!category && !subcategory && !tags && !authorId) {
            const getAllBlogs = await blogModel.find({ isPublished: true, isDeleted: false })
            return res.status(200).send({ status: true, message: getAllBlogs })
        }
        const blog = await blogModel.find({ $or: [{ category: category }, { subcategory: subcategory }, { tags: tags }, { _id: authorId }] })
        const result = blog.filter(a => {
            if (a.isPublished == true && a.isDeleted == false) return a
        })
        if (result.length == 0) {
            return res.status(400).send({ status: false, msg: 'Blog not found' })
        }
        else res.send({ status: true, msg: result })
    } catch (err) {
        res.status(500).send({ status: false, error: err.message });
    }
}

module.exports.getBlogs = getBlogs


const updateBlogs = async function (req, res) {
    try {
        let blogId = req.params.blogId
        let data = req.body
        const blog = await blogModel.findById(blogId)
        if (!blog) return res.status(400).send({ status: false, msg: "Incorrect BlogId" })
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "No data given for updation" })
        if (blog.isDeleted === true) return res.status(404).send({ status: false, msg: "Blog does not exist" })

        let authorId = blog.authorId.toString()
        if (req.decodedToken.authorid !== authorId) {
            res.status(401).send({ status: false, msg: "Not Authorized" })
        }
        else {
            const updateBlog = await blogModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, {
                $set: {
                    title: data.title, body: data.body, category: data.category, isPublished: true,
                },
                $push: { subcategory: req.body.subcategory, tags: req.body.tags },
            },
                { new: true })
            res.status(200).send({ status: true, message: "Updated Successfully", data: updateBlog });
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.updateBlogs = updateBlogs



const deleteBlog = async function (req, res) {
    try {
        let blogId = req.params.blogId
        let blog = await blogModel.findById(blogId)
        if (!blog) return res.status(404).send({ status: false, msg: "Incorrect BlogId" })
        if (blog.isDeleted == true) return res.status(404).send({ status: false, msg: "Blog does not exist" })

        let authorId = blog.authorId.toString()
        if (req.decodedToken.authorid !== authorId) {
            res.status(401).send({ status: false, msg: "Not Authorized" })
        }
        else {
            let deletedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, { $set: { isDeleted: true, deletedAt: moment().format() } }, { new: true })
            res.status(200).send({ status: true, msg: deletedBlog })

        }
    }
    catch (err) {
        return res.status(500).send({ status: false, Error: err.message })
    }
}

module.exports.deleteBlog = deleteBlog


const deleteblogsByQuery = async function (req, res) {
    try {
        const {category , subcategory , tag , authorId}  = req.query
        if(!category && !subcategory && !tag && !authorId ){
          return  res.status(400).send({status : true , message : 'query does not exist'})
        }
        const getAllBlogs = await blogModel.find({$or:[{category : category} , {subcategory : subcategory} ,{tags:tag }, {authorId : authorId}] ,isDeleted : true })
        console.log(getAllBlogs.length)
    if ( getAllBlogs.length == 0){
        return res.status(404).send({status : false , message : 'wrong filter query or already deleted'})
    }
        const AuthorisedBlogs = getAllBlogs.filter(a=>{
            const authorIDs = a.authorId.toString()
            if( authorIDs == req.decodedToken.authorid) return a
        }) 

    if(AuthorisedBlogs.length !== 0){
        await blogModel.updateMany({ $or:[{category : category} , {subcategory : subcategory} ,{tags:tag} ], authorId : req.decodedToken.authorid , isDeleted : false} , {$set :{isDeleted : false , deletedAt : moment().format() }} ,{new : true}  )         
        return  res.status(200).send({status :true , msg : 'Deleted successfully ' })  
    }
    return res.status(403).send({status : false , msg : 'Unanthorised Author'})  
    }
    catch (err) {
        return res.send({ status: false, Error: err.message })
    }
}

module.exports.deleteblogsByQuery = deleteblogsByQuery

// ***********************************************************************************************************

