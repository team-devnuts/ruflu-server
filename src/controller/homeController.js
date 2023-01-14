"use strict";

const {service} = require('../service/homeService');

const getCards = async (req, res) => {
    const userId = req.get("user_id");
    const data = {"userId" : userId};
    return await service.getCards(data);
};

const addHateUser = (req, res) => {
    
};

const addLikeUser = (req, res) => {

};

const getLikeMeList = (req, res) => {

};

const getUserMatchedWithMeList =  (req, res) => {

};

const addUserInMyMatchListUserCase = (req, res) => {

};

module.exports = {
    getCards
    ,addHateUser
    ,addLikeUser
    ,getLikeMeList
    ,getUserMatchedWithMeList
    ,addUserInMyMatchListUserCase
};