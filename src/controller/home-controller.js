const {userService} = require('../service/user-service');
//  const logger = require('../loaders/logger');

const getUsers = async (req, res) => {
    const data = {"user_id" : req.get("user_id")};
    req.responseObject.result = await userService.getUsers(data);
    res.json(req.responseObject);
};

const addHateUser = async (req, res) => {
    const otherUserId = req.body.other_user_id;
    const data = {"user_id": req.get("user_id"), "other_user_id": otherUserId};
    req.responseObject.result = await userService.addHateUser(data);
    res.json(req.responseObject);
};

module.exports = {
    getUsers
    ,addHateUser
};