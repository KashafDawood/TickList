// const catchAsync = require('./../utils/catchAsync');
// const AppError = require('./../utils/appError');
const factoryHandler = require('./../controllers/factoryHandler');
const Project = require('./../models/projectModel');

exports.createProject = factoryHandler.createOne(Project);
exports.getProject = factoryHandler.findOne(Project);
exports.getAllProject = factoryHandler.findAll(Project);
