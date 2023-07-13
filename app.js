const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const { Prisma } = require('@prisma/client');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404));
// });

// error handler
app.use((err, req, res, next) => {
  // return the error
  console.log({...err});
  const errorMessage = err?.meta?.cause || err?.message || null;

  if (err instanceof Prisma.NotFoundError) {
    res.status(404).json({ error: errorMessage })
  }

  res.status(err.status || 500).json({ error: errorMessage || 'An error occurred' });
});

module.exports = app;
