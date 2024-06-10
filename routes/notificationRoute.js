const express = require('express');

const authController = require('./../controllers/authController');
const notificationController = require('./../controllers/notificationController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, notificationController.findAllnotification);

router
  .route('/inviteUserToProject')
  .post(authController.protect, notificationController.inviteUserToProject);

module.exports = router;
