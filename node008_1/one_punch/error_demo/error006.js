// js引擎抛出的异常捕获
process.on('uncaughtException',(e)=>{
    console.log(e)
})

console.log(1)
undefined.abc = 123; //报错
console.log(2)