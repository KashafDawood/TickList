const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('./../models/userModel');
const Project = require('./../models/projectModel');
const Invitation = require('./../models/invitationModel');

exports.sendProjectInvitation = catchAsync(async (req, res, next) => {
  //check the receiver exist
  const receiver = await User.findById(req.body.receiver);
  if (!receiver) {
    return next(new AppError('There is no user with this ID', 404));
  }

  //check for project
  const project = await Project.findById(req.body.project);
  if (!project) {
    return next(new AppError('There is no project with this ID', 404));
  }

  //set sender
  const invitation = await Invitation.create({
    sender: req.user.id,
    receiver: receiver,
    project: project
  });

  res.status(201).json({
    status: 'success',
    message: `Request has been sent to ${receiver.name} for ${project.name} Project`,
    data: {
      invitation
    }
  });
});
