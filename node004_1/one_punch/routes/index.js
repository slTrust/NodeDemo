const express = require('express');
const router = express.Router();
const User = require('../modules/mongo/user')

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
    return {
      code:0,
      data:{
        user:user
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
