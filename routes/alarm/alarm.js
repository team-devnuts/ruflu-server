const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../../config/database');
const admin = require('firebase-admin'); 
const alarmQuery = require("./alarmQuery");
const serviceAccount = require("../../ruflu-e48f5-firebase-adminsdk-spqgm-acc7d36e6e.json");
const logger = require('../../config/logger');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

router.post("/push/msg" , async function(req,res) {
    console.log("연결 성공!!!!");
    let ret = "";
    //db_config.connect(conn);
    console.log(req.body.to_user_id);
    
    const data = [req.body.to_user_id];
    let query = alarmQuery.getUserAlarmToken;
    
    query = mysql.format(query, data);
    logger.info(`quert : ${query}`)
    let [rows] = await connection.query(query);
    

    //디바이스의 토큰 값 
    let deviceToken =rows[0].alarm_token;     
    sendFireBaseFushAlarmApi("M", deviceToken); 

})


router.post("/push/like" , async function(req,res) {
    console.log("연결 성공!!!!");
    let ret = "";
    const connection = await db.getConnection(async conn => conn);
    console.log(req.body);
    
    const data = [req.body.toUserId];
    let query = alarmQuery.getUserAlarmToken;

    query = mysql.format(query, data);
    logger.info(`quert : ${query}`)
    let [rows] = await connection.query(query);
    

    //디바이스의 토큰 값 
    let deviceToken =rows[0].alarm_token;
    console.log(`devicetoken : ${deviceToken}`)
    sendFireBaseFushAlarmApi("L", deviceToken);  
})


router.post("/push/match" , async function(req,res) {
    console.log("연결 성공!!!!");
    let ret = "";
    const connection = await db.getConnection(async conn => conn);
    console.log(req.body);
    
    const data = [req.body.toUserId];
    let query = alarmQuery.getUserAlarmToken;

    query = mysql.format(query, data);
    logger.info(`quert : ${query}`)
    let [rows] = await connection.query(query);
    let deviceToken =rows[0].alarm_token;

    sendFireBaseFushAlarmApi("M", deviceToken); 
})

const sendFireBaseFushAlarmApi = function(alarmType, deviceToken) {

    let message = {};
    switch (alarmType) {
        // match
        case "M":
            message = { 
                notification: { 
                    title: 'Ruflu',
                    body: '두근두근 매칭~', 
                }, 
                token: deviceToken,
            } 
            break;
        // like
        case "L":
            let message = { 
                notification: { 
                    title: 'Ruflu',
                    body: '두근두근 좋아요~❤', 
                }, 
                token: deviceToken,
            } 
            break;
        // message
        default:
            message = { 
                data: { 
                    type: 'MESSAGE',
                    title: 'Ruflu',
                    body: '새로운 메세지가 도착했습니다', 
                }, 
                token: deviceToken,
            }
            break;
    }
     
    
    admin.messaging().send(message) 
    .then(function (response) { 
        console.log('Successfully sent match: : ', response) 
        return res.status(200).json({success : true}) 
    }).catch(function (err) { 
        console.log('Error Sending match!!! : ', err) 
        return res.status(400).json({success : false}) 
    }); 
}

module.exports = router;

