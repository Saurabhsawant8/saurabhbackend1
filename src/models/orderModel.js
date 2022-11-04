const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema( {

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usermiddle2'
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Productmiddle2'
    },
    amount:Number,
    isFreeAppUser:Boolean,
    date:Date

    }, { timestamps: true });

module.exports = mongoose.model('Ordermiddle2', orderSchema) 


