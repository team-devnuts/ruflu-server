const mysql = require("mysql");
const userQueryStore = require("./user-query");
// const logger = require('../loaders/logger');

function User() {}

User.prototype.setConnectionPool = (poolConnection) => {
  this.poolConnection = poolConnection;
};

User.prototype.getUsers = async (data) =>
  this.poolConnection.query(userQueryStore.selectUserCardList, data);

User.prototype.getUserListImages = async (data) => {
  let query = userQueryStore.selectUserAlbum;
  const bindData = [];
  data.forEach((user) => {
    query += "?,";
    bindData.push(user.user_id);
  });

  query = query.slice(0, -1);
  query += ")";
  query = mysql.format(query, bindData);

  const result = await this.poolConnection.query(query);
  return result;
};

User.prototype.getUserProfile = async (data) => {
  let query = userQueryStore.selectUserProfile;
  const bindData = [];
  data.forEach((user) => {
    query += "?,";
    bindData.push(user.user_id);
  });
  query = query.slice(0, -1);
  query += ")";
  query = mysql.format(query, bindData);

  const result = await this.poolConnection.query(query);
  return result;
};

User.prototype.insertHateUser = async (data) => {
  const [result] = await this.poolConnection.query(
    userQueryStore.insertHateUser,
    data
  );
  return result.affectedRows;
};

User.prototype.selectUser = async (data) => {
  const result = await this.poolConnection.query(
    userQueryStore.selectUser,
    data
  );
  return result;
};

User.prototype.insertUser = async (user) => {
  const [result] = await this.poolConnection.query(
    userQueryStore.insertUser,
    user
  );
  return result.affectedRows;
};

User.prototype.getUserId = async () => {
  await this.poolConnection.execute(userQueryStore.selectUserIdSequence, [
    "user_info_sequence",
  ]);
  const [result] = await this.poolConnection.execute(
    userQueryStore.selectUserId
  );
  return result[0].user_id;
};

User.prototype.insertUserProfile = async (user) => {
  const [result] = await this.poolConnection.query(
    userQueryStore.insertUserProfile,
    user
  );
  return result.affectedRows;
};

User.prototype.getUserByPhoneNumber = async (phoneNumber) => {
  const result = await this.poolConnection.query(
    userQueryStore.selectUserByPhoneNumber,
    { phone_number: phoneNumber }
  );
  return result;
};

User.prototype.getUserByKakaoSerialNo = async (kakaoSerialNo) => {
  const result = await this.poolConnection.query(
    userQueryStore.selectUserByKaKaoSerialNo,
    { kakao_serial_no: kakaoSerialNo }
  );
  return result;
};

module.exports = new User();
