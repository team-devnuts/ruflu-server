const Some = require("../models/some.model");

const getLikeMeList = async (data) => {
  const responseObj = { code: "200", message: "><" };
  const some = new Some(data);
  const [rows] = await Some.selectLikeMeList(some);

  responseObj.result = rows;
  return responseObj;
};

const addLikeUser = async (data) => {
  let result = {};
  const some = new Some(data);
  const count = await Some.insertLikeUser(some);

  if (count > 0) {
    result = { sucess: false };
    return result;
  }

  const [rows] = await Some.selectLikeMeUser(data);

  if (rows.length > 0) {
    await Some.insertMatchUser(data);
    result = { sucess: true, alarm: "match" };
  } else {
    result = { sucess: true, alarm: "like" };
  }

  return result;
};

const getUserMatchedWithMeList = async (data) => {
  const some = new Some(data);
  const [rows] = await Some.selectMatchList(some);
  return rows;
};

const addUserInMyMatchList = async (data) => {
  const some = new Some(data);
  const result = await Some.insertMatchUser(some);
  return result > 0 ? "success" : "";
};

exports.someService = {
  getLikeMeList,
  addLikeUser,
  getUserMatchedWithMeList,
  addUserInMyMatchList,
};
