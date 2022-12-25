const express = require('express');
const app = express();
const http = require('node:http');
const server = http.createServer(app);
const bodyParser = require('body-parser');
const dbConfig = require(__dirname + '/config/database.js');
const cookieParser = require('cookie-parser');
const socketIO = require('socket.io');
const io = socketIO(server);

/* dotenv 환경변수 설정 require */
// dotenv 사용하여 서버주소, 고유 API KEY등 민감한 정보를 보안 관리한다.
require("dotenv").config();

const rufluRouter = require('./routes/ruflu/ruflu');
const mainRouter = require('./routes/main/main');
const alarmRouter = require('./routes/alarm/alarm');
const loginRouter = require('./routes/login/ouathAPI');
const chatRouter = require('./routes/chat/chat');
//const require  = require('app-root-path');

//app.use(bodyParser.json);
app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use('/home', rufluRouter);
app.use('/main', mainRouter);
app.use('/alarm', alarmRouter);
app.use('/login', loginRouter);
// 채팅 관련 api
app.use('/chat', chatRouter);
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static(process.env.IMAGE_DIR));

// DB 연결
dbConfig({
    host: process.env.MYSQL_ACCESS_HOST,
    port: process.env.MYSQL_ACCESS_PORT,
    user: process.env.MYSQL_ACCESS_ID,
    password: process.env.MYSQL_ACCESS_PW,
    database: process.env.MYSQL_DATABASE
})

app.set('port', process.env.APP_PORT || '3000')

app.get("/", function(req,res) {
    res.json({state:200});
});

// 채팅 실시간 처리 구현
// 1. socket 연결이 안되었을때
// 1. 1:1 매칭 할 때 room_no 기억하기
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

// 서버 open
server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

