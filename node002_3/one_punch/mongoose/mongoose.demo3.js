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

// 实例方法
UserSchema.methods.sayYourName = function(){
    return this.name;
}
// 静态方法
UserSchema.statics.findByName = async function(name){
    return await this.findOne({name:name})
}

// 具体的表   命令行里使用要加s  如   db.users.find()
const UserModel = mongoose.model('user',UserSchema);

// 静态方法
(async()=>{
    let found = await UserModel.findByName('hjx');
    return found;
})().then(r=>{
    console.log(r)
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