const express = require("express");
require("express-async-errors");
const cors = require("cors");
const loaders = require("./src/loaders");
const exceptionHandler = require("./src/middleware/exception-handler");
const responseMessage = require("./src/middleware/response-message");
const { log } = require("./src/loaders/logger");

const app = express();

// const require  = require('app-root-path');

// 채팅 실시간 처리 구현
// 1. socket 연결이 안되었을때
// 1. 1:1 매칭 할 때 room_no 기억하기

/*
const socketIO = require('socket.io');
//const io = socketIO(server);
io.on("connection", (socket) => {
    socket.on("join", (data) => {
        console.log("join");
        console.log(data);
        var jsondata;
        try {
            jsondata = JSON.parse(data);
        } catch {
            jsondata = data;
        }
        let room_no = jsondata.room_no
        console.log(room_no);
        socket.join(room_no);
    });

    socket.on("new message", (data) => {

        console.log(data);
    });
});
*/

(async () => {
  app.use(cors({ origin: "*", credential: true }));
  app.use(log);
  app.use(responseMessage());
  await loaders({ expressApp: app });
  app.use(exceptionHandler());
})();

module.exports = app;
