"use strict";

const express = require('express');
const router = express.Router();
const logger = require('../../../loaders/logger');
const request = require('request');
const controller = require('../../../controller/homeController');

module.exports = async (app) => {
    app.use("/home", router);


    router.get("/", (req, res, next) =>  {
        res.json({state:200})
    });
    
    /**
     * @api {get} /home/users 사용자 정보를 가져온다.
     * @apiName GetUsers
     * @apiGroup home
     *
     * @apiParam {String} user_id 사용자 key값
     *
     * @apiSuccess {Int} success API 호출 코드
     * @apiSuccess {String} message 응답 메시지
     * @apiSuccess {Json} data 유저에 대한 정보
     */
    router.get("/users" , async (req, res) => {
        res.json(await controller.getUsers(req, res));          
    });
    
    /**
     * @api {get} /home/users 사용자가 유저를 싫어요 했을시 정보 저장
     * @apiName GetUsers
     * @apiGroup home
     *
     * @apiParam {String} user_id 사용자 key값, other_user_id 유저 사용자 key
     *
     * @apiSuccess {Int} success API 호출 코드
     * @apiSuccess {String} message 응답 메시지
     * @apiSuccess {Json} ''
     */
    router.post("/hate" , async (req,res) => {
        res.json(await controller.addHateUser(req, res));
    });

}