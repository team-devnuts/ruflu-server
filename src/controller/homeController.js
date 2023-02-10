"use strict";
const { response } = require('../..');
const logger = require('../loaders/logger');
const {service} = require('../service/userService');

const getUsers = async (req, res) => {
    const data = {"user_id" : req.get("user_id")};
    req.responseObject.result = await service.getUsers(data);
    return req.responseObject;
};

const addHateUser = async (req, res) => {
    const userId = req.get("user_id");
    const {other_user_id} = req.body;
    const data = {"user_id": userId, "other_user_id": other_user_id};
    return await service.addHateUser(data);
};

module.exports = {
    getUsers
    ,addHateUser
};