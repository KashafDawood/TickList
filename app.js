/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const morgan = require('morgan');

const taskRouter = require('./routes/taskroute');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// body parser
app.use(express.json());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.use('/api/v1/tasks', taskRouter);

app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);

  err.status = 'fail';
  err.statusCode = 404;

  next(err);
});

app.use(globalErrorHandler);
// app.use((err, req, res, next) => {
//   //defining error status code
//   err.statusCode = err.statusCode || 500;
//   //defining error status
//   err.status = err.status || 'error';

//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message
//   });
// });

module.exports = app;
