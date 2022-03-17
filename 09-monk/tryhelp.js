
Simón González
4 years ago
For monk version 6.0.5 these are the correct operations:
...
var db = require('monk')('localhost:27017/test')
var monk = require('monk')
var userData = db.get('user-data')
...
// READ: returns a promise
...
var data = userData.find({}).then(function(docs) {
    res.render('index', {items: docs})
})
...
// INSERT: yeh is the same xD
...
userData.insert(item)
...
// UPDATE: I use de method id() from the monk module directly
...
var id = req.body.id
userData.update({"_id": monk.id(id)}, item)
...
// DELETE
var id = req.body.id
userData.remove({"_id": monk.id(id)})


in case someone it getting this error "data.on is not a function", use the following code below:

router.get('/get-data', function(req, res, next){

  userData.find({}).then((docs) => {
    res.render('index', {items: docs});
  })

});