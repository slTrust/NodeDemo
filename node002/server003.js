var express = require('express');
var app = express();

// restful风格 http://localhost:8001/aa/18/man

app.get('/:name/:age/:gender', function(req, res){
  console.log(req.params.name);
  console.log(req.params.age);
  console.log(req.params.gender);
  return res.json({code:0})
});

app.listen(8001,()=>{
    console.log('port 8001 is listening!')
});