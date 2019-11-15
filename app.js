var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors')
const config = require('./config/secret');
require('./config/db')

var indexRouter = require('./routes/index');
var service = require('./routes/service');
var users = require('./routes/users');
var feedback = require('./routes/feedback');
var worker = require('./routes/worker');
var adopt_services = require('./routes/adopt_services');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
// Set body parser middleware
app.use(bodyParser.json());

// Use passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/', indexRouter);
app.use('/api/users', users);
app.use('/api', service);
app.use('/api/feedback' , feedback);
app.use('/api',worker);
app.use('/adopt_services/',adopt_services);

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
  res.render('error');
});

module.exports = app;
