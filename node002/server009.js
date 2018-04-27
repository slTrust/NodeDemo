var express = require('express');
var app = express();

// const Router = express.Router();

app.use('/',mod1,mod2)

function mod1(req,res,next){
    console.log('进入 mod1 厂房')
    return next('route')
    // return next(new Error('少了一个零件，请求召回'));
}

function mod2(req,res,next){
    console.log('进入 mod2 厂房')
    res.json({msg:'数据返回结束'})
}

app.use((err,req,res,next)=>{
    res.status(401)
    res.json({code:-1,msg:err.message})
})

app.listen(8001,()=>{
    console.log('port 8001 is listening!')
});