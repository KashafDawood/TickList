const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');
const factoryHandler = require('./factoryHandler');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password update, Please use /updateMyPassword!',
        400
      )
    );
  }

  // // Check if the new email already exists in the database
  // const { email } = req.body;
  // const existingUser = await User.findOne({ email });
  // if (existingUser) {
  //   return next(
  //     new AppError('Email already exists. Please use a different email.', 400)
  //   );
  // }

  // Update user document
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      updatedUser
    }
  });
});

exports.getAllUsers = factoryHandler.findAll(User);
