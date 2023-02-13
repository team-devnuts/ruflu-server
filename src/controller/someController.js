"use strict";

const logger = require('../loaders/logger');
const { service } = require('../service/likeService');

const addLikeUser = async (req, res) => {
    const {other_user_id} = req.body;
    let data = {"user_id": req.get("user_id"), other_user_id};
    req.responseObject.result = await service.addLikeUser(data);
    return req.responseObject;
};

const getLikeMeList = async (req, res) => {
    const data = {"user_id": req.get("user_id")}
    return await service.getLikeMeList(data);
};

const getUserMatchedWithMeList =  (req, res) => {
    const data  = {"user_id": req.get("user_id")};
    req.responseObject.result = service.getUserMatchedWithMeList(data);
    return req.responseObject;
};

const addUserInMyMatchList = (req, res) => {
    const {other_user_id} = req.body;
    const data  = {"user_id": req.get("user_id"), other_user_id};
    req.responseObject = service.addUserInMyMatchList(data);
    return req.responseObject;
};

module.exports = {
    getLikeMeList
    ,addLikeUser
    ,addUserInMyMatchList
    ,getUserMatchedWithMeList
};