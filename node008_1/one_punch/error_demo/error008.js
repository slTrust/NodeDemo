//这个后台系统的异常要求
// 1. 要知道哪一行出错了，stack trace
// 2. 能及时的告知用户出错了，给予提示
// 3. 用于接口调试的错误信息，比如错误码

class BaseHTTPError extends Error{
    constructor(msg,OPCode,httpCode,httpMsg){
        super(msg)
        this.OPCode = OPCode;
        this.httpCode = httpCode;
        this.httpMsg = httpMsg;
    }
}
// throw new BaseHTTPError('something wrong with server','1000001',500,'服务器出了点问题，请稍候再试~')

class ValidationError extends BaseHTTPError{
    constructor(path,reason){
        const OPCode = 1000001;
        const httpCode = 400;
        super(`error validation param,path:${path},reason:${reason}`,OPCode,httpCode,'参数错误请稍候再试！')
    }
    toString(){
        console.log('validationError')
    }
}

let e = new ValidationError('age','age should be >18')
console.log(JSON.stringify(e.stack))
console.log(JSON.stringify(e.name))
console.log(JSON.stringify(e.message))
console.log(JSON.stringify(e.httpCode))
console.log(JSON.stringify(e.httpMsg))

console.log(JSON.stringify(e))