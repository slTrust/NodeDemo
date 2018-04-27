var express = require('express');
var app = express();

app.use('/',(req,res,next)=>{
    res.json({msg:"use"})
})

app.listen(8001,()=>{
    console.log('port 8001 is listening!')
});