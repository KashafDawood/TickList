const express = require('express');

const authController = require('./../controllers/authController');
const invitationController = require('./../controllers/invitationController');

const router = express.Router();

router
  .route('/')
  .post(authController.protect, invitationController.sendProjectInvitation);

module.exports = router;
