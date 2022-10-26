const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookname:{
       type:String,
        required:true
    },
    
    price:{indianPrice:String,europianPrice:String},
    year:{type:Number,default:2021},
    tags:[String],
    autherName:String,
    totalPages:Number,
    stockAvailable:Boolean


}, { timestamps: true });


module.exports = mongoose.model('Boook', bookSchema) //books

   