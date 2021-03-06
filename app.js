var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

// Include MongoDB database interface
require('./app_api/models/db');
// Include passport strategy
require('./app_api/config/passport');

// include api routes
var routesApi = require('./app_api/routes/index');

// create express
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// static folders which contain files delivered directly to the browser
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

// initialize passport with the strategy included
app.use(passport.initialize());

// use api routes
app.use('/api', routesApi);

// if request was no api request serve angularjs application
// angularjs then deals with unknown requests
app.use(function(req, res) {
  res.sendfile(path.join(__dirname, 'app_client/home', 'index.html'));
});

/// error handlers

// error handler for unauthorized requests
app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message": err.name + ": " + err.message});
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
