const mysqlPromise =  require('mysql2/promise');
const logger = require("../loaders/logger");
const config = require('../config');

const pool = mysqlPromise.createPool({
    host: config.databaseHOST,
    port: config.databasePORT,
    user: config.databaseID,
    password: config.databasePW,
    database: config.databaseNAME});

logger.info(`Connection pool created.`);

pool.on('acquire', function (connection) {
    logger.info(`Connection ${connection.threadId} acquired`);
});
  
pool.on('enqueue', function () {
    logger.info('Waiting for available connection slot');
});

pool.on('release', function (connection) {
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
const getPool = async () => {
    return pool
}

const getPoolConection =  async () => {
    const connection = await pool.getConnection(async conn => conn);
    connection.config.queryFormat = queryFormat;
    connection.on('error', handledErr);
    return connection;
}



function queryFormat(query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function (txt, key) {
        if (values.hasOwnProperty(key)) {
            return this.escape(values[key]);
        }
        return txt;
    }.bind(this));
};

function handledErr(err) {
    logger.error(`err code : ${err.code}`);
    logger.error(`err message : ${err.sqlMessage}`);
    logger.error(`sql : ${err.sql}`);
};

module.exports = {getPoolConection, getPool};

