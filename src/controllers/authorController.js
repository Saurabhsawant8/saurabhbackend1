const AuthorModel= require("../models/authorModel")

//Write create APIs for both books and authors ---> If author_id is not available
// then do not accept the entry(in neither the author collection nor the books collection)

const createAuthor= async function (req, res) {
    let data= req.body

    let savedData= await AuthorModel.create(data)
    res.send({msg: savedData})
}
module.exports.createAuthor= createAuthor












