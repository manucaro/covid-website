const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const swaggerUi = require('swagger-ui-express');
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");

/* SWAGGER */

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Covid Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application that is gonna be use for a front end made with Express and documented with Swagger by Manu Caro and Carmen Fernández",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      }
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  apis: ["./app_api/routes/index.js"],
};

require('./app_api/models/db');

var indexRouter = require('./app_server/routes/index');
var apiRouter = require('./app_api/routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/api', apiRouter);

const specs = swaggerJsdoc(options);
app.use(
  "/api/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

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
