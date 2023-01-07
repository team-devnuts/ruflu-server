const mysqlPromise =  require('mysql2/promise');
const logger = require("./logger");
const config = require('../config');
const mysql = require('mysql');

const connectionDB =  async (dbInfo) => {
    
    const pool = mysqlPromise.createPool(dbInfo);
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
    
    mysql.config.queryFormat = function (query, values) {
        if (!values) return query;
        return query.replace(/\:(\w+)/g, function (txt, key) {
            if (values.hasOwnProperty(key)) {
                return this.escape(values[key]);
            }
            return txt;
        }.bind(this));
    };
}

const getPoolConection =  async function(callback) {
    pool.getConnection(function(err, connection){
        callback(err, connection)
    });
}

const getPool = async () => {
    return pool
}

connectionDB({
    host: config.databaseHOST,
    port: config.databasePORT,
    user: config.databaseID,
    password: config.databasePW,
    database: config.databaseNAME})

module.exports = {getPoolConection, getPool, mysql};

