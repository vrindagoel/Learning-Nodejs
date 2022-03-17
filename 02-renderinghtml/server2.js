const http=require('http');
const fs=require('fs');
const server=http.createServer((req,res) => {
    console.log("joined server2!");
    res.writeHead(200,{'Content-Type' : 'text/html'});
    fs.readFile('./index.html',null,function(error,data){
        if(error){
            res.writeHead(404);
            res.write('<h1>error: file not found</h1>');
            console.log("error");
        }
        else{
            res.write(data);
        }
        res.end();  
        //here we are ending the server call before so as that the nodejs can read the file index.html completely  
    });

});

server.listen(3000);


