const express = require('express');
const bodyParser = require('body-parser');
const Route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const { Router } = require('express');
const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://saurabhs:saurabh123@sauproject1.yftc7po.mongodb.net/saurabh23-DB", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use('/', Route)


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
