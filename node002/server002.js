var express = require('express');
var app = express();

app.get('/', function(req, res){
  console.log(req.method)
  console.log(JSON.stringify(req.query));
  console.log(req.query.name);
  return res.json({code:0})
});

app.listen(8001,()=>{
    console.log('port 8001 is listening!')
});