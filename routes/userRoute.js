const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/signup").post(authController.signUp);
router.route("/login").post(authController.login);
router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/resetPassword/:token").post(authController.resetPassword);

router.use(authController.protect);

router.route("/updateMe").post(userController.updateMe);
router.route("/deleteMe").post(userController.deleteMe);
router.route("/updatePassword").post(authController.updatePassword);

router.route("/getUserProjects").get(userController.getUserProjects);

router.route("/").get(userController.getAllUsers);

module.exports = router;
