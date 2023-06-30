const request = require("supertest");
const config = require("../../../src/config");
const app = require("../../../index");
const { pool } = require("../../../src/loaders/database");
const { logger } = require("../../../src/loaders/logger");
const { userService } = require("../../../src/service/user.service");
const { mainService } = require("../../../src/service/main.service");

// 서버 open
const server = app
  .listen(config.port, () => {
    logger.info(`Express server listening on port ${config.port}`);
  })
  .on("error", (err) => {
    logger.error(err.message);
    process.exit(1);
  })
  .on("close", () => {
    logger.info("close connection server");
  });

beforeAll((done) => {
  done();
});

describe("Test /main/user", () => {
  test("유저 세부정보 가져오기", async () => {
    const user = await userService.getUserDetail({ user_id: "12" });
  });
});

describe("Test /main/user", () => {
  test("업데이트 알람 토큰", async () => {
    const user = await mainService.updateToken({ token: "123", user_id: "12" });
  });
});

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  pool.end();
  server.close();
  done();
});
