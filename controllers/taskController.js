const Task = require('./../models/taskModel');
const factoryHandler = require('./factoryHandler');

exports.createTask = factoryHandler.createOne(Task);
