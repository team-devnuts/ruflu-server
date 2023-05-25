const { someService } = require("../service/some-service");
// const logger = require('../loaders/logger');

const addLikeUser = async (req, res) => {
  const otherUserId = req.body.other_user_id;
  const data = { user_id: req.get("user_id"), other_user_id: otherUserId };
  await someService.addLikeUser(data);
  res.json(req.responseObject);
};

const getLikeMeList = async (req, res) => {
  const data = { user_id: req.get("user_id") };
  req.responseObject = await someService.getLikeMeList(data);
  res.json(req.responseObject);
};

const getUserMatchedWithMeList = async (req, res) => {
  const data = { user_id: req.get("user_id") };
  req.responseObject.result = await someService.getUserMatchedWithMeList(data);
  res.json(req.responseObject);
};

const addUserInMyMatchList = async (req, res) => {
  const otherUserId = req.body.other_user_id;
  const data = { user_id: req.get("user_id"), other_user_id: otherUserId };
  req.responseObject.message = await someService.addUserInMyMatchList(data);
  res.json(req.responseObject);
};

module.exports = {
  getLikeMeList,
  addLikeUser,
  addUserInMyMatchList,
  getUserMatchedWithMeList,
};
