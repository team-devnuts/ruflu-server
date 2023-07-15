const express = require("express");
const { pushMessage, pushLike } = require("../../../gateways/alarm");

const router = express.Router();

module.exports = (app) => {
  app.use("/alarm", router);

  router.post("/push/msg", async (req, res) => {
    pushMessage({
      userId: req.body.toUserId,
      nickName: req.body.nickName,
    });
  });

  router.post("/push/like", async (req, res) => {
    pushLike({
      userId: req.body.toUserId,
      nickName: req.body.nickName,
    });
  });
};
