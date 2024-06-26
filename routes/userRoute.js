const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/signup').post(authController.signUp);
router.route('/login').post(authController.login);
router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').post(authController.resetPassword);
router.route('/updateMe').post(authController.protect, userController.updateMe);
router.route('/deleteMe').post(authController.protect, userController.deleteMe);
router
  .route('/updatePassword')
  .post(authController.protect, authController.updatePassword);

router
  .route('/getUserProjects')
  .get(authController.protect, userController.getUserProjects);

router.route('/').get(authController.protect, userController.getAllUsers);

module.exports = router;
