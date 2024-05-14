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
  projectManager: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ]
});

// create slug
helperfunctions.generateSlug(projectSchema, 'name');
//update slug if name change
helperfunctions.updateSlug(projectSchema, 'name');

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
