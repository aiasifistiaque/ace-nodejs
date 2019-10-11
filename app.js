var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var cors = require('cors');
var mongoose = require('mongoose');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
dotenv.config();
app.use(cors());

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var questionRoute = require('./routes/question');
var authRouter = require('./routes/auth');


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/question', questionRoute);
app.use('/auth', authRouter);


mongoose.connect('mongodb+srv://asifistiaque:root@cluster0-ctuoc.mongodb.net/v1?retryWrites=true&w=majority',{
    useNewUrlParser:true, 
    useUnifiedTopology:true,
    useCreateIndex: true
},()=> console.log('coonnected to the mongo database'));

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
