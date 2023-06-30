const mysql = require("mysql");
const userQueryStore = require("./query/user-query");
const { getPoolConection } = require("../loaders/database");
// const { logger } = require('../loaders/logger');

class User {
  constructor(user) {
    this.user_id = user.user_id;
    this.nick_nmae = user.nick_name;
    this.login_phone_no = user.login_phone_no;
    this.email = user.email;
    this.alarm_token = user.alarm_token;
    this.kakao_serial_no = user.kakao_serial_no;
    this.location_latitude = user.location_latitude;
    this.location_longtitude = user.location_longtitude;
  }
}

User.getUsers = async (userId) => {
  const poolConnection = await getPoolConection();
  const result = await poolConnection.query(
    userQueryStore.selectUserCardList,
    userId
  );
  poolConnection.release();
  return result;
};

User.getUserListImages = async (users) => {
  const poolConnection = await getPoolConection();
  let query = userQueryStore.selectUserAlbum;
  const bindData = [];
  users.forEach((user) => {
    query += "?,";
    bindData.push(user.user_id);
  });

  query = query.slice(0, -1);
  query += ")";
  query = mysql.format(query, bindData);

  const result = await poolConnection.query(query);
  poolConnection.release();
  return result;
};

User.getUserProfile = async (users) => {
  const poolConnection = await getPoolConection();
  let query = userQueryStore.selectUserProfile;
  const bindData = [];
  users.forEach((user) => {
    query += "?,";
    bindData.push(user.user_id);
  });
  query = query.slice(0, -1);
  query += ")";
  query = mysql.format(query, bindData);

  const result = await poolConnection.query(query);
  poolConnection.release();
  return result;
};

User.createHateUser = async (user) => {
  const poolConnection = await getPoolConection();
  await poolConnection.beginTransaction();
  const [result] = await poolConnection.query(
    userQueryStore.insertHateUser,
    user
  );
  await poolConnection.commit();
  poolConnection.release();
  return result.affectedRows;
};

User.getUser = async (user) => {
  const poolConnection = await getPoolConection();
  const result = await poolConnection.query(userQueryStore.selectUser, user);
  poolConnection.release();
  return result;
};

User.create = async (user) => {
  const poolConnection = await getPoolConection();
  await poolConnection.beginTransaction();
  let [result] = await poolConnection.query(userQueryStore.insertUser, user);

  if (result.affectedRows === 0) {
    await poolConnection.rollback();
    return false;
  }

  [result] = await poolConnection.query(userQueryStore.insertUserProfile, user);

  if (result.affectedRows === 0) {
    await poolConnection.rollback();
    return false;
  }
  poolConnection.release();
  return true;
};

User.getUserId = async () => {
  const poolConnection = await getPoolConection();
  await poolConnection.execute(userQueryStore.selectUserIdSequence, [
    "user_info_sequence",
  ]);
  const [result] = await this.poolConnection.execute(
    userQueryStore.selectUserId
  );
  poolConnection.release();
  return result[0].user_id;
};

User.getUserByPhoneNumber = async (phoneNumber) => {
  const poolConnection = await getPoolConection();
  const result = await poolConnection.query(
    userQueryStore.selectUserByPhoneNumber,
    { phone_number: phoneNumber }
  );
  poolConnection.release();
  return result;
};

User.getUserByKakaoSerialNo = async (kakaoSerialNo) => {
  const poolConnection = await getPoolConection();
  const result = await poolConnection.query(
    userQueryStore.selectUserByKaKaoSerialNo,
    { kakao_serial_no: kakaoSerialNo }
  );
  poolConnection.release();
  return result;
};

module.exports = User;
