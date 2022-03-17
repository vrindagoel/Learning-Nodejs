mongo.connect(url , function(err,client) {
    assert.equal(null,err);
    console.log("connected with server to get-data");
    const db=client.db(dbname);
    db.collection('user-data').find().toArray((err,results) => {
      if(err) throw err;
      results.forEach((value)=> {
        console.log(value.name);
  }, function() {
    client.close();
    res.render('index');


    mongo.connect(url , function(err,client) {
        assert.equal(null,err);
        console.log("connected with server to get-data");
        const db=client.db(dbname);
        db.collection('user-data').find().toArray((err,results) => {
          if(err) throw err;
          results.forEach((value)=> {
            console.log(value.name);
      }, function() {
        client.close();
        res.render('index');
      });
    });
    