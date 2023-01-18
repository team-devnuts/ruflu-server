"use strict";
const {service} = require('../service/homeService');
const request = require('request');

const getCards = async (req, res) => {
    const userId = req.get("user_id");
    const data = {"userId" : userId};
    return await service.getCards(data);
};

const addHateUser = async (req, res) => {
    const userId = req.get("user_id");
    const toUserId = req.body.to_user_id;
    const data = {userId, toUserId};
    return await service.addHateUser(data);
};

const addLikeUser = async (req, res) => {
    const userId = req.get("user_id");
    const toUserId = req.body.to_user_id;
    let data = {userId, toUserId};
    return await service.addLikeUser(data);
};

const getLikeMeList = async (req, res) => {
    const data = {toUserId:req.get("user_id")}
    return await service.getLikeMeList(data);
};

const getUserMatchedWithMeList =  (req, res) => {
    const userId = req.get("user_id");
    const data  = [userId, userId];
    return service.getUserMatchedWithMeList(data);
};

const addUserInMyMatchList = (req, res) => {
    const toUserId = req.get("userId");
    const userId = req.get("user_id");
    const data  = [toUserId, userId];
    return service.addUserInMyMatchList(data);
};

module.exports = {
    getCards
    ,addHateUser
    ,addLikeUser
    ,getLikeMeList
    ,getUserMatchedWithMeList
    ,addUserInMyMatchList
};