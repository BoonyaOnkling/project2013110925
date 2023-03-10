var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const config = require('./config/index')
const passport = require('passport')

const errorHandler = require('./middleware/errorHandler')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var typesRouter = require('./routes/type');

var app = express();
mongoose.connect(config.MONGODB_URL,{useNewUrlParser: true, useUnifiedTopology: true});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({
  limit: '50mb'
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize())

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/type',typesRouter);
app.use(errorHandler)


module.exports = app;
