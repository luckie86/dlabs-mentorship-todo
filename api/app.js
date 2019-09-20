var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var dbHelper = require('./private/DBHelper');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users/users');
var registerRouter = require('./routes/auth/register/register');
var loginRouter = require('./routes/auth/login/login');
var todoRoute = require('./routes/todo/todo');

var app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended:false}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


setTimeout(()=> {
    dbHelper.getModel()
}, 200)

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth/register', registerRouter);
app.use('/auth/login', loginRouter);
app.use('/todo', todoRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err);

    // render the error page
    res.status(err.status || 500);
    //res.render('error');
    res.write(JSON.stringify(err));
    res.end();
    next();
});

module.exports = app;
