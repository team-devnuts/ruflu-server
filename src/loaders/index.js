const mysqlLoader = require('./database');
const expressLoader = require('./express');
const config = require('../config');

module.exports = async ({ expressApp }) => {
    
    await expressLoader({ app : expressApp })

}