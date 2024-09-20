const factoryHandler = require("./../controllers/factoryHandler");
const Project = require("./../models/projectModel");

exports.createProject = factoryHandler.createOne(Project);
exports.getProject = factoryHandler.findOne(Project);
exports.getAllProject = factoryHandler.findAll(Project, {
  path: "users.user",
  select: "name email",
});

exports.getUserProjects = factoryHandler.findUserData(Project, [
  {
    path: "users.user",
    select: "name email",
  },
]);
