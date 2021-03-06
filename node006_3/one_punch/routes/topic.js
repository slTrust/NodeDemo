const express = require('express');
const router = express.Router();
const User =  require('../modules/mongo/user');
const Topic =  require('../modules/mongo/topic');

// 鉴权中间件
const auth = require('../middlewares/auth_user');

// localhost:8002/topic/
router.route('/')
  .get((req, res, next)=>{
    (async()=>{
      let topics = await Topic.getTopics();
      return { code:0, topics }
    })()
      .then(r=>{
        res.json(r)
      })
      .catch(e=>{
        next(e)
      })
  }).post(auth(),(req,res,next)=>{
    (async()=>{
      let user = await User.getUserById(req.body.userId)
      let topic = await Topic.createANewTopic({
        creator:user,
        title:req.body.title,
        content:req.body.content
      });
      return { code:0, topic }
    })()
      .then(r=>{
        res.json(r)
      })
      .catch(e=>{
        next(e)
      })
  });

// localhost:8002/topic/aaa 
router.route('/:id')
  .get((req, res, next)=>{
    (async()=>{
      let topic = await Topic.getTopicById(req.params.id);
      return { code:0, topic }
    })()
      .then(r=>{
        res.json(r)
      })
      .catch(e=>{
        next(e)
      })
  })
  .patch(auth(),(req,res,next)=>{
    (async()=>{
      let topic = await Topic.updateTopicById(req.params.id,{
        name:req.body.name,
        age:req.body.age
      });
      return { code:0, topic }
    })()
      .then(r=>{
        res.json(r)
      })
      .catch(e=>{
        next(e)
      })
  });

// 帖子回复
router.route('/:id/reply')
  .post(auth(),(req,res,next)=>{
    (async()=>{
      let user = await User.getUserById(req.body.userId)
      console.log(req.body)
      let topic = await Topic.replyATopic({
        topicId:req.params.id,
        creator:user,
        content:req.body.content
      });
      console.log(topic)
      return { code:0, topic }
    })()
      .then(r=>{
        res.json(r)
      })
      .catch(e=>{
        next(e)
      })
})

module.exports = router;
