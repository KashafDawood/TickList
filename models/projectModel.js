const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: [40, 'Project name must be less than 40 characters'],
    required: [true, 'Project must have a name']
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  projectManager: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  admin: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      maxLength: [2, 'A Project can have only 2 Admins']
    }
  ],
  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
