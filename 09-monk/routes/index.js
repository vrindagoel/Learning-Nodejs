var express = require('express');
var router = express.Router();
var db = require('monk')('localhost:27017/test');
var monk= require('monk');
var userData = db.get('user-data');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// router.get('/get-data' , function(req,res,next) {
//   var resultarr=[];
//   var data= userData.find({}).;//to search for specific data entries
//   data.on('success' , function(docs) {
//     //docs=actual documents that were retrieved
//     res.render('index',{items: docs});
//   }); 
// });

router.get('/get-data' , function(req,res,next) {
  var resultarr=[];
  var data= userData.find({}).then(function(docs) {
    res.render('index' , {items:docs});
  });
 
});

router.post('/insert' , function(req,res,next) {
 var item ={
   title: req.body.title,
   content: req.body.content,
   author: req.body.author
   //here we will access through the names of the elements mentioned in index.hbs
 };
 userData.insert(item);
 res.redirect('/');
});

router.post('/update' , function(req,res,next) {
  var item ={
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
    //here we will access through the names of the elements mentioned in index.hbs
  };
   var id = req.body.id; 
  //  userData.update({"_id":db.id(id)}, item); this or the second one
  //  userData.updateById(id,item);
    userData.update({"_id": monk.id(id)}, item);
   res.redirect('/get-data');
});

router.post('/delete' , function(req,res,next) {
  var id = req.body.id;
  // userData.remove(id);
  userData.remove({"_id": monk.id(id)});
  res.redirect('/get-data');
});

module.exports = router;
