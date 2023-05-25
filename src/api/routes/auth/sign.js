const express = require("express");
const signController = require("../../../controller/sign-controller");

const router = express.Router();
const logger = require("../../../loaders/logger");

module.exports = (app) => {
  app.use("/auth", router);

  router.get("/", (req, res) => {
    logger.info("GET /");
    res.sendStatus(200);
  });

  router.get("/error", (req, res) => {
    logger.error("Error message");
    res.sendStatus(500);
  });

  router.post("/user", async (req, res) => {
    /*
            회원가입
            1. user_info
              user_id
            , login_phone_no
            , login_method
            , use_yn
            , registeration_date
            , modification_date

            2. user_profile_info
              user_id
            , nick_name
            , gender
            , birth
            , height
            , job
            , fancy
            , registration_date
            , modification_date
            , academy
        */
    res.json(await signController.signUp(req, res));
  });

  router.get("/jwt/access", async (req, res) => {
    res.json(await signController.getJwtAccessToken(req, res));
  });

  // router.get('/jwt/refresh', (req, res) => {
  //     res.json(signController.getJwtRefreshToken(req, res));
  // });

  router.post("/login", async (req, res) => {
    /*
            1. 로그인시 필요한 정보
             - 핸드폰 번호, 카카오 아이디
            2. oauth 로그인일 경우
             - 카카오톡 고유 아이디
             - 없다고 응답
            3. 핸드폰 인증일 경우
             - 유저 정보 확인 : 핸드폰 번호
             - 없으면 회원가입으로 이동하라고 응답
            4. refreshtoken accesstoken 재발급
        */
    res.json(await signController.login());
  });

  router.post("/sms", async (req, res) => {
    res.json(await signController.sendSmsAuthNumber(req, res));
  });
};
