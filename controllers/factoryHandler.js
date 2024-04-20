const catchAsync = require('./../utils/catchAsync');

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.findAll = Model =>
  catchAsync(async (req, res, next) => {
    const docs = await Model.find();

    res.status(200).json({
      status: 'success',
      result: docs.length,
      data: {
        data: docs
      }
    });
  });
