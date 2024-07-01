const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  task: {
    type: mongoose.Schema.ObjectId,
    ref: 'Task'
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project'
  },
  message: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  readAt: Date
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
