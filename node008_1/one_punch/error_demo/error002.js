// 自己实现的error   但依然推荐使用 Error对象抛出异常
const obj = {name:'error',message:'should be number'};
Error.captureStackTrace(obj)

console.log(obj.stack)