class BaseHTTPError extends Error{
    constructor(msg,OPCode,httpCode,httpMsg){
        super(msg)
        this.OPCode = OPCode;
        this.httpCode = httpCode;
        this.httpMsg = httpMsg;
        this.name = 'BaseHTTPError';
    }
    static get['DEFAULT_OPCODE'](){
        return 1000000;
    }
}

class InternalError extends BaseHTTPError{
    constructor(msg){
        const OPCode = 1000001;
        const httpMsg = '服务器开了小差，一会在试试？'
        super(msg,OPCode,500,httpMsg)
    }
}


class ValidationError extends BaseHTTPError{
    constructor(path,reason){
        const OPCode = 2000000;
        const httpCode = 400;
        this.name = 'ValidationError';
        super(`error validation param,path:${path},reason:${reason}`,OPCode,httpCode,'参数错误请稍候再试！')
    }
}

// 用户名重复错误
class DuplicatedUserNameError extends ValidationError{
    constructor(username){
        this.httpMsg = '此用户名已经存在';
        this.OPCode = 2000001;
        super('username',`duplicated user name :${username}`)
    }
}

module.exports = {
    BaseHTTPError,
    ValidationError,
    DuplicatedUserNameError,
    InternalError
}