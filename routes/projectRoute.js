const express = require('express');

const authController = require('./../controllers/authController');
const projectController = require('./../controllers/projectController');

const router = express.Router();

router.route('/').post(authController.protect, projectController.createProject);

module.exports = router;
