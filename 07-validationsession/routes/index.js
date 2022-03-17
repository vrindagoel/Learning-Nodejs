var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'form validation' , success: req.session.success , errors: req.session.errors});
  req.session.errors=null;
  //so that all the errors are cleared after we have shown them to the use


});

router.post('/submit' , function(req,res,next) {
  // to check validity of the values
  req.check('email' ,'invalid email address').isEmail();
  //here we need to put the name of the input field
  req.check('password' , 'password is invalid').isLength({min: 4}).equals(req.body.confirmpass);

  var errors = req.validationErrors();
  //storing all the validation errors we might have
  if(errors) {
    req.session.errors = errors;
    req.session.success = false;
  }
  else {
    req.session.success= true;
  }
  res.redirect('/');
});

module.exports = router;
