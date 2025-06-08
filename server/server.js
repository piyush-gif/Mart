import http from 'http';



const PORT = 8000;
const server = http.createServer((req, res) => {

  if (res.method ==='GET'){
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    res.write('hello world');
    res.end();
  }
  else if(res.method ==='POST') {
    console.log('hello post');
  }
  else{
    throw new ERRO
  }
 
})


server.listen(PORT , ()=> {
  console.log('server is running');
})