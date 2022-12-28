const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../../loaders/database');
const rufluQuery = require("./chatQuery");


module.exports = (app) => {
    app.use('/chat', router);

    // 라우터의 get 함수 를 이용해 request url에 대한 업무처리 로직 정의
    router.get('/', function(req, res, next) {
        res.json({state:200})
    });

}