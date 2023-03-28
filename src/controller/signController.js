const {smsAPI} = require("../gateways/sms");
const {userService} = require("../service/user-service"); 
const jwt = require("../gateways/jwt");

module.exports = {
    sendSmsAuthNumber : async (req, res) => {
        return await smsAPI.send_message(req, res);
    },
    getJwtAccessToken : (req, res) => {
        const user = {"id": req.get("user_id")
                    , "phoneNumber": req.get("phone_number")};
        req.responseObject.result.token = jwt.publishAccessToken(user)
        return req.responseObject.result;
    },
    getJwtRefreshToken : (req, res) => {
        const user = {"id": req.get("user_id")
                    , "phoneNumber": req.get("phone_number")};
        req.responseObject.result.token = jwt.publishRefreshToken(user)
        return req.responseObject.result;
    },
    saveUserInformation : (req, res) => {
        req.responseObject.result = userService.saveUserInformation(req.body);
        return req.responseObject.result;
    }
}