const fs=require('fs');
function renderhtml(path,res) {
    fs.readFile(path,null,function(error,data) {
        if(error)
        {
            res.writeHead(404);
            res.write('file not found');
        }
        else{
            res.write(data);
        }
        res.end();
    });
}

module.exports = {
    displaycontent: function (req,res) {
        res.writeHead(200,{'Content-Type':'text/html'});
    
        const url=req.url;
        const method=req.method;
        if(url == "/")
        {
            res.write("normal");
            return res.end();
        }
        else if(url == "/profile")
        {
            renderhtml('./index2.html',res);
            return res.end();
        }
        else if(url == "/settings" && method=="POST")
        {
            res.write('form got submitted using post method');
            return res.end();
        }
        else if(url == "/settings")
        {
            res.write('<h1>fill the form</h1>');
            res.write('<form action="/settings" method="POST"><input type="text"><button type="submit">submit</button></form>')
            //here action="/settings" means the page you want to get directed at after submitting the form
            return res.end();
        }
        else
        {
            res.writeHead(404);
            res.write('not found:error');
            return res.end();
        }
    }
};

