const {smsAPI} = require("../gateways/sms");
const {userService} = require("../service/user-service"); 
const jwt = require("../gateways/jwt");

module.exports = {
    sendSmsAuthNumber : async (req, res) => {
        return await smsAPI.send_message(req, res);
    },
    getJwtAccessToken : async (req, res) => {
        /*
        1. Refresh Token 검증
        2. Refresh Toekn 안에 payload 유저 정보로 존재 여부 체크
        3. 유저정보로 Access Token 발급
        */
        const refreshToken = req.get("refersh_token");
        req.responseObject.result.token = jwt.publishAccessToken(refreshToken);
        return req.responseObject;
    },
    
    signUp : async (req, res) => {
        const user = req.body;
        
        const result = await userService.saveUserInformation(user);
        result.refreshToken = jwt.sign(result);

        req.responseObject.result = result;
        return req.responseObject;
    },
    login : async (req, res) => {
        const body = req.body;
        req. responseObject.result = userService.login(body);
        return req.responseObject;
    }

    // getJwtRefreshToken : (req, res) => {
    //     const user = {"id": req.get("user_id")
    //                 , "phoneNumber": req.get("phone_number")};
    //     req.responseObject.result.token = jwt.publishRefreshToken(user)
    //     return req.responseObject.result;
    // },
}