const request = require("supertest");
const config = require("../../../src/config");
const app = require("../../../index");
const { pool } = require("../../../src/loaders/database");
const { logger } = require("../../../src/loaders/logger");
const Image = require("../../../src/models/file.model");

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

describe("이미지 정보를 DB에 저장하는 model 객체 테스트", () => {
  test("하나의 이미지 파일 정보를 DB user_album_info 테이블에 저장하고 트랜잭션이 성공했는지 count 값을 가져온다.", async () => {
    const count = await Image.create(
      new Image({
        user_id: "2",
        image_original_file_name: "man1.jpg",
        image_file_name: "74899a30-164a-11ee-962a-65f4b106b109man1",
        ext: "jpg",
        image_file_size: 404849,
        image_file_path: "uploads/74899a30-164a-11ee-962a-65f4b106b109man1.jpg",
      })
    );

    expect(count).toBe(1);
  });

  test("여러 개의 이미지 파일 정보를 DB user_album_info 테이블에 저장하고 몇 개의 트랜잭션이 성공했는지 count 값을 가져온다.", async () => {
    const n = 2;
    const arr = [];
    // eslint-disable-next-line
    for (let i = 0; i < n; i++) {
      arr.push(
        new Image({
          user_id: "2",
          image_original_file_name: "man1.jpg",
          image_file_name: "74899a30-164a-11ee-962a-65f4b106b109man1",
          ext: "jpg",
          image_file_size: 404849,
          image_file_path:
            "uploads/74899a30-164a-11ee-962a-65f4b106b109man1.jpg",
        })
      );
    }
    const count = await Image.createImages(arr);

    expect(count).toBe(n);
  });

  test("이미지를 사용하지 않기 위해 use_yn 컬럼 값을 0으로 만든다. 그리고 count 값을 반환한다.", async () => {
    const image = new Image({ user_id: 2, image_file_id: 154 });
    const count = await Image.updateUseYn(image);

    expect(count).toBe(0);
  });

  test("프로필 화면에서 유저의 이미지들을 불러온다.", async () => {
    const result = await Image.getProfileImagesByUserId(1);

    const isTrue = result.length > 0;

    expect(isTrue).toBe(true);
  });
});

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  pool.end();
  server.close();
  done();
});
