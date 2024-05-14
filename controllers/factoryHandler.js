const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    if (Model.modelName === 'Project') {
      req.body.projectManager = req.user.id;
    }

    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.findAll = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    const user = req.user.id;
    let query = Model.find({
      $or: [{ projectManager: user }, { members: { $in: [user] } }]
    });
    if (popOptions) query = query.populate(popOptions);
    console.log('Query:', query.getQuery());
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
