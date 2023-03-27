const express = require("express");
const router = express.Router();
const {smsAPI} = require("../../../gateways/sms");
const logger = require("../../../loaders/logger");

module.exports = (app) => {
    app.use('/auth', router);

    router.post('/oauthAPI', async (req, res) => {
        res.json({state:200});
    });
    
    router.get('/', (req, res) => {
        logger.info('GET /');
        res.sendStatus(200);
    });

    router.get('/error', (req,res) => {
        logger.error('Error message');
        res.sendStatus(500);
    });

    router.post('/sign', (req, res) => {
        
    });

    router.post('/sms', async (req, res) => {
        res.json(await smsAPI.send_message(req, res));
    });
}
