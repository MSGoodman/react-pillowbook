var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var statusRouter = require('./routes/status');
var nodesRouter = require('./routes/nodes');
var nodeTypesRouter = require('./routes/node_types');
var relationsRouter = require('./routes/relations');
var reviewsRouter = require('./routes/reviews');
var uploadsRouter = require('./routes/uploads');
var filesRouter = require('./routes/files');
var sessionsRouter = require('./routes/sessions');
var tasksRouter = require('./routes/tasks');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/status', statusRouter);
app.use('/nodes', nodesRouter);
app.use('/nodeTypes', nodeTypesRouter);
app.use('/relations', relationsRouter);
app.use('/reviews', reviewsRouter);
app.use('/upload', uploadsRouter);
app.use('/files', filesRouter);
app.use('/sessions', sessionsRouter);
app.use('/tasks', tasksRouter);

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
  res.render('error');
});

module.exports = app;
