const express = require('express');
const router = express.Router();
const User =  require('../modules/in_memo/user');
const Topic =  require('../modules/in_memo/topic');

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
  }).post((req,res,next)=>{
    (async()=>{
      let user = await User.getUserById(req.body.userId)
      let topic = await Topic.createANewTopic({
        creater:user,
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
      let topic = await Topic.getTopicById(Number(req.params.id));
      return { code:0, topic }
    })()
      .then(r=>{
        res.json(r)
      })
      .catch(e=>{
        next(e)
      })
  })
  .patch((req,res,next)=>{
    (async()=>{
      let topic = await Topic.updateTopicById(Number(req.params.id),{
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
  .post((req,res,next)=>{
    (async()=>{
      let user = await User.getUserById(req.body.userId)
      console.log(req.body)
      let topic = await Topic.replyATopic({
        topicId:req.params.id,
        creater:user,
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
