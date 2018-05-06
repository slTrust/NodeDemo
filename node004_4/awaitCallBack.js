/* await async 解决回调地狱 */

// 比在回掉里去 进行流程控制 简单多了

// 伪代码  没法运行
async function bar(){
    let user = await user.createUser();
    if(user.somehow){
        user = await dealWithName();
        if(user.somehow2){
            user = await dealWithName2();
        }
    }
    await createCipher()
}

/* await async 理解起来是不是很清楚   等待异步执行的结果（也就是同步） */