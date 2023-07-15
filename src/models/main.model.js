const { getPoolConection } = require("../loaders/database");
const mainQueryStore = require("./query/main-query");

class Main {
  constructor(main) {
    this.location_latitude = main.location_latitude;
    this.location_longitude = main.location_longitude;
    this.alarm_token = main.alarm_token;
  }
}

Main.updateLocation = async (main) => {
  const poolConnection = await getPoolConection();

  await poolConnection.beginTransaction();
  const [result] = await poolConnection.query(
    mainQueryStore.updateUserLocation,
    main
  );
  await poolConnection.commit();
  poolConnection.release();
  return result.affectedRows;
};

Main.updateToken = async (main) => {
  const poolConnection = await getPoolConection();
  await poolConnection.beginTransaction();
  const [result] = await poolConnection.query(
    mainQueryStore.updateUserToken,
    main
  );
  await poolConnection.commit();
  poolConnection.release();
  return result.affectedRows;
};

Main.getAlarmTokenByUserId = async (userId) => {
  const poolConnection = await getPoolConection();
  const [result] = await poolConnection.query(
    mainQueryStore.getAlarmTokenByUserId,
    userId
  );
  poolConnection.release();
  return result[0].alarm_token;
};

module.exports = Main;
