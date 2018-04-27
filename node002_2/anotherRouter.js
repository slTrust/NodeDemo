const router = require('express').Router();


router.route('/')
    .get((req,res)=>{
        res.json({code:0,msg:'welcome to another root router  get method'})
    })
    .post((req,res)=>{
        res.json({code:0,msg:'welcome to another root router post method'})
    })


router.get('/another_demo',(req,res,next)=>{
    res.end(`your another_demo  here`)
})

module.exports = router;