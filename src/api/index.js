const express = require('express');
const homeRouter = require('./routes/home/home');
const mainRouter = require('./routes/main/main');
const alarmRouter = require('./routes/alarm/alarm');
const loginRouter = require('./routes/login/ouathAPI');
const chatRouter = require('./routes/chat/chat');

module.exports = () => {
    const app = express.Router();

    homeRouter(app);
    mainRouter(app);
    alarmRouter(app);
    loginRouter(app);
    chatRouter(app);
    return app;
};

