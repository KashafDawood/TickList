const express = require('express');

const authController = require('./../controllers/authController');
const notificationController = require('./../controllers/notificationController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, notificationController.findAllNotification);

router
  .route('/inviteUserToProject')
  .post(authController.protect, notificationController.inviteUserToProject);

router
  .route('/invitationResponse')
  .post(authController.protect, notificationController.invitationResponse);

module.exports = router;
