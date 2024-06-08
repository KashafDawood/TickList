const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factoryHandler = require('./../controllers/factoryHandler');
const Project = require('./../models/projectModel');

exports.createProject = factoryHandler.createOne(Project);
exports.getProject = factoryHandler.findOne(Project);
exports.getAllProject = factoryHandler.findAll(Project, {
  path: 'users.user',
  select: 'name email'
});

exports.getUserProjects = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const projects = await Project.find({
    'users.user': { $in: [userId] }
  })
    .lean()
    .populate({
      path: 'users.user',
      select: 'name email'
    });

  if (!projects || projects.length === 0) {
    return next(new AppError('No projects found for this user', 404));
  }

  res.status(200).json({
    status: 'success',
    results: projects.length,
    data: {
      projects
    }
  });
});
