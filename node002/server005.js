var express = require('express');
var app = express();

// 响应json格式
app.get('/', function(req, res){
    res.set('Content-Type','application/json;charset=utf-8')
    return res.send(JSON.stringify({code:0}))
//   return res.json({code:0})
});

app.listen(8001,()=>{
    console.log('port 8001 is listening!')
});