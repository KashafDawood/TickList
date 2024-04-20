const express = require('express');
const taskController = require('./../controllers/taskController');

const router = express.Router();

router
  .route('/')
  .post(taskController.createTask)
  .get(taskController.getAllTasks);

router.route('/:id').get(taskController.getTask);

module.exports = router;
