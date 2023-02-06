const {mainService} = require('../service/mainService');
const {userService} = require('../service/userService');

const updateLocation = async (req, res) => {
    const latitude = req.body.latitude;
    const longitude =req.body.longitude;
    const userId = req.get("user_id");
    const data = {latitude,longitude,"user_id":userId};
    return await mainService.updateLocation(data);
};

const updateToken = async (req, res) => {
    const token = req.body.token;
    const userId = req.get("user_id");
    const data = {token, userId};
    return await mainService.updateToken(data);
};

const getUserDetail = async (req, res) => {
    const userId = req.get("user_id");
    
    return await userService.getUserDetail({"user_id": userId});
};

module.exports = {
    updateLocation, updateToken , getUserDetail
}