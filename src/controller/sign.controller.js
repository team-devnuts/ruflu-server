const { smsAPI } = require("../gateways/sms");
const { userService } = require("../service/user.service");
const jwt = require("../gateways/jwt");

module.exports = {
  sendSmsAuthNumber: async (req, res) => {
    smsAPI.sendMessage(req, res);
  },
  // eslint-disable-next-line
  getJwtAccessToken: async (req, res) => {
    /*
        1. Refresh Token 검증
        2. Refresh Toekn 안에 payload 유저 정보로 존재 여부 체크
        3. 유저정보로 Access Token 발급
        */
    const refreshToken = req.get("refersh_token");
    req.responseObject.result.token = await jwt.publishAccessToken(
      refreshToken
    );
    return req.responseObject;
  },
  // eslint-disable-next-line
  signUp: async (req, res) => {
    const user = req.body;

    const result = await userService.saveUserInformation(user);
    result.refreshToken = jwt.sign(result);

    req.responseObject.result = result;
    return req.responseObject;
  },
  // eslint-disable-next-line
  login: async (req, res) => {
    const user = {
      login_phone_no: req.body.login_phone_no,
      kakao_serial_no: req.body.kakao_serial_no,
    };
    req.responseObject.result = await userService.login(user);
    return req.responseObject;
  },

  // getJwtRefreshToken : (req, res) => {
  //     const user = {"id": req.get("user_id")
  //                 , "phoneNumber": req.get("phone_number")};
  //     req.responseObject.result.token = jwt.publishRefreshToken(user)
  //     return req.responseObject.result;
  // },
};
