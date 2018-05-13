const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto'); //加密功能模块
const  bluebird = require('bluebird');
const  pbkdf2Async = bluebird.promisify(crypto.pbkdf2)
// 
const SALT = require('../../cipher').PASSWORD_SALT;
// 引入错误处理类
const Errors = require('../../errors')

const UserSchema = new Schema({
    name:{type:String,require:true},
    age:{type:Number,max:[90,'大于90岁的人基本是不玩postman的']},
    phoneNumber:String,
    password:String,
    avatar:String //头像
})
// 创建索引  这样就不在schema定义表单的时候  添加唯一索引了
UserSchema.index({name:1},{unique:true})
// 混合索引
UserSchema.index({name:1,age:1})

// 设置不查询的项  0 代表不显示  flow.select(DEFAULT_PROJECTION)
const DEFAULT_PROJECTION = {password:0,phoneNumber:0,__v:0}



const UserModule = mongoose.model('user',UserSchema);

async function createANewUser(params){
    const user =  new UserModule(
        {
            name:params.name,
            age:params.age,
            phoneNumber:params.phoneNumber
        });
    user.password = await pbkdf2Async(params.password,SALT,512, 128 ,'sha1')
                    .then(r=>{
                        console.log(r.toString())
                        return r.toString();
                    })
                    .catch(e=>{
                        console.log(e)
                        throw new Error('密钥生成失败')
                    })
    let created = await user.save()
    .catch(e=>{
        switch(e.code){
            case 11000:
                throw new Errors.DuplicatedUserNameError(params.name)
                break;
            default:
                throw new Errors.ValidationError('user',`error creating user ${JSON.stringify(params)}`)
                break;        
        }
        console.log('create user err');
        console.log(e)
    })
    return {
        _id:created._id,
        name:created.name,
        age:created.age
    }
   
}

//参数写法 是es6 给参数一个默认值
// 设置这样的默认值是为了 提示服务器性能  一个人查100条数据没关系  100个人查询 100条就有问题了  所以要做分页限制
async function getUsers(params = {page:0,pageSize:10}){
    let flow = UserModule.find({})
    flow.select(DEFAULT_PROJECTION)
    flow.skip(params.page*params.pageSize)
    flow.limit(params.pageSize)
    return await flow.catch(
        e=>{
            console.log(e)
            throw new Error('error get users from db')
        })
} 

async function getUserById(userId){
    return await UserModule.findOne({_id:userId})
    .select(DEFAULT_PROJECTION)
    .catch(e=>{
        console.log(e)
        throw new Error(`error getting user by id ${userId}`);
    })

} 

async function updateUserById(userId,update){
    // {new:true} 代表更新后将该数据返回
    return await UserModule.findOneAndUpdate({_id:userId},update , {new:true}).catch(e=>{
        console.log(e)
        throw new Error(`error updating user by id ${userId}`);
    })
} 

// 登录方法编写 (这里面有一个坑 就是手机号重复的时候 没法校验)
async function login(phoneNumber,password){
    // 传递的密码先进行加密
    password = await pbkdf2Async(password,SALT,512, 128 ,'sha1')
    .then(r=>{
        return r.toString();
    })
    .catch(e=>{
        console.log(e)
        throw new Errors.InternalError('密钥生成失败')
    })
    const user = await UserModule.findOne({phoneNumber:phoneNumber,password:password})
        .select(DEFAULT_PROJECTION)    
        .catch(e=>{
            console.log(`error login ! phone ${phoneNumber}`,{err:e.stack||e});
            throw new Error('error some wrong with the server')
        })
    if(!user) throw new Error('no such user!')
    return user;
}

module.exports = {
    model:UserModule,
    createANewUser,
    getUsers,
    getUserById,
    updateUserById,
    login
}