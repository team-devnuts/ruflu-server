"use strict";
const database = require(process.env.PWD + '/src/loaders/database');
const mainStore = require('../models/main-model');
const logger = require(process.env.PWD + '/src/loaders/logger');

const updateLocation = async (data) => {
    const poolConnection = await database.getPoolConection();
    mainStore.setConnectionPool(poolConnection);
    await poolConnection.beginTracsaction(); 
    const result = mainStore.updateLocation(data);
    await poolConnection.commit();
    poolConnection.release();
    return count > 0 ? 'success' : '';
};

const updateToken = async (data) => {
    const poolConnection = await database.getPoolConection();
    mainStore.setConnectionPool(poolConnection);
    await poolConnection.beginTracsaction();
    const result = mainStore.updateToken(data);
    await poolConnection.commit();
    poolConnection.release();
    return count > 0 ? 'success' : '';
};

exports.service = {
    updateLocation, updateToken
};