var express = require('express');
var router = express.Router();
const mongo = require('mongodb').MongoClient;
const objectid = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';
var dbname="test";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data' , function(req,res,next) {
  var resultarr=[];
 mongo.connect(url, function(err,db) {
   assert.equal(null,err);
   var cursor =db.collection('user-data').find();
   cursor.forEach(function(doc,err) {
    //  doc=current document
    //  err=possible error
    assert.equal(null,err);
    //now we will get all the values stored in an arry which we can return to the user
    resultarr.push(doc);
   
   } , function() {
     db.close();
     //closing the database
     //if getting error with db.close() use client.close()
     res.render('index', {items: resultarr});
}, function() {
  db.close();
  res.render('index', {items: resultarr});
});
});
});

router.post('/insert' , function(req,res,next) {
 var item ={
   title: req.body.title,
   content: req.body.content,
   author: req.body.author
   //here we will access through the names of the elements mentioned in index.hbs
 };
//  now we will insert the item
mongo.connect(url, function(err,db) {
 assert.equal(null,err);
 //to check errors
 db.collection('user-data').insertOne(item, function(err,result) {
  //in mongodb table=collection
  //here we are specifying the name of the table we want to insert our data into
   assert.equal(null,err);
   //again to check whether the command is successful or is it giving an error
   console.log('item inserted');
   db.close();
 });
});
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
  mongo.connect(url, function(err,db) {
    assert.equal(null,err);
    //to check errors
    db.collection('user-data').updateOne({"_id" : objectid(id)},// the object that has to be updated
      {$set: item}, // using set property : what the new data should be
      function(err,result) {
      assert.equal(null,err);
      console.log('item updated;id: ' + id);
      db.close();
    });
   });

});

router.post('/delete' , function(req,res,next) {
  var id = req.body.id;
  mongo.connect(url, function(err,db) {
    assert.equal(null,err);
    //to check errors
    db.collection('user-data').deleteOne({"_id" : objectid(id)},// the object that has to be deleted
      function(err,result) {
      assert.equal(null,err);
      console.log('item deleted;id: ' + id);
      db.close();
    });
   });

});

module.exports = router;
