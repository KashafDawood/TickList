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
    // destructuring the query to a new variable for not losing data
    const queryObj = { ...req.query };
    // excluded feilds that we will implement later
    const excludeFeilds = ['sort', 'feilds', 'limit', 'page'];
    excludeFeilds.forEach(el => delete queryObj[el]);

    // converting the queryObj to string so we can apply replace function to add $ with (gt|gte|lt|lte)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

    const docs = await Model.find(JSON.parse(queryStr));

    res.status(200).json({
      status: 'success',
      result: docs.length,
      data: {
        data: docs
      }
    });
  });

exports.findOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    // if (!doc) {
    //   return next('No doc found with this id');
    // }

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

    // if (!doc) {
    //   return next('No doc found with this id');
    // }

    res.status(200).json({
      status: 'success',
      data: {
        data: updatedDoc
      }
    });
  });

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    await Model.findByIdAndDelete(req.params.id);

    // if (!doc) {
    //   return next('No doc found with this id');
    // }

    res.status(204).json({
      status: 'success',
      data: {
        data: null
      }
    });
  });
