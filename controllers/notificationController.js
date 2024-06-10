const Notificaiton = require('./../models/notificaitonModel');
const User = require('./../models/userModel');
const Project = require('./../models/projectModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factoryHandler = require('./../controllers/factoryHandler');
const server = require('./../server');
const Notification = require('./../models/notificaitonModel');

const createNotification = catchAsync(
  async (type, sender, receiver, task, project, message) => {
    const notification = await Notificaiton.create({
      type,
      sender,
      receiver,
      task,
      project,
      message,
      status: 'pending'
    });

    server.io.to(receiver.toString()).emit('notification', notification);

    return notification;
  }
);

exports.findAllnotification = factoryHandler.findAll(Notification);

exports.inviteUserToProject = catchAsync(async (req, res, next) => {
  const { userId, projectId } = req.body;
  const senderId = req.user.id;

  const user = await User.findById(userId);
  const project = await Project.findById(projectId);

  if (!user) {
    return next(new AppError('User not found', 404));
  }
  if (!project) {
    return next(new AppError('Project not found', 404));
  }

  const message = `You have been invited to join a Project: ${project.name}`;
  await createNotification(
    'projectInvitation',
    senderId,
    userId,
    null,
    projectId,
    message
  );

  res.status(202).json({
    status: 'success',
    message: 'Invitation sent successfully'
  });
});
