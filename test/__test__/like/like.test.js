const request = require('supertest');
const config = require('../../../src/config');
const app = require('../../../index')
const { pool } = require('../../../src/loaders/database');
const logger = require('../../../src/loaders/logger');
const { service } = require('../../../src/service/likeService');

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

describe('Test /some/like', () => {
    test('like 정보 저장하기', async () => {
        const response = await request(app)    
            .post('/api/some/like')
            .set('user_id', 1)
            .send({'other_user_id': '2'});

        expect(response.status).toBe(200);
    });
});

describe('Test getLikeMe', ()=> {
    test('like 정보 가져오기', async () => {
        const list = await service.getLikeMeList({user_id: "2"});
        logger.info(list);
    });
});


describe('Test getMatchList', ()=> {
    test('match 정보 가져오기', async () => {
        const list = await service.getUserMatchedWithMeList({"user_id": "2"});
        logger.info(list);
    });
});

describe('Test addMatc', ()=> {
    test('match 정보 저장하기', async () => {
        const count = await service.addUserInMyMatchList({"other_user_id": "2", "user_id": "1"});
        logger.info(count);
    });
});


afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    pool.end();
    server.close();
    done();
});