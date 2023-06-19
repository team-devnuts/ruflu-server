const Main = require("../models/main.model");
// const { logger } = require('../loaders/logger');

const updateLocation = async (data) => {
  const count = await Main.updateLocation(data);
  return count > 0 ? "success" : "failed";
};

const updateToken = async (data) => {
  const count = await Main.updateToken(data);
  return count > 0 ? "success" : "failed";
};

exports.mainService = {
  updateLocation,
  updateToken,
};
