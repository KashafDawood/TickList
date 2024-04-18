const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: [40, 'A title of a task is less or equal to 40 characters'],
    required: [true, 'A task must have a title']
  },
  description: {
    type: String
  },
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
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
