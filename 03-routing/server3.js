const http=require('http');
const fs=require('fs');
const app=require('./routes');

const server=http.createServer(app.displaycontent);
server.listen(3000);