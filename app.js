var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var baseRouter = require('./routes/index');
const authRouter = require('./routes/auth')
const parentRouter = require('./routes/parent')
const studentRouter = require('./routes/student')
const subjectRouter = require('./routes/subject')
const teacherRouter = require('./routes/teacher')


var { dbConnection } = require('./config/db.config')
// var usersRouter = require('./routes/users');

//database Connection
async function databaseConection(){
  try{
    await dbConnection.authenticate()
    console.log('database connection was established succesfully')
  }catch(err){
    console.log('connection was not established an error occured ', err)
  }

}
databaseConection()

//sync models
const models = require('./model/index')
models.db

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', baseRouter, authRouter, parentRouter, studentRouter, subjectRouter, teacherRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, 'route does not exist'));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
