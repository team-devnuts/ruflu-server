const database = require("../loaders/database");
const { Some } = require("../models/some-model");

const getLikeMeList = async (data) => {
  const responseObj = { code: "200", message: "><" };
  const poolConnection = await database.getPoolConection();
  const someStore = new Some(poolConnection);
  const [rows] = await someStore.selectLikeMeList(data);

  responseObj.result = rows;
  poolConnection.release();
  return responseObj;
};

const addLikeUser = async (data) => {
  const poolConnection = await database.getPoolConection();
  const someStore = new Some(poolConnection);
  poolConnection.beginTransaction();
  const count = await someStore.insertLikeUser(data);

  let result = {};

  if (count > 0) {
    result = { sucess: false };
    return result;
  }
  const [rows] = await someStore.selectLikeMeUser(data);

  if (rows.length > 0) {
    await someStore.insertMatchUser(data);
    result = { sucess: true, alarm: "match" };
  } else {
    result = { sucess: true, alarm: "like" };
  }

  await poolConnection.commit();
  poolConnection.release();

  return result;
};

const getUserMatchedWithMeList = async (data) => {
  const poolConnection = await database.getPoolConection();
  const someStore = new Some(poolConnection);
  const [rows] = await someStore.selectMatchList(data);
  poolConnection.release();
  return rows;
};

const addUserInMyMatchList = async (data) => {
  const poolConnection = await database.getPoolConection();
  const someStore = new Some(poolConnection);
  await poolConnection.beginTransaction();
  const result = await someStore.insertMatchUser(data);
  await poolConnection.commit();
  poolConnection.release();
  return result > 0 ? "success" : "";
};

exports.someService = {
  getLikeMeList,
  addLikeUser,
  getUserMatchedWithMeList,
  addUserInMyMatchList,
};
