const {service} = require('../service/mainService')

const updateLocation = async (req, res) => {
    const latitude = req.body.latitude;
    const longitude =req.body.longitude;
    const userId = req.get("user_id");
    const data = {latitude,longitude,userId};
    return await service.updateLocation(data);
};

const updateToken = async (req, res) => {
    const token = req.body.token;
    const userId = req.get("user_id");
    const data = {token, userId};
    return await service.updateToken(data);
};

module.exports = {
    updateLocation, updateToken
}