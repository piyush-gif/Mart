import http from 'http';

const PORT = 8000;
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.statusCode = 200;
  res.write('hello world');
  res.end();
})


server.listen(PORT , ()=> {
  console.log('server is running');
})