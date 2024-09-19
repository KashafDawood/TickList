const Task = require("./../models/taskModel");
const factoryHandler = require("./factoryHandler");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createTask = factoryHandler.createOne(Task);
exports.getAllTasks = factoryHandler.findAll(Task);
exports.getTask = factoryHandler.findOne(Task);
exports.updateTask = factoryHandler.updateOne(Task);
exports.deleteTask = factoryHandler.deleteOne(Task);

exports.projectTask = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const projectId = req.body.project;
  const taskAssignBy = req.body.assignBy;

  if (!projectId) {
    return next(new AppError("Project field cannot be null", 404));
  }

  if (!taskAssignBy) {
    return next(new AppError("AssignBy feild cannot be null", 404));
  }

  const taskData = {
    user: userId,
    project: projectId,
    assignBy: taskAssignBy,
    ...req.body,
  };

  const task = await Task.create(taskData);

  res.status(201).json({
    status: "success",
    data: {
      data: task,
    },
  });
});

exports.getUserTasks = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const tasks = await Task.find({
    user: userId,
  })
    .populate({
      path: "user",
      select: "name email",
    })
    .populate({
      path: "project",
      select: "name description",
    });

  if (tasks.length === 0) {
    return next(new AppError("No tasks found for this user", 404));
  }

  res.status(200).json({
    status: "success",
    results: tasks.length,
    data: {
      tasks,
    },
  });
});
