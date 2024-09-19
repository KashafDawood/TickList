const express = require("express");
const taskController = require("./../controllers/taskController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/projectTask")
  .post(authController.protect, taskController.projectTask);

router
  .route("/getUserTasks")
  .get(authController.protect, taskController.getUserTasks);

router
  .route("/")
  .post(authController.protect, taskController.createTask)
  .get(taskController.getAllTasks);

router
  .route("/:id")
  .get(taskController.getTask)
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;
