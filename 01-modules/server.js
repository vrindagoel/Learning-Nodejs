const http = require('http');
//using http module

const module2=require('./module2');
//importing other modules



const server=http.createServer((req,res) => {
    console.log("joined the server");
    res.write('<h1> welcome to the page</h1>');
    
    // reading the module 
    module2.printf();
    
    res.end();
    //tells the server to stop listening and render whatever is needed
})
//creating an anonymous function
server.listen(3000);
