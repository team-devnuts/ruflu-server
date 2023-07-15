const request = require("supertest");
const config = require("../../src/config");
const app = require("../../index");
const { pool } = require("../../src/loaders/database");
const { logger } = require("../../src/loaders/logger");

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

class Test {}
describe("Test /", () => {
  it("shoud return {state:200}", (done) => {
    request(app).get("/").expect(200, done);
  });
});

describe("Test /home/userCardList", () => {
  test("유저 정보를 가지고오기", async () => {
    const response = await request(app)
      .get("/api/home/users")
      .set("user_id", 1);
    expect(response.status).toBe(200);
    // logger.info(response.body);
  });
});

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  pool.end();
  server.close();
  done();
});
