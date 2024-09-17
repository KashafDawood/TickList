const express = require("express");

const authController = require("./../controllers/authController");
const notificationController = require("./../controllers/notificationController");

const router = express.Router();

router.use(authController.protect);

router.route("/").get(notificationController.findAllNotification);

router
  .route("/inviteUserToProject")
  .post(notificationController.inviteUserToProject);

router
  .route("/invitationResponse")
  .post(notificationController.invitationResponse);

module.exports = router;
