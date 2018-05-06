const mongoose = require('mongoose');
const uri = 'mongodb://localhost/test';
mongoose.connect(uri);
const db = mongoose.connection;
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

// 定义表单时的校验

// 表单对象
const UserSchema =Schema({
    // type:类型
    // require 是否必须
    // unique 在mongodb里创建索引   类似mysql唯一主键
    // enum:['aa','bb']  指定他的值
    name:{type:String,require:true,enum:['hjx','lisi']},
    // 最简单写法
    // age:Number
    // 数字复杂的校验 
    // max 最大值
    // min 最小值  如果是数组   第一个值是最小范围  第二个值是报错信息
    age:{type:Number,max:90,min:[18,'不能小于18岁']}
})

// 具体的表   命令行里使用要加s  如   db.users.find()
const UserModel = mongoose.model('user',UserSchema);

// 工厂模式
(async(params)=>{
   let flow = UserModel.find({});
   flow.where('age').lt(21);
   flow.select({name:1})
   flow.skip(0);
   if(params.sort) flow.sort(params.sort);
   let res = await flow.then()
   return res;
})({
    sort:'-age'
})
.then(r=>{
    console.log(r)
})
.catch(e=>{
    console.log(e)
})


db.on('open',()=>{
   console.log('db open ')
}) 

db.on('error',(err,res)=>{
    console.log('db error')
    console.log(err)
}) 

db.on('close',(err,res)=>{
    console.log('db close')
})