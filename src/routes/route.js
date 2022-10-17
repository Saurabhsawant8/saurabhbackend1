const express = require('express');
const abc = require('../introduction/intro')
const router = express.Router();

router.get('/movies', function (req, res) {                               
    console.log("movier are : ", req.params)
    let mov = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
    res.send(mov)
});

router.get('/movies/:indexNumber', function (req, res) {                  
    let mov = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
    const index = req.params.indexNumber
    res.send(mov[index]) 
});


router.get('/movies/:indexNumber', function (req, res) {                  
    let mov = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
    const index = req.params.indexNumber
   // res.send(mov[index])
    if(index >= mov.length){                                                  
    res.send("use valid index")
    }else{
        res.send(mov[index]) 
    }
});


router.get('/films', function (req, res) {                               
    console.log("films are : ", req.params)
    let mov = [ {
        "id": 1,
        "name": "The Shining"
       }, {
        "id": 2,
        "name":"Incendies"
       }, {
        "id": 3,
        "name": "Rang de Basanti"
       }, {
        "id": 4,
        "name": "Finding Nemo"
       }]
       
    res.send(mov)
});


router.get('/films/:filmid', function (req, res) {                               
    let objectid = [{
        "id": 1,
        "name": "The Shining"
       }, {
        "id": 2,
        "name":"Incendies"
       }, {
        "id": 3,
        "name": "Rang de Basanti"
       }, {
        "id": 4,
        "name": "Finding Nemo"
       }]
      let z=req.params.filmid
      if(z > objectid.length  ||  z==0){                                                  
      res.send("No movie exists with this id")
      }else{
     let z=req.params.filmid-1 
      res.send(objectid[z]) 
    }
});
 

 module.exports = router;