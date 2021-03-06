var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const recipesRouter = require('./routes/recipes');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary');
const cors = require('cors');

var app = express();

require('mongoose').model;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine('hbs', hbs({

  extname: 'hbs',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views'
}));

cloudinary.config({
  cloud_name: process.env.API_CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

app.use(cors({
  exposedHeaders:"auth"
}));

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ limit: "10mb", extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/api/recipes', recipesRouter);
app.use('/api/users', usersRouter);
///
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));
///


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { err: err });
});

module.exports = app;