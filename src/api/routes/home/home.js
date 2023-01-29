const express = require('express');
const router = express.Router();
const logger = require('../../../loaders/logger');
const request = require('request');
const controller = require('../../../controller/homeController');

module.exports = async (app) => {
    app.use('/home', router);

    router.get('/', function(req, res, next) {
        res.json({state:200})
    });
    
    router.get("/users" , async (req,res) => {
        res.json(await controller.getUsers(req, res))          
    });
    
    router.post("/ins/hate" , async function(req,res) {
        res.json(await controller.addHateUser(req, res));
    })
    
    router.post("/ins/like" , async (req,res) => {
        const result = await controller.addLikeUser(req, res);
        
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
        
    });
    
    // home lv1 리스트 (좋아요)
    router.get("/seLv1List", async (req, res) => {
        res.json(await controller.getLikeMeList(req, res));
    })
    
    
    // home lv2 리스트 (매치)
    router.get("/seLv2List", async (req, res) => {
        res.json(await controller.getUserMatchedWithMeList(req, res)); 
    });
    
    router.get("/seLv1/like", async (req, res) => {
        res.json(await controller.addUserInMyMatchList(req, res));
    })
    
    
    
}