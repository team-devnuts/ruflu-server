const express = require('express');
const cookieParser = require('cookie-parser');

const router = require(`../../api`);
const config = require('../config');


module.exports = async ( {app} ) => {
    
    app.use(express.urlencoded({extended : true}));
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.static('public'));
    app.use(express.static(config.imageDIR));
    app.use(config.api.prefix, await router())

    app.get("/", async (req,res) => {
        res.json({state:200});
    });

    return app;
};