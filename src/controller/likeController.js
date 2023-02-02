"use strict";

const logger = require('../loaders/logger');
const { service } = require('../service/likeService');

const addLikeUser = async (req, res) => {
    const userId = req.get("user_id");
    const otherUserId = req.body.other_user_id;
    logger.debug(req.body);
    let data = {"user_id": userId, "other_user_id" : otherUserId};
    // return {};
    return await service.addLikeUser(data);
};

const getLikeMeList = async (req, res) => {
    const data = {"user_id":req.get("user_id")}
    return await service.getLikeMeList(data);
};

const getUserMatchedWithMeList =  (req, res) => {
    const userId = req.get("user_id");
    const data  = {"user_id": userId};
    return service.getUserMatchedWithMeList(data);
};

const addUserInMyMatchList = (req, res) => {
    const userId = req.get("user_id");
    const otherUserId = req.get("other_user_id");
    const data  = {"other_user_id": otherUserId, "user_id": userId};
    return service.addUserInMyMatchList(data);
};



module.exports = {
    getLikeMeList
    ,addLikeUser
    ,addUserInMyMatchList
    ,getUserMatchedWithMeList
};