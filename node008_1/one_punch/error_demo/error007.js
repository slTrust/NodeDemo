// 同步异常抛出的异常捕获 
process.on('uncaughtException',(e)=>{
    console.log(e)
    process.exit(1); //避免程序崩溃
})


//Promise异步抛出的异常
process.on('unhandleRejection',(reason,promise)=>{
    console.log(1)
    console.log(reason)
    console.log(10)
    console.log(promise)
})

new Promise((resolve,reject)=>{
    reject('reject')
})