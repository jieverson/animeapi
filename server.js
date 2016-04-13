module.exports = process.env.ANIMEAPI_COV
  ? require('./lib-cov/app')
  : require('./lib/app')