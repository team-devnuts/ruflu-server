const app = require("./index");
const config = require("./src/config");
const { logger } = require("./src/loaders/logger");
const { pool } = require("./src/loaders/database");

// 서버 open
const server = app
  .listen(config.port, () => {
    logger.info(`Express server listening on port ${config.port}`);
  })
  .on("error", (err) => {
    logger.error(err);
    process.exit(1);
  })
  .on("close", async () => {
    await pool.end();
    logger.info("close connection server");
  });

process.once("SIGINT", (err) => {
  server.close();
});
