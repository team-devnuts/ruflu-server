"use strict";
const logger = require('../loaders/logger');
const {service} = require('../service/homeService');

const getUsers = async (req, res) => {
    const userId = req.get("user_id");
    logger.info(`user_id : ${userId}`)
    const data = {"user_id" : userId};
    return await service.getUsers(data);
};

const addHateUser = async (req, res) => {
    const userId = req.get("user_id");
    const otherUserId = req.body.other_user_id;
    const data = {"user_id" : userId, "other_user_id":otherUserId};
    return await service.addHateUser(data);
};





module.exports = {
    getUsers
    ,addHateUser
};