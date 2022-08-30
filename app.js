var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { expressjwt: jwt } = require("express-jwt");

var indexRouter = require('./routes/index');
var goalsRouter = require('./routes/goals');                  // Was 1: var usersRouter = require('./routes/users');
var accountRouter = require('./routes/accounts'); 

var app = express();

/*
We don't use this anymore because we won't run HTML just JSON
I left here just for understanding. So we can also delete the
folder views (error, index and layout.jade)


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
*/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(jwt({secret: "shhhhhhared-secret", algorithms: ["HS256"]}).unless({ path: ['/api/signup', '/api/login']}));

app.use('/', indexRouter);
app.use('/api/goals', goalsRouter);
app.use('/api', accountRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);                                                       // Prints the error in the console, that way only the developer is able to read it.
  res.send('error');                                                      // Was: res.render('error');
});

module.exports = app;
