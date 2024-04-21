/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const slugify = require('slugify');

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
    minlength: 8
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
  slug: String
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

// Pre-save hook to generate slug
userSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Pre-update hook to update slug if title changes
userSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name, { lower: true });
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
