const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto'); //加密功能模块
const  bluebird = require('bluebird');
const  pbkdf2Async = bluebird.promisify(crypto.pbkdf2)
// 
const SALT = require('../../cipher').PASSWORD_SALT;

const UserSchema = new Schema({
    name:{type:String,require:true},
    age:{type:Number,max:[90,'大于90岁的人基本是不玩postman的']},
    phoneNumber:String,
    password:String
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
    // 这一步虽然设置了密码  但是。。。  获取所有用户的时候  返回的是users 所以密码也返回了 这是不安全的
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
                throw new Error('该用用户名已经被注册！！！')
                break;
            default:
                throw new Error(`error creating user ${JSON.stringify(params)}`)
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

module.exports = {
    model:UserModule,
    createANewUser,
    getUsers,
    getUserById,
    updateUserById
}