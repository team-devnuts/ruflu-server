const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require(process.env.PWD + '/loaders/database');
const logger = require(process.env.PWD + '/loaders/logger');
const rufluQuery = require("../../../service/homeQuery");
const request = require('request');
const controller = require(process.env.PWD + '/controller/homeController');

module.exports = (app) => {
    app.use('/home', router);

    // 라우터의 get 함수 를 이용해 request url에 대한 업무처리 로직 정의
    router.get('/', function(req, res, next) {
        res.json({state:200})
    });
    
    router.get("/userCardList" , async (req,res) => {
        res.json(await controller.getCards(req, res))          
    });
    
    router.post("/ins/hate" , async function(req,res) {
        controller.addHateUser(req, res);
        const userId = req.get("user_id");
        const toUserId = req.body.to_user_id;
        console.log(userId);
        console.log(toUserId);
        const data = [userId, toUserId];
        let query = rufluQuery.insertHateUser;
        query = mysql.format(query, data);
    
        // db pool 가져오기
        const connection = await db.getConnection(async conn => conn);
        // 트랜잭션 처리
        await connection.beginTransaction();
        const rows = await connection.query(query);
        await connection.commit();
        // db pool 반환
        connection.release();
    
        res.json("success");
    })
    
    
    router.post("/ins/like" , async (req,res) => {
        controller.addLikeUser(req, res);
        const userId = req.get("user_id");
        const toUserId = req.body.to_user_id;
        let data = [userId, toUserId];
        console.log(userId);
        console.log(toUserId);
        
        let query = rufluQuery.insertLikeUser
        query = mysql.format(query, data);
        // db pool 가져오기
        const connection = await db.getConnection(async conn => conn);
    
        // 트랜잭션 처리
        await connection.beginTransaction();
        let rows = await connection.query(query);
        
        logger.info("/ins/like : query complete")
    
    
        // select : 상대방도 나를 like를 했는 가?
        data = [userId, toUserId];
        query = rufluQuery.selectLikeMe
        query = mysql.format(query, data);
        logger.info(`selectSeLv1List : ${query}`);
        [rows] = await connection.query(query);
    
        if(rows.length > 0) {
            data = [userId, toUserId];
            query = rufluQuery.insertLv2Like;
            query = mysql.format(query, data);
            rows = await connection.query(query);
    
            logger.info(`is success like2 ?  ${rows}`)
            // 상대방에게 푸시알람
            // if(falg) send push alrarm
            //if(rows.)
            // 결과값 리턴
        } else {
            // 상대방에게 알림 보내기
            request.post({
                headers : {'content-type': 'application/json'},
                url : 'http://localhost:8005/alarm/push/like',
                body : {
                    toUserId: '1'
                },
                json : true
            }, (error, req, res) =>{
                logger.info(error)
            });
            /*
            fetch("/alarm/push/like", {
                method: 'post',
                body: JSON.stringify({
                    to_user_id: '1'
                })});
                */
        }
        await connection.commit();
    })
    
    // home lv1 리스트 (좋아요)
    router.get("/seLv1List", async (req, res) => {
        controller.getLikeMeList(req, res);
        let userList = ""
        const userId = req.get("user_id")
        const data  = [userId]
        console.log(userId)
        let query = rufluQuery.selectSeLv1List
        query = mysql.format(query, data)
    
        // db pool 가져오기
        const connection = await db.getConnection(async conn => conn)
        // 트랜잭션 처리
        const [rows] = await connection.query(query)
        userList = rows;
    
        
        if(rows.length > 0) {
            await getUserImgs(userList)
            logger.info("/seLv1List : query complete")
            logger.info(userList)
            res.json(userList)
        }
    })
    
    
    // home lv2 리스트 (매치)
    router.get("/seLv2List", async (req, res) => {
        controller.getUserMatchedWithMeList(req, res);
        const userId = req.get("user_id")
        const data  = [userId, userId]
        let query = rufluQuery.selectSeLv2List
        query = mysql.format(query, data)
        console.log(query)
        // db pool 가져오기
        const connection = await db.getConnection(async conn => conn)
        // 트랜잭션 처리
        await connection.query(query)
    
        if(rows.length > 0) {
            res.json(rows)
        }
        
    })
    
    router.get("/seLv1/like", async (req, res) => {
        controller.addUserInMyMatchListUserCase(req, res);
        const toUserId = req.get("userId")
        const userId = req.get("user_id")
        const data  = [toUserId, userId]
    
        let query = rufluQuery.insertLv2Like;
        query = mysql.format(query, data);
        console.log(query);
        // db pool 가져오기
        const connection = await db.getConnection(async conn => conn);
        // 트랜잭션 처리
        const rows = await connection.query(query);
    })
    
    let getUserImgs = async function(userList) {
        let query = rufluQuery.selectUserAlbum;
        let data = [];
    
        for (const key in userList) {
            query += "?"
            data[key] = userList[key].user_id
            if(key != (userList.length-1))
                query += ","
            else query += ""
        }
        query += ")"
        query = mysql.format(query, data)
        const connection = await db.getConnection(async conn => conn);
        const [rows] = await connection.query(query);
        userList.forEach(user => {
            let imgs = new Array();
            
            rows.forEach(userAlbum => {
                if(user.user_id == userAlbum.user_id) {
                    imgs.push(userAlbum.atch_file_path_nm);
                }
            });
            user.imgs = imgs;
        });
    }
    
}