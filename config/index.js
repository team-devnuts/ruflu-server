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
}