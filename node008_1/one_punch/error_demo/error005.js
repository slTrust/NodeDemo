// Promise里捕获异常
let p = new Promise((resolve,reject)=>{
    throw new Error('promise error')
})

p.catch(e=>{
    console.log(e)
})