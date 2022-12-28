const express = require('express');
const rufluRouter = require('./routes/ruflu/ruflu');
const mainRouter = require('./routes/main/main');
const alarmRouter = require('./routes/alarm/alarm');
const loginRouter = require('./routes/login/ouathAPI');
const chatRouter = require('./routes/chat/chat');

module.exports = () => {
    const app = express.Router();

    rufluRouter(app);
    mainRouter(app);
    alarmRouter(app);
    loginRouter(app);
    chatRouter(app);
    return app;
}