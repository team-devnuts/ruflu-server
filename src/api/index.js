const express = require('express');
const homeRouter = require('./routes/home/home');
const someRouter = require('./routes/some/some');
const mainRouter = require('./routes/main/main');
const alarmRouter = require('./routes/alarm/alarm');
const signRouter = require('./routes/auth/sign');
const chatRouter = require('./routes/chat/chat');

module.exports = async () => {
    const app = express.Router();
    
    await homeRouter(app);
    await someRouter(app);
    await mainRouter(app);
    await alarmRouter(app);
    await signRouter(app);
    await chatRouter(app);

    return app;
};

