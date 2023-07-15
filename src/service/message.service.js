const { logger } = require("../loaders/logger");
const MessageModel = require("../models/messages.model");

const getToken = (sender, receiver) => {
  const key = "";
  // mysql에서 토큰 가져오기

  // 없으면 insert

  // 있으면 update

  return key;
};

const saveMessages = async ({ from, to, message, time }) => {
  // mysql 저장
  const token = getToken(from, to);

  const data = {
    from,
    message,
    time,
  };

  const result = await MessageModel.updateOne(
    { userToken: token },
    {
      $push: { messages: data },
    }
  );
};

const fetchMessages = async (io, sender, receiver) => {
  const token = getToken(sender, receiver);
  // eslint-disable-next-line
  const foundToken = await MessageModel.findOne(
    { userToken: token },
    { messages: { $slice: -10 } }
  );

  if (foundToken) {
    return foundToken.messages;
  }
  const data = {
    userToken: token,
    messages: [],
  };
  const message = new MessageModel(data);
  const savedMessage = message.save();
  if (savedMessage) {
    logger.info("메시지가 생성되었습니다.");
  } else {
    logger.error("메시지 생성 중 오류가 발생했습니다.");
  }
  return [];
};

module.exports = { saveMessages, fetchMessages };
