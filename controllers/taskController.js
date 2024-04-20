const Task = require('./../models/taskModel');
const factoryHandler = require('./factoryHandler');

exports.createTask = factoryHandler.createOne(Task);
exports.getAllTasks = factoryHandler.findAll(Task);
exports.getTask = factoryHandler.findOne(Task);
exports.updateTask = factoryHandler.updateOne(Task);
exports.deleteTask = factoryHandler.deleteOne(Task);
