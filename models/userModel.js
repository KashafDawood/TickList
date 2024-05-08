/* eslint-disable no-new */
/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const slugify = require('slugify');
const crypto = require('crypto');

const helperfunctions = require('./../utils/helperfunctions');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  userID: {
    type: Number,
    unique: true,
    maxlength: 4,
    default: helperfunctions.randomNumberGenerator
  },
  email: {
    type: String,
    required: [true, 'User must have a email!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email!']
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!'],
    validate: {
      validator: function(passwordConfirm) {
        return passwordConfirm === this.password;
      },
      message: 'Password are not the same!'
    }
  },
  slug: String,
  role: {
    type: String,
    enum: ['Project Manager', 'Admin', 'User'],
    default: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  passwordChangedAt: String,
  passwordResetExpire: Date,
  passwordResetToken: String
});

// Password encryption middleware
userSchema.pre('save', async function(next) {
  // if password is not modified
  if (!this.isModified('password')) return next();

  // encryption
  this.password = await bcrypt.hash(this.password, 12);
  // delete the confirm password after confirmation
  this.passwordConfirm = undefined;

  next();
});

///////////////// MONGOOSE MIDDLEWARE ///////////////////////

// generate slug
userSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// update slug if title changes
userSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name, { lower: true });
  }
  next();
});

// passwordchangedat
userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  // subtracting 1 sec as sometime it get delay
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// filter the active user only
userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

// ==================================================================================

// INSTANCE METHODS
// correct password checker
userSchema.methods.correctPassword = async function(
  canidatePassword,
  userPassword
) {
  return await bcrypt.compare(canidatePassword, userPassword);
};

// check for change password after token issue
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangeAt) {
    //change the passwordchangeat timestamp
    const changedTimestamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

// password resetToken
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
