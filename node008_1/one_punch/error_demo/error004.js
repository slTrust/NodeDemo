// 异步函数里捕获异常
async function foo(){
    throw new Error('foo is err')
}

(async ()=>{
    await foo();
})()
.then()
.catch(e=>{
    console.log(e)
})