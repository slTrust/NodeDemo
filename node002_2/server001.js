var express = require('express');
var app = express();
const Router = express.Router();
const bodyParser = require('body-parser');

const simpleRouter = require('./simpleRouter')
const anotherRouter = require('./anotherRouter')


app.use(bodyParser.urlencoded({extended:false}))

app.use('/simple/',simpleRouter);
app.use('/another/',anotherRouter);

app.use((err,req,res,next)=>{
    res.status(401)
    res.json({code:-1,msg:err.message})
})

app.listen(8001,()=>{
    console.log('port 8001 is listening!')
});