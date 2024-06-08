const mongoose = require('mongoose');

const helperfunctions = require('./../utils/helperfunctions');

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
  slug: String,
  users: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      role: {
        type: String,
        enum: ['projectManager', 'member'],
        required: true
      }
    }
  ]
});

// create slug
helperfunctions.generateSlug(projectSchema, 'name');
//update slug if name change
helperfunctions.updateSlug(projectSchema, 'name');

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
