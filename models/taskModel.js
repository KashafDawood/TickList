/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const { default: slugify } = require('slugify');

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
  }
});

// Pre-save hook to generate slug
taskSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// Pre-update hook to update slug if title changes
taskSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();
  if (update.title) {
    update.slug = slugify(update.title, { lower: true });
  }
  next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
