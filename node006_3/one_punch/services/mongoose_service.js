const mongoose = require('mongoose');
const uri = 'mongodb://localhost/one_for_all2';
mongoose.Promise = global.Promise;

mongoose.connect(uri,{useMongoClient:true});
const db = mongoose.connection;

db.on('open',()=>{
   console.log('db open')
}) 

db.on('error',(err,res)=>{
    console.log('db error')
    console.log(err)
}) 

db.on('close',(err,res)=>{
    console.log('db close')
})


/*
命令行使用
mongo

show dbs 查看所有的数据库

use xxx  选择操作的数据库 xxx

如果你的表单 Schema 叫 user

则切换该数据库操作 users表

db.users.find({}) //查询所有

db.users.getIndexes() 查看索引

db.dropDatabase() 删库

// 删除所有
db.users.dropIndex({name:1})

db.users

*/