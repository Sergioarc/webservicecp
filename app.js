var dotenv = require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var redis = require('redis');
var client = require('redis').createClient();
var infocp = require('./routes/infocp');

// Middleware for security endpoints
var securityService = require('./security/securityService');

// App of express
var app = express();

// Connect redis for cache store
client.on('connect', function() {
  console.log('Redis client connected');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint for get info of CP
app.use('/fetchinfocp', securityService, (req, res, next) => {
  req.redis = client
  next()
}, infocp);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  let response = {
    status: 'error',
    code: err.status,
    message: err.message,
  };
  res.json(response);
});

module.exports = app;
