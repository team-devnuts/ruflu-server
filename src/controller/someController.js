"use strict";

const logger = require('../loaders/logger');
const { service } = require('../service/likeService');

const addLikeUser = async (req, res) => {
    const user_id = req.get("user_id");
    const {other_user_id} = req.body;

    let data = {user_id, other_user_id};
    return await service.addLikeUser(data);
};

const getLikeMeList = async (req, res) => {
    const data = {"user_id": req.get("user_id")}
    return await service.getLikeMeList(data);
};

const getUserMatchedWithMeList =  (req, res) => {
    const user_id = req.get("user_id");
    const data  = {user_id};
    return service.getUserMatchedWithMeList(data);
};

const addUserInMyMatchList = (req, res) => {
    const user_id = req.get("user_id");
    const {other_user_id} = req.body;
    const data  = {user_id, other_user_id};
    return service.addUserInMyMatchList(data);
};

module.exports = {
    getLikeMeList
    ,addLikeUser
    ,addUserInMyMatchList
    ,getUserMatchedWithMeList
};