const express = require('express');
const config = require('../config');

module.exports = async ( {app} ) => {
    
    app.use(express.urlencoded({extended : false}));
    app.use(express.json());
    app.use(require('cookie-parser')());
    app.use(express.static('public'));
    app.use(express.static(config.imageDIR));

    app.get("/", function(req,res) {
        res.json({state:200});
    });

    return app;
};