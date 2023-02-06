const express = require('express');
const router = express.Router();
const controller = require('../../../controller/mainController');

module.exports = (app) => {
    app.use('/main', router);
    // 라우터의 get 함수 를 이용해 request url에 대한 업무처리 로직 정의
    router.get('/', function(req, res, next) {
        res.json({state:200});
    });
    
    router.post("/loca/udt", async (req, res, next) => {
        res.json(await controller.updateLocation(req, res));
    });

    router.post("/token/udt", async (req, res, next) => {
        res.json(await controller.updateToken(req, res));
    });
        
    router.get("/user", async (req, res) => {
        res.json(await controller.getUserDetail(req, res));
    });
}