const mysql =  require('mysql2/promise');
const logger = require("./logger")

const getConn = function(callback) {
    pool.getConnection(function(err, connection){
        callback(err, connection)
    });
}

const connectionDB = (dbInfo) => {
    const pool = mysql.createPool(dbInfo);
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
    
    return {
        "pool" : pool,
        "getConn" : getConn
    }
}
module.exports = connectionDB;
