const { getPoolConection } = require("../loaders/database");
const someQueryStore = require("./query/some-query");
// const mysql = require('mysql');

class Some {
  constructor(some) {
    this.user_id = some.user_id;
    this.other_user_id = some.other_user_id;
  }
}

Some.insertLikeUser = async (some) => {
  const poolConnection = await getPoolConection();

  await poolConnection.beginTransaction();
  const [result] = await poolConnection.query(
    someQueryStore.insertLikeUser,
    some
  );
  await poolConnection.commit();
  poolConnection.release();
  return result.affectedRows;
};

Some.selectLikeMeUser = async (some) => {
  const poolConnection = await getPoolConection();
  const result = await poolConnection.query(
    someQueryStore.selectLikeMeUser,
    some
  );
  poolConnection.release();
  return result;
};

Some.selectLikeMeList = async (some) => {
  const poolConnection = await getPoolConection();
  const result = await poolConnection.query(
    someQueryStore.selectLikeMeList,
    some
  );
  poolConnection.release();
  return result;
};

Some.insertMatchUser = async (some) => {
  const poolConnection = await getPoolConection();

  await poolConnection.beginTransaction();
  const [result] = await poolConnection.query(
    someQueryStore.insertMatchUser,
    some
  );
  await poolConnection.commit();
  poolConnection.release();
  return result.affectedRows;
};

Some.selectMatchList = async (some) => {
  const poolConnection = await getPoolConection();
  const result = await poolConnection.query(
    someQueryStore.selectMatchList,
    some
  );
  poolConnection.release();
  return result;
};

module.exports = Some;
