const express = require('express');

const authController = require('./../controllers/authController');
const projectController = require('./../controllers/projectController');

const router = express.Router();

router
  .route('/')
  .post(authController.protect, projectController.createProject)
  .get(authController.protect, projectController.getAllProject);

router
  .route('/userProjects')
  .get(authController.protect, projectController.getUserProjects);

router.route('/:id').get(authController.protect, projectController.getProject);

module.exports = router;
