const express = require('express');
const router = express.Router();
const User = require('../modules/mongo/user')
// TOKEN生成
const JWT = require('jsonwebtoken');
// 加密的密钥
const JWT_SECRET = require('../cipher').JWT_SECRET;

// error的处理
const Errors = require('../errors')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/signUp',function(req,res,next){
  const user = {
    name:req.body.name,
    phoneNumber:req.body.phoneNumber,
    password:req.body.password
  }
  User.createANewUser()
})

router.post('/login',function(req,res,next){
  (async ()=>{
    if(!req.body.password) throw new Errors.ValidationError('password','password can not be empty')
    if(typeof req.body.password !=='string')  throw new Errors.ValidationError('password','password must be a string')
    if(typeof req.body.password.length<8)  throw new Errors.ValidationError('password','password must longer than 8 charsters')
    if(typeof req.body.password.length>32)  throw new Errors.ValidationError('password','password cah not be longer than 32 charsters')
    const user = await User.login(req.body.phoneNumber,req.body.password)
    // 此处需要过期时间 和密钥
    const token = JWT.sign({_id:user._id,iat:Date.now(),expire:Date.now()+24*60*60*1000},JWT_SECRET);
    return {
      code:0,
      data:{
        user:user,
        token:token
      }
    }
  })()
    .then(r=>{
      res.json(r)
    })
    .catch(e=>{
      next(e)
    })
})

module.exports = router;
