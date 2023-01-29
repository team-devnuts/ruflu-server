const express = require('express');
const loaders = require('./src/loaders');
const app = express();

//const require  = require('app-root-path');

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
    await loaders({ expressApp: app });
})();

module.exports = app;


