



//<-------------Assignment ------------>


const createBook=function(req,res){
    res.send("My first Api")
}
const bookDetails=function(req,res){
    res.send("My Second  Api")
}
const updateThis=function(req,res){
    res.send("My Third Api")
}


module.exports.createBook= createBook
module.exports.bookDetails = bookDetails
module.exports.updateThis=updateThis






