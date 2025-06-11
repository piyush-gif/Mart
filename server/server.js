import http from 'http';
import fs from 'fs';

const PORT = 8000;


const server = http.createServer((req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return res.end();
  }
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
  else if (req.method ==='GET' && req.url =='/cart'){
    fs.readFile('./data/cart.json',  'utf8' ,(err, data) => {
      if (err) {
        res.statusCode = 500;
        return res.end('Error reading the data');
      }
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(data);
    })
  }
  
  else if(req.method ==='POST' && req.url ==='/addtocart') {
    let body ='';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try{
       const product = JSON.parse(body);
      fs.readFile('./data/cart.json', 'utf8', (err, cartData) => {
        if (err) {
          res.statusCode = 500;
          return res.end('Error reading cart data');
        }
        const cart = JSON.parse(cartData);
        cart.cart.push(product);

      fs.writeFile('./data/cart.json', JSON.stringify(cart, null, 2), err => {
        if (err) {
          res.statusCode = 500;
          return res.end('Error saving to cart');
        }
          res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Added to cart', data: product }));
      });
    });
      }
      catch (err) {
      res.statusCode = 400;
      res.end('Invalid JSON');
      }
    })
  }

  else if (req.method === 'DELETE' && req.url.startsWith('/cart/')){
    const id = req.url.split('/')[2];
    fs.readFile('./data/cart.json', 'utf8', (err, data) => {
      if (err){
        res.statusCode = 500;
        return res.end('Error reading cart data');
      }
      const cart = JSON.parse(data);
      cart.cart = cart.cart.filter(item => item.id.toString() !== id);
    fs.writeFile('./data/cart.json', JSON.stringify(cart, null, 2), err  => {
      if (err) {
        res.statusCode = 500;
        return res.end('Error saving cart data')
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Item deleted' }));
    })
    })
  }
  else{
    res.statusCode = 404;
    res.end('not found');
  }
});

server.listen(PORT , ()=> {
  console.log('server is running');
})