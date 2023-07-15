const expressLoader = require("./express");
const { logger } = require("./logger");
const mongooseLoader = require("./mongoose");
// const mysqlLoader = require('./database');
// const config = require('../conzfig');

module.exports = async ({ expressApp }) => {
  const connection = await mongooseLoader();
  logger.info("mongoose loaded and connected");

  await expressLoader({ app: expressApp });
};
