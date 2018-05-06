// 伪代码
let p = new Promise((resolve,reject)=>{
    User.createNewUser(params,(e,r)=>{
        if(e){
            reject(e)
            return 
        }
        if(r){
            resolve(r)
        }
    })
}).then(r=>{
    if(r.someHow){
        return new Promise((resolve2,reject2)=>{
            dealWithName()
            resolve2(r)
        })
    }
    return Promise.resolve(r)
}).then()
  .then()
  .catch(e=>{
      console.log(e)
  })
