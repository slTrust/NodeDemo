const express = require('express');
const router = express.Router();
const User = require('../modules/mongo/user')
// TOKEN生成
const JWT = require('jsonwebtoken');
// 加密的密钥
const JWT_SECRET = require('../cipher').JWT_SECRET;

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
    const user = await User.login(req.body.phoneNumber,req.body.password)
    console.log(1)
    // 此处需要过期时间 和密钥
    const token = JWT.sign({_id:user._id,iat:Date.now(),expire:Date.now()+20000},JWT_SECRET);
    console.log(2)
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
