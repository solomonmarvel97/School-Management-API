var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var baseRouter = require('./routes/index');
var authRouter = require('./routes/auth')
var parentRouter = require('./routes/parent')
var studentRouter = require('./routes/student')
var subjectRouter = require('./routes/subject')
var teacherRouter = require('./routes/teacher')
var adminRouter = require('./routes/admin')
var profileRouter = require('./routes/profile')
var feesRouter = require('./routes/fees')
var expenseRouter = require('./routes/expense')


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


app.use('/', baseRouter, authRouter, parentRouter, studentRouter, subjectRouter, teacherRouter, adminRouter, profileRouter, feesRouter, expenseRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, 'route does not exist'));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
