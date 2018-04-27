var express = require('express');
var app = express();

// 获取请求头 和设置响应头

app.get('/', function(req, res){
  console.log(req.get('Accept'));
  res.set('token','fdsalkjljjfadslkjfds')
  return res.json({code:0})
});

app.listen(8001,()=>{
    console.log('port 8001 is listening!')
});