const express = require('express');
const router = express.Router();

let players =
   [
       {
           "name": "manish",
           "dob": "1/1/1995",
           "gender": "male",
           "city": "jalandhar",
           "sports": [
               "swimming"
           ]
       },
       {
           "name": "gopal",
           "dob": "1/09/1995",
           "gender": "male",
           "city": "delhi",
           "sports": [
               "soccer"
           ],
       },
       {
           "name": "lokesh",
           "dob": "1/1/1990",
           "gender": "male",
           "city": "mumbai",
           "sports": [
               "soccer"
           ],
       },
   ]
 
   router.post('/players', function (req, res) {
 
       //LOGIC WILL COME HERE
       let item = req.body.obj
       let ele = req.body.obj.name
       for(let i=0;i<players.length;i++){
        if(ele==players[i].name){
            res.send("this player is already exists")
        }
    }
       players.push(item)
       console.log(players)
       res.send(  { data: players , status: true }  ) 
   })






  
router.get('/sol1', function (req, res) {
let arr=[1,2,3,5,6,7]
let s=0
for(i=0;i<arr.length;i++){
    s=s+arr[i]

}
let n=arr.length + 1;
let sum=((n*(n+1))/2)
let z= sum-s;

console.log(z)
        res.send('My first ever api!')
    });
  







  
    router.get('/sol2', function (req, res) {
        let array=[33,34,35,37,38]
        let sm=0
        for(i=0;i<array.length;i++){
            sm=sm+array[i]
        
        }
        let n=array.length+1
        let sumt=((n*(array[0]+array[4]))/2)
        let w=sumt-sm
        console.log(w)
                res.send('My first ever api!')
            });


module.exports = router;