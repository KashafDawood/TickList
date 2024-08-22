const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    if (Model.modelName === 'Project') {
      const userId = req.user.id;

      // Create the project first to get its ID
      const projectData = {
        name: req.body.name,
        description: req.body.description,
        users: [{ user: userId, role: 'projectManager' }]
      };
      const project = await Model.create(projectData);

      // Add the project to the user's projects array
      await User.findByIdAndUpdate(userId, {
        $push: {
          projects: { project: project._id, role: 'projectManager' }
        }
      });

      res.status(201).json({
        status: 'success',
        data: {
          data: project
        }
      });
    } else {
      const userId = req.user.id;

      const reqData = {
        user: userId,
        ...req.body
      };

      const doc = await Model.create(reqData);

      res.status(201).json({
        status: 'success',
        data: {
          data: doc
        }
      });
    }
  });

exports.findAll = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.find();
    if (popOptions) query = query.populate(popOptions);
    const features = new APIFeatures(query, req.query)
      .filter()
      .sort()
      .limitFeilds();

    const doc = await features.query;

    res.status(200).json({
      status: 'success',
      result: doc.length,
      data: {
        data: doc
      }
    });
  });

exports.findOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const updatedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedDoc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: updatedDoc
      }
    });
  });

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: {
        data: null
      }
    });
  });
