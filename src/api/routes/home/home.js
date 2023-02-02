"use strict";

const express = require('express');
const router = express.Router();
const logger = require('../../../loaders/logger');
const request = require('request');
const controller = require('../../../controller/homeController');

module.exports = async (app) => {
    app.use("/home", router);

    router.get("/", function(req, res, next) {
        res.json({state:200})
    });
    
    router.get("/users" , async (req, res) => {
        res.json(await controller.getUsers(req, res));          
    });
    
    router.post("/hate" , async function(req,res) {
        res.json(await controller.addHateUser(req, res));
    });
}