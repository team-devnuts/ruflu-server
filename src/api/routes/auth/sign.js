const express = require("express");
const signController = require("../../../controller/signController");
const router = express.Router();
const logger = require("../../../loaders/logger");

module.exports = (app, verifyToken) => {
    app.use('/auth', router);

    router.post('/oauthAPI', async (req, res) => {
        res.json({state:200});
    });
    
    router.get('/', (req, res) => {
        logger.info('GET /');
        res.sendStatus(200);
    });

    router.get('/error', (req, res) => {
        logger.error('Error message');
        res.sendStatus(500);
    });

    router.post('/user', (req, res) => {
        
    });

    router.get('/jwt/access', (req, res) => {
        res.json(signController.getJwtAccessToken(req, res));
    });

    router.get('/jwt/refresh', (req, res) => {
        res.json(signController.getJwtRefreshToken(req, res));
    });

    router.post('/sms', async (req, res) => {
        res.json(await signController.sendSmsAuthNumber(req, res));
    });
}
