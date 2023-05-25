/* dotenv 환경변수 설정 require */
// dotenv 사용하여 서버주소, 고유 API KEY등 민감한 정보를 보안 관리한다.
require("dotenv").config();

module.exports = {
  port: process.env.APP_PORT,
  databaseHOST: process.env.MYSQL_ACCESS_HOST,
  databasePORT: process.env.MYSQL_ACCESS_PORT,
  databaseID: process.env.MYSQL_ACCESS_ID,
  databasePW: process.env.MYSQL_ACCESS_PW,
  databaseNAME: process.env.MYSQL_DATABASE,
  imageDIR: process.env.IMAGE_DIR,
  jwtAccessSecretKey: process.env.JWT_SECRETKEY,
  jwtRefreshSecretKey: process.env.JWT_REFRESH_SECRETKEY,
  api: {
    prefix: "/api",
  },
  profileTitle: {
    gender: "성별",
    height: "키",
    job: "직업",
    fancy: "이상형",
    academy: "학력",
  },
};
