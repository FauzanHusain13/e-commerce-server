var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require("method-override")
const session = require("express-session");
const cors = require("cors")
const flash = require("connect-flash")

// konfogurasi admin
var adminRouter = require('./app/admin/router');
var logoRouter = require("./app/logo/router")
var dashboardRouter = require('./app/dashboard/router');
var jumbotronRouter = require("./app/jumbotron/router")
var aboutRouter = require("./app/about/router")
var categoryRouter = require('./app/category/router');
var applicationRouter = require('./app/application/router');
var productRouter = require('./app/product/router');
var cartRouter = require('./app/cart/router');

// konfigurasi api
const authRouter = require("./app/auth/router")
const userRouter = require("./app/user/router")

var app = express();
const URL = "/api/v1";
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { }
}))
app.use(flash())
app.use(methodOverride("_method"))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/adminlte", express.static(path.join(__dirname, "/node_modules/admin-lte/")))

// konfigurasi halaman admin
app.use('/', adminRouter);
app.use('/logo', logoRouter);
app.use('/dashboard', dashboardRouter);
app.use('/jumbotron', jumbotronRouter);
app.use('/about', aboutRouter);
app.use('/category', categoryRouter);
app.use('/application', applicationRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);

// api
app.use(`${URL}/users`, userRouter)
app.use(`${URL}/auth`, authRouter)

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
