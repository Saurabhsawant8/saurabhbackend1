const express = require('express');
const lodash = require('lodash')
const router = express.Router();        //test-you
//importing a custom module
const xyz = require('../logger/logger')
const pqr=require('../util/helper')
const abc =require('../validator/formatter')

router.get('/test-me', function (req, res) {
    console.log("Calling my function ",xyz.myfunction())
    console.log("current info ",pqr.time())
    console.log("Trim toUppercase toLowercase",abc.trm())

    let arr= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"]
    console.log(lodash.chunk(arr,4))

    let arr1 = [1,3,5,7,9,11,13,15,17,19]
    console.log(lodash.tail(arr1))

    let e = [1,2,4,7,8]
    let f = [1,22,9,7,11]
    let g = [13,3,14,5,8]
    let h = [11,21,4,72,23]
    let i = [2,8,90,23,8]
    console.log(lodash.union(e,f,g,h,i))

    console.log(lodash.fromPairs( [["horror","The Shining"],["drama","Titanic"],["thriller","Shutter Island"],["fantasy","Pans Labyrinth"]]))

    res.send('My first ever api!')
    });
    

module.exports = router;

