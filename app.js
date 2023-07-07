const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { Prisma } = require('@prisma/client');

const indexRouter = require('./routes/index');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const error = err || 'An error occurred';
  let statusCode = err.status || 500;

  if (err instanceof Prisma.NotFoundError) {
    statusCode = 404;
  }

  res.status(statusCode).json({ error });
});

module.exports = app;
