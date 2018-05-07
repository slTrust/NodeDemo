const express = require('express');
const router = express.Router();
const User =  require('../modules/mongo/user');

// 鉴权中间件
const auth = require('../middlewares/auth_user');

// 文件上传 
const multer = require('multer');
const path = require('path');
// 这里有个问题  如果是分布式系统  上传的是不同服务器 如何实现跨服务器文件访问呢？
// 一个是七牛上传图片保存的外链
// 第二是哈希分配  拿到用户的id 就能到对应位置找出来
const upload = multer({ dest:path.join(__dirname,'../public/upload') })

// 获取当前域名
const HOST = process.env.NODE_ENV ==='production'?'http://aa.host/':'http://localhost:3000';

// localhost:8002/user/
router.route('/')
  .get((req, res, next)=>{
    (async()=>{
      let users = await User.getUsers();
      return { code:0, users }
    })()
      .then(r=>{
        res.json(r)
      })
      .catch(e=>{
        next(e)
      })
  }).post((req,res,next)=>{
    (async()=>{
      let user = await User.createANewUser(
        {
          name:req.body.name,
          age:req.body.age,
          password:req.body.password,
          phoneNumber:req.body.phoneNumber
        });
      return { code:0, user }
    })()
      .then(r=>{
        res.json(r)
      })
      .catch(e=>{
        next(e)
      })
  });

// localhost:8002/user/aaa 
router.route('/:id')
  .get((req, res, next)=>{
    (async()=>{
      // 参数的处理应该交给model去做
      let user = await User.getUserById(req.params.id);
      return { code:0, user }
    })()
      .then(r=>{
        res.json(r)
      })
      .catch(e=>{
        next(e)
      })
  })
  .patch(auth(),upload.single('avatar'),(req,res,next)=>{
    (async()=>{
      let update = {};
      if(req.body.name) update.name = req.body.name;
      if(req.body.age) update.age = req.body.age;
      console.log(req.file)
      update.avatar = `/upload/${req.file.filename}`;
      let user = await User.updateUserById(req.params.id,update);
      // 返回数据的时候将图片路径拼接上 域名
      user.avatar = `${HOST}${user.avatar}`;
      return { code:0, user }
    })()
      .then(r=>{
        res.json(r)
      })
      .catch(e=>{
        next(e)
      })
  });

module.exports = router;
