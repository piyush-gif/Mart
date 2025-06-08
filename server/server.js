import http from 'http';
import fs from 'fs';

const PORT = 8000;


const server = http.createServer((req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method ==='GET' && req.url ==='/products'){

    fs.readFile('./data/db.json' , 'utf8', (err,data) => {
      if (err){
        res.statusCode = 500;
        return res.end('Error reading the data');
      }
      res.setHeader('Content-Type' , 'application/json');
      res.statusCode = 200;
      res.end(data);
    });
  }
  else if(req.method ==='POST') {
    console.log('hello post');
  }
  else{
    res.statusCode = 404;
    res.end('not found');
  }
 
})


server.listen(PORT , ()=> {
  console.log('server is running');
})