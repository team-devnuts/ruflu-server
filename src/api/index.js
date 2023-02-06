const express = require('express');
const homeRouter = require('./routes/home/home');
const someRouter = require('./routes/some/some');
const mainRouter = require('./routes/main/main');
const alarmRouter = require('./routes/alarm/alarm');
const loginRouter = require('./routes/login/ouathAPI');
const chatRouter = require('./routes/chat/chat');

module.exports = async () => {
    const app = express.Router();
    
    await homeRouter(app);
    await someRouter(app);
    await mainRouter(app);
    await alarmRouter(app);
    await loginRouter(app);
    await chatRouter(app);

    return app;
};

