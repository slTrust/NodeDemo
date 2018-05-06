const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema =Schema({
    name:{type:String,require:true},
    age:{type:Number,max:[90,'大于90岁的人基本是不玩postman的']}
})
// 创建索引  这样就不在schema定义表单的时候  添加唯一索引了
// name:1 代表索引以升序来排列 -1就是 反序  例如书籍上 abcdef....xyz 这就是分类 也就是索引
// 通过把数据结构以一定的顺序存储  来增加访问的速度 (这里就是一个典型的以空间换时间的例子)

UserSchema.index({name:1},{unique:true})

// 混合索引
UserSchema.index({name:1,age:1})

//索引  例子   3 2 1 4 5 如果你指定 name:1  就会==》  12345
/*
复合索引 如果是[1,1] [3,2] [2,3] [1,4] 指定排序后
排序如下 [1,1] [1,4] [2,3] [3,2]

mongodb在查找索引的时候大概是这样的流程

查找某个值的时候  先找索引
如果没有索引  先搜索内存
如果内存里没有  遍历文档 然后返回

非常快   非常慢
'内存'=》遍历文档

非常快   比较快    比较快
'内存'=》查找索引=》根据索引取文档

如果内存够
'in_memory' 将mongodb当作 内存数据库来跑(时间换空间)

'LRU' 算法  把经常使用（高频）的100个始终放在内存里 其他的排在缓存之外

简历索引是一个很耗时的操作  如果之前一个表没有索引  那么你现在建立索引就要小心

什么时候需要排序 
1.通过某一个键 操作
2.要排序的时候

经纬度索引  因为地球是圆的不是平面那样简单
'geoIndex'
*/



const UserModule = mongoose.model('user',UserSchema);

async function createANewUser(params){
    const user =  new UserModule({name:params.name,age:params.age});
    return await user.save()
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
   
}

//参数写法 是es6 给参数一个默认值
// 设置这样的默认值是为了 提示服务器性能  一个人查100条数据没关系  100个人查询 100条就有问题了  所以要做分页限制
async function getUsers(params = {page:0,pageSize:10}){
    let flow = UserModule.find({})
    flow.skip(params.page*params.pageSize)
    flow.limit(params.pageSize)
    return await flow.catch(
        e=>{
            console.log(e)
            throw new Error('error get users from db')
        })
} 

async function getUserById(userId){
    return await UserModule.findOne({_id:userId}).catch(e=>{
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