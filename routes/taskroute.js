const express = require('express');
const taskController = require('./../controllers/taskController');

const router = express.Router();

router.route('/createTask').get(taskController.createTask);

module.exports = router;
