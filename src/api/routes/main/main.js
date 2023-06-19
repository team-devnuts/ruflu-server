const express = require("express");

const router = express.Router();
const controller = require("../../../controller/main.controller");

module.exports = (app) => {
  app.use("/main", router);

  // 라우터의 get 함수 를 이용해 request url에 대한 업무처리 로직 정의
  router.get("/", (req, res) => {
    res.json({ state: 200 });
  });

  router.post("/location", async (req, res) => {
    res.json(await controller.updateLocation(req, res));
  });

  router.post("/alarm", async (req, res) => {
    res.json(await controller.updateToken(req, res));
  });

  router.get("/user/:user_id", async (req, res) => {
    res.json(await controller.getUserDetail(req, res));
  });
};
