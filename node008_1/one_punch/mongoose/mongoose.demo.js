const mongoose = require('mongoose');
const uri = 'mongodb://localhost/test';
mongoose.connect(uri);
const db = mongoose.connection;
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

// 表单对象
const UserSchema =Schema({
    name:String,
    age:Number
})
// 具体的表   命令行里使用要加s  如   db.users.find()
const UserModel = mongoose.model('user',UserSchema);

(async()=>{
    let created = await UserModel.create({
        name:'hjx',
        age:18
    }).then()
    return created;
})().then(r=>{
    console.log(1)
    console.log(r)
    console.log(2)
}).catch(e=>{

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