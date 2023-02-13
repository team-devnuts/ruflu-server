"use strict";

const logger = require('../loaders/logger');
const { service } = require('../service/likeService');

const addLikeUser = async (req, res) => {
    const {other_user_id} = req.body;
    let data = {"user_id": req.get("user_id"), other_user_id};
    await service.addLikeUser(data);
    return req.responseObject;
};

const getLikeMeList = async (req, res) => {
    const data = {"user_id": req.get("user_id")};
    req.responseObject = await service.getLikeMeList(data);
    return req.responseObject;
};

const getUserMatchedWithMeList = async (req, res) => {
    const data = {"user_id": req.get("user_id")};
    req.responseObject.result = await service.getUserMatchedWithMeList(data);
    return req.responseObject;
};

const addUserInMyMatchList = async (req, res) => {
    const {other_user_id} = req.body;
    const data = {"user_id": req.get("user_id"), other_user_id};
    await service.addUserInMyMatchList(data);
    return req.responseObject;
};

module.exports = {
    getLikeMeList
    ,addLikeUser
    ,addUserInMyMatchList
    ,getUserMatchedWithMeList
};