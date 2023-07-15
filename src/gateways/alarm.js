const admin = require("firebase-admin");
const serviceAccount = require("../../ruflu-e48f5-firebase-adminsdk-spqgm-acc7d36e6e.json");

const { mainService } = require("../service/main.service");

const title = "Ruflu";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendAlarm = async (data, userId) => {
  const deviceToken = await mainService.getAlarmTokenByUserId(userId);
  payload.token = deviceToken;

  admin
    .messaging()
    .send(payload)
    .then((response) => {
      logger.info(`Successfully sent message : ${response}`);
    })
    .catch((err) => {
      logger.error(`Error Sending message!!! : ${err}`);
    });
};

const pushMessage = async ({ userId, nickName, message }) => {
  sendAlarm(
    {
      token: "",
      data: {
        type: "MESSAGE",
        title,
        body: message || `${nickName}에게 새로운 메시지가 도착했습니다.`,
      },
    },
    userId
  );
};
const pushLike = async ({ userId, nickName }) => {
  sendAlarm(
    {
      token: "",
      notification: {
        title,
        body: `${nickName}님이 호감을 표시하였습니다.`,
      },
    },
    userId
  );
};

module.exports = {
  pushMessage,
  pushLike,
};
