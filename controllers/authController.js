/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');
const AppError = require('../utils/appError');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // removing password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  // check the email and password provided
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new AppError('Please provide email and password to login!', 401)
    );
  }

  // check the user exit and the password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // if everything ok then send the token
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // getting the token and check if it is there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in, Please login to get access!')
    );
  }

  // verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // check for user still exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belong to that token is no longer exist', 401)
    );
  }

  // check if the user change password after token issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // if everything ok then return the user
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return new AppError(
        'You dont have permission to perform this action',
        403
      );
    }
    next();
  };
};
