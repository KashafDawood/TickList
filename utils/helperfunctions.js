const slugify = require('slugify');

// random 4 digit number generator for unique userid
exports.randomNumberGenerator = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

// Pre-save hook to generate slug
exports.generateSlug = (schema, feild) => {
  schema.pre('save', function(next) {
    this.slug = slugify(this[feild], { lower: true });
    next();
  });
};

// Pre-update hook to update slug if feild changes
exports.updateSlug = (schema, feild) => {
  schema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();
    if (update[feild]) {
      update.slug = slugify(update[feild], { lower: true });
    }
    next();
  });
};
