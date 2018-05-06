function asyncFoo(params,cb){
    if(!params)return cb(new Error('no param'))
    else cb(null,'Great')
}

// 没传递参数调用
asyncFoo(null,(err,result)=>{
    console.log(err)
    console.log(result)
})

// 传递参数调用
asyncFoo({},(err,result)=>{
    console.log(err)
    console.log(result)
})

// 回调地狱
/*
代码可读性很低
排错很难
流程控制很恶心
修改起来也恶心
*/
asyncFoo(null,(err,result)=>{
    if(e) asyncFoo({},(e,r)=>{
        if(e) asyncFoo({},(e,r)=>{
            if(e) asyncFoo({},(e,r)=>{
                if(e) asyncFoo({},(e,r)=>{
                    if(e) asyncFoo({},(e,r)=>{
        
                    })
                })
            })
        })    
    })
})

