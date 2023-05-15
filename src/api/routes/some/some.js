

const express = require('express');

const router = express.Router();
const controller = require('../../../controller/some-controller');
// const logger = require('../../../loaders/logger');

module.exports = async (app) => {
    app.use("/some", router);

    router.get("/", (req, res) => {
        res.json({state:200});
    });

    /**
     * @api {get} /some/like 사용자를 좋아요한 정보를 가져온다.
     * @apiName GetLikeInfo
     * @apiGroup some
     *
     * @apiParam {String} user_id 유저 key값
     *
     * @apiSuccess {Int} success API 호출 코드
     * @apiSuccess {String} message 응답 메시지
     * @apiSuccess {json} data 사용자를 좋아요한 유저 정보
     */
    router.get("/like", async (req, res) => {
        res.json(await controller.getLikeMeList(req, res));
    });
    
    /**
     * @api {post} /some/like 좋아요 정보를 저장
     * @apiName addLikeInfo
     * @apiGroup some
     *
     * @apiParam {String} other_user_id 유저 key값
     *
     * @apiSuccess {Int} success API 호출 코드
     * @apiSuccess {String} message 응답 메시지
     * @apiSuccess {json} data 좋아요 유저 정보 저장
     */
    router.post("/like", async (req, res) => {
        const result = await controller.addLikeUser(req, res);
        /*
        if(result.sucess) {
            request.post({
                headers : {'content-type': 'application/json'},
                url : 'http://localhost:8005/alarm/push/' + result.alarm,
                body : {
                    toUserId: '1'
                },
                json : true
            }, (error, req, res) =>{
                logger.info(error)
            });
        }
        */
        res.json(result);
    });

    router.get("/match", async (req, res) => {
        
        res.json(await controller.getUserMatchedWithMeList(req, res)); 
    });

    router.post("/match", async (req, res) => {
        res.json(await controller.addUserInMyMatchList(req, res));
    })

    
}