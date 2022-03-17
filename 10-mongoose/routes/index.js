var express = require('express');
var router = express.Router();
var mongoose =require('mongoose');
// mongoose.connect('localhost:27017/test');
//connection to mongodb
mongoose.connect(
  'mongodb://localhost:27017/test',{
      useNewUrlParser: true
      // useCreateIndex: true,
      // useFindAndModify: false,
      // useUnifiedTopology: true
  }
)
.then(() => console.log('DB Connection Successfull'))
.catch((err) => {
  console.error(err);
});
//to create a scheme :layout of the table
var Schema =mongoose.Schema;
var userdataschema = new Schema ({
  title: {type: String, required: true}, content:{type: String},author:{type: String}}, {collection: 'userdata'});
//userdata =collection name

//create a model of the schema
 var userdata = mongoose.model('UserData', userdataschema );
 //name of the model=UserData
 //schema which should be used as the blueprint of this model=userdataschema



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data' , function(req,res,next) {
userdata.find()
    .then(function( doc ) {
   res.render('index', {items: doc});
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
var data=new userdata(item);
data.save();

 res.redirect('/get-data');
});

router.post('/update' , function(req,res,next) {
  var id=req.body.id;
  userdata.findById(id, function (err,doc) {
    if(err) {
      console.error("no entry found:invalid");
    }
    //updating the document
    doc.title = req.body.title;
    doc.content=req.body.content;
    doc.author=req.body.author;
    doc.save();
  });
  res.redirect('/get-data');
});

router.post('/delete' , function(req,res,next) {
 var id= req.body.id;
 userdata.findByIdAndRemove(id.exec());
 doc.save();
 console.log("deleted entry");
 
 res.redirect('/');

});

module.exports = router;
