const User = require('./../models/userModel');
const factoryHandler = require('./factoryHandler');

exports.getAllUsers = factoryHandler.findAll(User);
