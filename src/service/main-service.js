
const database = require('../loaders/database');
const mainStore = require('../models/main-model');
//const logger = require('../loaders/logger');

const updateLocation = async (data) => {
    const poolConnection = await database.getPoolConection();
    mainStore.setConnectionPool(poolConnection);
    await poolConnection.beginTransaction(); 
    const count = mainStore.updateLocation(data);
    await poolConnection.commit();
    poolConnection.release();
    return count > 0 ? 'success' : '';
};

const updateToken = async (data) => {
    const poolConnection = await database.getPoolConection();
    mainStore.setConnectionPool(poolConnection);
    await poolConnection.beginTransaction();
    const count = mainStore.updateToken(data);
    await poolConnection.commit();
    poolConnection.release();
    return count > 0 ? 'success' : '';
};

exports.mainService = {
    updateLocation, updateToken
};