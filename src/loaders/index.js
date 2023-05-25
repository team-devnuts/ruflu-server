const expressLoader = require("./express");
// const mysqlLoader = require('./database');
// const config = require('../conzfig');

module.exports = async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
};
