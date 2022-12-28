const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../../loaders/database');
const admin = require('firebase-admin'); 
const serviceAccount = require("../../ruflu-e48f5-firebase-adminsdk-spqgm-acc7d36e6e.json");
const { appCheck } = require('firebase-admin');
const logger = require('../../loaders/logger');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = (app) => {
    app.use('/alarm', router);

    router.post("/push/msg" , function(req,res) {
        console.log("연결 성공!!!!");
        let ret = "";
        //db_config.connect(conn);
        console.log(req.body.to_user_id);
        
        const data = [req.body.to_user_id];
        let query = `SELECT     
                        A.alram_token, 
                        B.user_nm 
                     FROM user_info A
                     INNER JOIN user_profile_info b
                        on A.USER_ID = B.USER_ID
                     WHERE A.USER_ID = ?
                        ` ;
        
        query = mysql.format(query, data);
    
    
        let select_query = conn.query(query,  function(err, rows) {
            if(err) {
                throw err;
            } else {
                console.log("select token : Success");
                ret = {
                    data : rows
                }
                console.log(ret)
            }
        })
    
        //디바이스의 토큰 값 
        let deviceToken ='';
        let message = { 
            data: { 
                type: 'MESSAGE',
                title: 'Ruflu',
                body: '새로운 메세지가 도착했습니다', 
            }, 
            token: deviceToken,
        } 
        
        admin.messaging().send(message) 
        .then(function (response) { 
            console.log('Successfully sent message: : ', response) 
            return res.status(200).json({success : true}) 
        }).catch(function (err) { 
            console.log('Error Sending message!!! : ', err) 
            return res.status(400).json({success : false}) 
        }); 
    })
    
    
    router.post("/push/like" , async function(req,res) {
        console.log("연결 성공!!!!");
        let ret = "";
        const connection = await db.getConnection(async conn => conn);
        console.log(req.body);
        
        const data = [req.body.toUserId];
        let query = `SELECT     
                        A.alarm_token, 
                        B.nick_nm 
                     FROM user_info A
                     INNER JOIN user_profile_info B
                        on A.USER_ID = B.USER_ID
                     WHERE A.USER_ID = ?
                        ` ;
        
        query = mysql.format(query, data);
        logger.info(`quert : ${query}`)
        let [rows] = await connection.query(query);
        
    
        //디바이스의 토큰 값 
        let deviceToken =rows[0].alarm_token;
        console.log(`devicetoken : ${deviceToken}`)
        let message = { 
            notification: { 
                title: 'Ruflu',
                body: '두근두근 좋아요~❤', 
            }, 
            token: deviceToken,
        } 
        
        admin.messaging().send(message) 
        .then(function (response) { 
            console.log('Successfully sent like: : ', response) 
            return res.status(200).json({success : true}) 
        }).catch(function (err) { 
            console.log('Error Sending like!!! : ', err) 
            return res.status(400).json({success : false}) 
        }); 
    })
}

