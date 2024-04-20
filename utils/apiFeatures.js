class apiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // destructuring the query to a new variable for not losing data
    const queryObj = { ...this.queryString };
    // excluded feilds that we will implement later
    const excludeFeilds = ['sort', 'feilds', 'limit', 'page'];
    excludeFeilds.forEach(el => delete queryObj[el]);

    // converting the queryObj to string so we can apply replace function to add $ with (gt|gte|lt|lte)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }
}

module.exports = apiFeatures;
