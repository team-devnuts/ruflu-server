const { default: mongoose } = require("mongoose");
const config = require("../config");

mongoose.set("strictQuery", true);

module.exports = async () => {
  const connection = await mongoose.connect(config.mongooseURL);
  return connection;
};
