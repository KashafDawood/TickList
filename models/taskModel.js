/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');

const helperfunctions = require('./../utils/helperfunctions');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: [40, 'A title of a task is less or equal to 40 characters'],
    required: [true, 'A task must have a title']
  },
  description: String,
  slug: String,
  category: {
    type: String,
    enum: ['General', 'Personal', 'Work', 'Study'],
    default: 'General'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Low'
  },
  status: {
    type: String,
    enum: ['Todo', 'InProgress', 'Incomplete'],
    default: 'Todo'
  },
  deadline: {
    type: Date,
    default: null,
    validate: {
      validator: function(value) {
        return value === null || value >= Date.now();
      },
      message: 'Deadline must be in the future or null'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  assignBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// Pre-save hook to generate slug
helperfunctions.generateSlug(taskSchema, 'title');

// Pre-update hook to update slug if title changes
helperfunctions.updateSlug(taskSchema, 'title');

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
