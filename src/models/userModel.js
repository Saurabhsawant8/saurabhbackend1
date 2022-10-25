const mongoose = require('mongoose');


    const BookSchema = new mongoose.Schema( {
        bookname: String,
        authername: String,
        category: String,
        year: Number,
    
    
    // isIndian: Boolean,
    // parentsInfo: {
    //     motherName: String,
    //     fatherName: String,
    //     siblingName: String
    // },
    // cars: [ String  ]
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema) //books



// String, Number
// Boolean, Object/json, array