const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../../config/database');
const mainQuery = require('./mainQuery')

// 라우터의 get 함수 를 이용해 request url에 대한 업무처리 로직 정의
router.get('/', function(req, res, next) {
    res.json({state:200})
});


router.post("/loca/udt", async function(req, res, next){
    const latitude = req.body.latitude;
    const longitude =req.body.longitude;
    const userId = req.get("user_id");
    console.log(latitude);
    console.log(longitude);
    const data = [latitude,longitude,userId];
    let query = mainQuery.updateUserLoca;
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
    /*
    db((err, connection) => {
        
        
        
        connection.query(query, (err, rows) => {
            
            if(err) {
                throw err;
            } else {
                res.json("success")
            }
        })
    })
    */

})

router.post("/token/udt", async function(req, res, next){
    const token = req.body.token;
    const userId = req.get("user_id");
    console.log(token);
    const data = [token, userId];
    let query = mainQuery.updateUserToken;
    query = mysql.format(query, data);
    console.log(query);
    // db pool 가져오기
    const connection = await db.getConnection(async conn => console.log(conn));
    // 트랜잭션 처리
    await connection.beginTransaction();
    const rows = await connection.query(query);
    await connection.commit();
    // db pool 반환
    connection.release();

    res.json("success");

    /*
    db((err, connection) => {
        
        
        connection.query(query, (err, rows) => {
            connection.release();
            if(err) {
                throw err;
            } else {
                
            }
        })
    })
    */
    
})


module.exports = router;