/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const morgan = require('morgan');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('Hello from ticklist app');
});

module.exports = app;
