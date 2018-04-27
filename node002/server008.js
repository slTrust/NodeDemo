var express = require('express');
var app = express();

// const Router = express.Router();

app.use('/',mod1,mod2)

function mod1(req,res,next){
    console.log('进入 mod1 厂房')
    req.user = {name:"fsafsdfas"};
    return next();
}

function mod2(req,res,next){
    console.log('进入 mod2 厂房')
    console.log(JSON.stringify(req.user))
    res.json({msg:'数据返回结束'})
}

app.listen(8001,()=>{
    console.log('port 8001 is listening!')
});