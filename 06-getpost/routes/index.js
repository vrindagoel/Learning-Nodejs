var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , condition: true, arr : [4,5,6]});
});

router.get('/test/:id', function(req,res,next)
{
  res.render('test', {output: req.params.id});
  // here output is the variable we are passing to the tamplating engine
})
// this route expects an id get parameter after the second slash

router.post('/test/submit' , function(req,res,next){
  var gotid=req.body.id;
  res.redirect('/test/' +gotid);
  // we need to print the id we get via a form from index.hbs
} )
module.exports = router;
