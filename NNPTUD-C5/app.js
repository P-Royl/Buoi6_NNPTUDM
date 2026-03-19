var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var app = express();

// ===== CONNECT MONGODB =====
mongoose.connect(
"mongodb+srv://hoangphi0908336492_db_user:abc12345678@cluster0.f75tjvt.mongodb.net/NNPTUD-C5?retryWrites=true&w=majority"
)
.then(() => {
  console.log("MongoDB Atlas connected");
})
.catch((err) => {
  console.log("MongoDB connection error:", err);
});

// ===== VIEW ENGINE =====
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ===== MIDDLEWARE =====
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ===== ROUTES =====
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/auth', authRouter);

// ===== 404 =====
app.use(function(req, res, next) {
  next(createError(404));
});

// ===== ERROR HANDLER =====
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;