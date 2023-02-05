const request = require('supertest');
const config = require('../../../src/config');
const app = require('../../../index')
const { pool } = require('../../../src/loaders/database');
const logger = require('../../../src/loaders/logger');
const { service } = require('../../../src/service/userService');

// 서버 open
const server = app.listen(config.port, function(){
    logger.info('Express server listening on port ' + config.port);
}).on('error', err => {
    logger.error(err);
    process.exit(1);
}).on('close', () => {
    logger.info('close connection server');
});

beforeAll(done => {
    done();
});  

describe('Test /main/user', () => {
    test('유저 세부정보 가져오기', async () => {
        const user = await service.getUserDetail({"user_id": "12"});
        logger.debug(user.result);
    });
});

afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    pool.end();
    server.close();
    done();
});