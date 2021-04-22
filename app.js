var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var doacoesRouter = require('./routes/doacoesRouter');
var enderecoRouter = require('./routes/enderecoRouter');
var artigosRouter = require('./routes/artigosRouter');
var imagensRouter = require('./routes/imagensRouter');
var doadoresRouter = require('./routes/doadoresRouter');
var parceirosRouter = require('./routes/parceirosRouter');


var app = express(); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/artigos', artigosRouter);
app.use('/doacoes', doacoesRouter);
app.use('/enderecos', enderecoRouter);
app.use('/imagens', imagensRouter);
app.use('/doadores', doadoresRouter);
app.use('/parceiros', parceirosRouter);



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
