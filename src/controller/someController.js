"use strict";

const logger = require('../loaders/logger');
const { someService } = require('../service/some-service');

const addLikeUser = async (req, res) => {
    const {other_user_id} = req.body;
    let data = {"user_id": req.get("user_id"), other_user_id};
    await someService.addLikeUser(data);
    return req.responseObject;
};

const getLikeMeList = async (req, res) => {
    const data = {"user_id": req.get("user_id")};
    req.responseObject = await someService.getLikeMeList(data);
    return req.responseObject;
};

const getUserMatchedWithMeList = async (req, res) => {
    const data = {"user_id": req.get("user_id")};
    req.responseObject.result = await someService.getUserMatchedWithMeList(data);
    return req.responseObject;
};

const addUserInMyMatchList = async (req, res) => {
    const {other_user_id} = req.body;
    const data = {"user_id": req.get("user_id"), other_user_id};
    await someService.addUserInMyMatchList(data);
    return req.responseObject;
};

module.exports = {
    getLikeMeList
    ,addLikeUser
    ,addUserInMyMatchList
    ,getUserMatchedWithMeList
};