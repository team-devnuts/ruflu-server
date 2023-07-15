const { Server } = require("socket.io");
const config = require("../config");
const alarm = require("../gateways/alarm");
const userService = require("../service/user.service");
const { saveMessages } = require("../service/message.service");

module.exports = async ({ server }) => {
  const io = new Server(server, {
    cors: {
      origin: config.DEV ? `https://localhost:${config.port}/` : false,
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const { userId } = socket.handshake.auth;
    // eslint-disable-next-line
    socket.userId = userId;

    next();
  });

  io.on("conncection", async (socket) => {
    const user = {
      socket_id: socket.id,
      user_id: socket.userId,
    };
    // DB에 업데이트를 한다.
    const result = await userService.saveSocketId(user);
    io.emit("connection-result", result);

    io.on("sendMessage", async (payload) => {
      /// 보낼 socketid 가 없으면 푸시 알림
      if (payload.toSocketID) {
        io.to(payload.toSocketId).emit("receviedMessage", payload);
      } else {
        // 푸시 알림
        alarm.pushMessage({
          userId: payload.to,
          nickName: payload.toNickName,
          message: payload.message,
        });
      }

      // 메시지 저장
      saveMessages(payload);
    });

    io.on("fetchMessages", async ({ receiver }) => {
      const messages = await fetchMessages(io, socket.id, receiver);
      io.to(socket.id).emit("stored-messages", { messages });
    });

    io.on("disconnect", async () => {
      userService.saveSocketId({
        socket_id: "",
        user_id: socket.userId,
      });
    });
  });

  return server;
};
