const mysqlPromise = require("mysql2/promise");
const { logger } = require("./logger");
const config = require("../config");

const pool = mysqlPromise.createPool({
  host: config.databaseHOST,
  port: config.databasePORT,
  user: config.databaseID,
  password: config.databasePW,
  database: config.databaseNAME,
  waitForConnections: true,
  keepAliveInitialDelay: 10000, // 0 by default.
  enableKeepAlive: true, // false by default.
});

logger.info("Connection pool created.");

pool.on("acquire", (connection) => {
  logger.info(`Connection ${connection.threadId} acquired`);
});

pool.on("enqueue", () => {
  logger.info("Waiting for available connection slot");
});

pool.on("release", (connection) => {
  logger.info(`Connection ${connection.threadId} released`);
});

/*
const pool = connectionDB({
    host: config.databaseHOST,
    port: config.databasePORT,
    user: config.databaseID,
    password: config.databasePW,
    database: config.databaseNAME});
*/

function queryFormat(query, values) {
  if (!values) return query;
  // eslint-disable-next-line
  return query.replace(/\:(\w+)/g, (txt, key) => {
    // eslint-disable-next-line
    if (values.hasOwnProperty(key)) {
      return this.escape(values[key]);
    }
    return txt;
  });
}

function handledErr(err) {
  logger.error(`err code : ${err.code}`);
  logger.error(`err message : ${err.sqlMessage}`);
  logger.error(`sql : ${err.sql}`);
}

const getPoolConection = async () => {
  const connection = await pool.getConnection(async (conn) => conn);
  connection.config.queryFormat = queryFormat;
  connection.on("error", handledErr);
  return connection;
};

module.exports = { getPoolConection, pool };
