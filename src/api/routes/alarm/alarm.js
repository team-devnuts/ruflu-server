const express = require("express");
const mysql = require("mysql");

const admin = require("firebase-admin");
const db = require("../../../loaders/database");

const serviceAccount = require("../../../../ruflu-e48f5-firebase-adminsdk-spqgm-acc7d36e6e.json");
const logger = require("../../../loaders/logger");

const router = express.Router();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = (app) => {
  app.use("/alarm", router);

  router.post("/push/msg", async (req, res) => {
    const connection = await db.getConnection(async (conn) => conn);
    const data = [req.body.to_user_id];
    let query = `SELECT     
                        A.alram_token, 
                        B.user_nm 
                     FROM user_info A
                     INNER JOIN user_profile_info b
                        on A.USER_ID = B.USER_ID
                     WHERE A.USER_ID = ?
                        `;

    query = mysql.format(query, data);

    const [rows] = await connection.query(query);

    // 디바이스의 토큰 값
    const deviceToken = rows[0].alarm_token;
    const message = {
      data: {
        type: "MESSAGE",
        title: "Ruflu",
        body: "새로운 메세지가 도착했습니다",
      },
      token: deviceToken,
    };

    admin
      .messaging()
      .send(message)
      .then((response) => {
        logger.info(`Successfully sent message : ${response}`);
        res.json(req.responseObject);
      })
      .catch((err) => {
        logger.error(`Error Sending message!!! : ${err}`);
        req.responseObject.code = 400;
        res.json(req.responseObject);
      });
  });

  router.post("/push/like", async (req, res) => {
    const connection = await db.getConnection(async (conn) => conn);
    const data = [req.body.toUserId];
    let query = `SELECT     
                        A.alarm_token, 
                        B.nick_nm 
                     FROM user_info A
                     INNER JOIN user_profile_info B
                        on A.USER_ID = B.USER_ID
                     WHERE A.USER_ID = ?
                        `;

    query = mysql.format(query, data);
    const [rows] = await connection.query(query);

    // 디바이스의 토큰 값
    const deviceToken = rows[0].alarm_token;
    const message = {
      notification: {
        title: "Ruflu",
        body: "두근두근 좋아요~❤",
      },
      token: deviceToken,
    };

    admin
      .messaging()
      .send(message)
      .then((response) => {
        logger.info(`Successfully sent message : ${response}`);
        res.json(req.responseObject);
      })
      .catch((err) => {
        logger.error(`Error Sending message!!! : ${err}`);
        req.responseObject.code = 400;
        res.json(req.responseObject);
      });
  });
};
