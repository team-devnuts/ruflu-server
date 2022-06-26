const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../../config/database');
const rufluQuery = require("./chatQuery");

// 라우터의 get 함수 를 이용해 request url에 대한 업무처리 로직 정의
router.get('/', function(req, res, next) {
    res.json({state:200})
});

module.exports = router;