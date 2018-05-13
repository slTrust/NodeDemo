const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const topicRouter = require('./routes/topic');
const Errors = require('./errors')

// 链接数据库 
require('./services/mongoose_service')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/topic', topicRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // 异常处理
    if(err instanceof Errors.BaseHTTPError){
      res.statusCode = err.httpCode;
      res.json({
        code:err.OPCode,
        msg:err.httpMsg
      })
    }else{
      res.statusCode = 500;
      res.json({
        code:Errors.BaseHTTPError.DEFAULT_OPCODE,
        msg:'服务器好像出了问题！，请稍候访问吧~'
      })
    }
    console.log(err)
});

module.exports = app;
