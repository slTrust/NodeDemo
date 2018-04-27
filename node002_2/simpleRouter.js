const router = require('express').Router();

router.get('/',(req,res)=>{
    res.json({code:0,msg:'welcome to simple root router'})
})

router.get('/simple_demo',(req,res,next)=>{
    res.end(`your simple_demo  here`)
})

module.exports = router;