const { mainService } = require("../service/main.service");
const { userService } = require("../service/user.service");

const updateLocation = async (req, res) => {
  const { latitude, longitude } = req.body;
  const userId = req.get("user_id");
  const data = { latitude, longitude, user_id: userId };
  req.responseObject.result = await mainService.updateLocation(data);
  res.json(req.responseObject);
};

const updateToken = async (req, res) => {
  const { token } = req.body;
  const data = { token, user_id: req.get("user_id") };
  req.responseObject.result = await mainService.updateToken(data);
  res.json(req.responseObject);
};

const getUserDetail = async (req, res) => {
  req.responseObject.result = await userService.getUserDetail({
    user_id: req.params.user_id,
  });
  res.json(req.responseObject);
};

module.exports = {
  updateLocation,
  updateToken,
  getUserDetail,
};
