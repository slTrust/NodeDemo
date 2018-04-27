var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(8001,()=>{
    console.log('port 8001 is listening!')
});