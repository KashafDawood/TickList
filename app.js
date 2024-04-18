/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const morgan = require('morgan');

const taskRouter = require('./routes/taskroute');

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

module.exports = app;
