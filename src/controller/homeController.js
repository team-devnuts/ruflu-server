"use strict";
const logger = require('../loaders/logger');
const {userService} = require('../service/user-service');

const getUsers = async (req, res) => {
    const data = {"user_id" : req.get("user_id")};
    req.responseObject.result = await userService.getUsers(data);
    return req.responseObject;
};

const addHateUser = async (req, res) => {
    const {other_user_id} = req.body;
    const data = {"user_id": req.get("user_id"), "other_user_id": other_user_id};
    await userService.addHateUser(data);
    return req.responseObject;
};

module.exports = {
    getUsers
    ,addHateUser
};