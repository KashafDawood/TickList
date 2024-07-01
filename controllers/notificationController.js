/* eslint-disable no-console */
const Notification = require('./../models/notificaitonModel');
const User = require('./../models/userModel');
const Project = require('./../models/projectModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factoryHandler = require('./../controllers/factoryHandler');
const socket = require('../socket');

const createNotification = async (
  type,
  sender,
  receiver,
  task,
  project,
  message
) => {
  try {
    const notification = await Notification.create({
      type,
      sender,
      receiver,
      task,
      project,
      message,
      status: 'pending'
    });

    const io = socket.getIO();
    io.to(receiver.toString()).emit('notification', notification);

    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

exports.findAllNotification = factoryHandler.findAll(Notification);

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

  const message = `You have been invited to join the project: ${project.name} by ${req.user.name}`;

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

exports.invitationResponse = catchAsync(async (req, res, next) => {
  const { notificationId, response } = req.body;
  const userId = req.user.id;

  // Find and update the notification
  const notification = await Notification.findByIdAndUpdate(
    notificationId, // Use the notificationId directly
    { status: response, readAt: Date.now() },
    { new: true }
  ).populate('project'); // Populate the 'project' field

  // Check if the notification was found and belongs to the user
  if (
    !notification ||
    notification.receiver.toString() !== userId ||
    notification.type !== 'projectInvitation'
  ) {
    return next(new AppError('No such Invitation found', 404));
  }

  // If the response is accepted, add the user to the project and update the user's projects list
  if (response === 'accepted') {
    await Project.findByIdAndUpdate(notification.project._id, {
      $push: { users: { user: userId, role: 'member' } }
    });

    await User.findByIdAndUpdate(userId, {
      $push: { projects: { project: notification.project._id, role: 'member' } }
    });
  }

  // Send the response back to the client
  res.status(200).json({
    status: 'success',
    data: {
      notification
    }
  });
});
