const express = require("express");
require("express-async-errors");
const cors = require("cors");
const http = require("http");

const loaders = require("./src/loaders");
const exceptionHandler = require("./src/middleware/exception-handler");
const responseMessage = require("./src/middleware/response-message");
const { log } = require("./src/loaders/logger");

const app = express();
const server = http.createServer(app);
const chat = require("./src/loaders/chat");

chat({ server });

(async () => {
  app.use(cors({ origin: "*", credential: true }));
  app.use(log);
  app.use(responseMessage());
  await loaders({ expressApp: app });
  app.use(exceptionHandler());
})();

module.exports = server;
