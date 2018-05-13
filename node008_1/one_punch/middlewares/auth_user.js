const JWT = require('jsonwebtoken');
const JWT_SECRET = require('../cipher').JWT_SECRET;

module.exports = function(options){
    console.log('进入中间件')
    return function(req,res,next){
        // bearer代表送信者而不是熊
        // 用户操作时要添加请求头  设置 Authorization ='bearer'+'空格'+'你的token字符串'
        try {
            const auth = req.get('Authorization')
            if(!auth) throw new Error('no auth')
            let authList = auth.split(' ');
            const token = authList[1];
            const obj = JWT.verify(token,JWT_SECRET);
            if(!obj||!obj._id||!obj.expire) throw new Error('no auth')
            if(Date.now() - obj.expire > 0) throw new Error('token expired')
            next()
        } catch (error) {
            res.statusCode = 401;
            next(error)
        }
    }
}