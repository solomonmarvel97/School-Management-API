var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var helmet = require('helmet')

var authRouter = require('./src/routes/auth')
var parentRouter = require('./src/routes/parent')
var studentRouter = require('./src/routes/student')
var subjectRouter = require('./src/routes/subject')
var teacherRouter = require('./src/routes/teacher')
var adminRouter = require('./src/routes/admin')
var profileRouter = require('./src/routes/profile')
var feesRouter = require('./src/routes/fees')
var expenseRouter = require('./src/routes/expense')
var { respond } = require('./src/utils/respond')



var { dbConnection } = require('./src/config/database');
const { syncModel } = require('./src/model');


//database Connection
async function databaseConection() {
  try {
    await dbConnection.authenticate()
    await Promise.all(syncModel.map(async (model) => await model.sync()))
    console.log('database connection was established succesfully')
  }catch (err) {
    console.log('connection was not established an error occured ', err)
  
  } 
  }

databaseConection()


var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS Enabled resource from this server can be accessed by any origin
const options = {
  origin: '*',
  methods: ['POST', 'PATCH', 'GET', 'DELETE'],
  allowheader: ['Content-Type', 'Authorization']
}
app.use(cors(options))

// use helmet middleware
app.use(helmet())


app.get('/', (req, res) => {
  respond(res, 200, 'School management API is running')
})

app.use('/api', authRouter, parentRouter, studentRouter, subjectRouter, teacherRouter, adminRouter, profileRouter, feesRouter, expenseRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, 'endpoint does not exist'));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err  : {};

  res.status(err.status || 500);
  res.json(err);
});



module.exports = app;
