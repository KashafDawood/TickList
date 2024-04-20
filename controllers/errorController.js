module.exports = (err, req, res, next) => {
  // defining error status code
  err.statuCode = err.statusCode || 500;
  // defining error status
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};
