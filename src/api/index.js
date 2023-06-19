const express = require("express");
const { verifyToken } = require("../middleware/jwt-verity");
const homeRouter = require("./routes/home/home");
const someRouter = require("./routes/some/some");
const mainRouter = require("./routes/main/main");
const alarmRouter = require("./routes/alarm/alarm");
const signRouter = require("./routes/auth/sign");
const chatRouter = require("./routes/chat/chat");

module.exports = async () => {
  const app = express.Router();

  await homeRouter(app, verifyToken);
  await someRouter(app, verifyToken);
  await mainRouter(app, verifyToken);
  await alarmRouter(app, verifyToken);
  await signRouter(app, verifyToken);
  await chatRouter(app, verifyToken);

  return app;
};
