// random 4 digit number generator for unique userid
exports.randomNumberGenerator = () => {
  return Math.floor(1000 + Math.random() * 9000);
};
